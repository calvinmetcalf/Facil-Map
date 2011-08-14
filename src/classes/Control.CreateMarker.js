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
 * A click control to add markers to a FacilMap.Layer.Markers.LonLat layer.
 * Add an instance of this to your map using FacilMap.Map.addControl() and activate() it.
*/

FacilMap.Control.CreateMarker = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * @var FacilMap.Layer.Markers.LonLat
	*/
	fmLayer : null,

	title : OpenLayers.i18n("Create a marker"),

	/**
	 * @param fmLayer {FacilMap.Layer.Markers.LonLat}
	*/
	initialize: function(fmLayer, options) {
		this.fmLayer = fmLayer;

		OpenLayers.Control.prototype.initialize.apply(this, [ options ]);
	},

	destroy: function() {
		if (this.handler)
			this.handler.destroy();
		this.handler = null;

		OpenLayers.Control.prototype.destroy.apply(this, arguments);
	},

	draw: function() {
		this.handler = new OpenLayers.Handler.Click(this, {'click': this.click}, { 'single': true, 'double': false, 'pixelTolerance': 0, 'stopSingle': false, 'stopDouble': false });
	},

	/**
	 * Map clicking event handler.
	*/
	click: function(e) {
		if(!this.map) return true;

		var lonlat = this.map.getLonLatFromViewPortPx(e.xy).clone().transform(this.map.getProjectionObject(), this.fmLayer.projection);
		this.fmLayer.addLonLatMarker(lonlat);
	},

	CLASS_NAME: "FacilMap.Control.CreateMarker"
});