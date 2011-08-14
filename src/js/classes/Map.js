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
 * A map with the default values needed for OpenStreetMap and other world maps.
 * If you plan to use the getQueryMethod() function, remember to set the visibility of your overlay layers _before_ adding them to the map.
 * @event mapResize The map div has been resized.
 * @event newHash The return value of getQueryObject() probably has changed.
*/

FacilMap.Map = OpenLayers.Class(OpenLayers.Map, {
	/**
	 * The projection to use in coordinates in the Permalink.
	 * @var OpenLayers.Projection
	*/
	permalinkProjection : new OpenLayers.Projection("EPSG:4326"),

	attributionIcon : new OpenLayers.Icon(FacilMap.apiUrl+"/img/logo_beta.png", new OpenLayers.Size(170, 129), new OpenLayers.Pixel(-25, -108)),

	initialize : function(div, options)
	{
		OpenLayers.Map.prototype.initialize.apply(this, [ div, OpenLayers.Util.extend({
			controls: [
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new FacilMap.Control.LayerSwitcher(),
				new OpenLayers.Control.Attribution(),
				new FacilMap.Control.KeyboardDefaults(),
				new OpenLayers.Control.MousePosition(),
				new FacilMap.Control.ScaleLine() ],
			//maxExtent: new OpenLayers.Bounds(-180, -85, 180, 85), // FIXME: 4326 as projection does not seem to work
			maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:4326")
		}, options) ]);

		this.events.addEventType("mapResize");
		this.events.addEventType("newHash");

		this.events.register("move", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newHash"); });

		if(this.attributionIcon != null)
		{
			var div = this.attributionIcon.draw(new OpenLayers.Pixel(0, 0));
			div.style.zIndex = 10000;
			this.div.appendChild(div);
			var drawFunc = function() {
				var left = 0;
				if(OpenLayers.Layer.Google.cache[this.id] && OpenLayers.Layer.Google.cache[this.id].poweredBy && OpenLayers.Layer.Google.cache[this.id].poweredBy.style.display != "none")
					left = 55;
				this.attributionIcon.moveTo(new OpenLayers.Pixel(left, this.getSize().h));
			};
			this.events.register("mapResize", this, drawFunc);
			this.events.register("changebaselayer", this, drawFunc);
			drawFunc.apply(this);
		}
	},

	updateSize : function()
	{
		var ret = OpenLayers.Map.prototype.updateSize.apply(this, arguments);
		this.events.triggerEvent("mapResize");
		return ret;
	},

	addLayer : function(layer)
	{
		var ret = OpenLayers.Map.prototype.addLayer.apply(this, arguments);

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

		layer.div.className = FacilMap.Util.makeClassName(layer) + " " + layer.div.className;

		if(layer.saveInPermalink && layer.removableInLayerSwitcher)
			this.events.triggerEvent("newHash");
	},

	removeLayer : function(layer)
	{
		var trigger = (layer.saveInPermalink && layer.removableInLayerSwitcher);
		var ret = OpenLayers.Map.prototype.removeLayer.apply(this, arguments);
		if(trigger)
			this.events.triggerEvent("newHash");
		return ret;
	},

	addAllAvailableOSMLayers : function()
	{
		var map = this;

		this.addLayer(new FacilMap.Layer.OSM.Mapnik(OpenLayers.i18n("Mapnik"), { shortName : "Mpnk" }));
		this.addLayer(new FacilMap.Layer.OSM.MapSurfer.Road(OpenLayers.i18n("MapSurfer Road"), { shortName : "MSfR" }));
		this.addLayer(new FacilMap.Layer.OSM.MapSurfer.Topographic(OpenLayers.i18n("MapSurfer Topographic"), { shortName : "MSfT" }));
		this.addLayer(new FacilMap.Layer.OSM.OpenStreetBrowser(OpenLayers.i18n("OpenStreetBrowser"), { shortName : "OSBr" }));
		this.addLayer(new FacilMap.Layer.OSM.Osmarender(OpenLayers.i18n("Osmarender"), { shortName : "Osmr" }));
		this.addLayer(new FacilMap.Layer.OSM.CycleMap(OpenLayers.i18n("OpenCycleMap"), { shortName : "OCyc" }));
		//this.addLayer(new FacilMap.Layer.OSM.Wanderkarte(OpenLayers.i18n("Reit- und Wanderkarte"), { shortName : "OSMC" }));
		this.addLayer(new FacilMap.Layer.OSM.HikeAndBike(OpenLayers.i18n("Hike & Bike Map"), { shortName : "HiBi" }));
		this.addLayer(new FacilMap.Layer.OSM.OpenPisteMap(OpenLayers.i18n("OpenPisteMap"), { shortName : "OPis" }));
		this.addLayer(new FacilMap.Layer.OSM.OPNVKarte(OpenLayers.i18n("ÖPNV-Karte"), { shortName : "OPNV" }));
		//this.addLayer(new FacilMap.Layer.OSM.Kybl3DMap(OpenLayers.i18n("Izometrická 3D mapa ČR"), { shortName : "kybl" }));

		this.addLayer(new FacilMap.Layer.OSM.OOMStreets(OpenLayers.i18n("Streets overlay"), { shortName : "OOMS", visibility : false }));
		this.addLayer(new FacilMap.Layer.OSM.OOMLabels(OpenLayers.i18n("Labels overlay"), { shortName : "OOML", visibility : false }));
		this.addLayer(new FacilMap.Layer.OSM.Hiking(OpenLayers.i18n("Hiking symbols"), { visibility: false, shortName : "Hike" }));
		this.addLayer(new FacilMap.Layer.Markers.OpenLinkMap(OpenLayers.i18n("POI"), { shortName: "OLiM" }));

		FacilMap.Layer.Markers.OpenStreetBugs.loadAPI(function() {
			map.addLayer(new FacilMap.Layer.Markers.OpenStreetBugs(OpenLayers.i18n("OpenStreetBugs"), { visibility: false, shortName: "OSBu" }));
		});
	},

	addAllAvailableGoogleLayers : function()
	{
		var map = this;
		FacilMap.Layer.Google.loadAPI(function() {
			map.addLayer(new FacilMap.Layer.Google.Maps(OpenLayers.i18n("Google Streets"), { shortName : "GgSt" }));
			map.addLayer(new FacilMap.Layer.Google.MapsSatellite(OpenLayers.i18n("Google Satellite"), { shortName : "GgSa" }));
			map.addLayer(new FacilMap.Layer.Google.MapsHybrid(OpenLayers.i18n("Google Hybrid"), { shortName : "GgHy" }));
			map.addLayer(new FacilMap.Layer.Google.MapsTerrain(OpenLayers.i18n("Google Terrain"), { shortName : "GgTe" }));
			map.addLayer(new FacilMap.Layer.Google.MapMaker(OpenLayers.i18n("Google MapMaker"), { shortName : "GgMM" }));
			map.addLayer(new FacilMap.Layer.Google.MapMakerHybrid(OpenLayers.i18n("Google MapMaker Hybrid"), { shortName : "GgMH" }));
		});
	},

	addAllAvailableYahooLayers : function()
	{
		var map = this;
		FacilMap.Layer.Yahoo.loadAPI(function() {
			map.addLayer(new FacilMap.Layer.Yahoo.Maps(OpenLayers.i18n("Yahoo Street"), { shortName : "YaSt" }));
			map.addLayer(new FacilMap.Layer.Yahoo.Satellite(OpenLayers.i18n("Yahoo Satellite"), { shortName : "YaSa" }));
			map.addLayer(new FacilMap.Layer.Yahoo.Hybrid(OpenLayers.i18n("Yahoo Hybrid"), { shortName : "YaHy" }));
		});
	},

	/**
	 * Adds all available layers from this library to your map.
	*/
	addAllAvailableLayers : function()
	{
		this.addLayer(new FacilMap.Layer.other.Relief(OpenLayers.i18n("Relief"), { visibility: false, shortName : "Rlie" }));

		this.addAllAvailableOSMLayers();
		this.addLayer(new FacilMap.Layer.other.OSStreetView(OpenLayers.i18n("Ordnance Survey (UK)"), { shortName : "OSSV" }));

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
		this.setCenter(new OpenLayers.LonLat(1*query.lon, 1*query.lat).transform(this.permalinkProjection, this.getProjectionObject()), 1*query.zoom);

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
					if(this.controls[i] instanceof FacilMap.Control.LayerSwitcher)
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
		this.setCenter(new OpenLayers.LonLat(1*query.lon, 1*query.lat).transform(this.permalinkProjection, this.getProjectionObject()), 1*query.zoom);
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

		if(FacilMap.Util.encodeQueryString(hashObject) == "lon=0;lat=0;zoom=2;layer="+firstBaseLayer)
			return { };

		return hashObject;
	},

	CLASS_NAME : "FacilMap.Map"
});