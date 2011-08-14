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
 * Like {@link OpenLayers.Control.ScaleLine}, but is displayed on the right side
 * of the map.
*/
FacilMap.Control.ScaleLine = OpenLayers.Class(OpenLayers.Control.ScaleLine, {
	CLASS_NAME : "FacilMap.Control.ScaleLine"
});

FacilMap.Util.addCSSRule(".olMap .fmControlScaleLine", "left:auto; bottom:50px; right:5px;");
FacilMap.Util.addCSSRule(".olMap .fmControlScaleLine .olControlScaleLineTop", "margin-left:auto;");
FacilMap.Util.addCSSRule(".olMap .fmControlScaleLine .olControlScaleLineBottom", "margin-left:auto;");