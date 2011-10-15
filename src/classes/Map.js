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

(function(fm, ol, $){

/**
 * A map with the default values needed for OpenStreetMap and other world maps.
 * If you plan to use the getQueryMethod() function, remember to set the visibility of your overlay layers _before_ adding them to the map.
 * @event mapResize The map div has been resized.
 * @event newState The return value of getStateObject() probably has changed.
*/

fm.Map = ol.Class(ol.Map, {
	/**
	 * The projection to use in coordinates in the Permalink.
	 * @var OpenLayers.Projection
	*/
	permalinkProjection : new ol.Projection("EPSG:4326"),

	attributionIcon : new ol.Icon(fm.apiUrl+"/img/logo_beta.png", new ol.Size(170, 129), new ol.Pixel(-25, -108)),

	initialize : function(div, options)
	{
		ol.Map.prototype.initialize.apply(this, [ div, ol.Util.extend({
			controls: [
				new ol.Control.Navigation(),
				new ol.Control.PanZoomBar(),
				new fm.Control.LayerSwitcher(),
				new fm.Control.Attribution(),
				new fm.Control.KeyboardDefaults(),
				new ol.Control.MousePosition(),
				new fm.Control.ScaleLine(),
				new fm.Control.GeoLocation()
			],
			//maxExtent: new ol.Bounds(-180, -85, 180, 85), // FIXME: 4326 as projection does not seem to work
			maxExtent: new ol.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new ol.Projection("EPSG:900913"),
			displayProjection: new ol.Projection("EPSG:4326")
		}, options) ]);

		this.events.addEventType("mapResize");
		this.events.addEventType("newState");

		this.events.register("move", this, function(){ this.events.triggerEvent("newState"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newState"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newState"); });

		if(this.attributionIcon != null)
		{
			var div = this.attributionIcon.draw(new ol.Pixel(0, 0));
			div.style.zIndex = 10000;
			this.div.appendChild(div);
			var drawFunc = function() {
				var left = 0;
				if(ol.Layer.Google.cache[this.id] && ol.Layer.Google.cache[this.id].poweredBy && ol.Layer.Google.cache[this.id].poweredBy.style.display != "none")
					left = 55;
				this.attributionIcon.moveTo(new ol.Pixel(left, this.getSize().h));
			};
			this.events.register("mapResize", this, drawFunc);
			this.events.register("changebaselayer", this, drawFunc);
			drawFunc.apply(this);
		}

		$(this.div).addClass(fm.Util.makeClassName(this));

		this.uniqueId = $(this.div).attr("id");
		if(!this.uniqueId)
		{
			if(fm.idCounter == null)
				fm.idCounter = 0;
			this.uniqueId = "fm"+(fm.idCounter++);
		}

		// Add loading control with support in OpenLayers.Request
		var loadingControl = new fm.Control.Loading();
		this.addControl(loadingControl);
		var issueBkp = ol.Request.issue;
		ol.Request.issue = function(config) {
			var args = $.makeArray(arguments);

			var callbackBkp = args[0].callback;
			args[0].callback = function() {
				loadingControl.loadEnd();
				if(callbackBkp)
					return callbackBkp.apply(this, arguments);
			};

			loadingControl.loadStart();

			return issueBkp.apply(this, args);
		};
	},

	updateSize : function()
	{
		var ret = ol.Map.prototype.updateSize.apply(this, arguments);
		this.events.triggerEvent("mapResize");
		return ret;
	},

	addLayer : function(layer)
	{
		var ret = ol.Map.prototype.addLayer.apply(this, arguments);

		if(typeof layer.fmDefaultVisibility == "undefined")
			layer.fmDefaultVisibility = layer.getVisibility();

		layer.events.addEventType("stateObjectChanged");

		if(layer.permalinkName)
			layer.events.register("stateObjectChanged", this, function() { this.events.triggerEvent("newState"); });

		layer.div.className = fm.Util.makeClassName(layer) + " " + layer.div.className;

		if(layer.permalinkName && layer.removableInLayerSwitcher)
			this.events.triggerEvent("newState");
	},

	removeLayer : function(layer)
	{
		var trigger = (layer.permalinkName && layer.removableInLayerSwitcher);
		var ret = ol.Map.prototype.removeLayer.apply(this, arguments);
		if(trigger)
			this.events.triggerEvent("newState");
		return ret;
	},

	addAllAvailableOSMLayers : function()
	{
		var map = this;

		this.addLayer(new fm.Layer.OSM.Mapnik(ol.i18n("Mapnik"), { permalinkName : "Mpnk" }));
		//this.addLayer(new fm.Layer.OSM.MapSurfer.Road(ol.i18n("MapSurfer Road"), { permalinkName : "MSfR" }));
		//this.addLayer(new fm.Layer.OSM.MapSurfer.Topographic(ol.i18n("MapSurfer Topographic"), { permalinkName : "MSfT" }));
		//this.addLayer(new fm.Layer.OSM.OpenStreetBrowser(ol.i18n("OpenStreetBrowser"), { permalinkName : "OSBr" }));
		this.addLayer(new fm.Layer.OSM.Osmarender(ol.i18n("Osmarender"), { permalinkName : "Osmr" }));
		this.addLayer(new fm.Layer.OSM.CycleMap(ol.i18n("OpenCycleMap"), { permalinkName : "OCyc" }));
		//this.addLayer(new fm.Layer.OSM.Wanderkarte(ol.i18n("Reit- und Wanderkarte"), { permalinkName : "OSMC" }));
		this.addLayer(new fm.Layer.OSM.HikeAndBike(ol.i18n("Hike & Bike Map"), { permalinkName : "HiBi" }));
		this.addLayer(new fm.Layer.OSM.OpenPisteMap(ol.i18n("OpenPisteMap"), { permalinkName : "OPis" }));
		//this.addLayer(new fm.Layer.OSM.OPNVKarte(ol.i18n("ÖPNV-Karte"), { permalinkName : "OPNV" }));
		//this.addLayer(new fm.Layer.OSM.Kybl3DMap(ol.i18n("Izometrická 3D mapa ČR"), { permalinkName : "kybl" }));

		this.addLayer(new fm.Layer.OSM.OpenPTMap(ol.i18n("Public transportation"), { permalinkName : "OPTM", visibility : false }));
		this.addLayer(new fm.Layer.OSM.OOMStreets(ol.i18n("Streets overlay"), { permalinkName : "OOMS", visibility : false }));
		this.addLayer(new fm.Layer.OSM.OOMLabels(ol.i18n("Labels overlay"), { permalinkName : "OOML", visibility : false }));
		this.addLayer(new fm.Layer.OSM.Hiking(ol.i18n("Hiking symbols"), { visibility: false, permalinkName : "Hike" }));
		this.addLayer(new fm.Layer.Markers.OpenLinkMap(ol.i18n("POI"), { permalinkName: "OLiM" }));

		fm.Layer.Markers.OpenStreetBugs.loadAPI(function() {
			map.addLayer(new fm.Layer.Markers.OpenStreetBugs(ol.i18n("OpenStreetBugs"), { visibility: false, permalinkName: "OSBu" }));
		});
	},

	addAllAvailableGoogleLayers : function()
	{
		var map = this;
		fm.Layer.Google.loadAPI(function() {
			map.addLayer(new fm.Layer.Google.Maps(ol.i18n("Google Streets"), { permalinkName : "GgSt" }));
			map.addLayer(new fm.Layer.Google.MapsSatellite(ol.i18n("Google Satellite"), { permalinkName : "GgSa" }));
			map.addLayer(new fm.Layer.Google.MapsHybrid(ol.i18n("Google Hybrid"), { permalinkName : "GgHy" }));
			map.addLayer(new fm.Layer.Google.MapsTerrain(ol.i18n("Google Terrain"), { permalinkName : "GgTe" }));
			map.addLayer(new fm.Layer.Google.MapMaker(ol.i18n("Google MapMaker"), { permalinkName : "GgMM" }));
			map.addLayer(new fm.Layer.Google.MapMakerHybrid(ol.i18n("Google MapMaker Hybrid"), { permalinkName : "GgMH" }));
		});
	},

	addAllAvailableYahooLayers : function()
	{
		var map = this;
		fm.Layer.Yahoo.loadAPI(function() {
			map.addLayer(new fm.Layer.Yahoo.Maps(ol.i18n("Yahoo Street"), { permalinkName : "YaSt" }));
			map.addLayer(new fm.Layer.Yahoo.Satellite(ol.i18n("Yahoo Satellite"), { permalinkName : "YaSa" }));
			map.addLayer(new fm.Layer.Yahoo.Hybrid(ol.i18n("Yahoo Hybrid"), { permalinkName : "YaHy" }));
		});
	},

	/**
	 * Adds all available layers from this library to your map.
	*/
	addAllAvailableLayers : function()
	{
		this.addLayer(new fm.Layer.other.Relief(ol.i18n("Relief"), { visibility: false, permalinkName : "Rlie" }));

		this.addAllAvailableOSMLayers();
		//this.addLayer(new fm.Layer.other.OSStreetView(ol.i18n("Ordnance Survey (UK)"), { permalinkName : "OSSV" }));

		this.addAllAvailableGoogleLayers();
		this.addAllAvailableYahooLayers();
	},

	/**
	 * Zoom to the specified query object. Remember to add your layers and to eventually set OpenLayers.ProxyHost before running
	 * this method.
	 * @param query {Object} Usually FacilMap.Util.decodeQueryString(location.hash.replace(/^#/, ""))
	*/

	setStateObject: function(query)
	{
		var map = this;

		query = (query || { });

		// Zoom to search results only if the position is not manually set
		var search_may_zoom = (typeof query.lon == "undefined" && typeof query.lat == "undefined");

		query = $.extend(this.getDefaultStateObject(), query);

		// Set base layer (layer)
		if(query.layer)
		{
			var matching_layers = this.getLayersBy("permalinkName", query.layer);
			if(matching_layers.length == 0)
				matching_layers = this.getLayersBy("name", query.layer);
			if(matching_layers.length > 0)
				this.setBaseLayer(matching_layers[0]);
		}

		if(this.baseLayer == null)
		{ // Activate first base layer
			for(var i=0; i<this.layers.length; i++)
			{
				if(this.layers[i].isBaseLayer)
				{
					this.setBaseLayer(this.layers[i]);
					break;
				}
			}
		}

		// Set position (lon, lat, zoom)
		this.setCenter(new ol.LonLat(1*query.lon, 1*query.lat).transform(this.permalinkProjection, this.getProjectionObject()), 1*query.zoom);

		// Initialise removable layers
		var removableLayers = { };
		if(typeof query.r == "object")
		{
			var redrawLayerSwitcher = false;
			for(var i in query.r)
			{
				if(query.r[i]["class"] == undefined || query.r[i].name == undefined)
					continue;

				removableLayers[i] = true;

				var existingLayers = this.getLayersBy("permalinkName", i);
				var alreadyExists = false;
				for(var j=0; j<existingLayers.length; j++)
				{
					if(existingLayers[j].CLASS_NAME == query.r[i]["class"])
					{
						if(existingLayers[j].name != query.r[i].name)
						{
							existingLayers[j].name = query.r[i].name;
							redrawLayerSwitcher = true;
						}
						alreadyExists = true;
					}
					else
						this.removeLayer(existingLayers[j]);
				}

				if(alreadyExists)
					continue;

				var classNameParts = query.r[i]["class"].split(/\./);
				var layerClass = window;
				for(var j=0; j<classNameParts.length; j++)
				{
					layerClass = layerClass[classNameParts[j]];
					if(!layerClass)
						break;
				}
				if(!layerClass)
					continue;

				var layer = new layerClass(query.r[i].name);
				layer.permalinkName = i;
				layer.removableInLayerSwitcher = true;
				this.addLayer(layer);
				redrawLayerSwitcher = true;
			}

			if(redrawLayerSwitcher)
			{ // Update the removableInLayerSwitcher links
				for(var i=0; i<this.controls.length; i++)
				{
					if(this.controls[i] instanceof fm.Control.LayerSwitcher)
						this.controls[i].redraw(true);
				}
			}
		}
		// Remove removable layers that are not in the request
		var removeLayers = [ ];
		for(var i=0; i<this.layers.length; i++)
		{
			if(this.layers[i].removableInLayerSwitcher && !removableLayers[this.layers[i].permalinkName])
				removeLayers.push(this.layers[i]);
		}
		for(var i=0; i<removeLayers.length; i++)
			this.removeLayer(removeLayers[i]);

		// Set layer properties
		$.each(this.layers, function(i,it) {
			var obj = { };
			if(query.l && query.l[it.permalinkName])
				obj = query.l[it.permalinkName];

			if(obj.visibility != null)
				it.setVisibility(obj.visibility);

			if(it.setStateObject)
				it.setStateObject(obj);
		});

		// Set control properties
		$.each(this.controls, function(i,it) {
			if(it.setStateObject && query.c && query.c[it.permalinkName])
				it.setStateObject(query.c[it.permalinkName]);
		});

		// Adding markers might have moved the map, reset map view
		this.setCenter(new ol.LonLat(1*query.lon, 1*query.lat).transform(this.permalinkProjection, this.getProjectionObject()), 1*query.zoom);
	},

	/**
	 * Returns the state object for the map default view.
	 * @return {Object}
	 */
	getDefaultStateObject : function() {
		var maxExtent = this.getMaxExtent();
		var lonlat = maxExtent.getCenterLonLat();

		return {
			lon : Math.round(lonlat.lon*100000000)/100000000,
			lat : Math.round(lonlat.lat*100000000)/100000000,
			zoom : this.getZoomForExtent(maxExtent),
			layer : this.baseLayer.permalinkName || this.baseLayer.name
		};
	},

	/**
	 * Returns a Query object that you can pass to the setStateObject() function to restore the current view. Usually you save this to the location
	 * hash part by calling location.hash = "#"+FacilMap.Util.encodeQueryString(map.getStateObject());
	 * Only non-default settings will be added to this query object. Remember to set the visibility of your overlay layers _before_ adding
	 * them to the map, as the default visibility value will be determined during adding it.
	 * @return {Object}
	*/

	getStateObject: function()
	{
		if(!this.getCenter())
			return null;

		var lonlat = this.getCenter().clone().transform(this.getProjectionObject(), this.permalinkProjection);
		var hashObject = {
			lon : Math.round(lonlat.lon*100000000)/100000000,
			lat : Math.round(lonlat.lat*100000000)/100000000,
			zoom : this.getZoom(),
			layer : this.baseLayer.permalinkName || this.baseLayer.name,
			l : { },
			r : { },
			c : { }
		};

		$.each(this.layers, function(i,it) {
			hashObject.l[it.permalinkName] = { };
			if(it.permalinkName && it.getStateObject)
				$.extend(hashObject.l[it.permalinkName], it.getStateObject());
			if(!it.isBaseLayer && it.getVisibility() != it.fmDefaultVisibility)
				hashObject.l[it.permalinkName].visibility = it.getVisibility();

			if(it.removableInLayerSwitcher && it.permalinkName)
			{
				hashObject.r[l.permalinkName] = {
					"class" : l.CLASS_NAME,
					name : l.name
				};
			}
		});

		$.each(this.controls, function(i,it) {
			if(it.permalinkName && it.getStateObject)
				hashObject.c[it.permalinkName] = it.getStateObject();
		});

		return hashObject;
	},

	CLASS_NAME : "FacilMap.Map"
});

})(FacilMap, OpenLayers, FacilMap.$);
