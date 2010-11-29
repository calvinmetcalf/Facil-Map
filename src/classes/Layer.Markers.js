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
 * A Markers layer with a function to easily add a marker with a popup.
 * When the layer is hidden, the popups are hidden as well. They open again when the layer is made visible again.
 * @event markersChanged A marker popup has been opened or closed.
*/

FacilMap.Layer.Markers = OpenLayers.Class(OpenLayers.Layer.Markers, {
	defaultIcon : new OpenLayers.Icon('http://api.facilmap.org/marker.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),
	openPopupsOnShow : null,
	initialize : function(name, options) {
		this.openPopupsOnShow = [ ];

		OpenLayers.Layer.Markers.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({zoomableInLayerSwitcher: true, projection: new OpenLayers.Projection("EPSG:4326")}, options) ]);
		this.events.addEventType("markersChanged");

		this.events.register("visibilitychanged", this, function() {
			if(this.getVisibility())
			{ // Layer has been made visible: re-open popups that were hidden during the last hiding
				for(var i=0; i<this.openPopupsOnShow.length; i++)
					this.openPopupsOnShow[i].fmFeature.popup.show();
				this.openPopupsOnShow = [ ];
			}
			else
			{ // Hide all popups and save the visible ones
				for(var i=0; i<this.markers.length; i++)
				{
					if(this.markers[i].fmFeature.popup.visible())
					{
						this.openPopupsOnShow.push(this.markers[i]);
						this.markers[i].fmFeature.popup.hide();
					}
				}
			}
		});
	},
	/**
	 * Creates a marker with a popup (OpenLayers.Popup.FramedCloud) on this layer. The visibility of the popup can be toggled by clicking
	 * on the marker.
	 * @param OpenLayers.LonLat lonlat The position of the marker.
	 * @param String|DOMElement popupContent The HTML content of the popup.
	 * @param boolean popupVisible Should the popup be visible initially?
	 * @param OpenLayers.Icon Use this icon instead of the default icon.
	 * @param boolean noPan Don’t move the map view to the marker.
	 * @return The newly created OpenLayers.Marker object. It contains the additional property fmFeature, which is the OpenLayers.Feature
	 * that connects the marker with the popup. The marker triggers the events “open” or “close” when changing the visibility of the popup.
	*/
	createMarker : function(lonlat, popupContent, popupVisible, icon, noPan) {
		var feature = new OpenLayers.Feature(this, lonlat.clone().transform(this.projection, this.map.getProjectionObject()));
		feature.data.icon = icon ? icon : this.defaultIcon.clone();
		if(popupContent)
		{
			feature.popupClass = FacilMap.Popup.FramedCloud;
			feature.data.popupContentHTML = popupContent;
		}
		var marker = feature.createMarker();
		marker.events.addEventType("close");
		marker.events.addEventType("open");
		if(popupContent)
		{
			feature.createPopup(true);
			feature.popup.panMapIfOutOfView = !noPan;
			this.map.addPopup(feature.popup);
			feature.popup.events.register("close", feature, function(e)
			{
				this.popup.hide();
				OpenLayers.Event.stop(e);
				layer.events.triggerEvent("markersChanged");
				this.marker.events.triggerEvent("close");
			});

			if(popupVisible)
			{
				feature.popup.show();
				feature.popup.updateSize();
			}
			else
				feature.popup.hide();

			var layer = this;
			marker.events.register("click", feature, function(e) {
				this.popup.toggle();
				if(this.popup.visible())
					this.popup.updateSize();
				OpenLayers.Event.stop(e);
				this.marker.events.triggerEvent(this.popup.visible() ? "open" : "close");
				layer.events.triggerEvent("markersChanged");
			});
			marker.events.register("mouseover", feature.popup, function(){this.unsetOpacity()}); // FIXME: Fade opacity
			marker.events.register("mouseout", feature.popup, function(){this.setOpacity()});
		}
		marker.fmFeature = feature;
		this.addMarker(marker);
		return marker;
	},
	removeMarker : function(marker)
	{
		if(marker.fmFeature && marker.fmFeature.popup)
			marker.fmFeature.popup.destroy();
		OpenLayers.Layer.Markers.prototype.removeMarker.apply(this, arguments);
	},
	CLASS_NAME : "FacilMap.Layer.Markers"
});