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

/**
 * A markers layer to display the search results of the OpenStreetMap NameFinder.
 * @event lastSearchChange The value of lastSearch has changed.
 * @event searchBegin
 * @event searchSuccess The search results have been displayed
 * @event searchFailure No results have been found or an error occured
*/

fm.Layer.Markers.SearchResults = ol.Class(fm.Layer.Markers, {
	lastSearch : false,

	/**
	 * @var FacilMap.NameFinder
	*/
	nameFinder : null,

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
	 * @param name {String}
	 * @param options {Object}
	*/
	initialize: function(name, options) {
		fm.Layer.Markers.prototype.initialize.apply(this, arguments);
	},

	showResults : function(results) {
		var t = this;

		this.clearMarkers();
		results = (results || [ ]).reverse();
		$.each(results, function(i, it) {
			var content = $("<div></div>");

			var heading = $("<h2></h2>").appendTo(content);
			if(it.name)
				heading.append("<strong>"+fm.Util.htmlspecialchars(it.name)+"</strong> ("+fm.Util.htmlspecialchars(it.info)+")");
			else
				heading.append("<strong>"+fm.Util.htmlspecialchars(it.info || ol.i18n("unknown"))+"</strong>");

			$('<a href="#"></a>').text(ol.i18n("[Zoom]")).appendTo(content).click(function(){
				t.map.setCenter(it.lonlat.clone().transform(new ol.Projection("EPSG:4326"), t.map.getProjectionObject()), it.getZoom(t.map));
				return false;
			});

			content.append(fm.Util.makePermalinks(it.lonlat, it.getZoom(t.map), it.osm));

			var icon = null;
			if(it.icon && t.iconType)
				icon = new ol.Icon(it.icon.replace(/\.p\.20\.png$/, "."+t.iconType+"."+t.iconSize+".png"), new ol.Size(t.iconSize, t.iconSize), new ol.Pixel(-t.iconSize/2, -t.iconSize/2));
			it.marker = t.createMarker(
				it.lonlat,
				content[0],
				false,
				icon
			);
		});
	},

	CLASS_NAME : "FacilMap.Layer.Markers.SearchResults"
});

})(FacilMap, OpenLayers, FacilMap.$);