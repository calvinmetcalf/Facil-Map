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
 * Ordnance Survey Street View tiles from http://os.openstreetmap.org/.
*/
FacilMap.Layer.other.OSStreetView = OpenLayers.Class(OpenLayers.Layer.XYZ, {
	attribution : OpenLayers.i18n("attribution-os-streetview"),

	initialize : function(name, options) {
		OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [ name, [ "http://a.os.openstreetmap.org/sv/${z}/${x}/${y}.png", "http://b.os.openstreetmap.org/sv/${z}/${x}/${y}.png", "http://c.os.openstreetmap.org/sv/${z}/${x}/${y}.png" ], options ]);
	}
});