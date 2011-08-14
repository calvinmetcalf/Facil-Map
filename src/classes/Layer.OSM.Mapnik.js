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
 * Mapnik rendering from openstreetmap.org.
*/
FacilMap.Layer.OSM.Mapnik = OpenLayers.Class(OpenLayers.Layer.OSM, {
	numZoomLevels: 19,
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [
			name,
			[ "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png" ],
			options
		]);
	},
	CLASS_NAME : "FacilMap.Layer.OSM.Mapnik"
});