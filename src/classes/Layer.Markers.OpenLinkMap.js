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
 * OpenLinkMap from http://olm.openstreetmap.de/.
 *
 * Displays clickable circles over POIs on the map that open popups with information about opening hours,
 * addresses, telephone numbers and websites.
 *
 * POIs are identified by an ID and a type string in OpenLinkMap.
 */
FacilMap.Layer.Markers.OpenLinkMap = OpenLayers.Class(FacilMap.Layer.Markers, {
	api : "http://olm.openstreetmap.de/api",
	apiProjection : new OpenLayers.Projection("EPSG:4326"),
	zoomableInLayerSwitcher : false,
	markerIcon : new OpenLayers.Icon(FacilMap.apiUrl+"/img/circle.png", new OpenLayers.Size(32,32), new OpenLayers.Pixel(-16, -16)),
	markerIconHighlight : new OpenLayers.Icon(FacilMap.apiUrl+"/img/circle_red.png", new OpenLayers.Size(32,32), new OpenLayers.Pixel(-16, -16)),
	minZoomLevel : 13,
	attribution : OpenLayers.i18n("attribution-poi"),

	lastBBOX : null,
	olmMarkers : { },
	lastZoom : null,

	afterAdd : function() {
		var ret = OpenLayers.Layer.Markers.prototype.afterAdd.apply(this, arguments);

		this.map.events.register("moveend", this, this.loadMarkers);
		this.loadMarkers();

		return ret;
	},

	/**
	 * Receives the markers for the current map view and adds them to the map.
	 */
	loadMarkers : function() {
		if(!this.getVisibility() || this.map == null)
			return;

		if(this.map.getZoom() != this.lastZoom)
		{
			this.clearMarkers();
			this.olmMarkers = { };
			this.lastZoom = this.map.getZoom();
		}

		if(this.map.getZoom() < this.minZoomLevel)
			return;

		var extent = this.map.getExtent();
		if(extent == null)
			return;

		var bbox = extent.transform(this.map.getProjectionObject(), this.apiProjection).toBBOX();
		if(bbox == this.lastBBOX)
			return;
		this.lastBBOX = bbox;

		var layer = this;

		OpenLayers.Request.GET({
			url : this.api + "/tiler.php",
			params : {
				"bbox" : bbox,
				"zoom" : this.map.getZoom()
			},
			success : function(request) {
				if(request.responseText)
				{
					var objects = eval('(' + request.responseText + ')');
					if(!objects.features)
						return;

					for(var i=0; i<objects.features.length; i++)
					{
						var o = objects.features[i];
						if(!o || !o.geometry || !o.geometry.coordinates || !o.properties)
							continue;
						layer.addOLMMarker(new OpenLayers.LonLat(1*o.geometry.coordinates[0], 1*o.geometry.coordinates[1]), o.properties.osm_id, o.properties.olm_type);
					}
				}
			},
			failure : function() {
			}
		});
	},

	/**
	 * Is called by the {#loadMarkers} function and adds a single marker to the map.
	 * @param lonlat {OpenLayers.LonLat} The position in EPSG 4326
	 * @param id {String} The ID of the POI
	 * @param type {String} The type of the POI
	 */
	addOLMMarker: function(lonlat, id, type)
	{
		if(this.olmMarkers[type] == undefined)
			this.olmMarkers[type] = { };
		if(this.olmMarkers[type][id] != undefined)
			return;

		var layer = this;

		this.olmMarkers[type][id] = this.createMarker(lonlat, function(callback){ layer.getPopupContent(id, type, callback); }, false, this.markerIcon.clone(), true, this.markerIconHighlight.clone());
	},

	/**
	 * Downloads the information for a specific POI to be displayed in the popup and passes it on to
	 * a callback function.
	 * @param id {String} The ID of the POI to load the information for
	 * @param type {String} The type of the POI to load the information for
	 * @param callback {Function} A function that receives the HTML code with the information as first parameter
	 */
	getPopupContent : function(id, type, callback) {
		var layer = this;
		OpenLayers.Request.GET({
			url : this.api + "/details.php",
			params : {
				type : type,
				id : id
			},
			success : function(request) {
				if(request.responseText)
					callback(layer.replaceI18n(request.responseText));
			}
		});
	},

	/**
	 * When the OLM API sends POI information, internationalised strings are encoded as #key#. This function
	 * replaces such placeholders by their actual translation.
	 * This function is used by the {@link #getPopupContent} function.
	 * @param str {String} The string to replace I18n string in
	 * @return {String} The translated string
	 */
	replaceI18n : function(str) {
		var togo = str;
		var ret = "";

		while(togo.length > 0)
		{
			var pos1 = togo.indexOf('#');
			if(pos1 == -1)
			{
				ret += togo;
				break;
			}

			ret += togo.substr(0, pos1);
			togo = togo.substr(pos1+1);

			var pos2 = togo.indexOf('#');
			if(pos2 == -1)
			{
				ret += '#' + togo;
				break;
			}

			ret += OpenLayers.i18n("olm."+togo.substr(0, pos2));
			togo = togo.substr(pos2+1);
		}

		return ret;
	},

	CLASS_NAME : "FacilMap.Layer.Markers.OpenLinkMap"
});