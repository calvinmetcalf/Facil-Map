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

/**
 * An abstract class whose implementations connect to a NameFinder.
*/
FacilMap.NameFinder = OpenLayers.Class({
	/**
	 * Perform a search through a NameFinder. This function itself does not connect to an actual NameFinder, it only finds one result if
	 * the query String consists of coordinates encoded in a Lat,Lon string or an OpenStreetMap Permalink.
	 * @param query {String} The query string.
	 * @param callbackFunction {Function} A function that is executed when the search has been performed. The function takes one argument that
	 *                                  contains an array with the results. It is undefined if an error has occurred. Each result is an object
	 *                                  with the following properties:
	 *                                  * OpenLayers.LonLat lonlat The coordinates of the result
	 *                                  * String name: The title of the result.
	 *                                  * String info: Some additional information about the result, such as the type.
	 *                                  * function getZoom(OpenLayers.Map): Returns the zoom level that the search result should be displayed at on the given map.
	 *                                  * Node osm: The associated OSM object or null.
	 * @return {void}
	*/
	find : function(query, callbackFunction) {
		query.replace(/^\s+/, "").replace(/\s+$/, "");
		var query_match;
		var query_urlPart;
		if(query_match = query.match(/^http:\/\/(www\.)?osm\.org\/go\/([-A-Za-z0-9_@]+)/))
		{ // Coordinates, shortlink
			var shortlink = FacilMap.Util.decodeShortLink(query_match[2]);
			results = [ {
				lonlat : shortlink.lonlat,
				info : OpenLayers.i18n("Coordinates"),
				name : shortlink.lonlat.lat + ", " + shortlink.lonlat.lon,
				getZoom : function(map) {
					return shortlink.zoom;
				}
			} ];
			callbackFunction(results);
		}
		else if(query_match = query.match(/^(-?\s*\d+([.,]\d+)?)\s*[,;]?\s*(-?\s*\d+([.,]\d+)?)$/))
		{ // Coordinates
			results = [ {
				lonlat : new OpenLayers.LonLat(query_match[3].replace(",", ".").replace(/\s+/, ""), query_match[1].replace(",", ".").replace(/\s+/, "")),
				info : OpenLayers.i18n("Coordinates"),
				getZoom : function(map) {
					return 15;
				}
			} ];
			results[0].name = results[0].lonlat.lat+","+results[0].lonlat.lon;
			callbackFunction(results);
		}
		else if((query_match = query.match(/^http:\/\/.*\?(.*)$/)) && typeof (query_urlPart = FacilMap.Util.decodeQueryString(query_match[1])).lon != "undefined" && typeof query_urlPart.lat != "undefined")
		{ // OpenStreetMap Permalink
			results = [ {
				lonlat : new OpenLayers.LonLat(query_urlPart.lon, query_urlPart.lat),
				info : OpenLayers.i18n("Coordinates"),
				name : query_urlPart.lat + ", " + query_urlPart.lon,
				getZoom : function(map) {
					if(query_urlPart.zoom == undefined)
						return 15;
					else
						return 1*query_urlPart.zoom;
				}
			} ];
			callbackFunction(results);
		}
		else
			callbackFunction([ ]);
	},

	/**
	 * Returns an array of the position and length of an actual place that is searched for with the given query.
	 * If a name finder for example allows to search for supermarkets in London using the query string
	 * "supermarket, London, UK" then this function would return (13, 9) which is "London, UK" in that string.
	 * This is important for the auto-suggest feature as you only want to get suggestions for actual places, not
	 * for POIs that you search for.
	 * @param query {String}
	 * @return {Array} An array of offset and length of the location part or null if there is no such
	*/
	getLocationPart : function(query) {
		return [ 0, query.length ];
	},

	/**
	 * Initilise an auto-suggest feature on a text input field that will use this NameFinder.
	 *
	 * Creates the following properties on the input node:
	 * - fmAutocompleteTimeout
	 * - fmAutocompleteLoadingValue
	 * - fmAutocompleteLoadedValue
	 * - fmAutocompleteList
	 * - fmAutocompleteResults: The list of results returned by the namefinder
	 * - fmAutocompleteSelected
	 * - fmAutocompletePrevious
	 * @param input {Element} The DOM node of a text input field.
	 * @return {void}
	*/
	initAutoSuggest : function(input) {
		input.setAttribute("autocomplete", "off");

		// Opera fix
		input.style.position = "relative";

		var namefinder = this;

		OpenLayers.Event.observe(input, "keypress", OpenLayers.Function.bindAsEventListener(this._autoSuggestKeyPress, this));

		var clickOpener = OpenLayers.Function.bindAsEventListener(function() { this._openAutoSuggest(input); }, this);

		OpenLayers.Event.observe(input, "focus", OpenLayers.Function.bindAsEventListener(function(e){
			setTimeout(function(){ OpenLayers.Event.observe(input, "click", clickOpener); }, 150);
		}, this));
		OpenLayers.Event.observe(input, "blur", OpenLayers.Function.bindAsEventListener(function(e){
			OpenLayers.Event.stopObserving(input, "click", clickOpener);
		}, this));

		// Wait some time before closing the suggestion list on blur so that clicking the results still works
		OpenLayers.Event.observe(input, "blur", OpenLayers.Function.bindAsEventListener(function(){ setTimeout(function(){ namefinder._closeAutoSuggest(input); }, 150) }, this));
	},

	_autoSuggestKeyPress : function(e) {
		var input = e.target || e.srcElement;
		var namefinder = this;

		var kc_down = 40;
		var kc_up = 38;
		var kc_return = 13;
		var kc_enter = 14;
		var kc_escape = 27;

		if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey)
		{
			if(e.keyCode == kc_down || e.keyCode == kc_up)
			{
				this._openAutoSuggest(input);
				if(input.fmAutocompleteResults == null)
					return true;

				var currentIndex = -1;
				if(input.fmAutocompleteSelected != null)
				{
					this._unselectAutoSuggestItem(input, input.fmAutocompleteSelected);
					currentIndex = input.fmAutocompleteSelected.i;
					input.fmAutocompleteSelected = null;
				}

				if(currentIndex == -1)
					currentIndex = (e.keyCode == kc_up ? input.fmAutocompleteResults.length-1 : 0);
				else
				{
					currentIndex += (e.keyCode == kc_up ? -1 : 1);
					if(currentIndex < 0)
						currentIndex += input.fmAutocompleteResults.length;
					else if(currentIndex >= input.fmAutocompleteResults.length)
						currentIndex -= input.fmAutocompleteResults.length;
				}

				input.fmAutocompleteSelected = input.fmAutocompleteResults[currentIndex];
				this._selectAutoSuggestItem(input, input.fmAutocompleteSelected);

				OpenLayers.Event.stop(e);
				return false;
			}
			else if(e.keyCode == kc_return || e.keyCode == kc_enter)
			{
				if(input.fmAutocompleteSelected)
				{
					input.value = input.fmAutocompleteSelected.name;
					this._closeAutoSuggest(input);
					OpenLayers.Event.stop(e);
					return false;
				}
				else
				{
					if(input.fmAutocompleteTimeout != null)
						clearTimeout(input.fmAutocompleteTimeout);
					if(input.fmAutocompleteList && input.fmAutocompleteList.style.display != "none")
						this._closeAutoSuggest(input);
				}
				return true;
			}
			else if(e.keyCode == kc_escape)
			{
				if(input.fmAutocompleteList && input.fmAutocompleteList.style.display != "none")
				{
					this._closeAutoSuggest(input);
					OpenLayers.Event.stop(e);
					return false;
				}
			}
		}

		if(input.fmAutocompletePrevious == input.value)
			return true;
		input.fmAutocompletePrevious = input.value;

		if(input.fmAutocompleteTimeout != null)
			clearTimeout(input.fmAutocompleteTimeout);
		input.fmAutocompleteTimeout = setTimeout(function(){ namefinder._openAutoSuggest(input); }, 500);
		return true;
	},

	_openAutoSuggest : function(input) {
		input.fmAutocompletePrevious = input.value;

		var offset = this.getLocationPart(input.value);
		var val = (offset == null ? input.value : input.value.substr(offset[0], offset[1]));
		var valOrig = input.value;

		if(input.fmAutocompleteLoadingValue != null && input.fmAutocompleteLoadingValue == val)
		{ // List is already present, only make it visible again
			if(input.fmAutocompleteList != null)
				input.fmAutocompleteList.style.display = "block";
			return;
		}

		if(val == "" || (offset == null || offset[1] < 3))
		{
			this._closeAutoSuggest(input);
			return;
		}

		var namefinder = this;
		input.fmAutocompleteLoadingValue = val;
		if(offset != null) // If null, there is no location part so no search is useful
			this.find(val, function(results){ input.fmAutocompleteLoadedValue = val; namefinder._openAutoSuggestResult(input, results, valOrig); });
	},

	_openAutoSuggestResult : function(input, results, value) {
		// Do not show list if loading has been aborted by _closeAutoSuggest() in the meantime
		if(input.fmAutocompleteLoadingValue == null || results == null)
			return;

		var namefinder = this;

		input.fmAutocompleteResults = results;

		if(input.fmAutocompleteList == null)
		{
			input.fmAutocompleteList = document.createElement("ol");
			input.fmAutocompleteList.className = "fmAutocomplete";
			input.fmAutocompleteList.style.position = "absolute";
			input.fmAutocompleteList.style.top = (input.offsetTop + input.offsetHeight) + "px";
			input.fmAutocompleteList.style.left = input.offsetLeft + "px";
			input.fmAutocompleteList.style.minWidth = input.offsetWidth + "px";
			input.parentNode.appendChild(input.fmAutocompleteList);
		}

		while(input.fmAutocompleteList.firstChild)
			input.fmAutocompleteList.removeChild(input.fmAutocompleteList.firstChild);

		var offset = this.getLocationPart(value);

		var foundSelection = false;
		for(var i=0; i<results.length; i++) (function(i)
		{
			var li = document.createElement("li");
			var name = document.createElement("strong");
			name.appendChild(document.createTextNode(results[i].name));
			results[i].name = value.substr(0, offset[0]) + results[i].name + value.substr(offset[0]+offset[1]);
			li.appendChild(name);
			li.appendChild(document.createTextNode(" (" + results[i].info + ")"));
			input.fmAutocompleteList.appendChild(li);
			results[i].li = li;
			results[i].i = i;
			if(!foundSelection && input.fmAutocompleteSelected != null && input.fmAutocompleteSelected.lonlat == results[i].lonlat && input.fmAutocompleteSelected.name == results[i].name && input.fmAutocompleteSelected.info == results[i].info)
			{
				namefinder._selectAutoSuggestItem(input, results[i]);
				input.fmAutocompleteSelected = results[i];
				foundSelection = true;
			}
			li.onmousemove = function() {
				if(input.fmAutocompleteSelected != null)
					namefinder._unselectAutoSuggestItem(input, input.fmAutocompleteSelected);
				input.fmAutocompleteSelected = results[i];
				namefinder._selectAutoSuggestItem(input, results[i]);
			};
			li.onclick = function() {
				input.value = results[i].name;
				namefinder._closeAutoSuggest(input);
			};
		})(i);

		if(!foundSelection)
			input.fmAutocompleteSelected = null;

		input.fmAutocompleteList.style.display = "block";
	},

	_closeAutoSuggest : function(input) {
		if(input.fmAutocompleteTimeout != null)
			clearTimeout(input.fmAutocompleteTimeout);

		// Prevent showing the list if find() is currently waiting for a response
		input.fmAutocompleteLoadingValue = null;

		if(input.fmAutocompleteList != null)
			input.fmAutocompleteList.style.display = "none";
		if(input.fmAutocompleteSelected != null)
		{
			this._unselectAutoSuggestItem(input, input.fmAutocompleteSelected);
			input.fmAutocompleteSelected = null;
		}
	},

	_selectAutoSuggestItem : function(input, item)
	{
		item.li.className = "selected";

		// Scroll to item
		var list = input.fmAutocompleteList;
		if(list == null || list.scrollTop == undefined)
			return;

		var itemTop = item.li.offsetTop;
		var itemBottom = itemTop + item.li.offsetHeight;

		if(itemTop < list.scrollTop) // Need to scroll up
			list.scrollTop = itemTop;
		else if(itemBottom > list.scrollTop + list.offsetHeight) // Need to scroll down
			list.scrollTop = itemBottom - list.offsetHeight;
	},

	_unselectAutoSuggestItem : function(input, item)
	{
		item.li.className = "";
	},

	CLASS_NAME : "FacilMap.NameFinder"
});