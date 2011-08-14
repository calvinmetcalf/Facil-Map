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
 * @event newHash The return value of getQueryObject() probably has changed.
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
				new fm.Control.ScaleLine() ],
			//maxExtent: new ol.Bounds(-180, -85, 180, 85), // FIXME: 4326 as projection does not seem to work
			maxExtent: new ol.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new ol.Projection("EPSG:900913"),
			displayProjection: new ol.Projection("EPSG:4326")
		}, options) ]);

		this.events.addEventType("mapResize");
		this.events.addEventType("newHash");

		this.events.register("move", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newHash"); });

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

		if(typeof layer.shortName == "undefined")
			layer.shortName = layer.name;

		if(typeof layer.fmDefaultVisibility == "undefined")
			layer.fmDefaultVisibility = layer.getVisibility();

		layer.events.addEventType("queryObjectChanged");

		if(layer.saveInPermalink)
			layer.events.register("queryObjectChanged", this, function() { this.events.triggerEvent("newHash"); });

		layer.getQueryObjectFixed = function() {
			var ret = (this.getQueryObject == undefined || !this.saveInPermalink ? { } : this.getQueryObject());
			if(!this.isBaseLayer && this.getVisibility() != this.fmDefaultVisibility)
				ret.visibility = this.getVisibility();
			return ret;
		};

		layer.setQueryObjectFixed = function(obj) {
			if(!this.isBaseLayer)
				this.setVisibility(typeof obj.visibility == "undefined" ? this.fmDefaultVisibility : (obj.visibility != "0"));
			if(this.setQueryObject != undefined)
				this.setQueryObject(obj);
		};

		layer.div.className = fm.Util.makeClassName(layer) + " " + layer.div.className;

		if(layer.saveInPermalink && layer.removableInLayerSwitcher)
			this.events.triggerEvent("newHash");
	},

	removeLayer : function(layer)
	{
		var trigger = (layer.saveInPermalink && layer.removableInLayerSwitcher);
		var ret = ol.Map.prototype.removeLayer.apply(this, arguments);
		if(trigger)
			this.events.triggerEvent("newHash");
		return ret;
	},

	addAllAvailableOSMLayers : function()
	{
		var map = this;

		this.addLayer(new fm.Layer.OSM.Mapnik(ol.i18n("Mapnik"), { shortName : "Mpnk" }));
		this.addLayer(new fm.Layer.OSM.MapSurfer.Road(ol.i18n("MapSurfer Road"), { shortName : "MSfR" }));
		this.addLayer(new fm.Layer.OSM.MapSurfer.Topographic(ol.i18n("MapSurfer Topographic"), { shortName : "MSfT" }));
		this.addLayer(new fm.Layer.OSM.OpenStreetBrowser(ol.i18n("OpenStreetBrowser"), { shortName : "OSBr" }));
		this.addLayer(new fm.Layer.OSM.Osmarender(ol.i18n("Osmarender"), { shortName : "Osmr" }));
		this.addLayer(new fm.Layer.OSM.CycleMap(ol.i18n("OpenCycleMap"), { shortName : "OCyc" }));
		//this.addLayer(new fm.Layer.OSM.Wanderkarte(ol.i18n("Reit- und Wanderkarte"), { shortName : "OSMC" }));
		this.addLayer(new fm.Layer.OSM.HikeAndBike(ol.i18n("Hike & Bike Map"), { shortName : "HiBi" }));
		this.addLayer(new fm.Layer.OSM.OpenPisteMap(ol.i18n("OpenPisteMap"), { shortName : "OPis" }));
		this.addLayer(new fm.Layer.OSM.OPNVKarte(ol.i18n("ÖPNV-Karte"), { shortName : "OPNV" }));
		//this.addLayer(new fm.Layer.OSM.Kybl3DMap(ol.i18n("Izometrická 3D mapa ČR"), { shortName : "kybl" }));

		this.addLayer(new fm.Layer.OSM.OOMStreets(ol.i18n("Streets overlay"), { shortName : "OOMS", visibility : false }));
		this.addLayer(new fm.Layer.OSM.OOMLabels(ol.i18n("Labels overlay"), { shortName : "OOML", visibility : false }));
		this.addLayer(new fm.Layer.OSM.Hiking(ol.i18n("Hiking symbols"), { visibility: false, shortName : "Hike" }));
		this.addLayer(new fm.Layer.Markers.OpenLinkMap(ol.i18n("POI"), { shortName: "OLiM" }));

		fm.Layer.Markers.OpenStreetBugs.loadAPI(function() {
			map.addLayer(new fm.Layer.Markers.OpenStreetBugs(ol.i18n("OpenStreetBugs"), { visibility: false, shortName: "OSBu" }));
		});
	},

	addAllAvailableGoogleLayers : function()
	{
		var map = this;
		fm.Layer.Google.loadAPI(function() {
			map.addLayer(new fm.Layer.Google.Maps(ol.i18n("Google Streets"), { shortName : "GgSt" }));
			map.addLayer(new fm.Layer.Google.MapsSatellite(ol.i18n("Google Satellite"), { shortName : "GgSa" }));
			map.addLayer(new fm.Layer.Google.MapsHybrid(ol.i18n("Google Hybrid"), { shortName : "GgHy" }));
			map.addLayer(new fm.Layer.Google.MapsTerrain(ol.i18n("Google Terrain"), { shortName : "GgTe" }));
			map.addLayer(new fm.Layer.Google.MapMaker(ol.i18n("Google MapMaker"), { shortName : "GgMM" }));
			map.addLayer(new fm.Layer.Google.MapMakerHybrid(ol.i18n("Google MapMaker Hybrid"), { shortName : "GgMH" }));
		});
	},

	addAllAvailableYahooLayers : function()
	{
		var map = this;
		fm.Layer.Yahoo.loadAPI(function() {
			map.addLayer(new fm.Layer.Yahoo.Maps(ol.i18n("Yahoo Street"), { shortName : "YaSt" }));
			map.addLayer(new fm.Layer.Yahoo.Satellite(ol.i18n("Yahoo Satellite"), { shortName : "YaSa" }));
			map.addLayer(new fm.Layer.Yahoo.Hybrid(ol.i18n("Yahoo Hybrid"), { shortName : "YaHy" }));
		});
	},

	/**
	 * Adds all available layers from this library to your map.
	*/
	addAllAvailableLayers : function()
	{
		this.addLayer(new fm.Layer.other.Relief(ol.i18n("Relief"), { visibility: false, shortName : "Rlie" }));

		this.addAllAvailableOSMLayers();
		this.addLayer(new fm.Layer.other.OSStreetView(ol.i18n("Ordnance Survey (UK)"), { shortName : "OSSV" }));

		this.addAllAvailableGoogleLayers();
		this.addAllAvailableYahooLayers();
	},

	/**
	 * Zoom to the specified query object. Remember to add your layers and to eventually set OpenLayers.ProxyHost before running
	 * this method.
	 * @param query {Object} Usually FacilMap.Util.decodeQueryString(location.hash.replace(/^#/, ""))
	*/

	zoomToQuery: function(query)
	{
		var map = this;

		// Zoom to search results only if the position is not manually set
		var search_may_zoom = (typeof query.lon == "undefined" && typeof query.lat == "undefined");

		// Set base layer (layer)
		if(query.layer)
		{
			var matching_layers = this.getLayersBy("shortName", query.layer);
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
		if(!query.lon)
			query.lon = 0;
		if(!query.lat)
			query.lat = 0;
		if(!query.zoom)
			query.zoom = 2;
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

				var existingLayers = this.getLayersBy("shortName", i);
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
				layer.shortName = i;
				layer.saveInPermalink = true;
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
			if(this.layers[i].removableInLayerSwitcher && !removableLayers[this.layers[i].shortName])
				removeLayers.push(this.layers[i]);
		}
		for(var i=0; i<removeLayers.length; i++)
			this.removeLayer(removeLayers[i]);

		// Set layer properties
		for(var i=0; i<this.layers.length; i++)
		{
			var obj = { };
			if(typeof query.l == "object" && typeof query.l[this.layers[i].shortName] == "object")
				obj = query.l[this.layers[i].shortName];

			this.layers[i].setQueryObjectFixed(obj);
		}

		// Adding markers might have moved the map, reset map view
		this.setCenter(new ol.LonLat(1*query.lon, 1*query.lat).transform(this.permalinkProjection, this.getProjectionObject()), 1*query.zoom);
	},

	/**
	 * Returns a Query object that you can pass to the zoomToQuery() function to restore the current view. Usually you save this to the location
	 * hash part by calling location.hash = "#"+FacilMap.Util.encodeQueryString(map.getQueryObject());
	 * Only non-default settings will be added to this query object. Remember to set the visibility of your overlay layers _before_ adding
	 * them to the map, as the default visibility value will be determined during adding it.
	 * @return {Object}
	*/

	getQueryObject: function()
	{
		if(!this.getCenter())
			return false;

		var lonlat = this.getCenter().clone().transform(this.getProjectionObject(), this.permalinkProjection);
		var hashObject = {
			lon : Math.round(lonlat.lon*100000000)/100000000,
			lat : Math.round(lonlat.lat*100000000)/100000000,
			zoom : this.getZoom(),
			layer : this.baseLayer.shortName,
			l : { },
			r : { }
		};

		for(var i=0; i<this.layers.length; i++)
		{
			var l = this.layers[i];
			hashObject.l[l.shortName] = l.getQueryObjectFixed();
			if(l.removableInLayerSwitcher && l.saveInPermalink)
				hashObject.r[l.shortName] = {
					"class" : l.CLASS_NAME,
					name : l.name
				};
		}

		var firstBaseLayer = null;
		for(var i=0; i<this.layers.length; i++)
		{
			if(this.layers[i].isBaseLayer)
			{
				firstBaseLayer = this.layers[i].shortName;
				break;
			}
		}

		if(fm.Util.encodeQueryString(hashObject) == "lon=0;lat=0;zoom=2;layer="+firstBaseLayer)
			return { };

		return hashObject;
	},

	CLASS_NAME : "FacilMap.Map"
});

})(FacilMap, OpenLayers, FacilMap.$);