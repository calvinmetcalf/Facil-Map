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
 * Overlay layer from http://openptmap.org/
 */
fm.Layer.OSM.OpenPTMap = ol.Class(ol.Layer.OSM, {
	maxZoomLevel : 17,
	numZoomLevels : 18,
	alpha : true,
	isBaseLayer : false,
	attribution : ol.String.format(ol.i18n("attribution-osm"), { rendering: "<a href=\"http://openptmap.org/\">openptmap.org</a>" }),

	initialize : function(name, options) {
		ol.Layer.OSM.prototype.initialize.apply(this, [ name, "http://openptmap.org/tiles/${z}/${x}/${y}.png", options ]);
	},

	CLASS_NAME : "FacilMap.Layer.OSM.OpenPTMap"
})

})(FacilMap, OpenLayers, FacilMap.$);