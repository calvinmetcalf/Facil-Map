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

// Save parent classes in class objects, needed for FacilMap.Util.makeClassName()
FacilMap.olBackup.Class = OpenLayers.Class;
OpenLayers.Class = function() {
	var ret = FacilMap.olBackup.Class.apply(this, arguments);
	ret.prototype.fmParentClasses = arguments;
	return ret;
};
OpenLayers.Class.isPrototype = FacilMap.olBackup.Class.isPrototype;