/*
	This file is part of cdauth’s map.

	cdauth’s map is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	cdauth’s map is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with cdauth’s map.  If not, see <http://www.gnu.org/licenses/>.

	Obtain the source code from http://gitorious.org/cdauths-map
	or git://gitorious.org/cdauths-map/map.git.
*/

/**
 * Provides basic classes to add features of cdauth’s map to any OpenLayers map.
 * Include http://www.openlayers.org/dev/OpenLayers.js for full OpenLayers support.
*/

/**
 * Necessary improvement to the translate function: Fall back to default language if translated string is not
 * available (see http://trac.openlayers.org/ticket/2308).
*/

OpenLayers.i18n = OpenLayers.Lang.translate = function(key, context) {
	var message = OpenLayers.Lang[OpenLayers.Lang.getCode()][key];
	if(!message)
	{
		if(OpenLayers.Lang[OpenLayers.Lang.defaultCode][key])
			message = OpenLayers.Lang[OpenLayers.Lang.defaultCode][key];
		else
			message = key;
	}
	if(context)
		message = OpenLayers.String.format(message, context);
	return message;
};

OpenLayers.Lang.en = OpenLayers.Util.extend(OpenLayers.Lang.en, {
	"[Zoom]" : "[Zoom]",
	"[Remove]" : "[Remove]",
	"attribution-osm" : "Rendering CC-by-SA by ${rendering}, Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"attribution-relief" : "Relief by <a href=\"http://hikebikemap.de/\">Hike &amp; Bike Map</a>",
	"attribution-oom-streets" : "Streets overlay CC-by-SA by <a href=\"http://oobrien.com/oom/\">OpenOrienteeringMap</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"attribution-oom-labels" : "Labels overlay CC-by-SA by <a href=\"http://oobrien.com/oom/\">OpenOrienteeringMap</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"attribution-hiking" : "Hiking symbols overlay CC-by-SA by <a href=\"http://osm.lonvia.de/world_hiking.html\">Lonvia's Hiking Map</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"attribution-os-streetview" : "Contains Ordnance Survey data © Crown copyright and database right 2010",
	"attribution-routing-yours" : "Routing CC-by-SA by <a href=\"http://www.yournavigation.org/\"><acronym title=\"Yet Another OpenStreetMap Routing Service\">YOURS</acronym></a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"attribution-routing-cloudmade" : "Routing CC-by-SA by <a href=\"http://cloudmade.com/\">CloudMade</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"attribution-routing-mapquest" : "Routing CC-by-SA by <a href=\"http://open.mapquest.co.uk/\">MapQuest Open</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> data",
	"Create a marker" : "Create a marker",
	"Coordinates" : "Coordinates",
	"unknown" : "unknown",
	"Error parsing file." : "Error parsing file.",
	"Latitude" : "Latitude",
	"Longitude" : "Longitude",
	"OpenStreetMap Permalink" : "OpenStreetMap Permalink",
	"OpenStreetMap Shortlink" : "OpenStreetMap Shortlink",
	"Google Maps Permalink" : "Google Maps Permalink",
	"Yahoo Maps Permalink" : "Yahoo Maps Permalink",
	"OpenStreetMap Links" : "OpenStreetMap Links",
	"Wikimedia GeoHack" : "Wikimedia GeoHack",
	"Go home" : "Go home",
	"Mapnik" : "Mapnik",
	"MapSurfer Road" : "MapSurfer Road",
	"MapSurfer Topographic" : "MapSurfer Topographic",
	"OpenStreetBrowser" : "OpenStreetBrowser",
	"Osmarender" : "Osmarender",
	"OpenCycleMap" : "OpenCycleMap",
	"Reit- und Wanderkarte" : "Reit- und Wanderkarte",
	"Hike & Bike Map" : "Hike & Bike Map",
	"OpenPisteMap" : "OpenPisteMap",
	"ÖPNV-Karte" : "ÖPNV-Karte",
	"Google Streets" : "Google Streets",
	"Google Satellite" : "Google Satellite",
	"Google Hybrid" : "Google Hybrid",
	"Google Terrain" : "Google Terrain",
	"Google MapMaker" : "Google MapMaker",
	"Google MapMaker Hybrid" : "Google MapMaker Hybrid",
	"Yahoo Street" : "Yahoo Street",
	"Yahoo Satellite" : "Yahoo Satellite",
	"Yahoo Hybrid" : "Yahoo Hybrid",
	"Relief" : "Relief",
	"Hiking symbols" : "Hiking symbols",
	"Coordinate grid" : "Coordinate grid",
	"Izometrická 3D mapa ČR" : "Izometrická 3D mapa ČR",
	"Streets overlay" : "Streets overlay",
	"Labels overlay" : "Labels overlay",
	"Links to other maps" : "Links to other maps",
	"Tags" : "Tags"
});

OpenLayers.Lang.de = OpenLayers.Util.extend(OpenLayers.Lang.de, {
	"[Zoom]" : "[Zoom]",
	"[Remove]" : "[Entfernen]",
	"attribution-osm" : "Darstellung: ${rendering} (CC-by-SA), Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"attribution-relief" : "Reliefdarstellung: <a href=\"http://hikebikemap.de/\">Hike &amp; Bike Map</a>",
	"attribution-oom-streets" : "Straßenhybrid von <a href=\"http://oobrien.com/oom/\">OpenOrienteeringMap</a> (<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA)",
	"attribution-oom-labels" : "Beschriftungen von <a href=\"http://oobrien.com/oom/\">OpenOrienteeringMap</a> (<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA)",
	"attribution-hiking" : "Wanderbeschilderung von <a href=\"http://osm.lonvia.de/world_hiking.html\">Lonvia's Hiking Map</a>/<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA",
	"attribution-os-streetview" : "Enthält Ordnance-Survey-Daten, © Crown copyright and database right 2010",
	"attribution-routing-yours" : "Route von <a href=\"http://www.yournavigation.org/\"><acronym title=\"Yet Another OpenStreetMap Routing Service\">YOURS</acronym></a> (<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA)",
	"attribution-routing-cloudmade" : "Route von <a href=\"http://cloudmade.com/\">CloudMade</a> (<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA)",
	"attribution-routing-mapquest" : "Route von <a href=\"http://open.mapquest.co.uk/\">MapQuest Open</a> (<a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>-Daten, CC-by-SA)",
	"Create a marker" : "Marker anlegen",
	"Coordinates" : "Koordinaten",
	"unknown" : "unbekannt",
	"Error parsing file." : "Fehler beim Parsen der Datei.",
	"Latitude" : "Breite",
	"Longitude" : "Länge",
	"OpenStreetMap Permalink" : "OpenStreetMap Permalink",
	"OpenStreetMap Shortlink" : "OpenStreetMap Shortlink",
	"Google Maps Permalink" : "Google Maps Permalink",
	"Yahoo Maps Permalink" : "Yahoo Maps Permalink",
	"OpenStreetMap Links" : "OpenStreetMap Links",
	"Wikimedia GeoHack" : "Wikimedia GeoHack",
	"Go home" : "Zum Aufenthaltsort",
	"Mapnik" : "Mapnik",
	"MapSurfer Road" : "MapSurfer Road",
	"MapSurfer Topographic" : "MapSurfer Topographic",
	"OpenStreetBrowser" : "OpenStreetBrowser",
	"Osmarender" : "Osmarender",
	"OpenCycleMap" : "OpenCycleMap",
	"Reit- und Wanderkarte" : "Reit- und Wanderkarte",
	"Hike & Bike Map" : "Hike & Bike Map",
	"OpenPisteMap" : "OpenPisteMap",
	"ÖPNV-Karte" : "ÖPNV-Karte",
	"Google Streets" : "Google Karte",
	"Google Satellite" : "Google Satellit",
	"Google Hybrid" : "Google Hybrid",
	"Google Terrain" : "Google Gelände",
	"Google MapMaker" : "Google MapMaker",
	"Google MapMaker Hybrid" : "Google MapMaker Hybrid",
	"Yahoo Street" : "Yahoo Karte",
	"Yahoo Satellite" : "Yahoo Satellit",
	"Yahoo Hybrid" : "Yahoo Hybrid",
	"Relief" : "Relief",
	"Hiking symbols" : "Wanderbeschilderung",
	"Coordinate grid" : "Koordinatensystem",
	"Izometrická 3D mapa ČR" : "Izometrická 3D mapa ČR",
	"Streets overlay" : "Straßen-Hybrid",
	"Labels overlay" : "Beschriftungen",
	"Links to other maps" : "Auf andere Karten",
	"Tags" : "Attribute"
});

OpenLayers.cdauthBackup = { };

// Save parent classes in class objects, needed for makeClassName()
OpenLayers.cdauthBackup.Class = OpenLayers.Class;
OpenLayers.Class = function() {
	var ret = OpenLayers.cdauthBackup.Class.apply(this, arguments);
	ret.prototype.cdauthParentClasses = arguments;
	return ret;
};
OpenLayers.Class.isPrototype = OpenLayers.cdauthBackup.Class.isPrototype;

// Make use of ajax-proxy (http://gitorious.org/ajax-proxy/ajax-proxy)
// Include http://osm.cdauth.eu/ajax-proxy/ajax-proxy.js to "disable" the Same Origin Policy.
loadJavaScript("http://osm.cdauth.eu/ajax-proxy/ajax-proxy.js", function() { return window.AjaxProxyXMLHttpRequest != undefined; }, function() { OpenLayers.Request.XMLHttpRequest = AjaxProxyXMLHttpRequest; });

// Fix displayClass in OpenLayers Controls to also use parent class names
OpenLayers.cdauthBackup.Control = {
	initialize : OpenLayers.Control.prototype.initialize,
	activate : OpenLayers.Control.prototype.activate,
	deactivate : OpenLayers.Control.prototype.deactivate
};

OpenLayers.Control.prototype.initialize = function() {
	OpenLayers.cdauthBackup.Control.initialize.apply(this, arguments);
	this.displayClass = makeClassName(this);
};

// Workaround for http://trac.openlayers.org/ticket/2607
OpenLayers.Control.prototype.activate = function() {
	var ret = OpenLayers.cdauthBackup.Control.activate.apply(this, arguments);
	if(this.map)
	{
		var classNames = this.displayClass.split(/\s+/);
		for(var i=0; i<classNames.length; i++)
		{
			OpenLayers.Element.addClass(
				this.map.viewPortDiv,
				classNames[i] + "Active"
			);
		}
	}
	return ret;
};

OpenLayers.Control.prototype.deactivate = function() {
	var ret = OpenLayers.cdauthBackup.Control.deactivate.apply(this, arguments);
	if(this.map)
	{
		var classNames = this.displayClass.split(/\s+/);
		for(var i=0; i<classNames.length; i++)
		{
			OpenLayers.Element.removeClass(
				this.map.viewPortDiv,
				classNames[i] + "Active"
			);
		}
	}
	return ret;
};

OpenLayers.Control.Panel.prototype.redraw = function() {
	this.div.innerHTML = "";
	if (this.active) {
		for (var i=0, len=this.controls.length; i<len; i++) {
			var element = this.controls[i].panel_div;
			if (this.controls[i].active) {
				element.className = this.controls[i].displayClass.replace(/(\s+|$)/g, "ItemActive$1");
			} else {
				element.className = this.controls[i].displayClass.replace(/(\s+|$)/g, "ItemInactive$1");
			}
			this.div.appendChild(element);
		}
	}
};

/**
 * A map with the default values needed for OpenStreetMap and other world maps.
 * If you plan to use the getQueryMethod() function, remember to set the visibility of your overlay layers _before_ adding them to the map.
 * @event mapResize The map div has been resized.
 * @event newHash The return value of getQueryObject() probably has changed.
*/

OpenLayers.Map.cdauth = OpenLayers.Class(OpenLayers.Map, {
	/**
	 * This CSS file will be additionally loaded.
	*/
	cdauthTheme : "http://osm.cdauth.de/map/prototypes.css",

	/**
	 * The projection to use in coordinates in the Permalink.
	 * @var OpenLayers.Projection
	*/
	permalinkProjection : new OpenLayers.Projection("EPSG:4326"),

	initialize : function(div, options)
	{
		var keyboardControl = new OpenLayers.Control.cdauth.KeyboardDefaults();
		OpenLayers.Map.prototype.initialize.apply(this, [ div, OpenLayers.Util.extend({
			controls: [
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new OpenLayers.Control.cdauth.LayerSwitcher(),
				new OpenLayers.Control.Attribution(),
				keyboardControl,
				new OpenLayers.Control.MousePosition(),
				new OpenLayers.Control.ScaleLine() ],
			//maxExtent: new OpenLayers.Bounds(-180, -85, 180, 85), // FIXME: 4326 as projection does not seem to work
			maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new OpenLayers.Projection("EPSG:900913"),
			displayProjection: new OpenLayers.Projection("EPSG:4326")
		}, options) ]);

		this.loadCSSFile(this.cdauthTheme);

		this.events.addEventType("mapResize");
		this.events.addEventType("newHash");

		this.events.register("move", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newHash"); });

		OpenLayers.Event.observe(this.viewPortDiv, "mouseover", OpenLayers.Function.bindAsEventListener(function(){ keyboardControl.activate(); }, this));
		OpenLayers.Event.observe(this.viewPortDiv, "mouseout", OpenLayers.Function.bindAsEventListener(function(){ keyboardControl.deactivate(); }, this));
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

		if(typeof layer.cdauthDefaultVisibility == "undefined")
			layer.cdauthDefaultVisibility = layer.getVisibility();

		layer.events.addEventType("queryObjectChanged");

		if(layer.saveInPermalink)
			layer.events.register("queryObjectChanged", this, function() { this.events.triggerEvent("newHash"); });

		layer.getQueryObjectFixed = function() {
			var ret = (this.getQueryObject == undefined || !this.saveInPermalink ? { } : this.getQueryObject());
			if(!this.isBaseLayer && this.getVisibility() != this.cdauthDefaultVisibility)
				ret.visibility = this.getVisibility();
			return ret;
		};

		layer.setQueryObjectFixed = function(obj) {
			if(!this.isBaseLayer)
				this.setVisibility(typeof obj.visibility == "undefined" ? this.cdauthDefaultVisibility : (obj.visibility != "0"));
			if(this.setQueryObject != undefined)
				this.setQueryObject(obj);
		};

		layer.div.className = makeClassName(layer) + " " + layer.div.className;

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
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.Mapnik(OpenLayers.i18n("Mapnik"), { shortName : "Mpnk" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.MapSurfer.Road(OpenLayers.i18n("MapSurfer Road"), { shortName : "MSfR" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic(OpenLayers.i18n("MapSurfer Topographic"), { shortName : "MSfT" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser(OpenLayers.i18n("OpenStreetBrowser"), { shortName : "OSBr" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.Osmarender(OpenLayers.i18n("Osmarender"), { shortName : "Osmr" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.CycleMap(OpenLayers.i18n("OpenCycleMap"), { shortName : "OCyc" }));
		//this.addLayer(new OpenLayers.Layer.cdauth.OSM.Wanderkarte(OpenLayers.i18n("Reit- und Wanderkarte"), { shortName : "OSMC" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.HikeAndBike(OpenLayers.i18n("Hike & Bike Map"), { shortName : "HiBi" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenPisteMap(OpenLayers.i18n("OpenPisteMap"), { shortName : "OPis" }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.OPNVKarte(OpenLayers.i18n("ÖPNV-Karte"), { shortName : "OPNV" }));
		//this.addLayer(new OpenLayers.Layer.cdauth.OSM.Kybl3DMap(OpenLayers.i18n("Izometrická 3D mapa ČR"), { shortName : "kybl" }));

		this.addLayer(new OpenLayers.Layer.cdauth.OSM.OOMStreets(OpenLayers.i18n("Streets overlay"), { shortName : "OOMS", visibility : false }));
		this.addLayer(new OpenLayers.Layer.cdauth.OSM.OOMLabels(OpenLayers.i18n("Labels overlay"), { shortName : "OOML", visibility : false }));
	},

	addAllAvailableGoogleLayers : function()
	{
		var map = this;
		OpenLayers.Layer.cdauth.Google.loadAPI(function() {
			map.addLayer(new OpenLayers.Layer.cdauth.Google.Maps(OpenLayers.i18n("Google Streets"), { shortName : "GgSt" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Google.MapsSatellite(OpenLayers.i18n("Google Satellite"), { shortName : "GgSa" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Google.MapsHybrid(OpenLayers.i18n("Google Hybrid"), { shortName : "GgHy" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Google.MapsTerrain(OpenLayers.i18n("Google Terrain"), { shortName : "GgTe" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Google.MapMaker(OpenLayers.i18n("Google MapMaker"), { shortName : "GgMM" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Google.MapMakerHybrid(OpenLayers.i18n("Google MapMaker Hybrid"), { shortName : "GgMH" }));
		});
	},

	addAllAvailableYahooLayers : function()
	{
		var map = this;
		OpenLayers.Layer.cdauth.Yahoo.loadAPI(function() {
			map.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Maps(OpenLayers.i18n("Yahoo Street"), { shortName : "YaSt" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Satellite(OpenLayers.i18n("Yahoo Satellite"), { shortName : "YaSa" }));
			map.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Hybrid(OpenLayers.i18n("Yahoo Hybrid"), { shortName : "YaHy" }));
		});
	},

	/**
	 * Adds all available layers from this library to your map.
	*/
	addAllAvailableLayers : function()
	{
		this.addLayer(new OpenLayers.Layer.cdauth.other.Relief(OpenLayers.i18n("Relief"), { visibility: false, shortName : "Rlie" }));
		this.addLayer(new OpenLayers.Layer.cdauth.other.Hiking(OpenLayers.i18n("Hiking symbols"), { visibility: false, shortName : "Hike" }));

		this.addAllAvailableOSMLayers();
		this.addLayer(new OpenLayers.Layer.cdauth.other.OSStreetView(OpenLayers.i18n("Ordnance Survey (UK)"), { shortName : "OSSV" }));

		this.addAllAvailableGoogleLayers();
		this.addAllAvailableYahooLayers();
	},

	/**
	 * Zoom to the specified query object. Remember to add your layers and to eventually set OpenLayers.ProxyHost before running
	 * this method.
	 * @param Object query Usually decodeQueryString(location.hash.replace(/^#/, ""))
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
					if(existingLayers[j].CLASS_NAME == "OpenLayers.Layer."+query.r[i]["class"])
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
				var layerClass = OpenLayers.Layer;
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
					if(this.controls[i] instanceof OpenLayers.Control.cdauth.LayerSwitcher)
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
	 * hash part by calling location.hash = "#"+encodeQueryString(map.getQueryObject());
	 * Only non-default settings will be added to this query object. Remember to set the visibility of your overlay layers _before_ adding
	 * them to the map, as the default visibility value will be determined during adding it.
	 * @return Object
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
					"class" : l.CLASS_NAME.replace(/^OpenLayers\.Layer\./, ""),
					name : l.name
				};
		}

		return hashObject;
	},

	loadCSSFile : function(url) {
		if(url == null)
			return;

		var addNode = true;
		var nodes = document.getElementsByTagName('link');
		for(var i=0; i<nodes.length; i++)
		{
			if(OpenLayers.Util.isEquivalentUrl(nodes[i].href, url))
			{
				addNode = false;
				break;
			}
		}
		if(addNode)
		{
			var cssNode = document.createElement('link');
			cssNode.setAttribute('rel', 'stylesheet');
			cssNode.setAttribute('type', 'text/css');
			cssNode.setAttribute('href', url);
			document.getElementsByTagName('head')[0].appendChild(cssNode);
		}
	},

	CLASS_NAME : "OpenLayers.Map.cdauth"
});

OpenLayers.Control.cdauth = { };

/**
 * Disables the keyboard control when the focus is on a form field that is controlled by the keyboard (such as an input field).
 * See bug http://trac.openlayers.org/ticket/1027
*/
OpenLayers.Control.cdauth.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control.KeyboardDefaults, {
	defaultKeyPress : function(evt) {
		if(!evt.target)
			evt.target = evt.srcElement;
		if(evt.target && evt.target.nodeName && (evt.target.nodeName.toLowerCase() == "input" && evt.target.type.toLowerCase() != "checkbox" && evt.target.type.toLowerCase() != "button" && evt.target.type.toLowerCase() != "submit" && evt.target.type.toLowerCase() != "clear" || evt.target.tagName.toLowerCase() == "textarea" || evt.target.tagName.toLowerCase() == "select"))
			return true;
		if(evt.altKey || evt.ctrlKey)
			return true;
		OpenLayers.Control.KeyboardDefaults.prototype.defaultKeyPress.apply(this, [ evt ]);
	},
	CLASS_NAME : "OpenLayers.Control.cdauth.KeyboardDefaults"
});

/**
 * A layer switcher that has a scroll bar if the height of the map is too small.
 * Additionally, overlay layers that have the “zoomableInLayerSwitcher” property get a button that zooms to the data extent of the layer.
 * Overlay layers that have the “removableInLayerSwitcher” property set get a button to remove the layer from the map.
*/
OpenLayers.Control.cdauth.LayerSwitcher = OpenLayers.Class(OpenLayers.Control.LayerSwitcher, {
	loadContents : function() {
		var ret = OpenLayers.Control.LayerSwitcher.prototype.loadContents.apply(this, arguments);
		this.layersDiv.style.padding = ".5em";
		this.layersDiv.style.width = "19em";
		this.layersDiv.style.overflow = "auto";

		this.map.events.register("mapResize", this, this.onMapResize);
		return ret;
	},

	onMapResize : function() {
		this.layersDiv.style.maxHeight = (this.map.size.h-100)+"px";
	},

	redraw : function(force) {
		// Display “Zoom” and, if desired, “Remove” links for overlay layers.

		if(force)
			this.layerStates = [];
		var ret = OpenLayers.Control.LayerSwitcher.prototype.redraw.apply(this, arguments);
		this.onMapResize();

		var spans = this.dataLayersDiv.getElementsByTagName("span");
		for(var i=0; i<spans.length; i++)
		{
			var layer = this.map.getLayersByName(spans[i].innerHTML)[0];
			if(!layer) continue;

			var append = [ ];

			if(layer.zoomableInLayerSwitcher)
			{
				var a_zoom = document.createElement("a");
				a_zoom.href = "#";
				OpenLayers.Event.observe(a_zoom, "click", OpenLayers.Function.bindAsEventListener(function(){ var extent = this.getDataExtent(); if(extent) this.map.zoomToExtent(extent); return false; }, layer));
				a_zoom.appendChild(document.createTextNode(OpenLayers.i18n("[Zoom]")));

				append.push(document.createTextNode(" "));
				append.push(a_zoom);
			}

			if(layer.removableInLayerSwitcher)
			{
				var a_remove = document.createElement("a");
				a_remove.href = "#";
				OpenLayers.Event.observe(a_remove, "click", OpenLayers.Function.bindAsEventListener(function(){ this.map.removeLayer(this); this.destroy(); return false; }, layer));
				a_remove.appendChild(document.createTextNode(OpenLayers.i18n("[Remove]")));

				append.push(document.createTextNode(" "));
				append.push(a_remove);
			}

			var nextSibling = spans[i].nextSibling;
			for(var j=0; j<append.length; j++)
			{
				if(nextSibling)
					spans[i].parentNode.insertBefore(append[j], nextSibling);
				else
					spans[i].parentNode.appendChild(append[j]);
			}
		}

		return ret;
	},

	CLASS_NAME : "OpenLayers.Control.cdauth.LayerSwitcher"
});

OpenLayers.Layer.cdauth = {
	OSM : { },
	Google : { },
	Yahoo : { },
	markers : { },
	other : { }
};

/**
 * Mapnik rendering from openstreetmap.org.
*/
OpenLayers.Layer.cdauth.OSM.Mapnik = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [
			name,
			[ "http://a.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://b.tile.openstreetmap.org/${z}/${x}/${y}.png", "http://c.tile.openstreetmap.org/${z}/${x}/${y}.png" ],
			OpenLayers.Util.extend({ numZoomLevels: 19 }, options)
		]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.Mapnik"
});

/**
 * Osmarender rendering from openstreetmap.org.
*/
OpenLayers.Layer.cdauth.OSM.Osmarender = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [
			name,
			[ "http://a.tah.openstreetmap.org/Tiles/tile/${z}/${x}/${y}.png", "http://b.tah.openstreetmap.org/Tiles/tile/${z}/${x}/${y}.png", "http://c.tah.openstreetmap.org/Tiles/tile/${z}/${x}/${y}.png" ],
			OpenLayers.Util.extend({ numZoomLevels: 18 }, options)
		]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.Osmarender"
});

/**
 * CycleMap rendering from openstreetmap.org.
*/
OpenLayers.Layer.cdauth.OSM.CycleMap = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [
			name,
			[ "http://a.andy.sandbox.cloudmade.com/tiles/cycle/${z}/${x}/${y}.png", "http://b.andy.sandbox.cloudmade.com/tiles/cycle/${z}/${x}/${y}.png", "http://c.andy.sandbox.cloudmade.com/tiles/cycle/${z}/${x}/${y}.png" ],
			OpenLayers.Util.extend({
				numZoomLevels: 19,
				attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>" })
			}, options)
		]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.CycleMap"
});

/**
 * OpenStreetBrowser rendering of OpenStreetMap data. See http://openstreetbrowser.org/.
*/
OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://www.openstreetbrowser.org/tiles/base/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 19, attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>" })}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser"
});

/**
 * OpenPisteMap rendering of OpenStreetMap data. See http://openpistemap.org/.
*/
OpenLayers.Layer.cdauth.OSM.OpenPisteMap = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://tiles.openpistemap.org/contours/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 18, attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>" })}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OpenPisteMap"
});

/**
 * OSM Reit- und Wanderkarte rendering of OSM foot- and bridle ways. See http://osmc.broadbox.de/.
*/
OpenLayers.Layer.cdauth.OSM.Wanderkarte = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://topo.geofabrik.de/trails/${z}/${x}/${y}.png", OpenLayers.Util.extend({minZoomLevel: 8, maxZoomLevel: 15, attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>" })}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.Wanderkarte"
});

/**
 * Hike & Bike Map (http://hikebikemap.de/)
*/
OpenLayers.Layer.cdauth.OSM.HikeAndBike = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://toolserver.org/tiles/hikebike/${z}/${x}/${y}.png", OpenLayers.Util.extend({attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://hikebikemap.de/\">Hike &amp; Bike Map</a>" })}, options) ]);
	}
});

/**
 * OpenStreetMap data rendering by ÖPNV-Karte (PSV map).
*/
OpenLayers.Layer.cdauth.OSM.OPNVKarte = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://tile.xn--pnvkarte-m4a.de/tilegen/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 19, attribution: OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>" })}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OPNVKarte"
});

/**
 * Parent class for MapSurfer (http://www.mapsurfer.net/) renderings.
*/
OpenLayers.Layer.cdauth.OSM.MapSurfer = OpenLayers.Class(OpenLayers.Layer.OSM, {
	attribution : OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://www.mapsurfer.net/\">MapSurfer</a>" }),
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer"
});

/**
 * MapSurfer road map.
*/
OpenLayers.Layer.cdauth.OSM.MapSurfer.Road = OpenLayers.Class(OpenLayers.Layer.cdauth.OSM.MapSurfer, {
	initialize : function(name, options) {
		OpenLayers.Layer.cdauth.OSM.MapSurfer.prototype.initialize.apply(this, [ name, "http://tiles1.mapsurfer.net/tms_r.ashx?x=${x}&y=${y}&z=${z}", options ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer.Road"
});

/**
 * MapSurfer topographic map.
*/
OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic = OpenLayers.Class(OpenLayers.Layer.cdauth.OSM.MapSurfer, {
	initialize : function(name, options) {
		OpenLayers.Layer.cdauth.OSM.MapSurfer.prototype.initialize.apply(this, [ name, "http://tiles2.mapsurfer.net/tms_t.ashx?x=${x}&y=${y}&z=${z}", options ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic"
});

/**
 * Izometrická 3D mapa ČR (http://osm.kyblsoft.cz/3dmapa/).
*/
OpenLayers.Layer.cdauth.OSM.Kybl3DMap = OpenLayers.Class(OpenLayers.Layer.OSM, {
	attribution : OpenLayers.String.format(OpenLayers.i18n("attribution-osm"), { rendering: "<a href=\"http://osm.kyblsoft.cz/3dmapa/\">OpenKyblMap</a>" }),
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://osm.kyblsoft.cz/3dmapa/tiles/${z}/${x}/${y}.jpg", OpenLayers.Util.extend({ numZoomLevels: 18 }, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.Kybl3DMap"
});

/**
 * OpenOrienteeringMap (http://oobrien.com/oom/) Street-O overlay.
*/
OpenLayers.Layer.cdauth.OSM.OOMStreets = OpenLayers.Class(OpenLayers.Layer.OSM, {
	attribution : OpenLayers.i18n("attribution-oom-streets"),
	initialize : function(name, options) {
		// New world-wide tiles. Aren’t transparent anymore so not as good for using them as an overlay as the old ones. See http://www.openstreetmap.org/user/Ollie/diary/9223.
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://tiler1.censusprofiler.org/streeto/${z}/${x}/${y}.png", OpenLayers.Util.extend({ numZoomLevels: 19, isBaseLayer: false, opacity:0.25 }, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OOMStreets"
});

/**
 * OpenOrienteeringMap (http://oobrien.com/oom/) names overlay.
*/
OpenLayers.Layer.cdauth.OSM.OOMLabels = OpenLayers.Class(OpenLayers.Layer.OSM, {
	attribution : OpenLayers.i18n("attribution-oom-labels"),
	initialize : function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://tiler1.censusprofiler.org/labelsonly/${z}/${x}/${y}.png", OpenLayers.Util.extend({ numZoomLevels: 19, isBaseLayer: false }, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OOMLabels"
});

/**
 * Relief rendering from Hike & Bike map (http://hikebikemap.de/)
*/
OpenLayers.Layer.cdauth.other.Relief = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://toolserver.org/~cmarqu/hill/${z}/${x}/${y}.png", OpenLayers.Util.extend({isBaseLayer: false, attribution: OpenLayers.i18n("attribution-relief") }, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.other.Relief"
});

/**
 * Hiking symbol overlay by Lonvia (http://osm.lonvia.de/)
*/
OpenLayers.Layer.cdauth.other.Hiking = OpenLayers.Class(OpenLayers.Layer.OSM, {
	initialize: function(name, options) {
		OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://osm.lonvia.de/hiking/${z}/${x}/${y}.png", OpenLayers.Util.extend({ isBaseLayer: false, attribution: OpenLayers.i18n("attribution-hiking") }, options) ]);
	}
});

/**
 * Ordnance Survey Street View tiles from http://os.openstreetmap.org/.
*/
OpenLayers.Layer.cdauth.other.OSStreetView = OpenLayers.Class(OpenLayers.Layer.XYZ, {
	attribution : OpenLayers.i18n("attribution-os-streetview"),

	initialize : function(name, options) {
		OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [ name, [ "http://a.os.openstreetmap.org/sv/${z}/${x}/${y}.png", "http://b.os.openstreetmap.org/sv/${z}/${x}/${y}.png", "http://c.os.openstreetmap.org/sv/${z}/${x}/${y}.png" ], options ]);
	}
});

/**
 * Set this to your Google Maps API key (http://code.google.com/apis/maps/signup.html) prior to adding the Google layers
 * to your map. In theory, this will asynchronously include the API JavaScript file as soon as the Google layers
 * are added to the map using {@link OpenLayers.Map.cdauth.addAllAvailableGoogleLayers()}. In practice, it is
 * currently impossible to do that because the Google Maps API relies on document.write(), so you have to leave this value null.
 * You still have to include the JavaScript file http://maps.google.com/maps?file=api&v=2&key=[Your key] manually,
 * but you can do that after adding the Google Layers, they will then be added as soon as the API is loaded.
 * @var String
*/
OpenLayers.Layer.cdauth.Google.API_KEY = null;

/**
 * Loads the Google Maps API with the API key set in {@link OpenLayers.Layer.cdauth.Google.API_KEY} and calls the given callback
 * function as soon as it’s loaded.
 * @param Function callback
 * @return void
*/
OpenLayers.Layer.cdauth.Google.loadAPI = function(callback) {
	var url = null;
	if(OpenLayers.Layer.cdauth.Google.API_KEY != null)
		url = "http://maps.google.com/maps?file=api&v=2&key="+encodeURIComponent(OpenLayers.Layer.cdauth.Google.API_KEY);
	loadJavaScript(url, function() { return window.GMap2 != undefined; }, callback);
};

/**
 * Google Streets (http://maps.google.com/)
*/
OpenLayers.Layer.cdauth.Google.Maps = OpenLayers.Class(OpenLayers.Layer.Google, {
	initialize: function(name, options) {
		OpenLayers.Layer.Google.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.Maps"
});

/**
 * Google Satellite (http://maps.google.com/)
*/
OpenLayers.Layer.cdauth.Google.MapsSatellite = OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_SATELLITE_MAP, numZoomLevels: 22}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsSatellite"
});

/**
 * Google Hybrid (Streets and Satellite) (http://maps.google.com/)
*/
OpenLayers.Layer.cdauth.Google.MapsHybrid = OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_HYBRID_MAP}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsHybrid"
});

/**
 * Google Terrain (http://maps.google.com/)
*/
OpenLayers.Layer.cdauth.Google.MapsTerrain = OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_PHYSICAL_MAP}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsTerrain"
});

/**
 * Google MapMaker streets (http://www.google.com/mapmaker)
*/
OpenLayers.Layer.cdauth.Google.MapMaker = OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_MAPMAKER_NORMAL_MAP}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapMaker"
});

/**
 * Google MapMaker hybrid (streets and satellite) (http://www.google.com/mapmaker)
*/
OpenLayers.Layer.cdauth.Google.MapMakerHybrid = OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_MAPMAKER_HYBRID_MAP}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapMakerHybrid"
});

/**
 * Set this to your Yahoo Maps App ID (which is any string you want) prior to adding the Yahoo layers
 * to your map. In theory, this will asynchronously include the API JavaScript file as soon as the Yahoo layers
 * are added to the map using {@link OpenLayers.Map.cdauth.addAllAvailableYahooLayers()}. In practice, it is
 * currently impossible to do that because the Yahoo Maps API relies on document.write(), so you have to leave this value null.
 * You still have to include the JavaScript file http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=[Your App ID] manually,
 * but you can do that after adding the Yahoo Layers, they will then be added as soon as the API is loaded.
 * @var String
*/
OpenLayers.Layer.cdauth.Yahoo.APPID = null;

/**
 * Loads the Yahoo Maps API with the App ID set in {@link OpenLayers.Layer.cdauth.Yahoo.APPID} and calls the given callback
 * function as soon as it’s loaded.
 * @param Function callback
 * @return void
*/
OpenLayers.Layer.cdauth.Yahoo.loadAPI = function(callback) {
	var url = null;
	if(OpenLayers.Layer.cdauth.Yahoo.APPID != null)
		url = "http://api.maps.yahoo.com/ajaxymap?v=3.0&appid="+encodeURIComponent(OpenLayers.Layer.cdauth.Yahoo.APPID);
	loadJavaScript(url, function() { return window.YMap != undefined; }, callback);
};

/**
 * Yahoo Streets (http://maps.yahoo.com/)
*/
OpenLayers.Layer.cdauth.Yahoo.Maps = OpenLayers.Class(OpenLayers.Layer.Yahoo, {
	initialize: function(name, options) {
		OpenLayers.Layer.Yahoo.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Maps"
});

/**
 * Yahoo Satellite (http://maps.yahoo.com/)
*/
OpenLayers.Layer.cdauth.Yahoo.Satellite = OpenLayers.Class(OpenLayers.Layer.cdauth.Yahoo.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Yahoo.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: YAHOO_MAP_SAT}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Satellite"
});

/**
 * Yahoo Hybrid (Streets and Satellite)
*/
OpenLayers.Layer.cdauth.Yahoo.Hybrid = OpenLayers.Class(OpenLayers.Layer.cdauth.Yahoo.Maps, {
	initialize: function(name, options) {
		OpenLayers.Layer.cdauth.Yahoo.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: YAHOO_MAP_HYB}, options) ]);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Hybrid"
});

/**
 * Extends a FramedCloud with various useful features. An event is triggered during closing instead of passing the callback function
 * to the initialize function. You may pass a DOM element for the popup content instead of HTML code.
 * This FramedCloud supports the OpenLayers.Popup.OPACITY setting. On mouse over, the opacity is set to 1.
 * @event close
*/

OpenLayers.Popup.FramedCloud.cdauth = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
	contentDom: null,
	autoSize: false,
	minSize: new OpenLayers.Size(300, 200),
	_defaultZIndex : null,
	initialize: function(id, lonlat, contentSize, contentDom, anchor, closeBox, closeBoxCallback) {
		var closeCallback = function(e){ if(closeBoxCallback) closeBoxCallback(); OpenLayers.Event.stop(e); this.events.triggerEvent("close"); };
		OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this, [ id, lonlat, contentSize, null, anchor, closeBox, closeCallback ] );

		this.events.addEventType("close");

		this.setContentHTML(contentDom);

		OpenLayers.Event.observe(this.div, "mouseover", OpenLayers.Function.bindAsEventListener(function(){ changeOpacity(this.div, 1.0); }, this));
		OpenLayers.Event.observe(this.div, "mouseout", OpenLayers.Function.bindAsEventListener(function(){ changeOpacity(this.div, this.opacity); }, this));
	},
	setContentHTML: function(contentDom) {
		if(typeof contentDom == "object")
		{
			this.contentDom = contentDom;
			this.contentHTML = null;
		}
		else if(contentDom != null)
		{
			this.contentDom = null;
			this.contentHTML = contentDom;
		}

		if(this.contentHTML != null)
			OpenLayers.Popup.FramedCloud.prototype.setContentHTML.apply(this, arguments);
		else if(this.contentDiv != null && this.contentDom != null && this.contentDom != this.contentDiv.firstChild)
		{
			while(this.contentDiv.firstChild)
				this.contentDiv.removeChild(this.contentDiv.firstChild);
			this.contentDiv.appendChild(this.contentDom);

			// Copied from OpenLayers.Popup.setContentHTML():
			if (this.autoSize)
			{
                this.registerImageListeners();
                this.updateSize();
            }
		}
	},
	setOpacity: function(opacity) {
		if(opacity != undefined)
			this.opacity = opacity;

		if(this.div != null)
		{
			OpenLayers.Util.modifyDOMElement(this.div, null, null, null, null, null, null, this.opacity);
			if(this._defaultZIndex)
				this.div.style.zIndex = this._defaultZIndex;
		}
	},
	unsetOpacity: function() {
		if(this.div != null)
		{
			this._defaultZIndex = this.div.style.zIndex;
			OpenLayers.Util.modifyDOMElement(this.div, null, null, null, null, null, null, 1.0);
			this.div.style.zIndex = 2000;
		}
	},
	destroy: function() {
		this.contentDom = null;
		OpenLayers.Popup.FramedCloud.prototype.destroy.apply(this, arguments);
	},
	CLASS_NAME : "OpenLayers.Popup.FramedCloud.cdauth"
});

/**
 * A Markers layer with a function to easily add a marker with a popup.
 * When the layer is hidden, the popups are hidden as well. They open again when the layer is made visible again.
 * @event markersChanged A marker popup has been opened or closed.
*/

OpenLayers.Layer.cdauth.Markers = OpenLayers.Class(OpenLayers.Layer.Markers, {
	defaultIcon : new OpenLayers.Icon('http://osm.cdauth.de/map/marker.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),
	openPopupsOnShow : null,
	initialize : function(name, options) {
		this.openPopupsOnShow = [ ];

		OpenLayers.Layer.Markers.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({zoomableInLayerSwitcher: true, projection: new OpenLayers.Projection("EPSG:4326")}, options) ]);
		this.events.addEventType("markersChanged");

		this.events.register("visibilitychanged", this, function() {
			if(this.getVisibility())
			{ // Layer has been made visible: re-open popups that were hidden during the last hiding
				for(var i=0; i<this.openPopupsOnShow.length; i++)
					this.openPopupsOnShow[i].cdauthFeature.popup.show();
				this.openPopupsOnShow = [ ];
			}
			else
			{ // Hide all popups and save the visible ones
				for(var i=0; i<this.markers.length; i++)
				{
					if(this.markers[i].cdauthFeature.popup.visible())
					{
						this.openPopupsOnShow.push(this.markers[i]);
						this.markers[i].cdauthFeature.popup.hide();
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
	 * @return The newly created OpenLayers.Marker object. It contains the additional property cdauthFeature, which is the OpenLayers.Feature
	 * that connects the marker with the popup. The marker triggers the events “open” or “close” when changing the visibility of the popup.
	*/
	createMarker : function(lonlat, popupContent, popupVisible, icon, noPan) {
		var feature = new OpenLayers.Feature(this, lonlat.clone().transform(this.projection, this.map.getProjectionObject()));
		feature.data.icon = icon ? icon : this.defaultIcon.clone();
		if(popupContent)
		{
			feature.popupClass = OpenLayers.Popup.FramedCloud.cdauth;
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
		marker.cdauthFeature = feature;
		this.addMarker(marker);
		return marker;
	},
	removeMarker : function(marker)
	{
		if(marker.cdauthFeature && marker.cdauthFeature.popup)
			marker.cdauthFeature.popup.destroy();
		OpenLayers.Layer.Markers.prototype.removeMarker.apply(this, arguments);
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.Markers"
});

/**
 * A Markers layer for adding LonLat markers. These markers display their coordinates and list various Permalinks to other map services.
 * See OpenLayers.Control.cdauth.createMarker for the functionality of creating a marker when clicking.
 * @event markerAdded
 * @event markerRemoved
*/

OpenLayers.Layer.cdauth.Markers.LonLat = OpenLayers.Class(OpenLayers.Layer.cdauth.Markers, {
	/**
	 * The projection in which coordinates should be displayed in the popups.
	*/
	readableProjection : new OpenLayers.Projection("EPSG:4326"),

	/**
	 * @param OpenLayers.Icon defaultIcon The icon to be used for the markers added by addLonLatMarker()
	*/
	initialize : function(name, options) {
		OpenLayers.Layer.cdauth.Markers.prototype.initialize.apply(this, arguments);
		this.events.addEventType("markerAdded");
		this.events.addEventType("markerRemoved");

		this.events.register("markerAdded", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
		this.events.register("markerRemoved", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
	},
	addLonLatMarker : function(lonlat, title, icon)
	{
		var layer = this;

		var marker = this.createMarker(lonlat, ".", true);
		if(title)
			marker.cdauthTitle = title;
		marker.events.register("close", this, function(evt) { var feature = marker.cdauthFeature; delete marker.cdauthFeature; this.removeMarker(marker); feature.destroyMarker(); feature.destroyPopup(); this.events.triggerEvent("markerRemoved"); OpenLayers.Event.stop(evt); });
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
			if(this.markers[i].cdauthTitle)
			{
				var heading = document.createElement("h6");
				heading.className = "marker-heading";
				heading.appendChild(document.createTextNode(this.markers[i].cdauthTitle));
				content.appendChild(heading);
			}
			content.appendChild(makePermalinks(this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.readableProjection), this.map.getZoom()));
			this.markers[i].cdauthFeature.popup.setContentHTML(content);
		}
	},
	getQueryObject : function() {
		var obj = { };
		for(var i=0; i<this.markers.length; i++)
		{
			var lonlat = this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.readableProjection);
			obj[i] = {
				lon : Math.round(lonlat.lon*100000000)/100000000,
				lat : Math.round(lonlat.lat*100000000)/100000000
			};
			if(this.markers[i].cdauthTitle)
				obj[i].title = this.markers[i].cdauthTitle;
		}
		return obj;
	},
	setQueryObject : function(obj) {
		this.clearMarkers();
		for(var i in obj)
		{
			if(obj[i].lon == undefined || obj[i].lat == undefined)
				continue;
			this.addLonLatMarker(new OpenLayers.LonLat(1*obj[i].lon, 1*obj[i].lat), (obj[i].title != undefined) ? htmlspecialchars(obj[i].title) : null);
		}
	},

	CLASS_NAME : "OpenLayers.Layer.cdauth.Markers.LonLat"
});

/**
 * A click control to add markers to a OpenLayers.Layer.cdauth.Markers.LonLat layer.
 * Add an instance of this to your map using OpenLayers.Map.cdauth.addControl() and activate() it.
*/

OpenLayers.Control.cdauth.CreateMarker = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * @var OpenLayers.Layer.cdauth.Markers.LonLat
	*/
	cdauthLayer : null,

	title : OpenLayers.i18n("Create a marker"),

	/**
	 * @param OpenLayers.Layer.cdauth.Markers.LonLat cdauthLayer
	*/
	initialize: function(cdauthLayer, options) {
		this.cdauthLayer = cdauthLayer;

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

		var lonlat = this.map.getLonLatFromViewPortPx(e.xy).clone().transform(this.map.getProjectionObject(), this.cdauthLayer.projection);
		this.cdauthLayer.addLonLatMarker(lonlat);
	},

	CLASS_NAME: "OpenLayers.Control.cdauth.CreateMarker"
});

if(OpenLayers.cdauth == undefined)
	OpenLayers.cdauth = { };

/**
 * An abstract class whose implementations connect to a NameFinder.
*/
OpenLayers.cdauth.NameFinder = OpenLayers.Class({
	/**
	 * Perform a search through a NameFinder. This function itself does not connect to an actual NameFinder, it only finds one result if
	 * the query String consists of coordinates encoded in a Lat,Lon string or an OpenStreetMap Permalink.
	 * @param String query The query string.
	 * @param Function callbackFunction A function that is executed when the search has been performed. The function takes one argument that
	 *                                  contains an array with the results. It is undefined if an error has occurred. Each result is an object
	 *                                  with the following properties:
	 *                                  * OpenLayers.LonLat lonlat The coordinates of the result
	 *                                  * String name: The title of the result.
	 *                                  * String info: Some additional information about the result, such as the type.
	 *                                  * function getZoom(OpenLayers.Map): Returns the zoom level that the search result should be displayed at on the given map.
	 *                                  * Node osm: The associated OSM object or null.
	 * @return void
	*/
	find : function(query, callbackFunction) {
		query.replace(/^\s+/, "").replace(/\s+$/, "");
		var query_match;
		var query_urlPart;
		if(query_match = query.match(/^http:\/\/(www\.)?osm\.org\/go\/([-A-Za-z0-9_@]+)/))
		{ // Coordinates, shortlink
			var shortlink = decodeShortLink(query_match[2]);
			results = [ {
				lonlat : shortlink.lonlat,
				info : OpenLayers.i18n("Coordinates"),
				name : shortlink.lonlat.lat + ", " + shortlink.lonlat.lon,
				getZoom : function(map) {
					return shortlink.zoom;
				}
			} ];
			callbackFunction(results);
		}
		else if(query_match = query.match(/^(-?\s*\d+([.,]\d+)?)\s*[,;]?\s*(-?\s*\d+([.,]\d+)?)$/))
		{ // Coordinates
			results = [ {
				lonlat : new OpenLayers.LonLat(query_match[3].replace(",", ".").replace(/\s+/, ""), query_match[1].replace(",", ".").replace(/\s+/, "")),
				info : OpenLayers.i18n("Coordinates"),
				getZoom : function(map) {
					return 15;
				}
			} ];
			results[0].name = results[0].lonlat.lat+","+results[0].lonlat.lon;
			callbackFunction(results);
		}
		else if((query_match = query.match(/^http:\/\/.*\?(.*)$/)) && typeof (query_urlPart = decodeQueryString(query_match[1])).lon != "undefined" && typeof query_urlPart.lat != "undefined")
		{ // OpenStreetMap Permalink
			results = [ {
				lonlat : new OpenLayers.LonLat(query_urlPart.lon, query_urlPart.lat),
				info : OpenLayers.i18n("Coordinates"),
				name : query_urlPart.lat + ", " + query_urlPart.lon,
				zoomCallback : function(map) {
					if(query_urlPart.zoom == undefined)
						return 15;
					else
						return 1*query_urlPart.zoom;
				}
			} ];
			callbackFunction(results);
		}
		else
			callbackFunction([ ]);
	},

	/**
	 * Returns an array of the position and length of an actual place that is searched for with the given query.
	 * If a name finder for example allows to search for supermarkets in London using the query string
	 * "supermarket, London, UK" then this function would return (13, 9) which is "London, UK" in that string.
	 * This is important for the auto-suggest feature as you only want to get suggestions for actual places, not
	 * for POIs that you search for.
	 * @param String query
	 * @return Array An array of offset and length of the location part or null if there is no such
	*/
	getLocationPart : function(query) {
		return [ 0, query.length ];
	},

	/**
	 * Initilise an auto-suggest feature on a text input field that will use this NameFinder.
	 *
	 * Creates the following properties on the input node:
	 * - cdauthAutocompleteTimeout
	 * - cdauthAutocompleteLoadingValue
	 * - cdauthAutocompleteLoadedValue
	 * - cdauthAutocompleteList
	 * - cdauthAutocompleteResults: The list of results returned by the namefinder
	 * - cdauthAutocompleteSelected
	 * @param Element input The DOM node of a text input field.
	 * @return void
	*/
	initAutoSuggest : function(input) {
		input.setAttribute("autocomplete", "off");

		// Opera fix
		input.style.position = "relative";

		var namefinder = this;

		OpenLayers.Event.observe(input, "keypress", OpenLayers.Function.bindAsEventListener(this._autoSuggestKeyPress, this));

		var clickOpener = OpenLayers.Function.bindAsEventListener(function() { this._openAutoSuggest(input); }, this);

		OpenLayers.Event.observe(input, "focus", OpenLayers.Function.bindAsEventListener(function(e){
			setTimeout(function(){ OpenLayers.Event.observe(input, "click", clickOpener); }, 150);
		}, this));
		OpenLayers.Event.observe(input, "blur", OpenLayers.Function.bindAsEventListener(function(e){
			OpenLayers.Event.stopObserving(input, "click", clickOpener);
		}, this));

		// Wait some time before closing the suggestion list on blur so that clicking the results still works
		OpenLayers.Event.observe(input, "blur", OpenLayers.Function.bindAsEventListener(function(){ setTimeout(function(){ namefinder._closeAutoSuggest(input); }, 150) }, this));
	},

	_autoSuggestKeyPress : function(e) {
		var input = e.target || e.srcElement;
		var namefinder = this;

		var kc_down = 40;
		var kc_up = 38;
		var kc_return = 13;
		var kc_enter = 14;
		var kc_escape = 27;

		if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey)
		{
			if(e.keyCode == kc_down || e.keyCode == kc_up)
			{
				this._openAutoSuggest(input);
				if(input.cdauthAutocompleteResults == null)
					return true;

				var currentIndex = -1;
				if(input.cdauthAutocompleteSelected != null)
				{
					this._unselectAutoSuggestItem(input, input.cdauthAutocompleteSelected);
					currentIndex = input.cdauthAutocompleteSelected.i;
					input.cdauthAutocompleteSelected = null;
				}

				if(currentIndex == -1)
					currentIndex = (e.keyCode == kc_up ? input.cdauthAutocompleteResults.length-1 : 0);
				else
				{
					currentIndex += (e.keyCode == kc_up ? -1 : 1);
					if(currentIndex < 0)
						currentIndex += input.cdauthAutocompleteResults.length;
					else if(currentIndex >= input.cdauthAutocompleteResults.length)
						currentIndex -= input.cdauthAutocompleteResults.length;
				}

				input.cdauthAutocompleteSelected = input.cdauthAutocompleteResults[currentIndex];
				this._selectAutoSuggestItem(input, input.cdauthAutocompleteSelected);

				OpenLayers.Event.stop(e);
				return false;
			}
			else if(e.keyCode == kc_return || e.keyCode == kc_enter)
			{
				if(input.cdauthAutocompleteSelected)
				{
					input.value = input.cdauthAutocompleteSelected.name;
					this._closeAutoSuggest(input);
					OpenLayers.Event.stop(e);
					return false;
				}
				else
				{
					if(input.cdauthAutocompleteTimeout != null)
						clearTimeout(input.cdauthAutocompleteTimeout);
					if(input.cdauthAutocompleteList && input.cdauthAutocompleteList.style.display != "none")
						this._closeAutoSuggest(input);
				}
				return true;
			}
			else if(e.keyCode == kc_escape)
			{
				if(input.cdauthAutocompleteList && input.cdauthAutocompleteList.style.display != "none")
				{
					this._closeAutoSuggest(input);
					OpenLayers.Event.stop(e);
					return false;
				}
			}
		}

		if(input.cdauthAutocompleteTimeout != null)
			clearTimeout(input.cdauthAutocompleteTimeout);
		input.cdauthAutocompleteTimeout = setTimeout(function(){ namefinder._openAutoSuggest(input); }, 500);
		return true;
	},

	_openAutoSuggest : function(input) {
		var offset = this.getLocationPart(input.value);
		var val = (offset == null ? input.value : input.value.substr(offset[0], offset[1]));
		var valOrig = input.value;

		if(input.cdauthAutocompleteLoadingValue != null && input.cdauthAutocompleteLoadingValue == val)
		{ // List is already present, only make it visible again
			if(input.cdauthAutocompleteList != null)
				input.cdauthAutocompleteList.style.display = "block";
			return;
		}

		if(val == "" || (offset == null || offset[1] < 3))
		{
			this._closeAutoSuggest(input);
			return;
		}

		var namefinder = this;
		input.cdauthAutocompleteLoadingValue = val;
		if(offset != null) // If null, there is no location part so no search is useful
			this.find(val, function(results){ input.cdauthAutocompleteLoadedValue = val; namefinder._openAutoSuggestResult(input, results, valOrig); });
	},

	_openAutoSuggestResult : function(input, results, value) {
		// Do not show list if loading has been aborted by _closeAutoSuggest() in the meantime
		if(input.cdauthAutocompleteLoadingValue == null || results == null)
			return;

		var namefinder = this;

		input.cdauthAutocompleteResults = results;

		if(input.cdauthAutocompleteList == null)
		{
			input.cdauthAutocompleteList = document.createElement("ol");
			input.cdauthAutocompleteList.className = "olCdauthAutocomplete";
			input.cdauthAutocompleteList.style.position = "absolute";
			input.cdauthAutocompleteList.style.top = (input.offsetTop + input.offsetHeight) + "px";
			input.cdauthAutocompleteList.style.left = input.offsetLeft + "px";
			input.cdauthAutocompleteList.style.minWidth = input.offsetWidth + "px";
			input.parentNode.appendChild(input.cdauthAutocompleteList);
		}

		while(input.cdauthAutocompleteList.firstChild)
			input.cdauthAutocompleteList.removeChild(input.cdauthAutocompleteList.firstChild);

		var offset = this.getLocationPart(value);

		var foundSelection = false;
		for(var i=0; i<results.length; i++) (function(i)
		{
			var li = document.createElement("li");
			var name = document.createElement("strong");
			name.appendChild(document.createTextNode(results[i].name));
			results[i].name = value.substr(0, offset[0]) + results[i].name + value.substr(offset[0]+offset[1]);
			li.appendChild(name);
			li.appendChild(document.createTextNode(" (" + results[i].info + ")"));
			input.cdauthAutocompleteList.appendChild(li);
			results[i].li = li;
			results[i].i = i;
			if(!foundSelection && input.cdauthAutocompleteSelected != null && input.cdauthAutocompleteSelected.lonlat == results[i].lonlat && input.cdauthAutocompleteSelected.name == results[i].name && input.cdauthAutocompleteSelected.info == results[i].info)
			{
				namefinder._selectAutoSuggestItem(input, results[i]);
				input.cdauthAutocompleteSelected = results[i];
				foundSelection = true;
			}
			li.onmousemove = function() {
				if(input.cdauthAutocompleteSelected != null)
					namefinder._unselectAutoSuggestItem(input, input.cdauthAutocompleteSelected);
				input.cdauthAutocompleteSelected = results[i];
				namefinder._selectAutoSuggestItem(input, results[i]);
			};
			li.onclick = function() {
				input.value = results[i].name;
				namefinder._closeAutoSuggest(input);
			};
		})(i);

		if(!foundSelection)
			input.cdauthAutocompleteSelected = null;

		input.cdauthAutocompleteList.style.display = "block";
	},

	_closeAutoSuggest : function(input) {
		if(input.cdauthAutocompleteTimeout != null)
			clearTimeout(input.cdauthAutocompleteTimeout);

		// Prevent showing the list if find() is currently waiting for a response
		input.cdauthAutocompleteLoadingValue = null;

		if(input.cdauthAutocompleteList != null)
			input.cdauthAutocompleteList.style.display = "none";
		if(input.cdauthAutocompleteSelected != null)
		{
			this._unselectAutoSuggestItem(input, input.cdauthAutocompleteSelected);
			input.cdauthAutocompleteSelected = null;
		}
	},

	_selectAutoSuggestItem : function(input, item)
	{
		item.li.className = "selected";

		// Scroll to item
		var list = input.cdauthAutocompleteList;
		if(list == null || list.scrollTop == undefined)
			return;

		var itemTop = item.li.offsetTop;
		var itemBottom = itemTop + item.li.offsetHeight;

		if(itemTop < list.scrollTop) // Need to scroll up
			list.scrollTop = itemTop;
		else if(itemBottom > list.scrollTop + list.offsetHeight) // Need to scroll down
			list.scrollTop = itemBottom - list.offsetHeight;
	},

	_unselectAutoSuggestItem : function(input, item)
	{
		item.li.className = "";
	}
});

/**
 * An implementation of the NameFinder that contacts Nominatim (http://wiki.openstreetmap.org/wiki/Nominatim).
*/
OpenLayers.cdauth.NameFinder.Nominatim = OpenLayers.Class(OpenLayers.cdauth.NameFinder, {
	nameFinderURL : "http://nominatim.openstreetmap.org/search",

	/**
	 * List of special phrases from http://wiki.openstreetmap.org/wiki/Nominatim/Special_Phrases
	*/
	specialWords : [
		"Aanlegplaats", "Abandoned Railway", "Acantilado", "Acceso a Internet inalámbrico", "Acceso de emergencia", "Accès WiFi", "Administratieve grens", "Administrative Boundary", "Aéroport", "Aeroporto", "Aeroporto", "Aéroport", "Aeropuerto", "Aeropuerto", "Afstandsmarkering",
		"Afvoerkanaal", "Agence de voyage", "Agencia de viajes", "Agenzia di viaggi", "Agenzia immobiliare", "Agrarisch gebouw", "Agua bebestible", "Agua", "Áin", "Áin", "Aire de jeux", "Aireportu", "Aireportu", "Airport", "Airport",
		"Ajándékbolt", "Albergue", "Aldea", "Aldiri", "Algemene winkel", "Alimentari", "Állatkert", "Allotments", "Almacén", "Almenda", "Alpine Hut", "Alquiler de bicicletas", "Alquiler de vehículos", "Altaar langs de weg", "Altersheim",
		"Altzari", "Amarre", "Amarre", "Ambasciata", "Ambassade", "Ameublement", "Antzokia", "Aparcamiento", "Aparcamiento de bibicletas", "Apartment Block", "Apotheek", "Apotheek", "Apotheek", "Apotheke", "Apparel Shop",
		"Appartementen", "Árbol", "Arbre", "Archaeological Site", "Archeologische vindplaats", "Archeologiske wurywanišćo", "área comercial", "Área de juegos", "Área de pesca", "Área de picnic", "Área de recepción", "Área no incorporada", "Área recreativa", "Arrecife", "Arrêt de bus",
		"Arrêt de bus", "Arrêt de métro", "Arrêt de train historique", "Arrêt de train", "Arrêt de tram", "Arrezife", "Arroyo", "Arts Centre", "Art Shop", "Artwork", "Arzt", "Aseguradora", "Aseos", "Assicurazioni", "Assurance",
		"Astillero", "Aterpe alpinoa", "Aterpe", "Atletiekbaan", "ATM", "Atracción", "Atrakcija", "Atrakzio", "Attractie", "Attraction", "Attraktion", "Auberge", "Auditorio", "Auditorium", "Ausgrabungsstätte",
		"Aussichtspunkt", "Autóalkatrész", "Autobahn", "Autobahnkreuz", "Autobus-geltoki", "Autobus-geraleku", "Autodealer", "Autodelen", "Autoescuela", "Autoeskola", "Autogarage", "Autohaus", "Autohaus", "Autókölcsönző", "Autolavado",
		"Autolavaggio", "Automaat", "Automat", "Automaterialenwinkel", "Autómosó", "Autonoleggio", "Autoonderdelen", "Autoroute en construction", "Autoroute", "Autósiskola", "Autosnelweg", "Autosnelwegknooppunt", "Autosnelwegverbindingsweg", "Autoverhuur", "Autovermietung",
		"Autovía", "Autowaschanlage", "Autowasstraat", "Autoweg", "Autowerkstatt", "Awditorij", "Awditorium", "Awtodroga", "Awtodróha", "Awtodróhowe křižnišćo", "Awtodróhowy wotpočny hosćenc", "Awtomat", "Awtomyjernja", "Awtosalon", "Awtowa porjedźernja",
		"Awtowa přenajimarnja", "Awtowe narunanki", "Ayuntamiento", "Ayuntamiento", "Aztarnategi arkeologiko", "Baai", "Bach", "Bäckerei", "Bác sĩ", "Badia", "Badplaats", "Bærinn", "Bagno", "Bagno", "Bahía",
		"Bahnhof", "Bahnhof", "Bahno", "Bahno", "Bahnsteig", "Baia", "Bãi biển", "Baie", "Bãi Thể thao", "Bakaríið", "Bakery", "Bakkerij", "Banca", "Banc", "Banco",
		"Banco", "Banco de arena", "Banka", "Bank", "Bankje", "Bankjegykiadó automata", "Bankomat", "Banku", "Banque", "Bảo hiểm", "Bảo tàng", "Bảo tàng", "Bảo tồn", "Bara", "Bar",
		"Bar", "Barazki-saltzaile", "Barinn", "Barkácsbolt", "Barlangbejárat", "Barrage", "Basenk", "Basin", "Baso", "Baso", "Bassin", "Bâtiment", "Bâtiment hospitalier", "Bâtiment industriel", "Bâtiment public",
		"Battlefield", "Baumarkt", "Baum", "Baustelle", "Bay", "Beach", "Beach Resort", "Beauty Shop", "Bed and Breakfast", "Beek", "Begraafplaats", "Begraafplaats", "Běhanišćo", "Behatoki", "Bejaardenhuis",
		"Bench", "Bệnh viện", "Benne à ordures", "Bể nước", "Berghütte", "Berghut", "Bergkam", "Berg", "Běrow", "Běrowowe twarjenje", "Beschutting", "Bestattungsunternehmen", "Beverages Shop", "Biblioteca", "Bibliotheek",
		"Bibliothèque", "Bicycle Shop", "Bidaia-agentzia", "Biển", "Bigarren mailako errepide", "Bigarren mailako errepide", "Bijouterie", "Bijzonder uitzicht", "Bílabúðin", "Bílaþvottastöðin", "Bioscoop", "Biowobchod", "Birziklatze gune", "Bitwišćo", "Bizileku",
		"Bjezgmejnska kónčina", "Bjezgrotowy internetny přistup", "Blanchisserie", "Bloemist", "Blómabúðin", "Błoto", "Błóto", "Blumenladen", "Boatyard", "Bờ biển", "Bocna droga", "Boekenwinkel", "Boerderij", "Boerderij", "Boerenerf",
		"Boerenwinkel", "Bois", "Boîte de nuit", "Boîte postale", "Bókabúðin", "Bókasafnið", "Bom", "Book Shop", "Boom", "Bordeel", "Bordel", "Bordell", "Borgin", "Borne kilométrique", "Borne kilométrique",
		"Börtön", "Bos", "Bos", "Bosque", "Bouche de métro", "Boucher", "Boue", "Boulangerie", "Boundary Stone", "Boutique d'art", "Boutique de cadeaux", "Boži dom", "Bóžy dom", "Braakliggend terrein", "Brandkraan",
		"Brandstof", "Brandweer", "Brezal", "Bricolage", "Bridleway", "Brievenbus", "Brod", "Bród", "Bron", "Bron", "Brothel", "Broussailles", "Brownfield Land", "Brunahaninn", "Brunnen",
		"Bruyère", "Bücherei", "Buchgeschäft", "Bucht", "Building Block", "Building Entrance", "Building", "Buitensportwinkel", "Buitenwijk", "Bulego", "Bundesland/-staat", "Bunker", "Burdel", "Bureau", "Bureau de change",
		"Bureau de Change", "Büro", "Bürogebäude", "Busbahnhof", "Bushalte", "Bushalte", "Bushaltestelle", "Busowe dwórnišćo", "Busowe zastanišćo", "Bus Station", "Bus Stop", "Buszállomás", "Buszmegálló", "Butcher", "Bútor",
		"Bưu điện", "Buzón de correos", "Bydlenja", "Bydleńska droga", "Bydlenska hasa", "Bydlenske twarjenje", "Bydlenski blok", "Bydlenski blok", "Bydlenski wobwod", "Byway", "Bźezgmejnske strony", "Cabaña alpina", "Cabin", "Cabo", "Cadeauwinkel",
		"Cafe", "Café", "Café", "Cajero automático", "Cama y desayuno (B&B)", "Camino", "Camino prioritario para peatones y caballos", "Campamento", "Campingowanišćo", "Campingowanišćo za caravany", "Camping para caravanas", "Campingplatz", "Campo de batalla", "Campo de golf", "Camp Site",
		"Canal de délaissement", "Canal guiado de autobuses", "Canal", "Canal", "Cancha deportiva", "Cảnh sát", "Cape", "Capilla", "Cap", "CAP", "Característica", "Caravankampeerterrein", "Caravan Site", "Carburant", "Car Dealer",
		"Carnicería", "Car Parts", "Carpet Shop", "Car Rental", "Car Repair", "Carretera nacional", "Carretera primaria", "Carretera principal", "Carretera secundaria", "Carretera secundaria", "Carretera terciaria", "Carsharing", "Car Sharing", "Car Shop", "Car Wash",
		"Casa", "Casa de cambio", "Casa", "Casas", "Cascada", "Cascade", "Caserne des pompiers", "Casino", "Casinò", "Cassetta delle lettere", "Castello", "Castillo", "Castle", "Cầu thang", "Cave Entrance",
		"Cây", "Cây xăng", "Cementerio", "Cementerio", "Cemetery", "Centrala za sobujěducych", "Centrala za sobujězdźenje", "Centre commercial", "Centre communautaire", "Centre d'arts", "Centre de jardinage", "Centre de santé", "Centre pour la jeunesse", "Centre sportif", "Centro artístico",
		"Centro comercial", "Centro comercial", "Centro comunitario", "Centro deportivo", "Centro de salud", "Centro juvenil", "Centrum za młodostnych", "Cesto de basura", "Chalet", "Champ de bataille", "Channel", "Chapel", "Charity Shop", "Chata", "Château",
		"Chemin de fer à voie étroite", "Chemin", "Chemin piéton", "Chemin piéton", "Chemist", "Chenal", "Chěžka", "Chiến trường", "Chiesa", "Chiesa", "Chimiste", "Chirurgie vétérinaire", "Chợ", "Chỗ Đậu xe", "Chỗ Đậu Xe buýt",
		"Chỗ Đậu Xe đạp", "Chódnik", "Chódnik", "Chỗ Mướn Xe", "Chỗ Mướn Xe đạp", "Chợ phiên", "Chợ phiên", "Chorownja", "Chorownja", "Chợ", "Church", "Church", "Chute d'eau", "Chyža", "Cimetière",
		"Cimetière", "Cimitero", "Cine", "Cinema", "Cinéma", "Circuit", "Čisćernja", "City Hall", "City", "Ciudad", "Cliff", "Clínica", "Clinic", "Clínica veterinaria", "Clinique",
		"Clothes Shop", "Club", "Club nocturno", "Club social", "Coastline", "Code postal", "Código postal", "Coiffeur", "Cỏ", "Colina", "College", "Collège", "Colline", "Combustible", "Comida rápida",
		"Commerce", "Commercial Area", "Commercial Building", "Commercieel gebied", "Commercieel gebouw", "Common Land", "Community Centre", "Complejo en la playa", "Compras", "Computergeschäft", "Computer Shop", "Computerwinkel", "Concesionario de automóviles", "Concessionaria", "Condado",
		"Confectionery Shop", "Confiserie", "Cổng", "Công trường Xây dựng", "Công viên", "Công viên", "Công viên", "Conservation", "Construction", "Convenience Store", "Coo", "Coowobchod", "Copyshop", "Copy Shop", "Cosmeticawinkel",
		"Cosmetics Shop", "Costa", "Country", "County", "Courthouse", "Cratère", "Crater", "Cráter", "Crematorio", "Crematorium", "Crématorium", "Crème glacée", "Cresta", "Crête", "Cruce de autovías",
		"Cửa hàng Xe hơi", "Cửa hàng Xe mô tô", "Cửa vào", "Cycle Parking", "Cycle Path", "Cycle Rental", "Cyrkej", "Cyrkej", "Đài Kỷ niệm", "Dalokodróha", "Dalokodróha", "Dalokowobchadowa droga", "Dalokowobchadowa droga", "Dalokowobchadowa droga se twari", "Dalurinn",
		"Dalurinn", "Đầm lầy", "Dam", "Đảo", "Đảo", "Đất", "Debjenkowy wobchod", "Deelgebied", "Denda", "Denda", "Đền thánh Dọc đường", "Dentista", "Dentist", "Dentiste", "Department Store",
		"Derelict Canal", "Desagüe", "Détroit", "Địa phương", "Điện thoại Công cộng", "Điện thoại Khẩn cấp", "Dierenarts", "Dierentuin", "Dierenwinkel", "Digue", "Đỉnh", "Discount Items Shop", "Discountwinkel", "Diskoteka", "Distance Marker",
		"Distributeur automatique", "Distributeur automatique de billets", "Distributore automatico", "District", "District", "Disused Railway", "Disused Railway Station", "Ditch", "Dobroćelski wobchod", "Dock", "Docteurs", "Doctores", "Doctors", "Doe-het-zelf-winkel", "Đồi",
		"Do-It-Yourself", "Dokter", "Dok", "Doł", "Doł", "Domb", "Dom", "Dom", "Dom", "Domy", "Đồng cỏ", "Dòng suối", "Dorf", "Dormitorio", "Dormitorio",
		"Dormitory", "Dormitory", "Dorp", "Dorre", "Dorre", "Dortoir", "Dortoir", "Drain", "Drastowy wobchod", "Drastowy wobchod", "Drinking Water", "Drinkwater", "Driving School", "Droga drugego rěda", "Droga drugego rěda",
		"Droga", "Droga prědnego rěda", "Droga prědnego rěda", "Droga tśeśego rěda", "Droga z pómjeńšonym wobchadom", "Drogerija", "Dróha druheho rjada", "Dróha druheho rjada", "Dróha", "Dróha prěnjeho rjada", "Dróha prěnjeho rjada", "Dróha so twari", "Dróha třećeho rjada", "Dróha za přidróžnych", "Drožka za pěskowarjow",
		"Drugstore", "Dry Cleaning", "Dulcería", "Đường bộ", "Đường bộ Lớn", "Đường Cao tốc", "Đường Chính", "Đường Chính", "Đường Cưỡi ngựa", "Đường Đang Xây", "Đường đua", "Đường", "Đường Không Lát", "Đường Lớn", "Đường mòn",
		"Đường Một Ray", "Đường Nhỏ", "Đường phụ", "Đường sắt Đang Xây", "Đường sắt", "Đường sắt Leo núi", "Đường Trượt tuyết", "Đường Xe đạp", "Dwórnišćo", "Dwórnišćo", "Dypk", "Dýragarðurinn", "Dźiwadło", "Eau", "Eau potable",
		"Éboulis", "Échalier", "Écluse", "École", "École de conduite", "Edificio comercial", "Edificio de oficinas", "Edificio escolar", "Edificio", "Edificio hospitalario", "Edificio industrial", "Edificio pubblico", "Edificio público", "Edificio público", "Edificio universitario",
		"Eenkamerappartement", "Église", "Église", "Egyetem", "Egyetemi épület", "Ehemaliger Bahnhof", "Eilandje", "Eiland", "Eiland", "Einkaufszentrum", "Einkaufszentrum", "Eisdiele", "Eisenbahn im Bau", "Eisenbahn", "Eisenwarenhändler",
		"Eldfjallið", "Electronics Shop", "Elektronicawinkel", "Elektronikgeschäft", "Eliza", "Eliza", "Embajada", "Embalse", "Embassy", "Emergency Access Point", "Emergency Phone", "Enbaxada", "Enfermería", "Enparantza", "Entrada a cueva",
		"Entrée de grotte", "Eo biển", "Épicerie", "Építés alatt álló autópálya", "Épületbejárat", "Eraikina", "Eraikin publiko", "Eraikin publiko", "Erhebung", "Erosketak", "Errauste labe", "Errepide", "Errepide nagusi", "Escalera para atravesar verjas", "Escalones",
		"Esclusa", "Escuela", "Eskailera-mailak", "Eskolaurre", "Eskualde", "Espetxe", "Estación de autobuses", "Estación de bomberos", "Estación de metro", "Estación de tren", "Estadio", "Estadio", "Estado o provincia", "Estate Agent", "Estrecho",
		"Estudio", "État", "Etenswarenwinkel", "Etxeak", "Etxe", "Etxe", "Eyjan", "Faculteitsgebouw", "Faculty Building", "Fahrradgeschäft", "Fahrrad-Stellplatz", "Fahrschule", "Fakultowe twarjenje", "Falaise", "Falu",
		"Fa", "Fangelsið", "Farmacia", "Farmacia", "Farma", "Farma", "Farmazia", "Farmazia", "Farm Building", "Farmland", "Farm", "Farm", "Farm Shop", "Farmyard", "Farsímaverslunin",
		"Fashion Shop", "Fast food", "Fast Food", "Fatabúðin", "Feature", "Feldweg", "Fellið", "Fell", "Ferðaskrifstofan", "Fermata autobus", "Ferme", "Ferme", "Ferretería", "Ferry terminal", "Ferry Terminal",
		"Feuerwehr", "Fietsenstalling", "Fietsenwinkel", "Fietspad", "Fietsverhuur", "Fioraio", "Fiordo", "Fire Hydrant", "Fire Station", "Fischereigrund", "Fishing Area", "Fish Shop", "Fiskbúðin", "Fitnesowy center/Fitnesowe studijo", "Fitness Centre / Gym",
		"Fitnesscentrum", "Fitness /gymnastique", "Fitness-Zentrum", "Fjallið eða tindurinn", "Fjeld", "Fjell", "Fjel", "Fjord", "Fjörðurinn", "Flats", "Fleuriste", "Floristería", "Florist", "Flughafen", "Flughafen",
		"Flugvöllurinn", "Flugvöllurinn", "Fluss", "Fluss", "Fogorvos", "Folyó", "Fonction", "Fontaine", "Fontein", "Food Shop", "Footpath", "Ford", "Forest", "Forêt", "Forêt",
		"Forrás", "Fossé", "Fossinn", "Fotograf", "Fotowinkel", "Fountain", "Friedhof", "Friedhof", "Frisörsalon", "Frizerski salon", "Frontera administrativa", "Fruttivendolo", "Fruttivendolo", "Fuel", "Fuente",
		"Fuente mineral", "Funeral Directors", "Funicular Railway", "Funkcija", "Furniture", "Furt", "Fußweg", "Gæludýrabúðin", "Gailur", "Galería", "Galerie marchande", "Galerie", "Galerija", "Gallery", "Ga ra",
		"Garage", "Garaje", "Garaža", "Garázs", "Garden Centre", "Garden", "Gastenverblijf", "Gate", "Gau-klub", "Gaztelu", "Gebouw", "Gecultiveerd areaal", "Gedenkstätte", "Gefängnis", "Gehöft",
		"Gehucht", "Geiser", "Géiser", "Gejzír", "Gelateria", "Geldautomaat", "Geldautomat", "Gelijkvloerse kruising", "Gemakswinkel", "Gemeenschapscentrum", "Gemeentehuid", "Gemeentehuis", "Gemeentehuis", "Gemeente", "Gemeentevrij gebied",
		"General Store", "Gereedschappenwinkel", "Geschäft", "Geschäft", "Geschenkeladen", "Getränkemarkt", "Gevangenis", "Geyser", "Geysir", "Gezondheidscentrum", "Ghế", "Ghiacciaio", "Gift Shop", "Gígurinn", "Gimnasio",
		"Gioielleria", "Gipfel", "Gîte", "Gjafabúðin", "Glaciar", "Glacier", "Glaziar", "Gleccser", "Gletscher", "Gletsjer", "Gmejna", "Gmejnski centrum", "Gmejnski kraj", "Golfbaan", "Golf Course",
		"Golf miniature", "Golfowišćo", "Golfownišćo", "Golfplatz", "Golf-zelai", "Góntwarske sedło", "Górka", "Górski chromcyk", "Górski grjebjeń", "Gósćeńc", "Gósćeńc pśi awtodroze", "Goshverinn", "Góstny dom", "Gozotegi", "Grada",
		"Grajkanišćo", "Grand magasin", "Granja", "Granja", "Gras", "Grass", "Grave Yard", "Greenfield Land", "Greengrocer", "Grenspaal", "Grocery Shop", "Groenteboer", "Groentenwinkel", "Grotingang", "Gué",
		"Guest House", "Gufubaðið", "Guided Bus Lane", "Gyalogút", "Gyógyszertár", "Gyorsétterem", "Hæðin", "Hafið", "Hairdresser", "Hala", "Hal", "Halbolt", "Hal", "Hall", "Hall",
		"Haltepunkt", "Hameau", "Hamlet", "Hàng xóm", "Haran", "Haran", "Harategi", "Hardware Store", "Harrobi", "Hasa z pomjeńšenym wobchadom", "Haurtzaindegi", "Haus", "Haut-fond", "Házak", "Ház",
		"Health Centre", "Heath", "Heide", "Helados", "Helling", "Hellisop", "Herbe", "Herdenkingsmonument", "Herrialdea", "Herria", "Herrixka", "Herrixka", "Hersvæðið", "Heuvel", "Hidrante",
		"Hi-fi", "Hi-Fi", "Highway under Construction", "Hilerri", "Hilerri", "Hill", "Hiria", "Hirugarren mailako errepide", "Historic Railway Station", "Historisches Gebäude", "Historiske dwórnišćo", "Hjólabúðin", "Hladarnja", "Hljómtækjabúðin", "Hochschule",
		"Hochstand", "Hồ Đánh cá", "Höhleneingang", "Hola", "Hòm thư", "Hondar-banku", "Hondartza", "Hôpital", "Hora", "Horinski hrjebjeń", "Hórka", "Hórska bawda", "Hórska wuchowanska słužba", "Hosćenc", "Hospital",
		"Hospital Building", "Hospodarske twarjenje", "Hospoda", "Hostel", "Hóstny dom", "Hotel", "Hotel", "Hôtel de ville", "Hótelið", "Hótelið", "Hotel", "House", "House", "House", "Houses",
		"Hout", "Hraðbankinn", "Hrajkanišćo", "Hrjebja", "Hród", "Huis", "Huis", "Huis", "Huizen", "Hunting Stand", "Húsgagnaverslunin", "Húsið", "Hutte", "Hut", "Hverfið",
		"Hydrant", "Ibai", "Ibilgailu-alokairu", "Ice Cream", "Ice Rink", "Icon", "Icoon", "Igerilekua", "Iglesia", "Iglesia", "IJs", "IJsbaan", "Ikona", "Île", "Île",
		"Îlot", "Ilustración", "In aanbouw", "Indicador kilométrico", "Industrial Area", "Industrial Building", "Industrieel gebied", "Industrieel gebouw", "Industriegebiet", "Industrijowa kónčina", "Industrijowe lado", "Industrijowe twarjenje", "Informacija", "Informacije", "Información",
		"Informatie", "Informations", "Information", "Informazioa", "Ingang", "Inmobiliaria", "Insel", "Insel", "Insurance", "Ipari épület", "Irla", "Irla", "Iroda", "Iskola", "Iskolaépület",
		"Isla", "Island", "Island", "Isla", "Isleta", "Islet", "Isola", "Isola", "Itsasertz", "Itsasoa", "Ivóvíz", "Izotz-pista", "Izozkiak", "Íþróttamiðstöðin", "Jachthaven",
		"Jachtowy přistaw", "Jachtowy pśistaw", "Jachttoren", "Jamowy zachod", "Janaridenda", "Jardín de infancia", "Jardin d'enfant", "Jardin", "Jardín", "Jastwo", "Játékbolt", "Jatetxe", "Jěchanski puć", "Jednokolijowa železnica", "Jědźny lód",
		"Jégkrém", "Jeugdcentrum", "Jeugdherberg", "Jewelry Shop", "Jězbna šula", "Jězdna kólej kólejowego busa", "Jězdna šula", "Jökullinn", "Jolastoki", "Jonction d'autoroute", "Jonction ferroviaire", "Joyería", "Jugendhaus", "Jugendherberge", "Juguetería",
		"Juwelier", "Juzgado", "Kaap", "Kabelspoorweg", "Kafejownja", "Kafetegi", "Kaffihúsið", "Kamjenišćo", "Kampeerterrein", "Kanaal", "Kanaal", "Kanal", "Kanal", "Kanpin", "Kantoor",
		"Kantoorartikelenwinkel", "Kantoorgebouw", "Kapałka", "Kapel", "Kapellan", "Kapelle", "Kapera", "Kap", "Kapper", "Kasino", "Kastalinn", "Kasteel", "Kaszinó", "Kaufhaus", "Kávézó",
		"Kazino", "Kênh", "Kěrchow", "Kěrchow", "Kerékpárkölcsönző", "Kerékpárüzlet", "Kereskedelmi épület", "Kerk", "Kerk", "Kerki", "Kert", "Khách sạn", "Khách sạn", "Khách sạn", "Khu Bảo tồn Thiên niên",
		"Khu vực Buôn bán", "Khu vực Công nghiệp", "Khu vực Khảo cổ", "Khu vực Nhà ở", "Khu vực Quân sự", "Khu vực Thương mại", "Khu Vườn Gia đình", "Kilometernik", "Kilometrownik", "Kindergarten", "Kino", "Kiosk nowin", "Kiosko", "Kiosk", "Kiosk Shop",
		"Kioskwinkel", "Kiosque", "Kirche", "Kirche", "Kirkjan", "Kiroldegi", "Kirol denda", "Kirol-portu", "Kjarchob", "Kjarcma", "Kledingwinkel", "Kledingwinkel", "Kleuterschool", "Klif", "Kliniek",
		"Klinika", "Klub", "Kneipe", "Kniharnja", "Knihownja", "Knježi dwór", "Kofejownja", "Kolesowarska šćežka", "Kólnja", "Kompjuterowy wobchod", "Komunak", "Konderria", "Konditarnja", "Könyvesbolt", "Könyvtár",
		"Kopěrowanski wobchod", "Korčma", "Kórház", "Kórházépület", "Kosmetikowy salon", "Kosmetikowy wobchod", "Kraj", "Kraj", "Krankenhaus", "Krankenhaus", "Krater", "Krematorij", "Krematorium", "Krě", "Kruis langs de weg",
		"Kśica awtodrogi", "Kulturny centrum", "Kunstcollectief", "Kunst", "Kunstwerk", "Kunstwinkel", "Kupa", "Kupa", "Kupka", "Kupnica", "Kustlijn", "Kwětkarnja", "Ký túc xá", "Ký túc xá", "Lækurinn",
		"Łakańca", "Lakások", "Landfill", "Landgoed", "Landið", "Land", "Land", "Làng", "Larre", "Lâu đài", "Laundry", "Lavage de voiture", "Lavanderia", "Lavandería", "Lavasecco",
		"Ławka", "Lean To", "Leikfangaverslunin", "Leikhúsið", "Lěkarjo", "Lěkarnja", "Lěkarnja", "Lépcső", "Lěs", "Lěs", "Lětanišćo", "Lětanišćo", "Level Crossing", "Librairie", "Library",
		"Libreria", "Librería", "Liburudenda", "Liburutegia", "Licorería", "Licorería", "Lieu de culte", "Lieu de vacances à la plage", "Lieu non organisé", "Lightrail", "Light Rail", "Limite administrative", "Limpieza en seco", "Linea di costa", "Listaverkið",
		"Listowy kašćik", "Littoral", "Living Street", "Localidad", "Localité", "Locality", "Location de vélos", "Location de voiture", "Lock Gate", "Lock", "Lod", "Lodojc", "Lodo", "Lodowa hala", "Lodowc",
		"Łódźnica", "Lohi", "Lokalitate", "Loradenda", "Lorategi", "Łoźowa suwanka", "Luchthaven", "Luchthaven", "Łučina", "Łučina", "Łučiny", "Ługowe łuki", "Ługowe łuki", "Łuka", "Luogo di culto",
		"Lurmutur", "Lưu vực", "Mã Bưu điện", "Macellaio", "Magasin", "Magasin", "Magasin d'alimentation biologique", "Magasin d'alimentation", "Magasin d'animaux", "Magasin de beauté", "Magasin de boissons", "Magasin de charité", "Magasin de chaussures", "Magasin de cosmétiques", "Magasin de jouets",
		"Magasin d'électronique", "Magasin de matériel informatique", "Magasin de mode", "Magasin de moto", "Magasin de musique", "Magasin de photocopie", "Magasin de photos", "Magasin de produits agricoles", "Magasin de sport", "Magasin de tapis", "Magasin de téléphones mobiles", "Magasin de vélos", "Magasin de vêtement", "Magasin de vidéos", "Magasin de voitures",
		"Magasin d'habillement", "Magasin discount", "Magasin en plein air", "Magasin généraliste", "Magasin Hi-Fi", "Magasin informatique", "Mairie", "Maison de retraite", "Maison de santé", "Maison d'hôte", "Maison", "Maison", "Maisons", "Makelaar", "Makler z imobilijemi",
		"Mała kupa", "Mall", "Małozahrodki", "Manantial", "Manoir", "Manor", "Máquina expendedora", "Marchand de biens", "Marchand de fruits et légumes", "Marchand de journaux", "Marché", "Marché public", "Marches", "Marché", "Marécage",
		"Mare", "Marina", "Marisma", "Market", "Marketplace", "Market", "Markt", "Marktplein", "Markt", "Mar", "Marša", "Marsh", "Matbúðin", "Matorrales", "Maure",
		"Maure", "Máy Rút tiền Tự động", "Meadow", "Meategi", "Meategi", "Meble", "Meent", "Měłkosć", "Memorial", "Mémorial", "Mendi", "Měnjernja", "Mercado", "Mercado", "Mercado público",
		"Mercado", "Merkataritza-gunea", "Merkatu", "Merkatu", "Mer", "Měšćanska železnica", "Městno", "Město", "Metro geltoki", "Metroingang", "Metrostation", "Metrowa stacija", "Metzgerei", "Meulbelzaak", "Měznik",
		"Middelbare school", "Midgetgolf", "Miền", "Mijn", "Mijn", "Militärgebiet", "Military Area", "Miltair gebied", "Mina", "Mina", "Mine", "Mine", "Mineralne žórło", "Mineralquelle", "Mineral Spring",
		"Miniature Golf", "Minigolf", "Miniwiki", "Minor Road", "Mirador", "Młodownja", "Młoźinski centrum", "Möbelgeschäft", "Mobiele telefoons", "Mobile Phone Shop", "Mobiliario", "Mốc Biên giới", "Mỏ Đá", "Modder", "Modegeschäft",
		"Modowy wobchod", "Moeras", "Moeras", "Moeras", "Moeras", "Mỏ", "Mỏ", "Monoment", "Monorail", "Montagne", "Montaña", "Monte", "Monument", "Monumento", "Monumentu",
		"Mooring", "Moor", "Moor", "Morjo", "Mórjo", "Mórska wuscyna", "Mórska wužina", "Mórske kupjele", "Mosoda", "Motel", "Motorcycle Shop", "Motorfietsenwinkel", "Motorradgeschäft", "Motorway", "Motorway Junction",
		"Motorway Road", "Motorway Services", "Mouillage", "Mountain", "Mountain Rescue", "Mozi", "Mud", "Muelle", "Mũi đất", "Mülleimer", "Municipalité", "Municipality", "Municipio", "Municipio", "Musée",
		"Musée", "Museoa", "Museo", "Museo", "Museum", "Museum", "Music Shop", "Muzej", "Muzejowa železnica", "Muzej", "Muzeum", "Múzeum", "Muziekwinkel", "Myjernja", "Nachtclub",
		"Nagykövetség", "Nakup", "Nakupowanišćo", "Nakupowanišćo", "Naměsto", "Napojowe wiki", "Narrow Gauge Railway", "Nasyp", "Natura-erreserba", "Nature Reserve", "Nature Reserve", "Naturschutzgebiet", "Naturschutzgebiet", "Natuurreservaat", "Natuurreservaat",
		"Nawjes", "Nettoyage à sec", "Newsagent", "Ngân hàng", "Ngã tư Đường Cao tốc", "Nghĩa địa", "Nghĩa địa", "Ngoại ô", "Nhà ga", "Nhà hàng", "Nhà hàng Ăn nhanh", "Nhà hát", "Nhà ở", "Nhà ở", "Nhà ở",
		"Nha sĩ", "Nhà Tắm hơi", "Nhà thờ", "Nhà thờ", "Nhà thuốc", "Nhà thuốc", "Nhà thuốc", "Nhà trẻ", "Nhà trường", "Nhà tù", "Night Club", "Niłčina, pěsčišćo", "Njewobtwarjena zemja", "Njewobtwarźona droga",
		"Njewobtwjerdźena dróha", "Njezarědowana droga", "Njezarjadowana dróha", "Nócny klub", "Nơi Đổ Rác", "Nơi Du lịch", "Nơi Thờ phụng", "Noleggio biciclette", "Noodtelefoon", "Notrufsäule", "Núi", "Núi lửa", "Nước", "Nurserie", "Nursery",
		"Nursing Home", "Nuzniki", "Nuzowa słužba", "Nuzowy telefon", "Nyilvános épület", "Office", "Office Building", "Office de poste", "Off License", "Off License", "Oficina", "Oficina de correos", "Oftalmólogo", "Ohe eta gosari (B&B)", "Oinezkoen bide",
		"Okindegi", "Onbeheerd kanaal", "Ongebruikte spoorweg", "Ongebruikt spoorwegstation", "Ongeclassificeerde weg", "Onverharde weg", "Onverharde weg", "Openbaar gebouw", "Openbaar gebouw", "Openbare markt", "Openbare telefoon", "Open schutplaats", "Optician", "Opticien", "Optikar",
		"Optiker", "Organic Food Shop", "Organische winkel", "Ospedale", "Ospitalea", "Ostatu", "Ostello", "Ottico", "Outdoor Shop", "Overdekt winkelcentrum", "Overstap", "Pad", "Pad", "Pad", "Pad",
		"País", "Palais de justice", "Panadería", "Panetteria", "Pantano", "Pantano", "Papeterie", "Papjernistwo", "Parada de autobuses", "Parafarmacia", "Paralelna droga", "Parallelspoorweg", "Parallelweg", "Parc", "Parc aquatique",
		"Parc à thème", "Parcheggio", "Parcheggio per biciclette", "Parc", "Parc", "Park", "Parkea", "Parke", "Parke", "Parkeren", "Parke tematiko", "Parking", "Parking à vélos", "Park", "Park",
		"Parkowanišćo", "Parkplatz", "Park zabawy", "Parque acuático", "Parque", "Parque", "Parque temático", "Partage de voiture", "Paslerska potrjeba", "Paso a nivel", "Passage à niveau", "Path", "Patinoire", "Pays", "Pays",
		"Peak", "Pecio", "Pedestrian Way", "Pedregal", "Peluquería", "Pension", "Pente douce", "Périphérie", "Pěstowarnja", "Pěstowarnja", "Pet Shop", "Peuterspeelzaal", "Peuterspeelzaal of kleuterschool", "Pharmacie", "Pharmacie",
		"Pharmacy", "Photo Shop", "Picknickplaats", "Pic", "Picnic Site", "Pico", "Pièces d'automobile", "Piknik-gune", "Piknikowanišćo", "Piscina", "Piscine", "Pista de carreras", "Pista de patinaje sobre hielo", "Pista", "Pista",
		"Pista", "Piste cyclable", "Piste", "Piste", "Piste", "Piste", "Pitna woda", "Pitna wóda", "Pjekarnja", "Plaats", "Place de marché", "Place of Worship", "Plage", "Plateforme ferroviaire", "Plateforme",
		"Platforma", "Platform", "Playa", "Playground", "Plaza", "Plein", "Płótne stupadło", "Płotowy pśestup", "Pöbbinn", "Pobrjóžna linija", "Pochowanski wustaw", "Podkopki", "Podkopki", "Pódlańska droga", "Pódlanska hasa",
		"Pódlanski puć", "Podstup", "Pódstup", "Point d'accès d'urgence", "Point de recyclage", "Point de vue", "Pointe", "Point", "Poissonnerie", "Pola", "Police", "Policía", "Policija", "Politie", "Polizia",
		"Pólna drožka", "Pólny puć", "Pomnik", "Pompes funèbres", "Porte d'écluse", "Porte", "Posta", "Posta-kode", "Postaláda", "Post", "Post Box", "Postcode", "Postetxe", "Postkantoor", "Póstkassinn",
		"Postleitzahl", "Post Office", "Postowa licba", "Postowe wodźenske čisło", "Póstowy zarjad", "Powjaznica", "Pradera", "Předměsto", "Předšula", "Preescolar", "Přemysłowa kónčina", "Přenocowanje ze snědanju", "Přepław", "Presa", "Pre-School",
		"Préscolaire", "Preserved Railway", "Přestrjencowy wobchod", "Pretpark", "Přewozny přistaw", "Přibrjóh", "Prigione", "Přijězd na awtodróhu", "Přijimanski wobłuk", "Přijimarnja njezbožow", "Přijimarnja starowiznow", "Přikuski", "Primaire weg", "Primaire weg", "Primary Road",
		"Primary Road", "Přirodoškit", "Přirodoškitne pasmo", "Přirodoškitne pasmo", "Prisión", "Prison", "Přistawnišćo", "Priwatne twarjenje", "Přizamkowe kolije", "Promenada", "Prózdnjeński zachod", "Prozninski domcyk", "Prullenbak", "Pśedměsto", "Pśedšula",
		"Pśenocowanje ze snědanim", "Pśepóžycarnja kólasow", "Pśewózny pśistaw", "Pśibrjog", "Pśibrjozna linija", "Pśitwaŕ", "Pub", "Public Building", "Public Building", "Public Market", "Public Telephone", "Pućik", "Pućny křiž", "Pućowanski běrow", "Pueblo",
		"Puerta", "Puerto deportivo", "Puin", "Punt", "Punto de reciclaje", "Punto di accesso WiFi", "Punto", "Putetxe", "Quán Cà phê", "Quảng trường", "Quận hạt", "Quarry", "Quốc gia", "Racecircuit", "Raceway",
		"Radnica", "Radnica", "Radweg", "Raftækjaverslunin", "Railway Junction", "Railway", "Railway Platform", "Railway Points", "Railway Spur", "Railway Station", "Railway Station", "Railway under Construction", "Railway Yard", "Rangeerterrein", "Ranžěrowanske dwórnišćo",
		"Rapides", "Rápidos", "Rapids", "Rạp phim", "Rathaus", "Rathaus", "Reception Area", "Rechtbank", "Récif", "Rěčne prohi", "Rěčny brjóh", "Recreatiegebied", "Recreatiegebied", "Recreation Ground", "Recreation Ground",
		"Recycling Point", "Reddingsdienst", "Reef", "Refuge", "Refuge", "Refugio", "Region", "Région", "Región", "Regio", "Régió", "Reiðhjólaleigan", "Reisbureau", "Reisebüro", "Rejtarska drožka",
		"Rěka", "Rěka", "Rendőrség", "Rennstrecke", "Réparation de voitures", "Represa", "Repuestos automotrices", "Repülőtér", "Repülőtér", "Reserva natural", "Réserve naturelle", "Réserve naturelle", "Reservoir", "Réservoir", "Residencia de jubilados",
		"Residential Area", "Residential Building", "Residential", "Résidentiel", "Restaurant", "Restaurante", "Restauration rapide", "Retail Building", "Retail", "Retirement Home", "Rěznik", "Ribera", "Ridge", "Riff", "Rifið",
		"Rif", "Rifugio alpino", "Rijschool", "Río", "Río", "Ristorante", "Riverbank", "River", "River", "Rive", "Rivierbedding", "Rivière", "Rivière", "Rivier", "Rivier",
		"Road", "Roca", "Roche", "Rock", "Rotsen", "Route autoroutière", "Route de service", "Route", "Route mineure", "Route non classifiée", "Route non goudronnée", "Route principale", "Route principale", "Route principale", "Route principale",
		"Route secondaire", "Route secondaire", "Route secondaire", "Route tertiaire", "Rozglědanišćo", "Rozpadanki", "Rozpušćena železnica", "Rozwjaseleński park", "Rue résidentielle", "Ruinas", "Ruine", "Ruïne", "Ruins", "Ruiterpad", "Rừng",
		"Rừng", "Rừng Trồng Cây", "Running Track", "Ruta para bicicletas", "Rybnišćo", "Rybowy wobchod", "Safnið", "Salle", "Salle", "Salle communale", "Salmenta automatiko", "Salón", "Salon", "Sân băng", "Sân bay",
		"Sân bay", "Sân chơi", "Sân Golf", "Sân Trại", "Sân vận động", "Sân vận động", "Sauna", "Sawna", "Scala", "Sćažka", "Sćažka", "Sćažka za kólasowarjow", "Šćežka", "Šćežka", "Schadźowarnja",
		"Scheepswerf", "Schiffswrack", "Schleusentor", "Schodźenki", "Schoenenzaak", "School", "School Building", "Schoolgebouw", "Schoonheidssalon", "Schoonheidssalon", "Schrebergärten", "Schuhgeschäft", "Schule", "Schwimmbad", "Scree",
		"Scrub", "Sea", "Secondary Road", "Secondary Road", "Secours en montagne", "Secundaire weg", "Secundaire weg", "Sedlišćo", "Sendero", "Sendero", "Sendiráðið", "Service Road", "Services autoroutiers", "Shelter", "Shoal",
		"Shoe Shop", "Shop", "Shop", "Shopping", "Shopping Centre", "Siedlung", "Siêu thị", "Siêu thị", "Site archéologique", "Site de camping", "Site de caravane", "Site de pique-nique", "Sito archeologico", "Sjúkrahúsið", "Skała",
		"Skała", "Skalina", "Skótny gójc", "Skyndibitastaðurinn", "Slagboom", "Slagerij", "Slagveld", "Slátrarinn", "Slipway", "Sloot", "Sluisdeur", "Sluis", "Smáeyjan", "Smalspoor", "Smjećišćo",
		"Smykanišćo", "Snelweg in aanbouw", "Social Club", "Söluturninn", "Sòng bạc", "Sông băng", "Sông", "Speelgoedwinkel", "Speelplaats", "Spiaggia", "Špica", "Spielplatz", "Spielstraße", "Spielwarengeschäft", "Spits",
		"Spoogwegpunten", "Spoor in aanbouw", "Spoor", "Spoorwegkruising", "Spoorwegplatform", "Spoorwegstation", "Spoorwegstation", "Sportbolt", "Sportcentrum", "Sportgeschäft", "Sportnišćo", "Sportowy centrum", "Sportowy wobchod", "Sports Centre", "Sports Pitch",
		"Sports Shop", "Sportveld", "Sportwinkel", "Sportzentrum", "Spring", "Spušćadło", "Staat", "Stade", "Stadion", "Stadion", "Stadium", "Stadium", "Stad", "Stad", "Stadsgroen",
		"Stadsgroen", "Stadt", "Stadtteil", "Stand de caza", "Stand de tir", "Stand", "Stanowanišćo", "Starcownja", "Starownja", "State", "Stationery Shop", "Statok", "Staudamm", "Stazione di rifornimento", "Steengroeve",
		"Steps", "Stile", "Stołp", "Stomerij", "Štom", "Store", "Stortplaats", "Straatkiosk", "Strait", "Strand", "Straßenbahn-Haltestelle", "Straßenbahn", "Straßenbahn", "Stream", "Ströndin",
		"Strony šćitaneje pśirody", "Stroomversnelling", "Stroom", "Strowotny centrum", "Struikgewas", "Studentenhuis", "Studentenhuis", "Studentski internat", "Studentski internat", "Studijo", "Studio", "Studnja", "Stupy", "Stuwdam", "Subdibisio",
		"Subdivision", "Subdivisión", "Suburbio", "Suburb", "Subway Entrance", "Subway Station", "Sudnistwo", "Šula", "Šulske twarjenje", "Sumendi", "Sundlaugin", "Suối", "Supermarché", "Supermarché", "Supermark",
		"Supermarket", "Supermarket", "Supermarkt", "Supermarkt", "Supermercado", "Supermercado", "Supermercato", "Supermercato", "Supermerkatu", "Supermerkatu", "Superwiki", "Superwiki", "Sveitabærinn", "Swimmingpool", "Swimming Pool",
		"Sydlišćo", "Szálloda", "Szálloda", "Szálloda", "Szauna", "Szemétgyűjtő kosár", "Sziget", "Sziget", "Szikla", "Színház", "Szőnyegbolt", "Taberna", "Taksijowe zastanišćo", "Taller mecánico", "Tal",
		"Tal", "Tandarts", "Tankownja", "Tannlæknirinn", "Tàn tích", "Tapijtzaak", "Taxi", "Teatro", "Teléfono de emergencia", "Telefono pubblico", "Teléfono público", "Telefon za nuzowe zawołanje", "Telefonzelle", "Telekomunikaciski wobchod", "Téléphone d'urgence",
		"Téléphone public", "Templo", "Tenger", "Teppabúðin", "Teppichladen", "Terasa", "Terminal de ferry", "Terminal de ferrys", "Terrace", "Terrain contaminé", "Terrain de golf", "Terrain de jeux", "Terrain de sport", "Terrains communaux", "Terras",
		"Terre", "Terreno común", "Tertiaire weg", "Tertiary Road", "Textilreinigung", "Thánh Giá Dọc đường", "Thành phố", "Thánh tượng", "Tháp", "Tháp", "Theater", "Theatre", "Théâtre", "Theme Park", "Thị xã/trấn",
		"Thông tin", "Thung lũng", "Thung lũng", "Thùng rác", "Thư viện", "Tiệm", "Tiệm", "Tiệm Bánh", "Tiệm Báo", "Tiệm", "Tiệm", "Tiệm Cá", "Tiệm Đồ chơi", "Tiệm Giặt Quần áo", "Tiệm Giày",
		"Tiệm Hoa", "Tiệm Kem", "Tiệm Kẹo", "Tiệm Kính mắt", "Tiệm Làm tóc", "Tiệm Làm tóc", "Tiệm Máy tính", "Tiệm Nhạc", "Tiệm Phim", "Tiệm Quần áo", "Tiệm Rửa Hình", "Tiệm Rửa Xe", "Tiệm Sách", "Tiệm Sửa Xe", "Tiệm Tập hóa",
		"Tiệm Tạp phẩm", "Tiệm Thảm", "Tiệm Thời trang", "Tiệm Xe đạp", "Tienda", "Tienda benéfica", "Tienda", "Tienda de alfombras", "Tienda de alimentación", "Tienda de alimentación", "Tienda de artículos de arte", "Tienda de artículos de pesca", "Tienda de artículos deportivos", "Tienda de bicicletas", "Tienda de computación",
		"Tienda de mascotas", "Tienda de música", "Tienda de regalos", "Tienda de ropa", "Tienda de telefonía", "Tienda fotográfica", "Tienda por departamentos", "Tierarzt", "Tierra", "Tiểu học", "Tỉnh bang", "Tòa", "Tòa Đại sứ", "Toalety", "Tòa nhà",
		"Toilets", "Toiletten", "Toilettes", "Tölvubúðin", "Toren", "Toren", "Torhošćo", "Torre", "Torre", "Tour", "Tour", "Touristen-Information", "Towarišliwostny klub", "Towarstwo", "Tower",
		"Tower", "Town Hall", "Town", "Toy Shop", "Trabantowe město", "Track", "Trại", "Trại", "Trailerhelling", "Trail", "Train Stop", "Trại", "Trạm Cứu hỏa", "Tramhalte", "Trạm Phà",
		"Tramrails", "Tram Stop", "Tramwajka", "Tramwajkowe zastanišćo", "Tramway", "Trạm Xe điện Ngầm", "Tranbia geltoki", "Tranbia", "Trang viên", "Trap", "Travail artistique", "Travel Agency", "Trawa", "Tréð", "Tree",
		"Treinhalte", "Trenbide", "Treppe", "Tribunale", "Trolejbusowy milinowód", "Trung tâm Cộng đồng", "Trung tâm Nghệ thuật", "Trung tâm Thể thao", "Trung tâm Y tế", "Trunk Road", "Trunk Road", "Trường Cao đẳng", "Trường Đại học", "Trường học", "Trường Lái xe",
		"Trường Mầm non", "Truông", "Tuincentrum", "Tuin", "Turm", "Turm", "Tűzoltóság", "Twarjenje", "Twarjenjowy zachod", "Twar", "Twarske wiki", "Txalet", "U-Bahn-Station", "Udalerri", "Udaletxea",
		"Udaletxe", "Ufficio postale", "Uitvaartcentrum", "Unclassified Road", "Unibertsitate", "Unincorporated Area", "Universidad", "Universidad o instituto", "Università", "Universität", "Universitätsgebäude", "Université", "Universiteit", "Universiteitsgebouw", "University",
		"University Building", "Uniwersita", "Uniwersitne twarjenje", "Unsurfaced Road", "Ura", "Urtegi", "Úszómedence", "Utazási iroda", "Útivistarbúðin", "Üzemanyag", "Vách đá", "Vaðið", "Vado", "Vakantiehuisje", "Vallée",
		"Vallée", "Vallei", "Vallei", "Valle", "Valle", "Valley", "Valley", "Văn phòng", "Văn phòng Du lịch", "Városháza", "Város", "Város", "Vatnið", "Vatnsaflsvirkjunin", "Vatnsleikjagarðurinn",
		"Veen", "Veen", "Veerterminal", "Veitingastaðurinn", "Vendégpark", "Vendeur de voitures", "Vending Machine", "Vergnügungspark", "Verkfærabúðin", "Verkooppunt alcoholische dranken", "Verkooppunt alcoholische dranken", "Verpleeghuis", "Versicherungsbüro", "Verslunin", "Vervallen spoorweg",
		"Verwaltungsgrenze", "Verzekeringen", "Vệ sinh", "Veterinario", "Veterinary Surgery", "vía de ferrocarril", "Vía de servicio", "Vía de servicio", "Vía de tren abandonada", "Vía peatonal", "Videoleigan", "Video Shop", "Videotheek", "Videotienda", "Viewpoint",
		"Vignoble", "Village Green", "Village Hall", "Village", "Villamosmegálló", "Villa", "Ville", "Ville", "Vineyard", "Vịnh", "Visgrond", "Viswinkel", "Vivero", "Voetpad", "Voie de bus guidée",
		"Voie de funiculaire", "Voie ferrée abandonnée", "Voie ferrée désafectée", "Voie ferrée en construction", "Voie ferrée", "Vòi nước", "Vòi nước Máy", "Vòi Nước uống", "Volcan", "Volcán", "Volcano", "Völgy", "Volkstuinen", "Voorde", "Vrijliggende busbaan",
		"Vulcano", "Vulkaan", "Vulkan", "Vulkán", "Vườn", "Vườn Nho", "Vườn thú", "Wadi", "Walanki", "Wald", "Warenhuis", "Wäscherei", "Wasserfall", "Wasserij", "Waste Basket",
		"Waterbekken", "Waterfall", "Water", "Water Park", "Water Point", "Waterpunt", "Waterspeelpark", "Waterval", "Waterverbinding", "Waterway Connector", "Wayside Cross", "Wayside Shrine", "WC", "Wechselstube", "Weg",
		"Wehr", "Weide", "Weiler", "Weingut", "Weir", "Wentok", "Wetland", "Wetland", "Wetlands", "Wěža", "Wěža", "Widejowobchod", "Wiese", "WiFi Access", "WiFiアクセスポイント",
		"WiFi hozzáférés", "Wifi-toegang", "WiFi-зона", "Wijngaard", "Wiki", "Wiki", "Wikowanišćo", "Wikowar awtow", "Winicy", "Winkel", "Winkel", "Winkel", "Winkelcentrum", "Winkelen", "Winkelpand",
		"Winkels", "Wisselkantoor", "Wjaska", "Wjas", "Wjelike město", "Wjeska", "Wjes", "WLAN-Access-Point", "Wobcerk pśidostaśa", "Wobchod", "Wobchod", "Wobchod", "Wobchod črijow", "Wobchod na statoku", "Wobchodniske twarjenje",
		"Wobchod pod hołym njebjom", "Wobchody", "Wobchod za dary", "Wobchod za elektroniku", "Wobchod za hrajki", "Wobchod za hudźbniny", "Wobchod za kolesa", "Wobchod za měšane twory", "Wobchod za motorske", "Wobchod za spirituozy", "Wobchod za spirituozy", "Wobchod za tunje artikle", "Wobchod za zeleniny", "Wobchod za žiwidła", "Wočerstwjenišćo",
		"Wočerstwjenska krajina", "Wódne městno", "Wodopad", "Wodowy park", "Wódowy park", "Wódychańske strony", "Wódy", "Wodźizny", "Wohngebäude", "Wohnjostraža", "Wohnjowy hydrant", "Wohnwagen-Stellplatz", "Wojerska kónčina", "Wokrejs", "Wokrjes",
		"Woningen", "Wood", "Wood", "Woonerf", "Woonerf", "Woonwijk", "Wopomnišćo", "Wotpadkowe sudobjo", "Wotstajenišćo za kolesa", "Wrak", "Wreck", "Wrjosate strony", "Wrota", "Wrota přeplawnje", "Wuběgowanišćo",
		"Wuběgowánska cera", "Wuhibka", "Wuhladnišćo", "Wulkan", "Wulkoměsto", "Wulkopósłanstwo", "Wulkorěka", "Wuměłska twórba", "Wuměłski wobchod", "Wupožcowarnja za kolesa", "Wuskała", "Wuskokolijata železnica", "Wusoka šula", "Wuźišćo", "Wužitny lěs",
		"Wysoka šula", "Xa lộ", "Yachthafen", "Yacimiento arqueológico", "Youth Centre", "Zachod do podzemskeje železnicy", "Zagroda", "Zahnarzt", "Zahroda", "Zahrodny centrum", "Zajězd na awtodrogu", "Zalew", "Zaliw", "Zaměnjarnja", "Zandbank",
		"Zanjerodźeny kanal", "Zapatadenda", "Zapatería", "Zarjadniska hranica", "Zastajena železnica", "Zátony", "Zawěsćernja", "Zawrjene dwórnišćo", "Zběranišćo starowinow", "Zběranski basenk", "Zeeëngte", "Zee", "Železnica", "Železnica so twari", "Železniske křižnišćo",
		"Železniske nastupišćo", "Železniske zastanišćo", "Železniski přechod", "Zemja", "Zhromadny centrum", "Ziekenhuis", "Ziekenhuis", "Zinema", "Źiśownja", "Źiwadło", "Žiwidłowy wobchod", "Zjawne twarjenje", "Zjawne twarjenje", "Zjawne wiki", "Zjawny telefon",
		"Zmakanišćo za bydleńske wóze", "Zona industrial", "Zona militar", "Zone commerciale", "Zone de pèche", "Zone de réception", "Zone humide", "Zone humide", "Zone industrielle", "Zone militaire", "Zone résidentielle", "Zones humides", "Zoológico", "Zoologiko", "Zoo",
		"Žórło", "Žrědło", "Zubny lěkar", "Zugang zu einer U-Bahn-Station", "Zuhaitza", "Zwembad", "Zwěrjacy lěkar", "Zwězkowy kraj", "Zwisk mjez wódnymi pućemi", "Zwjazkowy kraj", "Žywnosć", "Þorpið", "Автобусна зупинка", "Автобусная остановка", "Автобусная станция",
		"Автовокзал", "Автозапчастини", "Автомагазин", "Автомагазин", "Автомагістраль", "Авто майстерня", "Автомастерская", "Автомийка", "Автомойка", "Автосалон", "Автостоянка", "Автошкола", "Агентство нерухомості", "Административная граница", "Адміністративний кордон",
		"Аеропорт", "Аеропорт", "Аквапарк", "Аквапарку", "алея", "Амбасада", "Аптека", "Аптека", "Аренда автомобилей", "Археологічні дослідження", "Аттракцион", "Аттракционы", "Аудитория", "Аудіо-техніка", "Аэропорт",
		"Аэропорт", "База відпочинку", "База відпочинку", "Бакалія", "Банк", "Банкомат", "Бар", "Басейн", "Бассейн", "Бассейн", "Башня", "Башня", "Башта", "Башта", "Береговая линия",
		"Берег ріки", "Библиотека", "Бібліотека", "Бігова доріжка", "Болота", "Болото", "Бордель", "Брод", "Броди", "Будинки для людей похилого віку", "Будинок", "Будинок", "Будинок престарілих", "Будівля", "Будівництво",
		"Будівництво автомагітсралі", "Будівництво колії", "Булочная", "Бункер", "Вай-Фай", "Велодорожка", "Веломагазин", "Велопарковка", "Велосипедна доріжка", "Верстовий камінь", "Верф", "Верфь", "Вершина горы", "Ветеринарная клиника", "Ветлікарня",
		"Взуття", "Винный магазин", "Вино", "Виноградник", "Вирубка", "Відео", "Військова зона", "В'їзд на автомагістраль", "Вода", "Водно-болотні угіддя", "Водно-болотні угіддя", "Водопад", "Водоспад", "Водосховище", "водохранилище",
		"Военная зона", "Ворота", "Вузькоколійка", "Вулкан", "Вхід в метро", "Вхід у будівлю", "Вход в метро", "Вход в пещеру", "Входу в печеру", "Высокогорная гостиница", "В'язниця", "Гавань для екскурсійних суден", "Газетний кіоск", "Гай", "Гай",
		"Галерея", "Гараж", "Гейзер", "Гірський хребет", "Гірські рятувальники", "Главная дорога", "Головна дорога", "Гора", "Гори", "Город", "Госпиталь", "Гостиница", "Гостиница", "Гостинница", "Гостьовий будинок",
		"Готель", "Готель", "Готель", "Громадська земля", "Громадський центр", "Грязь", "Грязюка", "Гуртожиток", "Гуртожиток", "Дамба", "Депо", "Деревня", "Дерево", "Детская игровая площадка", "Детский сад",
		"Джерело", "Дикий лес", "Дитячий майданчик", "Дитячий садок", "Дім", "Док", "Долина", "Долина", "Дом", "Дом", "Дом", "Дома", "Домик для гостей", "Дом искусств", "Дорога",
		"Дорога без класифікації", "Дорога без покриття", "Дорога для їзди верхи", "Дорога для пешеходов", "Дорога третьего класса", "Дошкільний заклад", "Дренажний канал", "Другорядна дорога", "Елемент", "Естественный лес", "Железная дорога", "Железнодорожная платформа", "Железнодорожная станция", "Железнодорожный переезд", "Жила вулиця",
		"Жилой район", "Житлова зона", "Житловий будинок", "Житловий квартал", "Житловий масив", "Забігайлівка", "Заброшеная ж/д ветка", "Заброшеная ж/д станция", "Законсервовані колії", "Зала", "Зала", "Залив", "Залізниця", "Залізнична гілка", "Залізнична платформа",
		"Залізнична станція", "Залізнична станція", "Залізничний переїзд", "За́мок", "Заповедник", "Заповідник", "Заповідник", "Заповідник", "Заправка", "Затока", "Звалище", "Здание", "Здание больницы", "Зелёная деревня", "Земля",
		"З’єднання водних шляхів", "З’єднання з автомагістраллю", "З’єднання з головною дорогою", "З’єднання з другорядною дорогою", "Знесення під забудову", "Зоомагазин", "Зоопарк", "Зроби сам", "Зупинка поїзда", "Икона", "Индекс", "Информация", "Іграшки", "Індекс", "Інформація",
		"Історична залізнична станція", "Кабіна", "Казино", "Канал", "Канал", "Канцтовари", "Каплиця", "Кар’єр", "Каток", "Кафе", "Квартал", "Квіти", "Килими", "Кинотеатр", "Кинуті колії",
		"Киоск", "Кіоск", "Кладбище", "Кладовище", "Клініка", "Клуб", "Книгарня", "Книжный магазин", "Ковзанка", "Ковры", "Коледж", "Колледж", "Комерційна нерухомість", "Компьютерный магазин", "Комп’ютерна крамниця",
		"Кондитерська", "Контейнер для сміття", "Конференц-зала", "Копальня", "Копальня", "Косметика", "Країна", "Кратер", "Крематоорий", "Крематорій", "Крепость", "Культова споруда", "Лавка", "Лагерь", "Ледник",
		"Лижня", "Ліжко та сніданок", "Лікарі", "Лікарня", "Лікарня", "Ліс", "Луг", "Лыжня", "Льодовик", "Магазин", "Магазин", "Магазин", "Магазин", "Магазин", "Магазин електроніки",
		"Магазин игрушек", "Магазин косметики", "Магазин подарков", "Магазин распродаж", "Маєток", "Майданчик для трейлерів", "Маленький остров", "Мебель", "Меблі", "Мемориал", "Меморіал", "Мерія", "Место для пикника", "Место поклонения", "Место швартовки",
		"Милиция", "Минеральный родник", "Минигольф", "Мис", "Мисливська вежа", "Мистецький центр", "Мілина", "Міліція (Поліція)", "Мінеральне джерело", "Міні-гольф", "Місто", "Місто", "Місце для пікніків", "Місце катастрофи", "Місце переробки відходів",
		"Місце стоянки для велосипедів", "Міськвиконком", "Мобильные телефоны", "Мобільні телефони", "Молодіжний центр", "Монорейка", "Монорельс", "Море", "Мороженное", "Морозиво", "Мотель", "Мотоцикли", "Музей", "Музей", "Музика",
		"Музыкальный магазин", "Муниципалитет", "Муніципалітет", "Мур", "Мусорка", "Мэрия", "Мясная лавка", "М’ясо", "Навіс", "Напої", "Населений пункт", "Неприєднанні території", "Нічний клуб", "ночной клуб", "Обмен валют",
		"Обмін валют", "Образотворче мистецтво", "обрыв", "Обслуживаемый лес", "Обувной магазин", "Общежитие", "общественное здание", "Овочі, фрукти", "Оглядовий майданчик", "Одяг", "Одяг", "Оздоровительный центр", "оптика", "Оптика",
		"Оселі", "Остов судна", "Острів", "Острів", "Острівець", "Остров", "Остров", "Осыпь камней", "Открытая площадка", "Открытый рынок", "Офис", "Офисная территория", "Офисное здание", "Офіс", "Офісний будинок",
		"охотничья вышка", "Очищена територія під забудову", "Паб", "Пагорб", "Палатка с едой", "Пальне", "Пам’ятник", "Памятник", "Парикмахерская", "Парк", "Парк", "Парк", "Паромная станция", "Передмістя", "Переїзд",
		"Перекрёсток", "Перешийок", "Перукар", "Питна вода", "Питьевая вода", "Підрозділ", "Пік", "Пішохідна доріжка", "Пішохідна дорога", "Платформа", "Плотина", "Пляж", "Пляжний курорт", "Подарунки", "Подъездная дорога",
		"Пожарная охрана", "Пожарный гидрант", "Пожежна станція", "Пожежний гідрант", "Покинута залізнична станція", "Покинута колія", "Покинутий канал", "Поле битви", "Поле боя", "Поле для гольфу", "Поликлиника", "Полупансион", "Пороги", "Поромна станція", "Посёлок",
		"Послуги копіювання", "Посольство", "Почтовое отделение", "Почтовый ящик", "Пошта", "Поштова скриня", "Пральня", "Прачечная", "Пригород", "Придорожній храм", "Придорожній хрест", "Придорожный сервис", "Прикордонний камінь", "Примыкающая дорога", "Продовольчі товари",
		"Продукты", "Произведения искусства", "Прокат авто", "Прокат автомобілів", "Прокат велосипедів", "Прокат велосипедов", "Промзона", "Промислова споруда", "Промышленное здание", "Пункт первой помощи", "Пункт швидкої допомоги", "Развалины", "Район", "Район риболовлі", "Раскопки",
		"Регион", "Резервуар", "Река", "Река", "Ремонт ж/д путей", "Ресторан", "Риба", "Ринкова площа", "Ринок", "Ринок", "Ритуальні послуги", "Риф", "Рів", "Ріка", "Ріка",
		"Родник", "Руїни", "Ручей", "Рыбалка", "Рыбный магазин", "Сад", "Сади-городи", "Садовый центр", "Сад та город", "Сады-огороды", "Салон", "Салон краси", "Сауна", "Сделай-Сам", "Село",
		"Сільпо", "Сільська галявина", "Скала", "Скеля", "Скеля", "Склад", "Слияние рек", "Службова дорога", "Смотровая площадка", "Соціальний магазин", "Спортивная дорожка", "Спортивний центр", "Спортивні товари", "Спортивный магазин", "Спортивный центр",
		"Спортмайданчик", "Спритні напої", "Ставок", "Стадион", "Стадион", "Стадіон", "Стадіон", "Станция ж/д", "Станция метро", "Станція метро", "Стежка", "Стежка", "Степ", "Стоматология", "Стоматологія",
		"Сточная канава", "Стоянка", "Страна", "Страхування", "Стрелка ж/д", "Стрілка", "Стройка", "Струмок", "Студія", "Суд", "Супермаркет", "Супермаркет", "Такси", "Таксі", "Театр",
		"Телефон", "Телефон для екстрених викликів", "Тематичний парк", "Тераса", "Торгівельно-розважальний центр", "Торговий автомат", "Торговий центр", "торговый автомат", "Торговый центр", "Торф", "Точка", "Трава", "Трамвай", "Трамвайна зупинка", "трамвайная остановка",
		"Трамвайная остановка", "Трамвайні колії", "Тренажерний зал", "тренажерный зал", "Третьорядна дорога", "Тротуар", "Туалет", "Турбаза", "Туристической агентство", "Туристична агенція", "Турнікет", "Тюрьма", "Уезд", "Узбережжя", "Укриття",
		"Университет", "Университет", "Універмаг", "Універсам", "Університет", "Університет", "Ферма", "Ферма", "Ферма", "Ферма", "Фермерське подвір'я", "Фіорд", "фонтан", "Фонтан", "фотомагазин",
		"Фотомагазин", "Фуникулер", "Фунікулер", "Фьорд", "Хімтовари", "Хімчистка", "Хліб", "Хозтовари", "Хостел", "Храм", "Храм", "Хребет", "Художній салон", "Хутір", "Цветочный магазин",
		"Цвинтар", "Центр здоров'я", "Церковь", "Церковь", "Цікаві місця", "Чагарник", "Шале", "Шахта", "Швидкісний трамвай", "школа", "Школа", "Школа", "Шлюз", "Шлюзові ворота", "Щебінь",
		"Ювелирный магазин", "Ювелірний магазин", "Якірна стоянка"
	],

	/**
	 * @param String nameFinderURL http://nominatim.openstreetmap.org/search. To work around the same origin policy, pass a wrapper that lives on your webspace.
	*/
	initialize : function(nameFinderURL) {
		if(nameFinderURL)
			this.nameFinderURL = nameFinderURL;
	},
	find : function(query, callbackFunction) {
		query.replace(/^\s+/, "").replace(/\s+$/, "");

		var nameFinder = this;

		OpenLayers.cdauth.NameFinder.prototype.find.apply(this, [ query, function(results) {
			if(results != undefined && results.length > 0)
				callbackFunction(results);
			else
			{ // NameFinder
				OpenLayers.Request.GET({
					url : nameFinder.nameFinderURL,
					params : { "q": query, "format" : "xml", "polygon" : "0", "addressdetails" : "0" },
					success : function(request) {
						var results = [ ];
						if(request.responseXML)
						{
							var searchresults = request.responseXML.getElementsByTagName("searchresults");

							if(searchresults.length > 0)
							{
								if(searchresults[0].getAttribute("findplace") == null || searchresults[0].getAttribute("findplace") == "" || searchresults[0].getAttribute("foundnearplace") == "yes")
								{
									var named = searchresults[0].childNodes;
									for(var i=0; i<named.length; i++)
									{
										if(named[i].nodeType != 1) continue;

										var box = named[i].getAttribute("boundingbox").split(",");
										(function(box) {
											results.push({
												lonlat : new OpenLayers.LonLat(named[i].getAttribute("lon"), named[i].getAttribute("lat")),
												name : named[i].getAttribute("display_name"),
												info : named[i].getAttribute("class"),
												icon : named[i].getAttribute("icon"),
												getZoom : function(map) {
													return map.getZoomForExtent(box.clone().transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()));
												},
												osm : null
											});
										})(new OpenLayers.Bounds(box[2], box[1], box[3], box[0]));
									}
								}
							}
						}

						callbackFunction(results);
					},
					failure : function() {
						callbackFunction();
					}
				});
			}
		} ]);
	},

	getLocationPart : function(query) {
		var delim = /\s*,\s*/;

		var pos = 0;
		var newPos;
		while(pos < query.length)
		{
			newPos = query.substr(pos).search(delim);
			var match;
			if(newPos == -1)
			{
				newPos = query.length-pos;
				match = "";
			}
			else
				match = query.substr(pos).match(delim)[0];
			var part = query.substr(pos, newPos).replace(/^\s+/, "").replace(/\s+$/, "").toLowerCase();
			var special = false;
			for(var i=0; i<this.specialWords.length; i++)
			{
				if(this.specialWords[i].toLowerCase() == part)
				{
					special = true;
					break;
				}
			}

			if(!special)
				return [ pos, query.length-pos ];

			pos += newPos + match.length;
		}

		return null;
	}
});

/**
 * A markers layer to display the search results of the OpenStreetMap NameFinder.
 * @event lastSearchChange The value of lastSearch has changed.
 * @event searchBegin
 * @event searchSuccess The search results have been displayed
 * @event searchFailure No results have been found or an error occured
*/

OpenLayers.Layer.cdauth.Markers.GeoSearch = OpenLayers.Class(OpenLayers.Layer.cdauth.Markers, {
	lastSearch : false,

	/**
	 * @var OpenLayers.cdauth.NameFinder
	*/
	nameFinder : null,

	/**
	 * The marker icon to use for the first search result.
	 * @var OpenLayers.Icon
	*/
	highlightIcon : new OpenLayers.Icon("http://osm.cdauth.de/map/marker-green.png", new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),

	/**
	 * The icon type for Nominatim search result icons. Either "p" or "n", see http://www.sjjb.co.uk/mapicons/SJJBMapIconsv0.03/recoloured/, p has a transparent background, n a coloured.
	 * @var String
	*/
	iconType : "n",

	/**
	 * The icon size for Nominatim search result icons. 12, 16, 20, 24 or 32. See http://www.sjjb.co.uk/mapicons/SJJBMapIconsv0.03/recoloured/.
	 * @var Number
	*/
	iconSize : 24,

	/**
	 * @param String name
	 * @param OpenLayers.cdauth.NameFinder
	 * @param Object options
	*/
	initialize: function(name, nameFinder, options) {
		OpenLayers.Layer.cdauth.Markers.prototype.initialize.apply(this, [ name, options ]);

		this.nameFinder = nameFinder;

		this.events.addEventType("lastSearchChange");
		this.events.addEventType("searchBegin");
		this.events.addEventType("searchSuccess");
		this.events.addEventType("searchFailure");

		this.events.register("lastSearchChange", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
		this.events.register("markersChanged", this, function(){ this.events.triggerEvent("queryObjectChanged"); });
	},

	/**
	 * Use the NameFinder to search in OpenStreetMap data and add the search results as markers to this layer.
	 * @param String query The search string.
	 * @param boolean dontzoom Don’t zoom to the search result but keep the current view of the map. If this is set, no alert box will indicate that the search returned no results.
	 * @param Array markersvisible Contains a boolean value (or a string representing a boolean) for each search result to indicate if a popup should be opened.
	*/
	geoSearch: function(query, dontzoom, markersvisible)
	{
		var layer = this;

		if(typeof markersvisible == "string")
		{
			var markersvisible_obj = { };
			for(var i=0; i<markersvisible.length; i++)
				markersvisible_obj[i] = markersvisible.charAt(i);
			markersvisible = markersvisible_obj;
		}

		this.clearMarkers();
		this.lastSearch = false;
		this.events.triggerEvent("lastSearchChange");

		if(!query)
			return;

		this.events.triggerEvent("searchBegin");

		this.nameFinder.find(query, function(results){ layer.showResults(results == undefined ? [ ] : results, query, dontzoom, markersvisible); });
	},
	showResults : function(results, query, dontzoom, markersvisible) {
		this.clearMarkers();
		if(results == undefined)
			results = [ ];
		for(var i=results.length-1; i>=0; i--)
		{
			var layer = this;
			var content = document.createElement("div");

			var content_heading = document.createElement("result-heading");
			var content_strong = document.createElement("strong");
			if(results[i].name)
			{
				content_strong.appendChild(document.createTextNode(results[i].name));
				content_heading.appendChild(content_strong);
				content_heading.appendChild(document.createTextNode(" ("+(results[i].info ? results[i].info : OpenLayers.i18n("unknown"))+") "));
			}
			else
			{
				content_strong.appendChild(document.createTextNode((results[i].info ? results[i].info : OpenLayers.i18n("unknown"))+" "));
				content_heading.appendChild(content_strong);
			}

			var content_zoom = document.createElement("a");
			content_zoom.href = "#";
			(function(result){
				content_zoom.onclick = function() {
					layer.map.setCenter(result.lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), layer.map.getProjectionObject()), result.getZoom(layer.map));
					return false;
				};
			})(results[i]);
			content_zoom.appendChild(document.createTextNode(OpenLayers.i18n("[Zoom]")));
			content_heading.appendChild(content_zoom);
			content.appendChild(content_heading);

			content.appendChild(makePermalinks(results[i].lonlat, results[i].getZoom(layer.map), results[i].osm));

			var icon = null;
			if(results[i].icon)
				icon = new OpenLayers.Icon(results[i].icon.replace(/\.p\.20\.png$/, "."+this.iconType+"."+this.iconSize+".png"), new OpenLayers.Size(this.iconSize, this.iconSize), new OpenLayers.Pixel(-this.iconSize/2, -this.iconSize/2));
			else if(i == 0)
				icon = this.highlightIcon.clone();
			results[i].marker = this.createMarker(
				results[i].lonlat,
				content,
				((markersvisible && typeof markersvisible[i] != "undefined" && markersvisible[i] != "0") || ((!markersvisible || typeof markersvisible[i] == "undefined") && i==0)),
				icon,
				dontzoom
			);
		}

		if(!dontzoom)
		{
			if(results.length == 1)
				this.map.setCenter(results[0].lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), results[0].getZoom(this.map));
			else if(results.length > 1)
				this.map.zoomToExtent(this.getDataExtent());
		}

		this.lastSearch = query;
		this.events.triggerEvent("lastSearchChange");

		var eventType = (results.length == 0 ? "searchFailure" : "searchSuccess");
		this.events.triggerEvent(eventType, { object : this, type : eventType, element: null, dontzoom: dontzoom, query: query });
	},
	getQueryObject : function() {
		var obj = {
		};

		if(this.lastSearch)
		{
			obj.search = this.lastSearch;
			var smopen = "";
			var smchanged = false;
			for(var i=0; i < this.markers.length; i++)
			{
				var visible = this.markers[i].cdauthFeature.popup ? this.markers[i].cdauthFeature.popup.visible() : false;
				smopen = (visible ? "1" : "0") + smopen; // Reverse order, first marker is last in the list for z-index reasons
				if(visible != (i == this.markers.length-1)) // First marker is open by default
					smchanged = true;
			}
			if(smchanged)
				obj.smopen = smopen;
		}
		return obj;
	},
	setQueryObject : function(obj) {
		// If obj.search is undefined, call nevertheless to reset the search
		this.geoSearch(obj.search, true, obj.smopen);
	},

	CLASS_NAME : "OpenLayers.Layer.cdauth.Markers.GeoSearch"
});

/**
 * Displays an XML file on the map (such as GPX, KML or OSM) auto-determining of the format. The colour is
 * randomly assigned.
 * If you set OpenLayers.Layer.cdauth.XML.relationURL, OSM sub-relations will be loaded in additional requests.
 * Include the JavaScript http://osm.cdauth.eu/ajax-proxy/ajax-proxy.js to "disable" the Same Origin Policy.
 * Otherwise, you might have to set OpenLayers.ProxyHost to a URL on your server. The actual URL will be appended
 * to that in encoded form.
 * @event allloadend If an array of URL is passed, this is only called when the last URL is actually loaded.
*/

OpenLayers.Layer.cdauth.XML = OpenLayers.Class(OpenLayers.Layer.GML, {
	cdauthURL : null,
	relations : null,
	colour : null,
	toLoad : 0,
	initialize : function(name, url, options) {
		this.cdauthURL = url;
		this.relations = { };

		if(this.colour == null)
		{
			switch((OpenLayers.Layer.cdauth.XML.colourCounter++)%4)
			{
				case 0: this.colour = "red"; break;
				case 1: this.colour = "blue"; break;
				case 2: this.colour = "green"; break;
				case 3: this.colour = "black"; break;
			}
		}

		OpenLayers.Layer.GML.prototype.initialize.apply(this, [ name ? name : url, url, OpenLayers.Util.extend({
			style: {
				strokeColor: this.colour,
				strokeWidth: 3,
				strokeOpacity: 0.5
			},
			projection: new OpenLayers.Projection("EPSG:4326"),
			zoomableInLayerSwitcher: true,
			shortName : "xml"+OpenLayers.Layer.cdauth.XML.shortNameI++
		}, options) ]);

		this.events.addEventType("allloadend");
	},
	loadGML : function(url) {
		if(!url)
		{
			if(!this.loaded)
			{
				url = this.url;
				this.loaded = true;
			}
			else
				return;
		}

		if(!(url instanceof Array))
			url = [ url ];
		this.events.triggerEvent("loadstart");
		for(var i=0; i<url.length; i++)
		{
			if(!url[i])
				continue;
			this.toLoad++;
			OpenLayers.Request.GET({
				url: url[i],
				success: function() {
					this.requestSuccess.apply(this, arguments);
					if(--this.toLoad == 0)
						this.events.triggerEvent("allloadend");
				},
				failure: function() {
					this.requestFailure.apply(this, arguments);
					if(--this.toLoad == 0)
						this.events.triggerEvent("allloadend");
				},
				scope: this
			});
		}
	},
	requestSuccess: function(request) {
		if(request.responseXML && request.responseXML.documentElement)
		{
			switch(request.responseXML.documentElement.tagName)
			{
				case "gpx":
					if(request.responseXML.documentElement.getAttribute("creator") == "CloudMade")
						this.format = OpenLayers.cdauth.Routing.Cloudmade.Format;
					else
						this.format = OpenLayers.Format.GPX;
					break;
				case "osm": this.format = OpenLayers.Format.OSM; break;
				case "kml": this.format = OpenLayers.Format.KML; break;
				case "response": this.format = OpenLayers.cdauth.Routing.MapQuest.Format;
			}
		}
		this.formatOptions = { extractAttributes: false };
		try
		{
			OpenLayers.Layer.GML.prototype.requestSuccess.apply(this, arguments);
		}
		catch(e)
		{
			alert(OpenLayers.i18n("Error parsing file."));
			this.events.triggerEvent("loadend");
		}

		if(OpenLayers.Layer.cdauth.XML.relationURL && this.format == OpenLayers.Format.OSM && request.responseXML)
		{
			var relations = request.responseXML.getElementsByTagName("relation");
			for(var i=0; i<relations.length; i++)
			{
				var id = relations[i].getAttribute("id");
				if(this.relations[id])
					continue;
				this.relations[id] = true;

				var url = OpenLayers.String.format(OpenLayers.Layer.cdauth.XML.relationURL, {"id": id});
				if(url == this.url)
					continue;
				this.loadGML(url);
			}
		}
	},
	getQueryObject : function() {
		var obj = { };
		if(this.removableInLayerSwitcher)
			obj.url = this.cdauthURL;
		return obj;
	},
	setQueryObject : function(obj) {
		if(obj.url != undefined && obj.url != this.cdauthURL)
		{
			this.cdauthUrl = obj.url;
			this.setUrl(obj.url);
		}
	},

	CLASS_NAME : "OpenLayers.Layer.cdauth.XML"
});

/**
 * Set this to the XML URL that shall be loaded for relations referenced in OSM files. “${id}" will be replaced by the ID of the relation.
 * @var String
*/
OpenLayers.Layer.cdauth.XML.relationURL = "http://www.openstreetmap.org/api/0.6/relation/${id}/full";

OpenLayers.Layer.cdauth.XML.colourCounter = 1;
OpenLayers.Layer.cdauth.XML.shortNameI = 1;

OpenLayers.cdauth.Routing = OpenLayers.Class({
	/**
	 * The start coordinates in WGS-84
	 * @var OpenLayers.LonLat
	*/
	from : null,
	/**
	 * The target coordinates in WGS-84
	 * @var OpenLayers.LonLat
	*/
	to : null,
	/**
	 * The means of transport
	 * @var OpenLayers.cdauth.Routing.Medium
	*/
	medium : null,
	/**
	 * The routing type, either fastest or shortest.
	 * @var OpenLayers.cdauth.Routing.Type
	*/
	routingType : null,
	/**
	 * An array of via points in WGS-84.
	 * @var Array[OpenLayers.LonLat]
	*/
	via : null,

	initialize : function() {
		this.via = [ ];
	},

	/**
	 * Returns the URL of the GPX file containing the route with the set parameters. May return an array of URLs if multiple files
	 * have to be loaded.
	 * @return String|Array[String]
	*/
	getGPXURL : function() {
		return null;
	},

	/**
	 * Returns a Permalink to the original page that created the route or null if not appropriate.
	 * @return String
	*/
	getPermalinkURL : function() {
		return null;
	},

	/**
	 * Extracts the length of the route in kilometers from the GPX DOM tree.
	 * @param Document dom
	 * @return Number
	*/
	getRouteLength : function(dom) {
		return null;
	},

	/**
	 * Extracts the duration of the route in hours from the GPX DOM tree.
	 * @param Document dom
	 * @return Number
	*/
	getRouteDuration : function(dom) {
		return null;
	},

	/**
	 * Reorders the via points so that the total driving time/distance is minimised but still all the targets are
	 * reached. Only does something when there are 2 or more via points (otherwise calls the callback function immediately).
	 * @param Function callback A callback function that is called in any case after the ordering has been done
	 *                          or an error has occurred. May receive an error message as first parameter.
	 * @return void
	*/
	reorderViaPoints : function(callback) {
	}
});

/**
 * Means of transportation.
*/
OpenLayers.cdauth.Routing.Medium = {
	CAR : "car",
	BICYCLE : "bicycle",
	FOOT : "foot"
};

/**
 * Route calculation mechanisms.
*/
OpenLayers.cdauth.Routing.Type = {
	FASTEST : "fastest",
	SHORTEST : "shortest"
};

OpenLayers.cdauth.Routing.YOURS = OpenLayers.Class(OpenLayers.cdauth.Routing, {
	routingURL : "http://www.yournavigation.org/api/1.0/gosmore.php",
	permalinkURL : "http://www.yournavigation.org/",
	routingMediumMapping : { "car" : "motorcar", "bicycle" : "bicycle", "foot" : "foot" },
	routingTypeMapping : { "shortest" : "0", "fastest" : "1" },
	attribution : OpenLayers.i18n("attribution-routing-yours"),

	getGPXURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var url = this.routingURL +
			"?v="+this.routingMediumMapping[this.medium] +
			"&fast="+this.routingTypeMapping[this.routingType] +
			"&format=kml";
		var urls = [ ];
		var nodes = [ this.from ].concat(this.via).concat([ this.to ]);
		for(var i=1; i<nodes.length; i++)
		{
			urls.push(url +
				"&flat="+nodes[i-1].lat +
				"&flon="+nodes[i-1].lon +
				"&tlat="+nodes[i].lat +
				"&tlon="+nodes[i].lon);
		}
		return urls;
	},

	getPermalinkURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var url = this.permalinkURL + "?flat="+this.from.lat +
			"&flon="+this.from.lon +
			"&tlat="+this.to.lat +
			"&tlon="+this.to.lon +
			"&v="+this.routingMediumMapping[this.medium] +
			"&fast="+this.routingTypeMapping[this.routingType];
		for(var i=0; i<this.via.length; i++)
		{
			url += "&wlat="+this.via[i].lat +
			          "&wlon="+this.via[i].lon;
		}
		return url;
	},

	getRouteLength : function(dom) {
		var distanceEls = dom.getElementsByTagName("distance");
		if(distanceEls.length > 0)
			return 1*distanceEls[0].firstChild.data;
		else
			return null;
	}
});

OpenLayers.cdauth.Routing.Cloudmade = OpenLayers.Class(OpenLayers.cdauth.Routing, {
	routingURL : "http://routes.cloudmade.com/0abc333ea36c4c34bc67a72442d9770b/api/0.3/",
	attribution : OpenLayers.i18n("attribution-routing-cloudmade"),

	getGPXURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var url = this.routingURL +
		          this.from.lat + "," + this.from.lon;
		for(var i=0; i<this.via.length; i++)
			url += (i == 0 ? ",[" : ",") + this.via[i].lat + "," + this.via[i].lon;
		if(this.via.length > 0)
			url += "]";
		url += "," + this.to.lat + "," + this.to.lon + "/" + this.medium;
		if(this.medium == "foot" || this.medium == "bicycle")
			url += "/fastest";
		else
			url += "/" + this.routingType;
		url += ".gpx?units=km";
		return url;
	},

	getRouteLength : function(dom) {
		var extensions = dom.getElementsByTagName("extensions");
		if(extensions.length > 0)
		{
			var distance = extensions[0].getElementsByTagName("distance");
			if(distance.length > 0)
				return distance[0].firstChild.data/1000;
		}
		return null;
	},

	getRouteDuration : function(dom) {
		var extensions = dom.getElementsByTagName("extensions");
		if(extensions.length > 0)
		{
			var duration = extensions[0].getElementsByTagName("time");
			if(duration.length > 0)
				return duration[0].firstChild.data/3600;
		}
		return null;
	}
});

OpenLayers.cdauth.Routing.Cloudmade.Format = OpenLayers.Class(OpenLayers.Format.GPX, {
	read : function(doc) {
		if (typeof doc == "string") {
			doc = OpenLayers.Format.XML.prototype.read.apply(this, [doc]);
		}

		var points = doc.getElementsByTagName("wpt");
        var point_features = [];
        for (var i = 0, len = points.length; i < len; i++) {
            point_features.push(new OpenLayers.Geometry.Point(points[i].getAttribute("lon"), points[i].getAttribute("lat")));
        }
		features = [ new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(point_features), null) ];

		if (this.internalProjection && this.externalProjection) {
			for (var g = 0, featLength = features.length; g < featLength; g++) {
				features[g].geometry.transform(this.externalProjection, this.internalProjection);
			}
		}

		return features;
	}
});

OpenLayers.cdauth.Routing.MapQuest = OpenLayers.Class(OpenLayers.cdauth.Routing, {
	routingURL : "http://open.mapquestapi.com/directions/v0/route",
	orderedURL : "http://open.mapquestapi.com/directions/v0/optimizedRoute",
	attribution : OpenLayers.i18n("attribution-routing-mapquest"),

	getGPXURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var json = "{locations:[{latLng:{lat:" + this.from.lat + ",lng:" + this.from.lon +"}}";
		for(var i=0; i<this.via.length; i++)
			json += ",{latLng:{lat:" + this.via[i].lat + ",lng:" + this.via[i].lon + "}}";
		json += ",{latLng:{lat:" + this.to.lat + ",lng:" + this.to.lon + "}}]";

		json += ",options:{unit:k,generalize:0,narrativeType:none";

		if(this.medium == OpenLayers.cdauth.Routing.Medium.FOOT || this.medium == OpenLayers.cdauth.Routing.Medium.BICYCLE)
			json += ",routeType:pedestrian";
		else
			json += ",routeType:" + this.routingType;

		json += "}}";

		return this.routingURL + "?inFormat=json&outFormat=xml&json=" + encodeURIComponent(json);
	},

	getRouteLength : function(dom) {
		var els = dom.getElementsByTagName("route")[0].childNodes;
		for(var i=0; i<els.length; i++)
		{
			if(els[i].tagName == "distance")
				return els[i].firstChild.data;
		}
	},

	getRouteDuration : function(dom) {
		var els = dom.getElementsByTagName("route")[0].childNodes;
		var time = null;
		for(var i=0; i<els.length; i++)
		{
			if(els[i].tagName == "time")
			{
				time = els[i].firstChild.data/3600;
				break;
			}
		}

		if(time != null)
		{
			// NOTE: Workaround for missing bicycle routing support: Divide the time to walk by 3.
			if(this.medium == OpenLayers.cdauth.Routing.Medium.BICYCLE)
				return time/3;
			else
				return time;
		}
	},

	reorderViaPoints : function(callback) {
		if(callback == null)
			callback = function() { };

		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
		{
			callback("Insufficient parameters.");
			return;
		}
		if(this.via.length < 2)
		{
			callback("Less than 2 via points.");
			return;
		}
		var json = "{locations:[{latLng:{lat:" + this.from.lat + ",lng:" + this.from.lon +"}}";
		for(var i=0; i<this.via.length; i++)
			json += ",{latLng:{lat:" + this.via[i].lat + ",lng:" + this.via[i].lon + "}}";
		json += ",{latLng:{lat:" + this.to.lat + ",lng:" + this.to.lon + "}}]";

		json += ",options:{generalize:-1,narrativeType:none";

		if(this.medium == OpenLayers.cdauth.Routing.Medium.FOOT || this.medium == OpenLayers.cdauth.Routing.Medium.BICYCLE)
			json += ",routeType:pedestrian";
		else
			json += ",routeType:" + this.routingType;

		json += "}}";

		var url = this.orderedURL + "?inFormat=json&outFormat=xml&json=" + encodeURIComponent(json);

		OpenLayers.Request.GET({
			url: url,
			success: function(resp) {
				if(!resp.responseXML)
				{
					callback("Error: no response");
					return;
				}

				var locSequence = resp.responseXML.getElementsByTagName("locationSequence");
				if(locSequence.length == 0)
				{
					callback(true);
					return;
				}

				locSequence = locSequence[0].firstChild.data.split(",");

				var newVia = [ ];
				for(var i=1; i<locSequence.length-1; i++) // The first and last location are the start and end points
				{
					if(this.via[locSequence[i]-1] == undefined)
					{
						callback("Error: non-existent location");
						return;
					}
					newVia.push(this.via[locSequence[i]-1]);
				}
				this.via = newVia;
				callback();
			},
			failure: function() {
				callback("Request error");
			},
			scope: this
		});
	}
});

OpenLayers.cdauth.Routing.MapQuest.Format = OpenLayers.Class(OpenLayers.Format.GPX, {
	read : function(doc) {
		if (typeof doc == "string") {
			doc = OpenLayers.Format.XML.prototype.read.apply(this, [doc]);
		}

		var points = doc.getElementsByTagName("shapePoints")[0].getElementsByTagName("latLng");
		var point_features = [];
		for (var i = 0, len = points.length; i < len; i++) {
			point_features.push(new OpenLayers.Geometry.Point(points[i].getElementsByTagName("lng")[0].firstChild.data, points[i].getElementsByTagName("lat")[0].firstChild.data));
		}
		features = [ new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(point_features), null) ];

		if (this.internalProjection && this.externalProjection) {
			for (var g = 0, featLength = features.length; g < featLength; g++) {
				features[g].geometry.transform(this.externalProjection, this.internalProjection);
			}
		}

		return features;
	}
});

/**
 * Shows a calculated route on the map. Add this layer to a map and set the different paramters using the set* functions. As soon as all
 * parameters are set, the route will be displayed. The parameters can be updated then and the route will be recalculated.

 * @event draggedRoute The route was changed using drag and drop.
*/
OpenLayers.Layer.cdauth.XML.Routing = OpenLayers.Class(OpenLayers.Layer.cdauth.XML, {
	HOVER_MAX_DISTANCE : 10,

	fromIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/route-start.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),
	toIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/route-stop.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),
	viaIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/yellow.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),

	colour : "blue",

	provider : OpenLayers.cdauth.Routing.MapQuest, // is instantiated in the initialize() function

	fromMarker : null,
	toMarker : null,
	viaMarkers : null,

	zoomAtNextSuccess : false,
	distance : null,
	duration : null,
	markers : null,
	markersDrawn : false,

	dragFeature : null,
	featureHandler : null,
	temporaryViaMarker : null,

	initialize : function(name, options) {
		OpenLayers.Layer.cdauth.XML.prototype.initialize.apply(this, [ name, undefined, options ]);

		this.provider = new this.provider();
		this.attribution = this.provider.attribution;

		this.viaMarkers = [ ];
		this.markers = [ ];

		this.events.addEventType("draggedRoute");

		var routingLayer = this;
		this.dragFeature = new OpenLayers.Control.DragFeature(this, {
			dragCallbacks : { move : function(pixel) {
				// this.feature is the marker
				// FIXME: Sometimes after creating two via points, this.feature.icon is null
				var newPx = new OpenLayers.Pixel(this.feature.icon.px.x + (pixel.x - this.lastPixel.x), this.feature.icon.px.y - (this.lastPixel.y - pixel.y));
				this.lastPixel = pixel;
				this.feature.draw(newPx);
			} },
			onComplete : function(marker, pixel) {
				var lonlat = this.map.getLonLatFromPixel(this.feature.icon.px).transform(this.map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326"));
				if(marker == routingLayer.fromMarker)
					routingLayer.setFrom(lonlat);
				else if(marker == routingLayer.toMarker)
					routingLayer.setTo(lonlat);
				else
				{
					for(var i=0; i<routingLayer.viaMarkers.length; i++)
					{
						if(marker == routingLayer.viaMarkers[i])
						{
							if(lonlat.lon != routingLayer.provider.via[i].lon || lonlat.lat != routingLayer.provider.via[i].lat)
							{
								routingLayer.provider.via[i] = lonlat;
								routingLayer.updateRouting();
							}
							break;
						}
					}
					routingLayer.events.triggerEvent("queryObjectChanged");
				}
				routingLayer.events.triggerEvent("draggedRoute");
			}
		});
		this.featureHandler = OpenLayers.Util.extend(new OpenLayers.Handler({ map : null }), {
			lastPoint : null,
			lastXY : null,
			mousemove : function(evt) {
				var point = routingLayer.getPointFromMousePosition(evt.xy);
				if(point != null && !routingLayer.dragFeature.handlers.drag.active)
				{
					if(routingLayer.temporaryViaMarker == null)
					{
						routingLayer.temporaryViaMarker = new OpenLayers.Marker(new OpenLayers.LonLat(0, 0), routingLayer.viaIcon.clone());
						routingLayer.temporaryViaMarker.layer = routingLayer;
						routingLayer.addMarker(routingLayer.temporaryViaMarker);
						routingLayer.map.cursorRoutingBkp = (routingLayer.map.viewPortDiv.style.cursor || "");
					}
					routingLayer.temporaryViaMarker.lonlat = point.lonlat;
					routingLayer.drawMarker(routingLayer.temporaryViaMarker);
					this.lastPoint = point;
					this.lastXY = evt.xy;
					routingLayer.map.viewPortDiv.style.cursor = "pointer";
				}
				else if(routingLayer.temporaryViaMarker != null)
				{
					routingLayer.removeMarker(routingLayer.temporaryViaMarker);
					routingLayer.temporaryViaMarker.destroy();
					routingLayer.temporaryViaMarker = null;
					this.lastPoint = null;
					routingLayer.map.viewPortDiv.style.cursor = routingLayer.map.cursorRoutingBkp;
				}
			},
			mousedown : function(evt) {
				if(this.lastPoint != null)
				{
					routingLayer.map.viewPortDiv.style.cursor = routingLayer.map.cursorRoutingBkp;

					var newIndex = routingLayer.provider.via.length;
					while(newIndex > 0)
					{
						var thisPoint = routingLayer.getPointFromLonLat(routingLayer.provider.via[newIndex-1].clone().transform(new OpenLayers.Projection("EPSG:4326"), routingLayer.map.getProjectionObject()));
						if(thisPoint == null || thisPoint.index > this.lastPoint.index)
						{
							routingLayer.provider.via[newIndex] = routingLayer.provider.via[newIndex-1];
							routingLayer.viaMarkers[newIndex] = routingLayer.viaMarkers[newIndex-1];
							newIndex--;
						}
						else
							break;
					}
					routingLayer.temporaryViaMarker.draw(new OpenLayers.Pixel(this.lastXY.x, this.lastXY.y+2));
					routingLayer.provider.via[newIndex] = this.lastPoint.lonlat;
					routingLayer.viaMarkers[newIndex] = routingLayer.temporaryViaMarker;
					routingLayer.temporaryViaMarker = null;
					this.lastPoint = null;

					routingLayer.dragFeature.handlers.feature.mousemove({ type : "mousemove", target : routingLayer.viaMarkers[newIndex].icon.imageDiv.firstChild });
					routingLayer.dragFeature.handlers.drag.mousedown(evt);

					OpenLayers.Event.stop(evt);
					return false;
				}
			},
			dblclick : function(evt) {
				var feature = routingLayer.getFeatureFromEvent(evt);
				if(feature == null)
					return true;

				for(var i=0; i<routingLayer.viaMarkers.length; i++)
				{
					if(routingLayer.viaMarkers[i] == feature)
					{
						routingLayer.provider.via.splice(i, 1);
						routingLayer.updateRouting();
						routingLayer.events.triggerEvent("queryObjectChanged");
						routingLayer.events.triggerEvent("draggedRoute");
						return false;
					}
				}

				return true;
			}
		});
	},

	setMap : function(map) {
		OpenLayers.Layer.cdauth.XML.prototype.setMap.apply(this, arguments);

		map.addControl(this.dragFeature);
		this.dragFeature.activate();

		this.featureHandler.setMap(map);
		this.featureHandler.activate();
	},

	getFeatureFromEvent : function(evt) {
		// We don't want to drag the actual features, but the markers instead
		var markers = [ this.fromMarker, this.toMarker ].concat(this.viaMarkers);
		for(var i=0; i<markers.length; i++)
		{
			if(markers[i] != null && markers[i].icon && markers[i].icon.imageDiv && (evt.target || evt.srcElement) == markers[i].icon.imageDiv.firstChild)
				return markers[i];
		}
		return null;
	},

	getPointFromMousePosition : function(xy) {
		if(this.map == null)
			return null;
		var lonlat = this.map.getLonLatFromPixel(xy);
		return this.getPointFromLonLat(lonlat);
	},

	getPointFromLonLat : function(lonlat) {
		if(!this.features)
			return null;
		var smallestDistance = null;
		var smallestDistancePoint = null;
		var index = 0; // Index is used to find out the position of the point in the ordered list of points
		var maxDistance = this.HOVER_MAX_DISTANCE * this.map.getResolution();

		for(var j=0; j<this.features.length; j++)
		{
			if(!this.features[j] || !this.features[j].geometry || !this.features[j].geometry.components)
				continue;

			var points = this.features[j].geometry.components;
			var p1,p2,d,u,px;
			for(var i=0; i<points.length-1; i++,index++)
			{
				p1 = points[i];
				p2 = points[i+1];
				d = { x : p2.x-p1.x, y : p2.y-p1.y };
				if(d.x == 0 && d.y == 0)
					continue;
				u = ((lonlat.lon-p1.x)*d.x + (lonlat.lat-p1.y)*d.y) / (d.x*d.x + d.y*d.y); // See http://local.wasp.uwa.edu.au/~pbourke/geometry/pointline/
				if(u < 0 || u > 1)
					continue;

				px = { x : p1.x+u*d.x, y : p1.y+u*d.y };

				var distanceX = Math.abs(px.x-lonlat.lon);
				var distanceY = Math.abs(px.y-lonlat.lat);
				if(distanceX > maxDistance || distanceY > maxDistance)
					continue;
				var distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
				if(distance > maxDistance)
					continue;
				if(smallestDistance == null || distance < smallestDistance)
				{
					smallestDistancePoint = [ index+u, px ];
					smallestDistance = distance;
				}
			}
		}

		if(smallestDistancePoint != null)
			return { index : smallestDistancePoint[0], lonlat : new OpenLayers.LonLat(smallestDistancePoint[1].x, smallestDistancePoint[1].y) };
		else
			return null;
	},

	/**
	 * Reorders the via points so that the total driving time/distance is minimised but still all the targets are
	 * reached. Only does something when there are 2 or more via points. In case of an error, nothing is done.
	 * @param Function callback A callback function to be called as soon as the points are ordered or an error has
	 *                          occurred. On success, the first parameter is null, else it may be an error message.
	 * @return void
	*/
	reorderViaPoints : function(callback) {
		var layer = this;
		this.provider.reorderViaPoints(function(error) {
			layer.events.triggerEvent("queryObjectChanged");
			layer.updateRouting(false);

			if(callback != null)
				callback(error);
		});
	},

	/**
	 * Set the start point of this route. Recalculates the route.
	 * @param OpenLayers.LonLat from The start point to set for this route.
	 * @param boolean zoom Zoom the map to this route after it has been loaded?
	 * @return void
	*/
	setFrom : function(from, zoom) {
		if(from == this.provider.from)
		{
			if(zoom) this.zoomMap();
			return;
		}
		this.provider.from = from;

		this.events.triggerEvent("queryObjectChanged");
		this.updateRouting(zoom);
	},

	/**
	 * Set the destination point of this route. Recalculates the route.
	 * @param OpenLayers.LonLat to The destination point to set for this route.
	 * @param boolean zoom Zoom the map to this route after it has been loaded?
	 * @return void
	*/
	setTo : function(to, zoom) {
		if(to == this.provider.to)
		{
			if(zoom) this.zoomMap();
			return;
		}
		this.provider.to = to;

		this.events.triggerEvent("queryObjectChanged");
		this.updateRouting(zoom);
	},

	/**
	 * Set the means of transportation for this route. Recalculates the route.
	 * @param OpenLayers.Layer.cdauth.XML.Routing.Medium medium The means of transportation to use for this route.
	 * @param boolean zoom Zoom the map to this route after it has been loaded?
	 * @return void
	*/
	setMedium : function(medium, zoom) {
		if(medium == this.provider.medium)
		{
			if(zoom) this.zoomMap();
			return;
		}
		this.provider.medium = medium;
		this.events.triggerEvent("queryObjectChanged");
		this.updateRouting(zoom);
	},

	/**
	 * Set the route calculation mechanism for this route. Recalculates the route.
	 * @param OpenLayers.Layer.cdauth.XML.Routing.Type type The route calculation mechanism to use for this route.
	 * @param boolean zoom Zoom the map to this route after it has been loaded?
	 * @return void
	*/
	setType : function(type, zoom) {
		if(type == this.provider.routingType)
		{
			if(zoom) this.zoomMap();
			return;
		}
		this.provider.routingType = type;
		this.events.triggerEvent("queryObjectChanged");
		this.updateRouting(zoom);
	},

	updateRouting : function(zoom) {
		if(this.fromMarker != null)
		{
			this.removeMarker(this.fromMarker);
			this.fromMarker = null;
		}
		if(this.provider.from != null)
		{
			this.fromMarker = new OpenLayers.Marker(this.provider.from.clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), this.fromIcon.clone())
			this.fromMarker.layer = this; // Required for the drag control
			this.addMarker(this.fromMarker);
		}

		if(this.toMarker != null)
		{
			this.removeMarker(this.toMarker);
			this.toMarker = null;
		}
		if(this.provider.to != null)
		{
			this.toMarker = new OpenLayers.Marker(this.provider.to.clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), this.toIcon.clone())
			this.toMarker.layer = this; // Required for the drag control
			this.addMarker(this.toMarker);
		}

		for(var i=0; i<this.viaMarkers.length; i++)
		{
			this.removeMarker(this.viaMarkers[i]);
			this.viaMarkers[i].destroy();
		}
		this.viaMarkers = [ ];
		for(var i=0; i<this.provider.via.length; i++)
		{
			this.viaMarkers[i] = new OpenLayers.Marker(this.provider.via[i].clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), this.viaIcon.clone())
			this.viaMarkers[i].layer = this; // Required for the drag control
			this.addMarker(this.viaMarkers[i]);
		}

		if(this.provider.from == null || this.provider.to == null || this.provider.medium == null || this.provider.routingType == null)
			return null;

		this.zoomAtNextSuccess = zoom;
		this.distance = null;
		this.duration = null;

		this.setUrl(this.provider.getGPXURL());
	},

	/**
	 * Returns a link to a web page displaying detailed information about the route, such as driving instructions.
	 * @return String A link to a web page or null if this route is not initialised yet.
	*/
	getDetailedLink : function() {
		return this.provider.getPermalinkURL();
	},

	getDistance : function() {
		return this.distance;
	},

	getDuration : function() {
		return this.duration;
	},

	requestSuccess : function(request) {
		if(request.responseXML)
		{ // Do this before calling the parent function as that invokes the loadend event
			this.distance = this.provider.getRouteLength(request.responseXML);
			this.duration = this.provider.getRouteDuration(request.responseXML);
		}

		OpenLayers.Layer.cdauth.XML.prototype.requestSuccess.apply(this, arguments);

		if(this.zoomAtNextSuccess)
			this.zoomMap();
	},

	zoomMap : function() {
		var extent = this.getDataExtent();
		if(extent != null)
			this.map.zoomToExtent(extent);
	},

	getQueryObject : function() {
		if(this.provider.from == null || this.provider.to == null || this.provider.medium == null || this.provider.routingType == null)
			return { };
		else
		{
			var ret = {
				from : { lon : this.provider.from.lon, lat : this.provider.from.lat },
				to : { lon : this.provider.to.lon, lat : this.provider.to.lat },
				medium : this.provider.medium,
				type : this.provider.routingType
			};
			if(this.provider.via.length > 0)
			{
				ret.via = { };
				for(var i=0; i<this.provider.via.length; i++)
					ret.via[i] = { lon : this.provider.via[i].lon, lat : this.provider.via[i].lat };
			}
			return ret;
		}
	},

	setQueryObject : function(obj) {
		var doUpdate = false;
		if(obj.medium != this.provider.medium)
		{
			this.provider.medium = obj.medium;
			doUpdate = true;
		}
		if(obj.type != this.provider.routingType)
		{
			this.provider.routingType = obj.type;
			doUpdate = true;
		}
		if(obj.from == undefined && this.provider.from != null)
		{
			this.provider.from = null;
			doUpdate = true;
		}
		else if(obj.from != undefined && obj.from.lat != undefined && obj.from.lon != undefined && (this.provider.from == null || obj.from.lat != this.provider.from.lat || obj.from.lon != this.provider.from.lon))
		{
			this.provider.from = new OpenLayers.LonLat(obj.from.lon, obj.from.lat);
			doUpdate = true;
		}
		if(obj.to == undefined && this.provider.to != null)
		{
			this.provider.to = null;
			doUpdate = true;
		}
		else if(obj.to != undefined && obj.to.lat != undefined && obj.to.lon != undefined && (this.provider.to == null || obj.to.lat != this.provider.to.lat || obj.to.lon != this.provider.to.lon))
		{
			this.provider.to = new OpenLayers.LonLat(obj.to.lon, obj.to.lat);
			doUpdate = true;
		}

		var i = 0;
		var wrong = false;
		if(obj.via != undefined)
		{
			for(; obj.via[i] != undefined; i++)
			{
				if(obj.via[i].lon == undefined || obj.via[i].lat == undefined)
					continue;
				if(this.provider.via[i] == undefined || this.provider.via[i].lon != obj.via[i].lon || this.provider.via[i].lat != obj.via[i].lat)
				{
					wrong = true;
					break;
				}
			}
		}
		if(wrong || i != this.provider.via.length)
		{
			this.via = [ ];
			if(obj.via != undefined)
			{
				for(var i=0; obj.via[i] != undefined; i++)
					this.provider.via.push(new OpenLayers.LonLat(obj.via[i].lon, obj.via[i].lat));
			}
			doUpdate = true;
		}

		if(doUpdate)
			this.updateRouting(false);
	},

	drawMarker : function(marker) {
		var px = this.map.getPixelFromLonLat(marker.lonlat);
		if(px == null)
			marker.display(false);
		else
		{
			if(!marker.isDrawn())
			{
				var markerImg = marker.draw(px);
				this.div.appendChild(markerImg);
			}
			else if(marker.icon)
				marker.icon.moveTo(px);
		}
	},
	addMarker : OpenLayers.Layer.Markers.prototype.addMarker,
	removeMarker : OpenLayers.Layer.Markers.prototype.removeMarker,
	clearMarkers : OpenLayers.Layer.Markers.prototype.clearMarkers,
	moveTo : function(bounds, zoomChanged, dragging) {
		OpenLayers.Layer.cdauth.XML.prototype.moveTo.apply(this, arguments);
		if(zoomChanged || !this.markersDrawn || !dragging)
		{
			for(var i=0, len=this.markers.length; i<len; i++)
				this.drawMarker(this.markers[i]);
            this.markersDrawn = true;
		}
	}
});

/**
 * A class to control the URL hash part.
 * @event hashChanged The URL hash has been changed by the user
*/
OpenLayers.URLHashHandler = OpenLayers.Class({
	/**
	 * The interval in milliseconds, how often location.hash shall be checked for changes.
	 * @var Number
	*/
	interval : 500,

	/**
	 * Is set to true on the map event newHash. Makes update() update the location hash.
	 * @var boolean
	*/
	hashChanged : false,

	/**
	 * The return value of setInterval.
	*/
	intervalObject : null,

	/**
	 * The last value of location.hash that was set by this class. If it differs from location.hash, the user has changed it.
	 * @var String
	*/
	lastHash : null,

	/**
	 * @var OpenLayers.Events
	*/
	events : null,

	initialize : function() {
		this.events = new OpenLayers.Events(this, null, [ "hashChanged" ]);
	},

	/**
	 * Starts the Interval that looks for changes.
	 * @return void
	*/
	start : function() {
		var obj = this;
		this.lastHash = this.getLocationHash();
		if(this.intervalObject == null)
			this.intervalObject = setInterval(function(){ obj.checkHash(); }, this.interval);
	},

	/**
	 * Stops the Interval that looks for changes.
	 * @return void
	*/
	stop : function() {
		if(this.intervalObject == null)
			return;
		clearInterval(this.intervalObject);
		this.intervalObject = null;
	},

	/**
	 * Checks if location.hash has changed and triggers an event then.
	 * @return void
	*/
	checkHash : function() {
		var oldHash = this.lastHash;
		this.lastHash = this.getLocationHash();
		if(this.lastHash != oldHash)
			this.events.triggerEvent("hashChanged", { oldHash: oldHash, newHash: this.lastHash });
	},

	/**
	 * Gets the part after the # in the URL.
	 * At least in Firefox, location.hash contains “&” if the hash part contains “%26”. This makes searching for URLs (such as OSM PermaLinks) hard and we work around that problem by extracting the desired value from location.href.
	 * @return String
	*/
	getLocationHash : function() {
		var match = location.href.match(/#(.*)$/);
		if(match)
			return match[1];
		else
			return "";
	},

	/**
	 * Sets the location has to the given hash.
	 * @param String hash The hash part without #
	 * @return void
	*/
	setLocationHash : function(hash)
	{
		var restart = false;
		if(this.intervalObject)
		{
			this.stop();
			restart = true;
		}

		location.hash = "#"+hash;

		if(restart)
			this.start();
	},

	CLASS_NAME: "OpenLayers.URLHashHandler"
});

/**
 * An instance of this class keeps the location hash part in sync with the Permalink of a map object.
 * @event hashChanged location.hash was changed.
*/
OpenLayers.Control.cdauth.URLHashHandler = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * @var OpenLayers.URLHashHandler
	*/
	hashHandler : null,

	/**
	 * The minimum number of milliseconds that the map view has to stay the same for the location hash to be updated. This way it is not
	 * updated while scrolling the map.
	 * @var Number
	*/
	minRest : 750,

	locationUpdateTimeout : null,

	initialize : function() {
		OpenLayers.Control.prototype.initialize.apply(this, arguments);

		this.events.addEventType("hashChanged");

		this.hashHandler = new OpenLayers.URLHashHandler();
		this.hashHandler.events.register("hashChanged", this, this.updateMapView);
	},

	/**
	 * Initialises an interval that checks for changes in location.hash automatically.
	*/
	activate : function() {
		if(!OpenLayers.Control.prototype.activate.apply(this, arguments))
			return false;

		if(!this.map)
		{
			this.deactivate();
			return false;
		}

		this.map.events.register("newHash", this, this.newHashHandler);
		this.hashHandler.start();

		if(this.hashHandler.getLocationHash() != "")
			this.updateMapView();
		else
			this.updateLocationHash();

		return true;
	},

	deactivate : function() {
		if(!OpenLayers.Control.prototype.deactivate.apply(this, arguments))
			return false;

		this.hashHandler.stop();
		map.events.unregister("newHash", this, this.newHashHandler);

		return true;
	},

	newHashHandler : function() {
		if(this.locationUpdateTimeout)
		{
			clearTimeout(this.locationUpdateTimeout);
			this.locationUpdateTimeout = null;
		}

		var control = this;
		this.locationUpdateTimeout = setTimeout(function(){
			control.locationUpdateTimeout = null;
			control.updateLocationHash();
		}, this.minRest);
	},

	/**
	 * Updates location.hash to the current map view.
	*/
	updateLocationHash : function() {
		var queryObject = this.map.getQueryObject();
		if(!queryObject)
			return false;
		this.hashHandler.setLocationHash(encodeQueryString(queryObject));
		this.events.triggerEvent("hashChanged");
		return true;
	},

	/**
	 * Updates the map view to show the content of location.hash.
	*/
	updateMapView : function() {
		var query_object = decodeQueryString(this.hashHandler.getLocationHash());
		this.map.zoomToQuery(query_object);
		this.updateLocationHash();
	},

	CLASS_NAME : "OpenLayers.Control.cdauth.URLHashHandler"
});

/**
 * Adds a “Go home” link to the map in browsers that support geolocation. The link requests the current position of the user and zooms
 * the map there.
*/

OpenLayers.Control.cdauth.GeoLocation = OpenLayers.Class(OpenLayers.Control, {
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
	 * @return void
	*/
	goToGeoLocation : function() {
		if(!this.map || !navigator.geolocation) return;
		var map = this.map;
		var zoomLevel = this.zoomLevel;
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(new OpenLayers.LonLat(position.coords.longitude, position.coords.latitude).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), zoomLevel);
		});
	},

	CLASS_NAME : "OpenLayers.Control.cdauth.GeoLocation"
});

/**
 * A coordinate grid on the map. Draws coordinate lines on the map in a scale that maxHorizontalLines and maxVerticalLines aren’t exceeded.
*/
OpenLayers.Layer.cdauth.CoordinateGrid = OpenLayers.Class(OpenLayers.Layer.Vector, {
	/**
	 * The maximum number of horizontal coordinate lines on the viewport.
	 * @var Number
	*/
	maxHorizontalLines : 6,

	/**
	 * The maximum number of vertical coordinate lines on the viewport. If set to null, is automatically calculated from the viewport aspect ratio.
	 * @var Number
	*/
	maxVerticalLines : null,

	/**
	 * The line style of normal coordinate lines.
	 * @var OpenLayers.Feature.Vector.style
	*/
	styleMapNormal : { stroke: true, stokeWidth: 1, strokeColor: "black", strokeOpacity: 0.2 },

	/**
	 * The line style of an important coordinate line, such as a number dividable by 10.
	 * @var OpenLayers.Feature.Vector.style
	*/
	styleMapHighlight : { stroke: true, stokeWidth: 2, strokeColor: "black", strokeOpacity: 0.5 },

	/**
	 * The style of the grid line captions that display the degree number.
	 * @var OpenLayers.Feature.Vector.style
	*/
	labelStyleMapNormal : { fontColor: "#777", fontSize: "10px" },

	/**
	 * The style of the highlighted (see styleMapHighlight) grid line captions that display the degree number.
	 * @var OpenLayers.Feature.Vector.style
	*/
	labelStyleMapHighlight : { fontColor: "#666", fontSize: "10px", fontWeight: "bold" },

	horizontalLines : null,
	verticalLines : null,
	degreeLabels : null,

	initialize : function(name, options) {
		this.horizontalLines = { };
		this.verticalLines = { };
		this.degreeLabels = [ ];

		if(typeof name == "undefined" || name == null)
			name = OpenLayers.i18n("Coordinate grid");
		options = OpenLayers.Util.extend(options, { projection : new OpenLayers.Projection("EPSG:4326") });
		OpenLayers.Layer.Vector.prototype.initialize.apply(this, [ name, options ]);
	},
	setMap : function() {
		OpenLayers.Layer.Vector.prototype.setMap.apply(this, arguments);

		this.map.events.register("moveend", this, this.drawGrid);
		this.map.events.register("mapResize", this, this.drawGrid);
		this.events.register("visibilitychanged", this, this.drawGrid);
	},
	drawGrid : function() {
		if(!this.map || !this.map.getExtent() || !this.getVisibility()) return;

		var extent = this.map.getExtent().transform(this.map.getProjectionObject(), this.projection);
		var maxExtent = this.map.maxExtent.clone().transform(this.map.getProjectionObject(), this.projection);

		var addFeatures = [ ];
		var destroyFeatures = [ ];

		this.destroyFeatures(this.degreeLabels);
		this.degreeLabels = [ ];

		// Display horizontal grid
		var horizontalDistance = (extent.top-extent.bottom)/this.maxHorizontalLines;
		var horizontalDivisor = Math.pow(10, Math.ceil(Math.log(horizontalDistance)/Math.LN10));
		if(5*(extent.top-extent.bottom)/horizontalDivisor <= this.maxHorizontalLines)
			horizontalDivisor /= 5;
		else if(2*(extent.top-extent.bottom)/horizontalDivisor <= this.maxHorizontalLines)
			horizontalDivisor /= 2;

		for(var i in this.horizontalLines)
		{
			var r = i/horizontalDivisor;
			var highlight = (r % 5 == 0);
			var highlighted = (this.horizontalLines[i].style == this.styleMapHighlight);
			if(Math.floor(r) != r || highlight != highlighted)
			{
				destroyFeatures.push(this.horizontalLines[i]);
				delete this.horizontalLines[i];
			}
		}

		for(var coordinate = Math.ceil(extent.bottom/horizontalDivisor)*horizontalDivisor; coordinate < extent.top; coordinate += horizontalDivisor)
		{
			if(coordinate < -90 || coordinate > 90)
				continue;

			var highlight = (coordinate/horizontalDivisor % 5 == 0);

			this.degreeLabels.push(new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(extent.left, coordinate).transform(this.projection, this.map.getProjectionObject()),
				null,
				OpenLayers.Util.extend({ label: (Math.round(coordinate*100000000)/100000000)+"°", labelAlign: "lm" }, highlight ? this.labelStyleMapHighlight : this.labelStyleMapNormal)
			));

			this.degreeLabels.push(new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(extent.right, coordinate).transform(this.projection, this.map.getProjectionObject()),
				null,
				OpenLayers.Util.extend({ label: (Math.round(coordinate*100000000)/100000000)+"°", labelAlign: "rm" }, highlight ? this.labelStyleMapHighlight : this.labelStyleMapNormal)
			));

			if(this.horizontalLines[coordinate])
				continue;
			this.horizontalLines[coordinate] = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.LineString([ new OpenLayers.Geometry.Point(maxExtent.left, coordinate).transform(this.projection, this.map.getProjectionObject()), new OpenLayers.Geometry.Point(maxExtent.right, coordinate).transform(this.projection, this.map.getProjectionObject()) ]),
				null,
				highlight ? this.styleMapHighlight : this.styleMapNormal
			);
			addFeatures.push(this.horizontalLines[coordinate]);
		}

		// Display vertical grid
		var maxVerticalLines = (this.maxVerticalLines != null ? this.maxVerticalLines : Math.round(this.maxHorizontalLines * this.map.size.w / this.map.size.h));
		var verticalDistance = (extent.right-extent.left)/maxVerticalLines;
		var verticalDivisor = Math.pow(10, Math.ceil(Math.log(verticalDistance)/Math.LN10));
		if(5*(extent.right-extent.left)/verticalDivisor <= maxVerticalLines)
			verticalDivisor /= 5;
		else if(2*(extent.right-extent.left)/verticalDivisor <= maxVerticalLines)
			verticalDivisor /= 2;

		for(var i in this.verticalLines)
		{
			var r = i/verticalDivisor;
			var highlight = (r % 5 == 0);
			var highlighted = (this.verticalLines[i].style == this.styleMapHighlight);
			if(Math.floor(r) != r || highlight != highlighted)
			{
				destroyFeatures.push(this.verticalLines[i]);
				delete this.verticalLines[i];
			}
		}

		for(var coordinate = Math.ceil(extent.left/verticalDivisor)*verticalDivisor; coordinate < extent.right; coordinate += verticalDivisor)
		{
			if(coordinate <= -180 || coordinate > 180)
				continue;

			var highlight = (coordinate/verticalDivisor % 5 == 0);

			this.degreeLabels.push(new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(coordinate, extent.top).transform(this.projection, this.map.getProjectionObject()),
				null,
				OpenLayers.Util.extend({ label: (Math.round(coordinate*100000000)/100000000)+"°", labelAlign: "ct" }, highlight ? this.labelStyleMapHighlight : this.labelStyleMapNormal)
			));

			this.degreeLabels.push(new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.Point(coordinate, extent.bottom).transform(this.projection, this.map.getProjectionObject()),
				null,
				OpenLayers.Util.extend({ label: (Math.round(coordinate*100000000)/100000000)+"°", labelAlign: "cb" }, highlight ? this.labelStyleMapHighlight : this.labelStyleMapNormal)
			));

			if(this.verticalLines[coordinate])
				continue;
			this.verticalLines[coordinate] = new OpenLayers.Feature.Vector(
				new OpenLayers.Geometry.LineString([ new OpenLayers.Geometry.Point(coordinate, maxExtent.top).transform(this.projection, this.map.getProjectionObject()), new OpenLayers.Geometry.Point(coordinate, maxExtent.bottom).transform(this.projection, this.map.getProjectionObject()) ]),
				null,
				highlight ? this.styleMapHighlight : this.styleMapNormal
			);
			addFeatures.push(this.verticalLines[coordinate]);
		}

		this.destroyFeatures(destroyFeatures);
		this.addFeatures(addFeatures);
		this.addFeatures(this.degreeLabels);
	}
});

/**
 * decodeURIComponent() throws an exception if the string contains invalid constructions (such as a % sign not followed by a 2-digits hexadecimal number). This function returns the original string in case of an error.
 * @param String str
 * @return String
*/

function decodeURIComponentTolerantly(str)
{
	try
	{
		return decodeURIComponent(str);
	}
	catch(e)
	{
		return str;
	}
}

/**
 * Decodes a URL query string (the part after the ?).
 * @param String str
 * @return Object
*/

function decodeQueryString(str)
{
	var obj = { };
	var str_split = str.split(/[;&]/);
	for(var i=0; i<str_split.length; i++)
	{
		var equal_sign = str_split[i].indexOf("=");
		if(equal_sign < 1) continue;

		var key = str_split[i].substr(0, equal_sign);
		var arr_match = key.match(/(\[[^\]]*\]|\.[^.]+)+$/);
		if(arr_match)
		{
			var arr_indexes = arr_match[0].replace(/^[.\[]/, "").replace(/\]$/, "").split(/\]\[|\./);
			arr_indexes.unshift(key.substr(0, key.length-arr_match[0].length));
			var cur_el = obj;
			for(var j=0; j<arr_indexes.length; j++)
			{
				var cur_key = decodeURIComponentTolerantly(arr_indexes[j]);
				if(cur_key.length == 0)
				{
					cur_key = 0;
					while(typeof cur_el[cur_key] != "undefined")
						cur_key++;
				}
				if(j == arr_indexes.length-1)
					cur_el[cur_key] = decodeURIComponentTolerantly(str_split[i].substr(equal_sign+1));
				else
				{
					if(!cur_el[cur_key] || typeof cur_el[cur_key] != "object")
						cur_el[cur_key] = { };
					cur_el = cur_el[cur_key];
				}
			}
		}
		else
			obj[decodeURIComponentTolerantly(key)] = decodeURIComponentTolerantly(str_split[i].substr(equal_sign+1));
	}
	return obj;
}

/**
 * Encodes an Object to a URL query string.
 * @param Object obj
*/

function encodeQueryString(obj, prefix, arr)
{
	if(obj == null)
		return "";

	if(!prefix)
		arr = [ ];
	for(var i in obj)
	{
		var key = encodeURIComponent(i);
		if(prefix)
			key = prefix+"."+key;
		switch(typeof obj[i])
		{
			case "object":
				encodeQueryString(obj[i], key, arr);
				break;
			case "boolean":
				arr.push(key+"="+(obj[i] ? "1" : "0"));
				break;
			case "undefined":
				break;
			default:
				arr.push(key+"="+encodeURIComponent(obj[i]));
		}
	}
	return arr.join(";");
}

/**
 * Replaces <, > and " in the string with their HTML entities.
*/

function htmlspecialchars(str)
{
	if(!str) return "";
	return str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
}

/**
 * Returns HTML code with Permalinks to various Map services at the specified position with the specified zoom level.
 * @param OpenLayers.LonLat lonlat
 * @param Number zoom
 * @param DOMElement osm An XML OpenStreetMap object to show the tags of.
 * @return DOMElement
*/

function makePermalinks(lonlat, zoom, osm)
{
	var div = document.createElement("div");

	// Latitude and Longitude

	var dl = document.createElement("dl");
	var el;
	el = document.createElement("dt");
	el.appendChild(document.createTextNode(OpenLayers.i18n("Latitude")));
	dl.appendChild(el);
	el = document.createElement("dd");
	el.appendChild(document.createTextNode(Math.round(lonlat.lat*100000000)/100000000));
	dl.appendChild(el);
	el = document.createElement("dt");
	el.appendChild(document.createTextNode(OpenLayers.i18n("Longitude")));
	dl.appendChild(el);
	el = document.createElement("dd");
	el.appendChild(document.createTextNode(Math.round(lonlat.lon*100000000)/100000000));
	dl.appendChild(el);
	div.appendChild(dl);

	// Links to other maps

	var fieldset = document.createElement("fieldset");
	fieldset.className = "content-hidden";
	var legend = document.createElement("legend");
	var legendLink = document.createElement("a");
	legendLink.href = "javascript:";
	legendLink.onclick = function() { fieldset.className = (fieldset.className == "content-hidden" ? "content-visible" : "content-hidden"); };
	legendLink.appendChild(document.createTextNode(OpenLayers.i18n("Links to other maps")));
	legend.appendChild(legendLink);
	fieldset.appendChild(legend);

	var makeEntry = function(href, text)
	{
		var li = document.createElement("li");
		var link = document.createElement("a");
		link.href = href;
		link.appendChild(document.createTextNode(OpenLayers.i18n(text)));
		li.appendChild(link);
		return li;
	};

	var ul = document.createElement("ul");
	ul.className = "fieldset-content";
	ul.appendChild(makeEntry("http://www.openstreetmap.org/?mlat="+lonlat.lat+"&mlon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Permalink"));
	ul.appendChild(makeEntry("http://osm.org/go/"+encodeShortLink(lonlat, zoom)+"?m", "OpenStreetMap Shortlink"));
	ul.appendChild(makeEntry("http://maps.google.com/?q="+lonlat.lat+","+lonlat.lon, "Google Maps Permalink"));
	ul.appendChild(makeEntry("http://maps.yahoo.com/broadband/#lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "Yahoo Maps Permalink"));
	ul.appendChild(makeEntry("http://osmtools.de/osmlinks/?lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Links"));
	ul.appendChild(makeEntry("http://stable.toolserver.org/geohack/geohack.php?params="+lonlat.lat+"_N_"+lonlat.lon+"_E", "Wikimedia GeoHack"));
	fieldset.appendChild(ul);

	div.appendChild(fieldset);

	// OSM tags

	if(osm != undefined)
	{
		var tagFieldset = document.createElement("fieldset");
		tagFieldset.className = "content-visible";
		var tagLegend = document.createElement("legend");
		var tagLegendLink = document.createElement("a");
		tagLegendLink.href = "javascript:";
		tagLegendLink.onclick = function() { tagFieldset.className = (tagFieldset.className == "content-hidden" ? "content-visible" : "content-hidden"); };
		tagLegendLink.appendChild(document.createTextNode(OpenLayers.i18n("Tags")));
		tagLegend.appendChild(tagLegendLink);
		tagFieldset.appendChild(tagLegend);

		var tagDl = document.createElement("dl");
		tagDl.className = "fieldset-content";
		var tags = osm.getElementsByTagName("tag");
		for(var i=0; i<tags.length; i++)
		{
			var tagDt = document.createElement("dt");
			tagDt.appendChild(document.createTextNode(tags[i].getAttribute("k")));
			var tagDd = document.createElement("dd");
			tagDd.appendChild(formatTagValue(tags[i].getAttribute("v"), tags[i].getAttribute("k")));
			tagDl.appendChild(tagDt);
			tagDl.appendChild(tagDd);
		}

		tagFieldset.appendChild(tagDl);
		div.appendChild(tagFieldset);
	}

	return div;
}

/**
 * Inserts the DOM node “node” after the node “after”.
*/

function domInsertAfter(node, after)
{
	if(after.nextSibling)
		after.parentNode.insertBefore(node, after.nextSibling);
	else
		after.parentNode.appendChild(node);
}

var shortLinkCharArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@";

/**
 * Creates the relevant string of an OSM Shortlink. Copied from http://www.openstreetmap.org/javascripts/site.js, function makeShortCode().
 * @param OpenLayers.LonLat lonlat Coordinates in WGS-84
 * @param Number zoom
 * @return String
*/

function encodeShortLink(lonlat, zoom)
{
    var x = Math.round((1*lonlat.lon + 180.0) * ((1 << 30) / 90.0));
    var y = Math.round((1*lonlat.lat +  90.0) * ((1 << 30) / 45.0));
    // hack around the fact that JS apparently only allows 53-bit integers?!?
    // note that, although this reduces the accuracy of the process, it's fine for
    // z18 so we don't need to care for now.
    var c1 = 0, c2 = 0;
    for (var i = 31; i > 16; --i)
	{
		c1 = (c1 << 1) | ((x >> i) & 1);
		c1 = (c1 << 1) | ((y >> i) & 1);
    }
    for (var i = 16; i > 1; --i)
	{
		c2 = (c2 << 1) | ((x >> i) & 1);
		c2 = (c2 << 1) | ((y >> i) & 1);
    }

    var str = "";
    for (var i = 0; i < Math.ceil((zoom + 8) / 3.0) && i < 5; ++i)
	{
		digit = (c1 >> (24 - 6 * i)) & 0x3f;
		str += shortLinkCharArray.charAt(digit);
    }
    for (var i = 5; i < Math.ceil((zoom + 8) / 3.0); ++i)
	{
		digit = (c2 >> (24 - 6 * (i - 5))) & 0x3f;
		str += shortLinkCharArray.charAt(digit);
    }
    for (var i = 0; i < ((zoom + 8) % 3); ++i)
	{
		str += "-";
    }
    return str;
}

/**
 * Decodes a string from encodeShortLink().
 * @param String encoded
 * @return Object (lonlat: OpenLayers.LonLat, zoom: Number)
*/

function decodeShortLink(encoded)
{
	var lon,lat,zoom;

	var m = encoded.match(/^([A-Za-z0-9_@]+)/);
	if(!m) return false;
	zoom = m[1].length*2+encoded.length-11;

	var c1 = 0;
	var c2 = 0;
	for(var i=0,j=54; i<m[1].length; i++,j-=6)
	{
		var bits = shortLinkCharArray.indexOf(m[1].charAt(i));
		if(j <= 30)
			c1 |= bits >>> (30-j);
		else if(j > 30)
			c1 |= bits << (j-30);
		if(j < 30)
			c2 |= (bits & (0x3fffffff >>> j)) << j;
	}

	var x = 0;
	var y = 0;

	for(var j=29; j>0;)
	{
		x = (x << 1) | ((c1 >> j--) & 1);
		y = (y << 1) | ((c1 >> j--) & 1);
	}
	for(var j=29; j>0;)
	{
		x = (x << 1) | ((c2 >> j--) & 1);
		y = (y << 1) | ((c2 >> j--) & 1);
	}

	x *= 4; // We can’t do <<= 2 here as x and y may be greater than 2³¹ and then the value would become negative
	y *= 4;

	lon = x*90.0/(1<<30)-180.0;
	lat = y*45.0/(1<<30)-90.0;

	return {
		lonlat : new OpenLayers.LonLat(lon, lat),
		zoom : zoom
	};
}

/**
 * Makes a usable class name out of an OpenLayers.Class object. Adds all parent classes to the class name, too.
 * The class name for an OpenLayers.Map.cdauth object would be "olMapcdauth olMap" for example.
 * The class name is determined by the CLASS_NAME property.
 * @param Object olObject Either a class returned by OpenLayers.Class() or an instance of such a class.
 * @return String
 */
function makeClassName(olObject)
{
	var array = arguments[1];
	if(array == undefined)
		array = { };

	if(olObject != undefined)
	{
		var olClass = (olObject.prototype != undefined ? olObject.prototype : olObject);
		if(olClass.CLASS_NAME != undefined)
			array[olClass.CLASS_NAME.replace("OpenLayers.", "ol").replace(/\./g, "")] = true;
		if(olClass.cdauthParentClasses != undefined)
		{
			for(var i=0; i<olClass.cdauthParentClasses.length; i++)
				makeClassName(olClass.cdauthParentClasses[i], array);
		}
	}

	if(arguments[1] == undefined)
	{
		var ret = "";
		for(var it in array)
		{
			if(ret != "")
				ret += " ";
			ret += it;
		}
		return ret;
	}
}

/**
 * Changes the opacity of the given element to a new value, slowly fading there.
 * @param Element el The DOM element to change the opacity for
 * @param Number opacity The new opacity (1.0 for not transparent, 0.0 for invisible).
 * @param Number ms The time span for the fading in milliseconds (defaults to 750).
 * @return void
*/

function changeOpacity(el, opacity, ms)
{
	if(changeOpacity.timeouts == undefined)
		changeOpacity.timeouts = { };

	var timeoutObj = null;
	for(var i in changeOpacity.timeouts)
	{
		if(changeOpacity.timeouts[i] != undefined && changeOpacity.timeouts[i].el === el)
		{
			timeoutObj = i;
			break;
		}
	}
	if(timeoutObj == null)
	{
		var i=0;
		while(changeOpacity.timeouts[i] != undefined)
			i++;
		timeoutObj = i;
		changeOpacity.timeouts[timeoutObj] = { el : el, timeout : null }
	}
	else if(changeOpacity.timeouts[timeoutObj].timeout != null)
		clearTimeout(changeOpacity.timeouts[timeoutObj].timeout);

	if(ms == undefined)
		ms = 750;
	var initTime = new Date().getTime();
	var initOpacity = 1 * (el.style.opacity == undefined || el.style.opacity == "" ? 1 : 1*el.style.opacity);
	var callback = function() {
		var period = new Date().getTime()-initTime;
		if(period > ms)
			period = ms;
		var newOpacity = initOpacity+(period/ms)*(opacity-initOpacity);
		OpenLayers.Util.modifyDOMElement(el, null, null, null, null, null, null, newOpacity);

		if(period < ms)
			changeOpacity.timeouts[timeoutObj].timeout = setTimeout(callback, 100);
		else
			changeOpacity.timeouts[timeoutObj] = undefined;
	};
	callback();
}

/**
 * Loads a JavaScript file and then calls a callback function. Another callback function has to be provided that
 * checks if the JavaScript file has been loaded (for example by checking whether a variable set there exists)
 * and returns true in that case. In case a JavaScript file with the same URL has already been loaded, the
 * success callback function will be called immediately without loading the JavaScript file for a second time.
 * If the loadCheck function is ommitted, the success function will not be called.
 * @var String url The URL of the JavaScript file. If null, no URL will be loaded but the success function will still be called.
 * @var Function loadCheck A function that returns true if the JavaScript file has been loaded or null.
 * @var Function success A function that will be called once the loadCheck function returns true for the first time.
*/
function loadJavaScript(url, loadCheck, success)
{
	var load = true;
	if(url == null || (loadCheck != null && loadCheck()))
		load = false;
	else
	{
		var scripts = document.getElementsByTagName("script");
		for(var i=0; i<scripts.length; i++)
		{
			if(makeAbsoluteURL(scripts[i].src) == makeAbsoluteURL(url))
			{
				load = false;
				break;
			}
		}
	}

	if(load)
	{
		var scriptTag = document.createElement("script");
		scriptTag.type = "text/javascript";
		scriptTag.src = url;
		document.getElementsByTagName("head")[0].appendChild(scriptTag);
	}

	if(loadCheck != null && success != null)
	{
		var callback = function(nextWait) {
			if(loadCheck())
				success();
			else
			{
				var newWait = nextWait*2;
				if(newWait > 10000)
					newWait = 10000;
				setTimeout(function(){ callback(newWait); }, nextWait);
			}
		};
		callback(10);
	}
}

/**
 * Convert a relative URL to an absolute URL.
 * @param String url
 * @return String
*/
function makeAbsoluteURL(url)
{
	// See http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue/472729#472729
	var el = document.createElement("div");
	el.innerHTML = "<a href=\"" + url.replace("&", "&amp;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;") + "\">x</a>";
	return el.firstChild.href;
}

/**
 * Returns a DOM node with a formatted value of the value paramter. The value paramter is the value of a tag of an OSM object, the key
 * paramter is the appropriate key after whose rules the value will be formatted (for example the value for the url key will be formatted
 * as a link to this url).
 * @param String value The value of an OSM tag
 * @param String key The key of an OSM tag
 * @return Element A DOM element with the formatted value
*/

function formatTagValue(value, key)
{
	var ret = document.createElement("span");

	while(value.length > 0)
	{
		var sepPosition = value.search(formatTagValue.SEPARATOR_PATTERN);
		var sep = value.match(formatTagValue.SEPARATOR_PATTERN);
		var thisValue;
		if(sepPosition = -1)
		{
			thisValue = value;
			value = "";
		}
		else
		{
			thisValue = value.substr(0, sepPosition);
			value = value.substr(sepPosition + sep[0].length);
		}

		var el;
		if(key.match(/^url:?/i))
		{
			el = document.createElement("a");
			el.href = thisValue;
			el.appendChild(document.createTextNode(thisValue));
			break;
		}
		else if(key.match(/^wiki:symbol:?/i))
		{
			el = document.createElement("a");
			el.href = "http://wiki.openstreetmap.org/wiki/Image:"+thisValue;
			el.appendChild(document.createTextNode(thisValue));
			break;
		}
		else if(key.match(/^wiki:?/i))
		{
			el = document.createElement("a");
			el.href = "http://wiki.openstreetmap.org/wiki/"+thisValue;
			el.appendChild(document.createTextNode(thisValue));
			break;
		}
		else
			el = document.createTextNode(thisValue);

		ret.appendChild(el);
		if(sepPosition != -1)
			ret.appendChild(sep[0]);
	}

	return ret;
}

formatTagValue.SEPARATOR_PATTERN = /;/;

/**
 * Get an array of the keys of an object.
 * @param Object obj
 * @return Array<String>
*/

function getIndexes(obj)
{
	var ret = [ ];
	for(var i in obj)
		ret.push(i);
	return ret;
}

function alert_r(data)
{
	var str = "";
	for(var i in data)
		str += i+": "+data[i]+"\n";
	alert(str);
}

function debugOutput(string)
{
	if(debugOutput.textarea == null)
	{
		debugOutput.textarea = document.createElement("textarea");
		debugOutput.textarea.style.width = "75%";
		debugOutput.textarea.style.height = "50%";
		debugOutput.textarea.style.bottom = "0";
		debugOutput.textarea.style.left = "0";
		debugOutput.textarea.style.position = "fixed";
		debugOutput.textarea.id = "cdauth-debug";
		document.getElementsByTagName("body")[0].appendChild(debugOutput.textarea);
		debugOutput.textarea.onmouseover = function(){ changeOpacity(this, 1); };
		debugOutput.textarea.onmouseout = function(){ changeOpacity(this, 0.5); };
		debugOutput.textarea.onmouseout();
	}
	debugOutput.textarea.value = new Date()+": "+string+"\n\n"+debugOutput.textarea.value;
}
