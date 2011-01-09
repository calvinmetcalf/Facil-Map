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
 * An extended version of the OpenStreetBugs layer from http://wiki.openstreetmap.org/wiki/OpenStreetBugs_layer.
 *
 * Makes use of the features and styles of {@link FacilMap.Layer.Markers}.
 *
 * Make sure to load the OpenStreetBugs API from http://api.facilmap.org/osblayer/osblayer.js before adding this
 * layer or use the {@link FacilMap.Layer.Markers.OpenStreetBugs.loadAPI} function.
 */
FacilMap.Layer.Markers.OpenStreetBugs = OpenLayers.Class(FacilMap.Layer.Markers, {
	zoomableInLayerSwitcher : false,

	initialize : function(name, options)
	{
		this.fmParentClasses.push(OpenLayers.Layer.OpenStreetBugs);

		FacilMap.Layer.Markers.prototype.initialize.apply(this, arguments);

		for(var i in OpenLayers.Layer.OpenStreetBugs.prototype)
		{
			if(i != "initialize" && i != "_createMarker" && i != "CLASS_NAME")
				this[i] = OpenLayers.Layer.OpenStreetBugs.prototype[i];
		}

		OpenLayers.Layer.OpenStreetBugs.prototype.initialize.apply(this, arguments);
	},

	_createMarker: function(id, lonlat, comments, closed)
	{
		var marker = FacilMap.Layer.Markers.prototype.createMarker.apply(this, [ lonlat, null, false, closed ? this.iconClosed : this.iconOpen, true ]);
		return marker.fmFeature;
	},

	CLASS_NAME : "FacilMap.Layer.Markers.OpenStreetBugs"
});

/**
 * Loads the OpenStreetBugs API and executes a callback function once it is loaded. When the API is already loaded,
 * the function is called immediately.
 * @param Function callback A function to call as soon as the API is loaded.
 */
FacilMap.Layer.Markers.OpenStreetBugs.loadAPI = function(callback) {
	FacilMap.Util.loadJavaScript("http://api.facilmap.org/osblayer/osblayer.js", function() { return OpenLayers.Layer.OpenStreetBugs != undefined; }, callback);
};