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
 * A markers layer to display the search results of the OpenStreetMap NameFinder.
 * @event lastSearchChange The value of lastSearch has changed.
 * @event searchBegin
 * @event searchSuccess The search results have been displayed
 * @event searchFailure No results have been found or an error occured
*/

FacilMap.Layer.Markers.GeoSearch = OpenLayers.Class(FacilMap.Layer.Markers, {
	lastSearch : false,

	/**
	 * @var FacilMap.NameFinder
	*/
	nameFinder : null,

	/**
	 * The marker icon to use for the first search result.
	 * @var OpenLayers.Icon
	*/
	highlightIcon : new OpenLayers.Icon("http://api.facilmap.org/marker-green.png", new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),

	/**
	 * The icon type for Nominatim search result icons. Either "p" or "n", see http://www.sjjb.co.uk/mapicons/SJJBMapIconsv0.03/recoloured/, p has a transparent background, n a coloured.
	 * @var String
	*/
	iconType : "n",

	/**
	 * The icon size for Nominatim search result icons. 12, 16, 20, 24 or 32. See http://www.sjjb.co.uk/mapicons/SJJBMapIconsv0.03/recoloured/.
	 * @var Number
	*/
	iconSize : 24,

	/**
	 * @param String name
	 * @param FacilMap.NameFinder
	 * @param Object options
	*/
	initialize: function(name, nameFinder, options) {
		FacilMap.Layer.Markers.prototype.initialize.apply(this, [ name, options ]);

		this.nameFinder = nameFinder;

		this.events.addEventType("lastSearchChange");
		this.events.addEventType("searchBegin");
		this.events.addEventType("searchSuccess");
		this.events.addEventType("searchFailure");

		this.events.register("lastSearchChange", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
		this.events.register("markersChanged", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
	},

	/**
	 * Use the NameFinder to search in OpenStreetMap data and add the search results as markers to this layer.
	 * @param String query The search string.
	 * @param boolean dontzoom Don’t zoom to the search result but keep the current view of the map. If this is set, no alert box will indicate that the search returned no results.
	 * @param Array markersvisible Contains a boolean value (or a string representing a boolean) for each search result to indicate if a popup should be opened.
	*/
	geoSearch: function(query, dontzoom, markersvisible)
	{
		var layer = this;

		if(typeof markersvisible == "string")
		{
			var markersvisible_obj = { };
			for(var i=0; i<markersvisible.length; i++)
				markersvisible_obj[i] = markersvisible.charAt(i);
			markersvisible = markersvisible_obj;
		}

		this.clearMarkers();
		this.lastSearch = false;
		this.events.triggerEvent("lastSearchChange");

		if(!query)
			return;

		this.events.triggerEvent("searchBegin");

		this.nameFinder.find(query, function(results){ layer.showResults(results == undefined ? [ ] : results, query, dontzoom, markersvisible); });
	},
	showResults : function(results, query, dontzoom, markersvisible) {
		this.clearMarkers();
		if(results == undefined)
			results = [ ];
		for(var i=results.length-1; i>=0; i--)
		{
			var layer = this;
			var content = document.createElement("div");

			var content_heading = document.createElement("result-heading");
			var content_strong = document.createElement("strong");
			if(results[i].name)
			{
				content_strong.appendChild(document.createTextNode(results[i].name));
				content_heading.appendChild(content_strong);
				content_heading.appendChild(document.createTextNode(" ("+(results[i].info ? results[i].info : OpenLayers.i18n("unknown"))+") "));
			}
			else
			{
				content_strong.appendChild(document.createTextNode((results[i].info ? results[i].info : OpenLayers.i18n("unknown"))+" "));
				content_heading.appendChild(content_strong);
			}

			var content_zoom = document.createElement("a");
			content_zoom.href = "#";
			(function(result){
				content_zoom.onclick = function() {
					layer.map.setCenter(result.lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), layer.map.getProjectionObject()), result.getZoom(layer.map));
					return false;
				};
			})(results[i]);
			content_zoom.appendChild(document.createTextNode(OpenLayers.i18n("[Zoom]")));
			content_heading.appendChild(content_zoom);
			content.appendChild(content_heading);

			content.appendChild(FacilMap.Util.makePermalinks(results[i].lonlat, results[i].getZoom(layer.map), results[i].osm));

			var icon = null;
			if(results[i].icon)
				icon = new OpenLayers.Icon(results[i].icon.replace(/\.p\.20\.png$/, "."+this.iconType+"."+this.iconSize+".png"), new OpenLayers.Size(this.iconSize, this.iconSize), new OpenLayers.Pixel(-this.iconSize/2, -this.iconSize/2));
			else if(i == 0)
				icon = this.highlightIcon.clone();
			results[i].marker = this.createMarker(
				results[i].lonlat,
				content,
				((markersvisible && typeof markersvisible[i] != "undefined" && markersvisible[i] != "0") || ((!markersvisible || typeof markersvisible[i] == "undefined") && i==0)),
				icon,
				dontzoom
			);
		}

		if(!dontzoom)
		{
			if(results.length == 1)
				this.map.setCenter(results[0].lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), results[0].getZoom(this.map));
			else if(results.length > 1)
				this.map.zoomToExtent(this.getDataExtent());
		}

		this.lastSearch = query;
		this.events.triggerEvent("lastSearchChange");

		var eventType = (results.length == 0 ? "searchFailure" : "searchSuccess");
		this.events.triggerEvent(eventType, { object : this, type : eventType, element: null, dontzoom: dontzoom, query: query });
	},
	getQueryObject : function() {
		var obj = {
		};

		if(this.lastSearch)
		{
			obj.search = this.lastSearch;
			var smopen = "";
			var smchanged = false;
			for(var i=0; i < this.markers.length; i++)
			{
				var visible = this.markers[i].fmFeature.popup ? this.markers[i].fmFeature.popup.visible() : false;
				smopen = (visible ? "1" : "0") + smopen; // Reverse order, first marker is last in the list for z-index reasons
				if(visible != (i == this.markers.length-1)) // First marker is open by default
					smchanged = true;
			}
			if(smchanged)
				obj.smopen = smopen;
		}
		return obj;
	},
	setQueryObject : function(obj) {
		// If obj.search is undefined, call nevertheless to reset the search
		this.geoSearch(obj.search, true, obj.smopen);
	},

	CLASS_NAME : "FacilMap.Layer.Markers.GeoSearch"
});