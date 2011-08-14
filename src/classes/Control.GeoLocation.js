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
 * Adds a “Go home” link to the map in browsers that support geolocation. The link requests the current position of the user and zooms
 * the map there.
*/

FacilMap.Control.GeoLocation = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * The zoom level to use when zooming to the user’s location.
	 * @var Number
	*/
	zoomLevel : 15,

	element : null,

	draw : function() {
		var ret = OpenLayers.Control.prototype.draw.apply(this, arguments);

		if(!navigator.geolocation)
			return ret;

		var control = this;

		if(!this.element)
		{
			this.element = document.createElement("a");
			this.element.appendChild(document.createTextNode("Go home"));
			this.element.href = "#";
			OpenLayers.Event.observe(this.element, "click",
				OpenLayers.Function.bindAsEventListener(function(e) {
					this.goToGeoLocation();
					OpenLayers.Event.stop(e);
				}, this)
			);
			this.div.appendChild(this.element);
		}

		return ret;
	},

	/**
	 * Requests the geolocation from the browser if it is supported and zooms there.
	 * @return {void}
	*/
	goToGeoLocation : function() {
		if(!this.map || !navigator.geolocation) return;
		var map = this.map;
		var zoomLevel = this.zoomLevel;
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), zoomLevel);
		});
	},

	CLASS_NAME : "FacilMap.Control.GeoLocation"
});