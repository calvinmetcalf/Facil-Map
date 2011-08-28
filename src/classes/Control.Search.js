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

	/**
	 * @param nameFinder {FacilMap.NameFinder}
	 * @param options
	 */
	initialize : function(options) {
		this.nameFinder = new FacilMap.NameFinder.Nominatim();

		this.makeSuggestions = $.proxy(this.makeSuggestions, this);

		ol.Control.prototype.initialize.apply(this, arguments);
	},

	draw : function() {
		var t = this;
		var div = ol.Control.prototype.draw.apply(this, arguments);

		// Disable map dragging inside search bar for proper mouse click handling
		// TODO: Disable double click
		var navigationControl = this.map.getControlsByClass("OpenLayers.Control.Navigation")[0];
		if(navigationControl)
		{
			$(div).mousedown(function(){
				navigationControl.deactivate();
				setTimeout(function(){ navigationControl.activate(); }, 0);
			});
		}

		var inputFrom = $('<input type="text" class="from" />').appendTo(div);
		var helpButton = $('<img src="'+fm.apiUrl+'/img/help.png" alt="?" class="help" />').appendTo(div);
		var inputTo = $('<input type="text" class="to" />').appendTo(div);
		var linkDirections = $('<a href="#" class="directions"></a>').appendTo(div);
		var buttonSearch = $('<input type="submit" value="" class="submit" />').appendTo(div);
		var buttonClear = $('<input type="button" value="'+ol.i18n("Clear")+'" class="clear" />').appendTo(div);
		var selectType = $('<select class="type">' +
			'<option value="'+FacilMap.Routing.Type.FASTEST+'">'+ol.i18n("Fastest")+'</option>' +
			'<option value="'+FacilMap.Routing.Type.SHORTEST+'">'+ol.i18n("Shortest")+'</option>' +
		'</select>').appendTo(div);
		var selectMedium = $('<select class="medium">' +
			'<option value="'+FacilMap.Routing.Medium.CAR+'">'+ol.i18n("Car")+'</option>' +
			'<option value="'+FacilMap.Routing.Medium.BICYCLE+'">'+ol.i18n("Bicycle")+'</option>' +
			'<option value="'+FacilMap.Routing.Medium.FOOT+'">'+ol.i18n("Foot")+'</option>' +
		'</select>').appendTo(div);

		new FacilMap.AutoSuggest(inputFrom[0], this.makeSuggestions);
		new FacilMap.AutoSuggest(inputTo[0], this.makeSuggestions);

		var routingVisible = true;
		linkDirections.click(function(){
			routingVisible = !routingVisible;
			linkDirections.html(ol.i18n(routingVisible ? "Hide directions" : "Get directions"));
			inputTo.add(selectType).add(selectMedium).css("display", routingVisible ? "" : "none");
			buttonSearch.val(ol.i18n(routingVisible ? "Get directions" : "Search"));
			$(div)[routingVisible ? "addClass" : "removeClass"]("routing");
			helpButton.css("display", routingVisible ? "none" : "");
			return false;
		});
		linkDirections.click();

		helpButton.click(function(){ fm.Util.popup(ol.i18n("searchHelpText"), ol.i18n("Search help")); });

		buttonSearch.click(function(){ t.search(inputFrom.val(), routingVisible ? inputTo.val() : null); });
		buttonClear.click(function() { t.search(""); });

		return div;
	},

	makeSuggestions : function(query, callback) {
		var idx = query.toLowerCase().indexOf(" near ");
		var poi = null;
		if(idx >= 0)
		{
			poi = query.substring(0, idx);
			query = query.substring(idx+6);
		}

		this.nameFinder.makeSuggestions(query, function(suggestions) {
			if(poi != null)
			{
				$.each(suggestions, function(i, it){
					it.value = poi+" near "+it.value;
				});
			}
			callback(suggestions);
		});
	},

	search : function(query1, query2) {
		this.clear();

		query1 = (query1 || "").replace(/^\s+/, "").replace(/\s+$/, "");
		query2 = (query2 || "").replace(/^\s+/, "").replace(/\s+$/, "");

		if(query1)
		{
			if(query2)
				this.showRoute(query1, query2);
			else
			{
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

				if(query.match(/^(http|https|ftp):\/\//) && !this.nameFinder.isLonLatQuery(query1))
					this.showGPX(query1);
				else
					this.showSearchResults(query1);
			}
		}
	},

	clear : function() {
		
	},

	showSearchResults : function(query) {
		//this.nameFinder.
	},

	showGPX : function(url) {
		var layer = new FacilMap.Layer.XML(null, url, { removableInLayerSwitcher: true, saveInPermalink : true });
		this.map.addLayer(layer);
		layer.events.register("loadend", layer, function() {
			var extent = this.getDataExtent();
			if(extent)
				this.map.zoomToExtent(extent);
		});
		layer.events.register("allloadend", layer, function() {
			//onSearchEnd();
		});
	},

	showRoute : function(query1, query2) {

	},

	CLASS_NAME : "FacilMap.Control.Search"
});

})(FacilMap, OpenLayers, FacilMap.$);