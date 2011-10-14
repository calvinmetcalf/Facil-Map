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
 * A Markers layer for adding LonLat markers. These markers display their coordinates and list various Permalinks to other map services.
 * See FacilMap.Control.createMarker for the functionality of creating a marker when clicking.
 * @event markerAdded
 * @event markerRemoved
*/

FacilMap.Layer.Markers.LonLat = OpenLayers.Class(FacilMap.Layer.Markers, {
	/**
	 * The projection in which coordinates should be displayed in the popups.
	*/
	readableProjection : new OpenLayers.Projection("EPSG:4326"),

	/**
	 * @param defaultIcon {OpenLayers.Icon} The icon to be used for the markers added by addLonLatMarker()
	*/
	initialize : function(name, options) {
		FacilMap.Layer.Markers.prototype.initialize.apply(this, arguments);
		this.events.addEventType("markerAdded");
		this.events.addEventType("markerRemoved");

		this.events.register("markerAdded", this, function(){ this.events.triggerEvent("stateObjectChanged"); });
		this.events.register("markerRemoved", this, function(){ this.events.triggerEvent("stateObjectChanged"); });
	},
	addLonLatMarker : function(lonlat, title, icon)
	{
		var layer = this;

		var marker = this.createMarker(lonlat, ".", true);
		if(title)
			marker.fmTitle = title;
		marker.events.register("close", this, function(evt) { var feature = marker.fmFeature; delete marker.fmFeature; this.removeMarker(marker); feature.destroyMarker(); feature.destroyPopup(); this.events.triggerEvent("markerRemoved"); OpenLayers.Event.stop(evt); });
		this.map.events.register("zoomend", this, this.resetPopupContent);
		this.resetPopupContent();
		this.events.triggerEvent("markerAdded");
	},

	/**
	 * Is executed automatically on a zoom level change, recreates the Permalinks of the markers.
	*/
	resetPopupContent : function()
	{
		for(var i=0; i<this.markers.length; i++)
		{
			var content = document.createElement("div");
			if(this.markers[i].fmTitle)
			{
				var heading = document.createElement("h6");
				heading.className = "marker-heading";
				heading.appendChild(document.createTextNode(this.markers[i].fmTitle));
				content.appendChild(heading);
			}
			content.appendChild(FacilMap.Util.makePermalinks(this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.readableProjection), this.map.getZoom()));
			this.markers[i].fmFeature.popup.setContentHTML(content);
		}
	},
	getStateObject : function() {
		var obj = { };
		for(var i=0; i<this.markers.length; i++)
		{
			var lonlat = this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.readableProjection);
			obj[i] = {
				lon : Math.round(lonlat.lon*100000000)/100000000,
				lat : Math.round(lonlat.lat*100000000)/100000000
			};
			if(this.markers[i].fmTitle)
				obj[i].title = this.markers[i].fmTitle;
		}
		return obj;
	},
	setStateObject : function(obj) {
		this.clearMarkers();
		for(var i in obj)
		{
			if(obj[i].lon == undefined || obj[i].lat == undefined)
				continue;
			this.addLonLatMarker(new OpenLayers.LonLat(1*obj[i].lon, 1*obj[i].lat), (obj[i].title != undefined) ? FacilMap.Util.htmlspecialchars(obj[i].title) : null);
		}
	},

	CLASS_NAME : "FacilMap.Layer.Markers.LonLat"
});