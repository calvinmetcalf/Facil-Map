/*
	This file is part of FacilMap.

	FacilMap is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	FacilMap is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with FacilMap.  If not, see <http://www.gnu.org/licenses/>.

	Obtain the source code from http://gitorious.org/facilmap.
*/

(function(fm, ol, $){

fm.Control.Search = ol.Class(ol.Control, {
	nameFinder : null,
	tabindex : 1,

	_layerMarkers : null,
	_layerRouting : null,
	_layerXML : null,

	_lastFromSuggestion : null,
	_lastToSuggestion : null,

	_stateObject : { },

	/**
	 * @param nameFinder {FacilMap.NameFinder}
	 * @param options
	 */
	initialize : function(options) {
		this.nameFinder = new FacilMap.NameFinder.Nominatim();

		this.makeSuggestions = $.proxy(this.makeSuggestions, this);

		ol.Control.prototype.initialize.apply(this, arguments);

		this.events.addEventType("stateObjectChanged");
	},

	draw : function() {
		var t = this;
		var create = (this.div == null);

		var ret = ol.Control.prototype.draw.apply(this, arguments);

		if(create)
		{
			var form = $("<form></form>").appendTo(ret);

			// Disable map dragging inside search bar for proper mouse click handling
			var navigationControl = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
			if(navigationControl)
			{
				$(ret).mouseover(function(){
					navigationControl.deactivate();
				}).mouseout(function() {
					navigationControl.activate();
				});
			}

			/////////////////
			// Control layers

			t._layerMarkers = new fm.Layer.Markers.SearchResults(ol.i18n("Search results"));
			t.map.addLayer(t._layerMarkers);

			t._layerRouting = new fm.Layer.XML.Routing("[routing]", { showInLayerSwitcher : false });
			t.map.addLayer(t._layerRouting);

			t._layerXML = new fm.Layer.XML("[xml]", null, { showInLayerSwitcher : false });
			t.map.addLayer(t._layerXML);
			t._layerXML.events.register("allloadend", t._layerXML, function() {
				var extent = this.getDataExtent();
				if(extent)
					this.map.zoomToExtent(extent);
				//onSearchEnd();
			});

			///////////////
			// Forms fields

			var inputFrom = $('<input type="text" class="from" />').appendTo(form);
			var helpButton = $('<img src="'+fm.apiUrl+'/img/help.png" alt="?" class="help" />').appendTo(form);
			var inputTo = $('<input type="text" class="to" />').appendTo(form);
			var linkDirections = $('<a href="#" class="directions"></a>').appendTo(form);
			var buttonSearch = $('<input type="submit" value="" class="submit" />').appendTo(form);
			var buttonClear = $('<input type="button" value="'+ol.i18n("Clear")+'" class="clear" />').appendTo(form);
			var selectType = $('<select class="type">' +
				'<option value="'+FacilMap.Routing.Type.FASTEST+'">'+ol.i18n("Fastest")+'</option>' +
				'<option value="'+FacilMap.Routing.Type.SHORTEST+'">'+ol.i18n("Shortest")+'</option>' +
			'</select>').appendTo(form);
			var selectMedium = $('<select class="medium">' +
				'<option value="'+FacilMap.Routing.Medium.CAR+'">'+ol.i18n("Car")+'</option>' +
				'<option value="'+FacilMap.Routing.Medium.BICYCLE+'">'+ol.i18n("Bicycle")+'</option>' +
				'<option value="'+FacilMap.Routing.Medium.FOOT+'">'+ol.i18n("Foot")+'</option>' +
			'</select>').appendTo(form);

			/////////////////
			// Event handlers

			// AutoSuggest feature: store selected suggestion to avoid duplicate NameFinder calls
			new FacilMap.AutoSuggest(inputFrom[0], this.makeSuggestions, { setValue : function(suggestion) { t._lastFromSuggestion = suggestion; inputFrom.val(suggestion.value); }});
			new FacilMap.AutoSuggest(inputTo[0], this.makeSuggestions, { setValue : function(suggestion) { t._lastToSuggestion = suggestion; inputTo.val(suggestion.value); }});

			var routingVisible = true;
			linkDirections.click(function(){
				routingVisible = !routingVisible;
				inputFrom.attr("placeholder", routingVisible ? ol.i18n("From") : "");
				linkDirections.html(ol.i18n(routingVisible ? "Hide directions" : "Get directions"));
				inputTo.add(selectType).add(selectMedium).css("display", routingVisible ? "" : "none").attr("placeholder", routingVisible ? ol.i18n("To") : "");
				buttonSearch.val(ol.i18n(routingVisible ? "Get directions" : "Search"));
				$(ret)[routingVisible ? "addClass" : "removeClass"]("routing");
				helpButton.css("display", routingVisible ? "none" : "");

				$.each(routingVisible ? [ inputFrom, inputTo, buttonSearch, buttonClear, selectType, selectMedium, linkDirections ] : [ inputFrom, buttonSearch, buttonClear, linkDirections ], function(i, it) {
					it.attr("tabindex", t.tabindex+i);
				});

				return false;
			});
			linkDirections.click();

			helpButton.click(function(){ fm.Util.popup(ol.i18n("searchHelpText"), ol.i18n("Search help")); });

			form.submit(function(){ t.search(inputFrom.val(), routingVisible ? inputTo.val() : null); return false; });
			buttonClear.click(function() { t.search(""); });
		}

		return ret;
	},

	/**
	 * A suggestion function to use for {@link FacilMap.AutoSuggest} that takes care of POI searches
	 * (search queries containing “near” terms)
	 * @param query {String}
	 * @param callback {Function}
	 */
	makeSuggestions : function(query, callback) {
		var t = this;
		var poi = this.getPOISearchTerm(query);

		this.nameFinder.makeSuggestions(poi.place, function(suggestions) {
			$.each(suggestions, function(i, it){
				poi.place = it.value;
				it.value = poi.convertBack();
			});
			callback(suggestions);
		});
	},

	/**
	 * Splits up the search term for POI searches like “supermarkets near London, England”.
	 * @param query {String} The search query to split up
	 * @return {Object} poi: “supermarket” (or null if no “near” is contained in the search query
	 *                  place: “London, England”
	 *                  convertBack: A function that converts the object back to a search string (useful
	 *                               after overwriting the other properties)
	 */
	getPOISearchTerm : function(query) {
		var ret = {
			poi : null,
			place : query,
			convertBack : function() {
				if(this.poi)
					return this.poi + " near " + this.place;
				else
					return this.place;
			}
		};
		var idx = query.toLowerCase().indexOf(" near ");
		if(idx >= 0)
		{
			ret.poi = query.substring(0, idx);
			ret.place = query.substring(idx+6);
		}
		return ret;
	},

	/**
	 * Decides what kind of search to start (GPX file, routing, POI search, ...) depending on the
	 * contents of the search fields
	 * @param query1 {String} The content of the “from” field
	 * @param query2 {String} The content of the “to” field
	 * @param type {FacilMap.Routing.Type}
	 * @param medium {FacilMap.Routing.Medium}
	 */
	search : function(query1, query2, type, medium) {
		this.clear();

		query1 = (query1 || "").replace(/^\s+/, "").replace(/\s+$/, "");
		query2 = (query2 || "").replace(/^\s+/, "").replace(/\s+$/, "");

		if(query1)
		{
			if(query2)
			{
				this._stateObject = {
					from : query1,
					to : query2,
					type : type,
					medium : medium
				};
				this.showRoute(query1, query2, type, medium);
			}
			else
			{
				this._stateObject = {
					query : query1
				};

				var m = query1.match(/^(node|way|relation|trace)\s*#?\s*(\d+)$/i);
				if(m)
				{
					switch(m[1].toLowerCase())
					{
						case "node": query1 = "http://www.openstreetmap.org/api/0.6/node/"+m[2]; break;
						case "way": query1 = "http://www.openstreetmap.org/api/0.6/way/"+m[2]+"/full"; break;
						case "relation": query1 = "http://www.openstreetmap.org/api/0.6/relation/"+m[2]+"/full"; break;
						case "trace": query1 = "http://www.openstreetmap.org/trace/"+m[2]+"/data"; break;
					}
				}

				if(query1.match(/^(http|https|ftp):\/\//) && !this.nameFinder.isLonLatQuery(query1))
					this.showGPX(query1);
				else
				{
					var poi = this.getPOISearchTerm(query1);
					if(poi.poi != null)
						this.showPOISearchResults(poi.poi, poi.place, query1);
					else
						this.showSearchResults(query1);
				}
			}
		}
	},

	clear : function() {
		$("div.results", this.div).remove();

		this._layerMarkers.clearMarkers();
		this._layerXML.setUrl();
		this._layerRouting.setFrom(null);
		this._layerRouting.setTo(null);

		this._stateObject = { };
		this.events.triggerEvent("stateObjectChanged");
	},

	showPOISearchResults : function(poi, place, query) {
		var t = this;

		if(t._lastFromSuggestion && t._lastFromSuggestion.value == query)
			place = t._lastFromSuggestion.result.lonlat.lat+","+t._lastFromSuggestion.result.lonlat.lon;

		this.nameFinder.findNear(poi, place, function(results) {
			t._layerMarkers.showResults(results);
			t.map.zoomToExtent(t._layerMarkers.getDataExtent());
			t._makeResultList(null, results, ol.i18n("Found the following places:"), function(result) {
				t.map.setCenter(fm.Util.toMapProjection(result.lonlat, t.map), result.getZoom(t.map));
				$.each(results, function(i, it) { it.marker.fmFeature.popup.hide(); });
				result.marker.fmFeature.popup.show();
			}).appendTo(t.div);
		});
	},

	showSearchResults : function(query) {
		var t = this;
		var handleResults = function(results) {
			var showResult = function(result) {
				t._stateObject = { "query" : query, id : result.id };

				t._layerMarkers.showResults([ result ]);
				t.map.setCenter(fm.Util.toMapProjection(result.lonlat, t.map), result.getZoom(t.map));
			};

			t._makeResultList(null, results, ol.i18n("Did you mean?"), showResult).appendTo(t.div);

			if(results.length > 0)
				showResult(results[0]);
		};

		if(t._lastFromSuggestion && t._lastFromSuggestion.value == query)
			handleResults([ t._lastFromSuggestion.result ]);
		else
			this.nameFinder.find(query, handleResults);
	},

	showGPX : function(url) {
		var t = this;
		t._layerXML.setUrl(url);
		t._stateObject = { "gpx" : url };
	},

	showRoute : function(query1, query2, type, medium) {
		var t = this;

		var handleResults = function(results) {
			t._layerRouting.setType(type);
			t._layerRouting.setMedium(medium);

			if(results[query1].length > 0 && results[query2].length > 0)
			{
				t._layerRouting.setFrom(results[query1][0].lonlat, true);
				t._layerRouting.setTo(results[query2][0].lonlat, true);
			}
			if(results[query1].length == 0 || results[query2].length > 0)
			{
				t._makeResultList(query1, results[query1], ol.i18n("Did you mean?"), function(result) {
					t._layerRouting.setFrom(result.lonlat, true);
				}).appendTo(t.div);
			}
			if(results[query2].length == 0 || results[query1].length > 0)
			{
				t._makeResultList(query2, results[query2], ol.i18n("Did you mean?"), function(result) {
					t._layerRouting.setTo(result.lonlat, true);
				}).appendTo(t.div);
			}
		};

		var query = [ ];
		var result = { };
		if(t._lastFromSuggestion && t._lastFromSuggestion.value == query1)
			result[query1] = [ t._lastFromSuggestion.result ];
		else
			query.push(query1);
		if(t._lastToSuggestion && t._lastToSuggestion.value == query2)
			result[query2] = [ t._lastToSuggestion.result ];
		else
			query.push(query2);

		if(query.length > 0)
		{
			t.nameFinder.findMultiple(query, function(a_results) {
				$.extend(result, a_results);
				handleResults(result);
			});
		}
		else
			handleResults(result);
	},

	_makeResultList : function(query, results, heading, onclick) {
		var div = $('<div class="results"></div>');
		if(!results || results.length == 0)
		{
			var error = $('<p class="error"></p>').appendTo(div);
			if(query)
				error.text(ol.i18n("No results found for %s.").replace(/%s/, query));
			else
				error.text(ol.i18n("No results found."));
		}
		else if(results.length > 1)
		{
			$('<h2></h2>').text(heading).appendTo(div);
			var list = $("<ul></ul>").appendTo(div);
			$.each(results, function(i, it) {
				var li = $("<li></li>").appendTo(list);
				$('<a href="#"></a>').text(it.name).click(function() {
					onclick(it);
					return false;
				}).appendTo(li);
				li.append(" ("+fm.Util.htmlspecialchars(it.info || ol.i18n("unknown"))+")");
			});
		}
		return div;
	},

	getStateObject : function() {
		return this._stateObject;
	},

	setStateObject : function(obj) {
		this.clear();

		$(".from", this.div).val(obj.from || obj.query || "");
		$(".to", this.div).val(obj.to || "");
		$(".medium", this.div).val(obj.medium || null);
		$(".type", this.div).val(obj.type || null);

		if(!!obj.from != $(this.div).hasClass("routing"))
			$(".directions", this.div).click();

		$("form", this.div).submit();
	},

	CLASS_NAME : "FacilMap.Control.Search"
});

})(FacilMap, OpenLayers, FacilMap.$);