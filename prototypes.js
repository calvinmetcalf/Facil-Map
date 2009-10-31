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

	Obtain the source code from http://svn.cdauth.de/viewvc.cgi/Tools/osm/map/
	or svn://svn.cdauth.de/tools/osm/map/.
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
	"Rendering CC-by-SA by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data CC-by-SA by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://www.mapsurfer.net/\">MapSurfer</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.mapsurfer.net/\">MapSurfer</a>. Data CC-by-SA by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"Rendering CC-by-SA by <a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Rendering CC-by-SA by <a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>",
	"Relief CC-by-SA by <a href=\"http://openrouteservice.org/\">Kartografie Universität Bonn</a>" : "Relief CC-by-SA by <a href=\"http://openrouteservice.org/\">Kartografie Universität Bonn</a>",
	"Create a marker" : "Create a marker",
	"Coordinates" : "Coordinates",
	"unknown" : "unknown",
	"No results." : "No results.",
	"Error parsing file." : "Error parsing file.",
	"Latitude" : "Latitude",
	"Longitude" : "Longitude",
	"Get directions (OpenRouteService)" : "Get directions (OpenRouteService)",
	"OpenStreetMap Permalink" : "OpenStreetMap Permalink",
	"Google Maps Permalink" : "Google Maps Permalink",
	"Yahoo Maps Permalink" : "Yahoo Maps Permalink",
	"OpenStreetMap Links" : "OpenStreetMap Links",
	"Wikimedia GeoHack" : "Wikimedia GeoHack"
});

OpenLayers.Lang.de = OpenLayers.Util.extend(OpenLayers.Lang.de, {
	"[Zoom]" : "[Zoom]",
	"[Remove]" : "[Entfernen]",
	"Rendering CC-by-SA by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.cloudmade.com/\">CloudMade</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://www.mapsurfer.net/\">MapSurfer</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.mapsurfer.net/\">MapSurfer</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Rendering CC-by-SA by <a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>" : "Darstellung: <a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>; Daten: <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a> (CC-by-SA)",
	"Relief CC-by-SA by <a href=\"http://openrouteservice.org/\">Kartografie Universität Bonn</a>" : "Reliefdarstellung CC-by-SA von der <a href=\"http://openrouteservice.org/\">Kartografie Universität Bonn</a>",
	"Create a marker" : "Marker anlegen",
	"Coordinates" : "Koordinaten",
	"unknown" : "unbekannt",
	"No results." : "Kein Ergebnis.",
	"Error parsing file." : "Fehler beim Parsen der Datei.",
	"Latitude" : "Breite",
	"Longitude" : "Länge",
	"Get directions (OpenRouteService)" : "Route berechnen (OpenRouteService)",
	"OpenStreetMap Permalink" : "OpenStreetMap Permalink",
	"Google Maps Permalink" : "Google Maps Permalink",
	"Yahoo Maps Permalink" : "Yahoo Maps Permalink",
	"OpenStreetMap Links" : "OpenStreetMap Links",
	"Wikimedia GeoHack" : "Wikimedia GeoHack"
});

/**
 * A map with the default values needed for OpenStreetMap and other world maps.
 * If you plan to use the getQueryMethod() function, remember to set the visibility of your overlay layers _before_ adding them to the map.
 * @event mapResize The map div has been resized.
 * @event newHash The return value of getQueryObject() probably has changed.
*/

OpenLayers.Map.cdauth = OpenLayers.Class(OpenLayers.Map, {
	cdauthDefaultVisibility : { },
	initialize : function(div, options)
	{
		OpenLayers.Map.prototype.initialize.apply(this, [ div, OpenLayers.Util.extend({
			controls: [
				new OpenLayers.Control.Navigation(),
				new OpenLayers.Control.PanZoomBar(),
				new OpenLayers.Control.cdauth.LayerSwitcher(),
				new OpenLayers.Control.Attribution(),
				new OpenLayers.Control.cdauth.KeyboardDefaults(),
				new OpenLayers.Control.MousePosition(),
				new OpenLayers.Control.ScaleLine() ],
			maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new OpenLayers.Projection("EPSG:4326"),
			displayProjection: new OpenLayers.Projection("EPSG:4326")
		}, options) ]);
		this.events.addEventType("mapResize");
		this.events.addEventType("newHash");

		this.events.register("move", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newHash"); });
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

		if(!layer.isBaseLayer)
			this.cdauthDefaultVisibility[layer.name] = layer.getVisibility();
	},

	/**
	 * Adds all available layers from this library to your map.
	*/
	addAllAvailableLayers : function()
	{
		if(OpenLayers.Layer.cdauth.OSM.Mapnik)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.Mapnik("Mapnik"));
		if(OpenLayers.Layer.cdauth.OSM.MapSurfer)
		{
			if(OpenLayers.Layer.cdauth.OSM.MapSurfer.Road)
				this.addLayer(new OpenLayers.Layer.cdauth.OSM.MapSurfer.Road("MapSurfer Road"));
			if(OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic)
				this.addLayer(new OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic("MapSurfer Topographic"));
		}
		if(OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser("OpenStreetBrowser"));
		if(OpenLayers.Layer.cdauth.OSM.Osmarender)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.Osmarender("Osmarender"));
		if(OpenLayers.Layer.cdauth.OSM.CycleMap)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.CycleMap("OpenCycleMap"));
		if(OpenLayers.Layer.cdauth.OSM.Wanderkarte)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.Wanderkarte("Reit- und Wanderkarte"));
		if(OpenLayers.Layer.cdauth.OSM.OpenPisteMap)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenPisteMap("OpenPisteMap"));
		if(OpenLayers.Layer.cdauth.OSM.OPNVKarte)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.OPNVKarte("ÖPNV-Karte"));
		if(OpenLayers.Layer.cdauth.OSM.MinutelyMapnik)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.MinutelyMapnik("Minutely Mapnik"));

		if(OpenLayers.Layer.cdauth.Google.Maps)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.Maps("Google Streets"));
		if(OpenLayers.Layer.cdauth.Google.MapsSatellite)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.MapsSatellite("Google Satellite"));
		if(OpenLayers.Layer.cdauth.Google.MapsHybrid)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.MapsHybrid("Google Hybrid"));
		if(OpenLayers.Layer.cdauth.Google.MapsTerrain)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.MapsTerrain("Google Terrain"));
		if(OpenLayers.Layer.cdauth.Google.MapMaker)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.MapMaker("Google MapMaker"));
		if(OpenLayers.Layer.cdauth.Google.MapMakerHybrid)
			this.addLayer(new OpenLayers.Layer.cdauth.Google.MapMakerHybrid("Google MapMaker Hybrid"));

		if(OpenLayers.Layer.cdauth.Yahoo.Maps)
			this.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Maps("Yahoo Street"));
		if(OpenLayers.Layer.cdauth.Yahoo.Satellite)
			this.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Satellite("Yahoo Satellite"));
		if(OpenLayers.Layer.cdauth.Yahoo.Hybrid)
			this.addLayer(new OpenLayers.Layer.cdauth.Yahoo.Hybrid("Yahoo Hybrid"));

		if(OpenLayers.Layer.cdauth.other.OpenAerialMap)
			this.addLayer(new OpenLayers.Layer.cdauth.other.OpenAerialMap("OpenAerialMap"));
		if(OpenLayers.Layer.cdauth.other.Relief)
			this.addLayer(new OpenLayers.Layer.cdauth.other.Relief("Relief", { visibility: false }));
	},

	/**
	 * Zoom to the specified query object. Remember to add your layers and to eventually set OpenLayers.Layer.cdauth.XML.proxy before running
	 * this method.
	 * @param Object query Usually decodeQueryString(location.hash.replace(/^#/, ""))
	 * @param OpenLayers.Layer.cdauth.markers.LonLat layerMarkers Optional, layer to add position markers to.
	 * @param OpenLayers.Layer.cdauth.markers.GeoSearch layerGeoSearch Optional, to restore the GeoSearch.
	*/

	zoomToQuery: function(query, layerMarkers, layerGeoSearch)
	{
		var map = this;

		var search_may_zoom = (typeof query.lon == "undefined" && typeof query.lat == "undefined");

		if(!query.lon)
			query.lon = 0;
		if(!query.lat)
			query.lat = 0;
		if(!query.zoom)
			query.zoom = 2;
		this.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(this.displayProjection, this.getProjectionObject()), query.zoom);

		if(query.layer)
		{
			var matching_layers = this.getLayersByName(query.layer);
			if(matching_layers.length > 0)
				this.setBaseLayer(matching_layers[0]);
		}

		if(query.overlays)
		{
			for(var i in query.overlays)
			{
				var layers = this.getLayersByName(i);
				for(var j=0; j<layers.length; j++)
					layers[j].setVisibility(query.overlays[i] != "0");
			}
		}

		if(layerMarkers)
		{
			layerMarkers.clearMarkers();
			if(query.mlat && query.mlon && typeof query.mlat == "object" && typeof query.mlon == "object")
			{
				for(var i in query.mlat)
				{
					if(typeof query.mlon[i] == "undefined") continue;
					layerMarkers.addLonLatMarker(new OpenLayers.LonLat(query.mlon[i], query.mlat[i]).transform(this.displayProjection, this.getProjectionObject()), (query.mtitle && typeof query.mtitle == "object") ? htmlspecialchars(query.mtitle[i]) : null);
				}
				this.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(this.displayProjection, this.getProjectionObject()), query.zoom);
			}
		}

		if(layerGeoSearch && query.search)
			layerGeoSearch.geoSearch(query.search, search_may_zoom ? false : function(){map.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(map.displayProjection, map.getProjectionObject()), query.zoom);}, query.smopen);

		// Handle removable GPX layers
		var xmlLayers = [ ];
		for(var i=0; i<this.layers.length; i++)
		{
			if(!(this.layers[i] instanceof OpenLayers.Layer.cdauth.XML) || !this.layers[i].removableInLayerSwitcher)
				continue;

			var inside = false;
			if(query.xml)
			{
				for(var j in query.xml)
				{
					if(query.xml[j] == this.layers[i].cdauthURL)
					{
						inside = true;
						break;
					}
				}
			}

			if(!inside)
			{
				this.removeLayer(this.layers[i]);
				this.layers[i].destroy();
			}
			else
				xmlLayers.push(this.layers[i]);
		}

		if(query.xml)
		{
			for(var j in query.xml)
			{
				var inside = false;
				for(var i=0; i<xmlLayers.length; i++)
				{
					if(query.xml[j] == xmlLayers[i].cdauthURL)
					{
						inside = true;
						break;
					}
				}

				if(!inside)
					this.addLayer(new OpenLayers.Layer.cdauth.XML(null, query.xml[j], { removableInLayerSwitcher: true }));
			}
		}
	},

	/**
	 * Returns a Query object that you can pass to the zoomToQuery() function to restore the current view. Usually you save this to the location
	 * hash part by calling location.hash = "#"+encodeQueryString(map.getQueryObject());
	 * Only non-default settings will be added to this query object. Remember to set the visibility of your overlay layers _before_ adding
	 * them to the map, as the default visibility value will be determined during adding it.
	 * @param OpenLayers.Layer.cdauth.markers.LonLat layerMarkers Optional, to save the positions of the geographical markers.
	 * @param OpenLayers.Layer.cdauth.markers.GeoSearch layerGeoSearch Optional, to save the current GeoSearch.
	 * @return Object
	*/

	getQueryObject: function(layerMarkers, layerGeoSearch)
	{
		if(!this.getCenter())
			return false;

		var lonlat = this.getCenter().clone().transform(this.getProjectionObject(), this.displayProjection);
		var hashObject = {
			lon : lonlat.lon,
			lat : lonlat.lat,
			zoom : this.getZoom(),
			layer : this.baseLayer.name,
			mlon : { },
			mlat : { },
			mtitle : { },
			smopen : { },
			overlays : { },
			xml : { }
		};

		var xml_i = 0;

		for(var i=0; i<this.layers.length; i++)
		{ // Save overlay visibility
			if(this.layers[i].isBaseLayer) continue;
			if(this.layers[i].getVisibility() != this.cdauthDefaultVisibility[this.layers[i].name])
				hashObject.overlays[this.layers[i].name] = this.layers[i].getVisibility() ? "1" : "0";
			if(this.layers[i] instanceof OpenLayers.Layer.cdauth.XML && this.layers[i].removableInLayerSwitcher)
				hashObject.xml[xml_i++] = this.layers[i].cdauthURL;
		}

		if(layerGeoSearch && layerGeoSearch.lastSearch)
		{
			hashObject.search = layerGeoSearch.lastSearch;

			for(var i=0; i<layerGeoSearch.markers.length; i++)
			{
				var visible = layerGeoSearch.markers[layerGeoSearch.markers.length-1-i].cdauthFeature.popup ? layerGeoSearch.markers[layerGeoSearch.markers.length-1-i].cdauthFeature.popup.visible() : false;
				if(visible != (i == 0))
					hashObject.smopen[i] = visible ? "1" : "0";
			}
		}

		if(layerMarkers)
		{
			for(var i=0; i<layerMarkers.markers.length; i++)
			{
				var lonlat = layerMarkers.markers[i].lonlat.clone().transform(this.getProjectionObject(), this.displayProjection);
				hashObject.mlon[i] = lonlat.lon;
				hashObject.mlat[i] = lonlat.lat;
				if(layerMarkers.markers[i].cdauthTitle)
					hashObject.mtitle[i] = layerMarkers.markers[i].cdauthTitle;
			}
		}

		return hashObject;
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
		if(evt.target && evt.target.nodeName && (evt.target.nodeName.toLowerCase() == "input" && evt.target.type.toLowerCase() != "checkbox" && evt.target.type.toLowerCase() != "button" && evt.target.type.toLowerCase() != "submit" && evt.target.type.toLowerCase() != "clear" || evt.target.tagName.toLowerCase() == "textarea" || evt.target.tagName.toLowerCase() == "select"))
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

		// The following settings are _sometimes_ set automatically by OpenLayers, but I cannot find out where...
		this.div.style.top = "25px";
		this.div.style.right = "0";
		this.minimizeDiv.style.right = "20px";
		this.maximizeDiv.style.top = "5px";
		this.maximizeDiv.style.right = "0";

		this.map.events.register("mapResize", this, this.onMapResize);
		return ret;
	},

	onMapResize : function() {
		this.layersDiv.style.maxHeight = (this.map.size.h-100)+"px";
	},

	redraw : function() {
		// Display “Zoom” and, if desired, “Remove” links for overlay layers.

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

if(OpenLayers.Layer.OSM)
{
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
					attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.opencyclemap.org/\">OpenCycleMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")
				}, options)
			]);
        },
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.CycleMap"
	});

	/**
	 * Minutely Mapnik rendering of OpenStreetMap data by CloudMade. See http://matt.sandbox.cloudmade.com/.
	*/
	OpenLayers.Layer.cdauth.OSM.MinutelyMapnik = OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(
				this,
				[
					name,
					[
						"http://a.matt.sandbox.cloudmade.com/123/3/256/${z}/${x}/${y}.png",
						"http://b.matt.sandbox.cloudmade.com/123/3/256/${z}/${x}/${y}.png",
						"http://c.matt.sandbox.cloudmade.com/123/3/256/${z}/${x}/${y}.png"
					],
					OpenLayers.Util.extend({
						numZoomLevels: 19,
						attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")
					}, options)
				]
			);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MinutelyMapnik"
	});

	/**
	 * OpenStreetBrowser rendering of OpenStreetMap data. See http://openstreetbrowser.org/.
	*/
	OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://openstreetbrowser.org/tiles/base/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 19, attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.openstreetbrowser.org/\">OpenStreetBrowser</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser"
	});

	/**
	 * OpenPisteMap rendering of OpenStreetMap data. See http://openpistemap.org/.
	*/
	OpenLayers.Layer.cdauth.OSM.OpenPisteMap = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://openpistemap.org/tiles/contours/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 18, attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.openpistemap.org/\">OpenPisteMap</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OpenPisteMap"
	});

	/**
	 * OSM Reit- und Wanderkarte rendering of OSM foot- and bridle ways. See http://osmc.broadbox.de/.
	*/
	OpenLayers.Layer.cdauth.OSM.Wanderkarte = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://topo.geofabrik.de/trails/${z}/${x}/${y}.png", OpenLayers.Util.extend({minZoomLevel: 8, maxZoomLevel: 15, attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://osmc.broadbox.de/\">OSMC Reit- und Wanderkarte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.Wanderkarte"
	});

	/**
	 * OpenStreetMap data rendering by ÖPNV-Karte (PSV map).
	*/
	OpenLayers.Layer.cdauth.OSM.OPNVKarte = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://tile.xn--pnvkarte-m4a.de/tilegen/${z}/${x}/${y}.png", OpenLayers.Util.extend({numZoomLevels: 19, attribution: OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.xn--pnvkarte-m4a.de/\">ÖPNV-Karte</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>")}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.OPNVKarte"
	});

	/**
	 * Parent class for MapSurfer (http://www.mapsurfer.net/) renderings.
	*/
	OpenLayers.Layer.cdauth.OSM.MapSurfer = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		attribution : OpenLayers.i18n("Rendering CC-by-SA by <a href=\"http://www.mapsurfer.net/\">MapSurfer</a>. Data CC-by-SA by <a href=\"http://www.openstreetmap.org/\">OpenStreetMap</a>"),
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer"
	});

	/**
	 * MapSurfer road map.
	*/
	OpenLayers.Layer.cdauth.OSM.MapSurfer.Road = new OpenLayers.Class(OpenLayers.Layer.cdauth.OSM.MapSurfer, {
		initialize : function(name, options) {
			OpenLayers.Layer.cdauth.OSM.MapSurfer.prototype.initialize.apply(this, [ name, "http://tiles1.mapsurfer.net/tms_r.ashx?x=${x}&y=${y}&z=${z}", options ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer.Road"
	});

	/**
	 * MapSurfer topographic map.
	*/
	OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic = new OpenLayers.Class(OpenLayers.Layer.cdauth.OSM.MapSurfer, {
		initialize : function(name, options) {
			OpenLayers.Layer.cdauth.OSM.MapSurfer.prototype.initialize.apply(this, [ name, "http://tiles2.mapsurfer.net/tms_t.ashx?x=${x}&y=${y}&z=${z}", options ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.OSM.MapSurfer.Topographic"
	});
}


if(OpenLayers.Layer.WMS)
{
	/**
	 * Relief rendering from Kartografie Universität Bonn / OpenRouteService
	*/

	OpenLayers.Layer.cdauth.other.Relief = new OpenLayers.Class(OpenLayers.Layer.WMS, {
		initialize: function(name, options) {
			OpenLayers.Layer.WMS.prototype.initialize.apply(this, [ name, "http://services.giub.uni-bonn.de/hillshade?", {layers: 'europe_wms:hs_srtm_europa',srs: 'EPSG:900913', format: 'image/JPEG', transparent: 'true' }, OpenLayers.Util.extend({attribution: OpenLayers.i18n("Relief CC-by-SA by <a href=\"http://openrouteservice.org/\">Kartografie Universität Bonn</a>"), opacity: 0.2 }, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.other.Relief"
	});
}

if(OpenLayers.Layer.Google && typeof GMap2 != "undefined")
{
	/**
	 * Google Streets (http://maps.google.com/)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	OpenLayers.Layer.cdauth.Google.Maps = new OpenLayers.Class(OpenLayers.Layer.Google, {
		initialize: function(name, options) {
			OpenLayers.Layer.Google.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.Google.Maps"
	});

	/**
	 * Google Satellite (http://maps.google.com/)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	if(typeof G_SATELLITE_MAP != "undefined")
	{
		OpenLayers.Layer.cdauth.Google.MapsSatellite = new OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_SATELLITE_MAP, numZoomLevels: 22}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsSatellite"
		});
	}

	/**
	 * Google Hybrid (Streets and Satellite) (http://maps.google.com/)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	if(typeof G_HYBRID_MAP != "undefined")
	{
		OpenLayers.Layer.cdauth.Google.MapsHybrid = new OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_HYBRID_MAP}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsHybrid"
		});
	}

	/**
	 * Google Terrain (http://maps.google.com/)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	if(typeof G_PHYSICAL_MAP != "undefined")
	{
		OpenLayers.Layer.cdauth.Google.MapsTerrain = new OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_PHYSICAL_MAP}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapsTerrain"
		});
	}

	/**
	 * Google MapMaker streets (http://www.google.com/mapmaker)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	if(typeof G_MAPMAKER_NORMAL_MAP != "undefined")
	{
		OpenLayers.Layer.cdauth.Google.MapMaker = new OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_MAPMAKER_NORMAL_MAP}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapMaker"
		});
	}

	/**
	 * Google MapMaker hybrid (streets and satellite) (http://www.google.com/mapmaker)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	if(typeof G_MAPMAKER_HYBRID_MAP != "undefined")
	{
		OpenLayers.Layer.cdauth.Google.MapMakerHybrid = new OpenLayers.Class(OpenLayers.Layer.cdauth.Google.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Google.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: G_MAPMAKER_HYBRID_MAP}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Google.MapMakerHybrid"
		});
	}
}

if(OpenLayers.Layer.Yahoo && typeof YMap != "undefined")
{
	/**
	 * Yahoo Streets (http://maps.yahoo.com/)
	 * Include http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=cdauths-map for this to work.
	*/
	OpenLayers.Layer.cdauth.Yahoo.Maps = new OpenLayers.Class(OpenLayers.Layer.Yahoo, {
		initialize: function(name, options) {
			OpenLayers.Layer.Yahoo.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Maps"
	});

	/**
	 * Yahoo Satellite (http://maps.yahoo.com/)
	 * Include http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=cdauths-map for this to work.
	*/
	if(typeof YAHOO_MAP_SAT != "undefined")
	{
		OpenLayers.Layer.cdauth.Yahoo.Satellite = new OpenLayers.Class(OpenLayers.Layer.cdauth.Yahoo.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Yahoo.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: YAHOO_MAP_SAT}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Satellite"
		});
	}

	/**
	 * Yahoo Hybrid (Streets and Satellite)
	 * Include http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=cdauths-map for this to work.
	*/
	if(typeof YAHOO_MAP_HYB != "undefined")
	{
		OpenLayers.Layer.cdauth.Yahoo.Hybrid = new OpenLayers.Class(OpenLayers.Layer.cdauth.Yahoo.Maps, {
			initialize: function(name, options) {
				OpenLayers.Layer.cdauth.Yahoo.Maps.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({type: YAHOO_MAP_HYB}, options) ]);
			},
			CLASS_NAME : "OpenLayers.Layer.cdauth.Yahoo.Hybrid"
		});
	}
}

if(OpenLayers.Layer.XYZ)
{
	/**
	 * OpenAerialMap (http://openaerialmap.org/).
	*/

	// OpenAerialMap is currently offline

	/*OpenLayers.Layer.cdauth.other.OpenAerialMap = new OpenLayers.Class(OpenLayers.Layer.XYZ, {
		initialize: function(name, options) {
			OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [ name, "http://tile.openaerialmap.org/tiles/1.0.0/openaerialmap-900913/${z}/${x}/${y}.png", OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		},
		CLASS_NAME : "OpenLayers.Layer.cdauth.other.OpenAerialMap"
	});*/
}

/**
 * Extends a FramedCloud with various useful features. An event is triggered during closing instead of passing the callback function
 * to the initialize function. You may pass a DOM element for the popup content instead of HTML code.
 * @event close
*/

OpenLayers.Popup.FramedCloud.cdauth = new OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
	contentDom: null,
	autoSize: true,
	initialize: function(id, lonlat, contentSize, contentDom, anchor, closeBox, closeBoxCallback) {
		var closeCallback = function(e){ if(closeBoxCallback) closeBoxCallback(); OpenLayers.Event.stop(e); this.events.triggerEvent("close"); };
		OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this, [ id, lonlat, contentSize, null, anchor, closeBox, closeCallback ] );

		this.events.addEventType("close");

		this.setContentHTML(contentDom);
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

OpenLayers.Layer.cdauth.markers.Markers = new OpenLayers.Class(OpenLayers.Layer.Markers, {
	initialize : function(name, options) {
		OpenLayers.Layer.Markers.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({zoomableInLayerSwitcher: true}, options) ]);
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
	defaultIcon : new OpenLayers.Icon('http://osm.cdauth.de/map/marker.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),
	openPopupsOnShow : [ ],
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
		var feature = new OpenLayers.Feature(this, lonlat);
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
		}
		marker.cdauthFeature = feature;
		this.addMarker(marker);
		return marker;
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.markers.Markers"
});

/**
 * A Markers layer for adding LonLat markers. These markers display their coordinates and list various Permalinks to other map services.
 * See OpenLayers.Control.cdauth.createMarker for the functionality of creating a marker when clicking.
 * @event markerAdded
 * @event markerRemoved
*/

OpenLayers.Layer.cdauth.markers.LonLat = new OpenLayers.Class(OpenLayers.Layer.cdauth.markers.Markers, {
	/**
	 * @param OpenLayers.Icon defaultIcon The icon to be used for the markers added by addLonLatMarker()
	*/
	initialize : function(name, options) {
		OpenLayers.Layer.cdauth.markers.Markers.prototype.initialize.apply(this, arguments);
		this.events.addEventType("markerAdded");
		this.events.addEventType("markerRemoved");

		this.events.register("markerAdded", this, function(){ if(this.map) this.map.events.triggerEvent("newHash"); });
		this.events.register("markerRemoved", this, function(){ if(this.map) this.map.events.triggerEvent("newHash"); });
	},
	addLonLatMarker : function(lonlat, title, icon)
	{
		var layer = this;

		var lonlat_readable = lonlat.clone().transform(this.map.getProjectionObject(), this.map.displayProjection);
		var marker = this.createMarker(lonlat, ".", true);
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
			content.appendChild(makePermalinks(this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.map.displayProjection), this.map.getZoom()));
			this.markers[i].cdauthFeature.popup.setContentHTML(content);
		}
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.markers.LonLat"
});

/**
 * A click control to add markers to a OpenLayers.Layer.cdauth.markers.LonLat layer.
 * Add an instance of this to your map using OpenLayers.Map.cdauth.addControl() and activate() it.
*/

OpenLayers.Control.cdauth.CreateMarker = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * @var OpenLayers.Layer.cdauth.markers.LonLat
	*/
	cdauthLayer : null,

	title : OpenLayers.i18n("Create a marker"),

	/**
	 * @var OpenLayers.Layer.cdauth.markers.LonLat cdauthLayer
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

		var lonlat = this.map.getLonLatFromViewPortPx(e.xy);
		this.cdauthLayer.addLonLatMarker(lonlat);
	},

	CLASS_NAME: "OpenLayers.Control.cdauth.CreateMarker"
});

/**
 * A markers layer to display the search results of the OpenStreetMap NameFinder.
 * @event lastSearchChange The value of lastSearch has changed.
 * @event searchBegin
 * @event searchSuccess
 * @event searchFailure
*/

OpenLayers.Layer.cdauth.markers.GeoSearch = new OpenLayers.Class(OpenLayers.Layer.cdauth.markers.Markers, {
	lastSearch : false,
	nameFinderURL : false,
	nameFinder2URL : false,
	defaultIcon : false,
	highlighIcon : false,

	/**
	 * @param String nameFinderURL http://gazetteer.openstreetmap.org/namefinder/search.xml (search=%s will be appended). To work around the same origin policy, pass a wrapper that lives on your webspace.
	 * @param String nameFinder2URL http://data.giub.uni-bonn.de/openrouteservice/php/OpenLSLUS_Geocode.php Will be used if the normal namefinder does not find anything
	 * @param OpenLayers.Icon defaultIcon The default icon to use for the search result markers.
	 * @param OpenLayers.Icon highlightIcon The marker icon to use for the first search result.
	*/
	initialize: function(name, nameFinderURL, nameFinder2URL, defaultIcon, highlightIcon, options) {
		OpenLayers.Layer.cdauth.markers.Markers.prototype.initialize.apply(this, [ name, options ]);
		this.nameFinderURL = nameFinderURL;
		this.nameFinder2URL = nameFinder2URL;
		this.defaultIcon = defaultIcon;
		this.highlightIcon = highlightIcon;
		this.events.addEventType("lastSearchChange");
		this.events.addEventType("searchBegin");
		this.events.addEventType("searchSuccess");
		this.events.addEventType("searchFailure");

		this.events.register("lastSearchChange", this, function(){ if(this.map) this.map.events.triggerEvent("newHash"); });
		this.events.register("markersChanged", this, function(){ if(this.map) this.map.events.triggerEvent("newHash"); });
	},

	/**
	 * Use the NameFinder to search in OpenStreetMap data and add the search results as markers to this layer.
	 * @param String query The search string.
	 * @param boolean dontzoom Don’t zoom to the search result but keep the current view of the map. If this is set, no alert box will indicate that the search returned no results.
	 * @param Array markersvisible Contains a boolean value (or a string representing a boolean) for each search result to indicate if a popup should be opened.
	*/
	geoSearch: function(query, dontzoom, markersvisible)
	{
		layer = this;

		for(var i=0; i<this.markers.length; i++)
		{
			if(this.markers[i].cdauthFeature.popup)
				this.markers[i].cdauthFeature.popup.destroy();
		}
		this.clearMarkers();
		this.lastSearch = false;
		this.events.triggerEvent("lastSearchChange");

		if(!query)
			return;

		this.events.triggerEvent("searchBegin");

		query.replace(/^\s+/, "").replace(/\s+$/, "");
		var query_match;
		var query_urlPart;
		if(query_match = query.match(/^http:\/\/(www\.)?osm\.org\/go\/([A-Za-z0-9_@]+)$/))
		{ // Coordinates, shortlink

		}
		else if(query_match = query.match(/^(-?\s*\d+([.,]\d+)?)\s*[,;]?\s*(-?\s*\d+([.,]\d+)?)$/))
		{ // Coordinates
			results = [ {
				zoom : this.map.getZoom(),
				lon : query_match[3].replace(",", ".").replace(/\s+/, ""),
				lat : query_match[1].replace(",", ".").replace(/\s+/, ""),
				info : OpenLayers.i18n("Coordinates")
			} ];
			results[0].name = results[0].lat+","+results[0].lon;
			this.showResults(results, query, dontzoom, markersvisible);
		}
		else if((query_match = query.match(/^http:\/\/.*\?(.*)$/)) && typeof (query_urlPart = decodeQueryString(query_match[1])).lon != "undefined" && typeof query_urlPart.lat != "undefined")
		{ // OpenStreetMap Permalink
			results = [ {
				lon : query_urlPart.lon,
				lat : query_urlPart.lat,
				info : OpenLayers.i18n("Coordinates")
			} ];
			if(typeof query_urlPart.zoom == "undefined")
				results[0].zoom = this.map.getZoom();
			else
				results[0].zoom = query_urlPart.zoom;
			this.showResults(results, query, dontzoom, markersvisible);
		}
		else
		{ // NameFinder
			var layer = this;

			var results1,results2;

			OpenLayers.Request.GET({
				url : this.nameFinderURL,
				params : { "find": query },
				success : function(request) {
					if(request.responseXML)
					{
						var searchresults = request.responseXML.getElementsByTagName("searchresults");
						if(searchresults.length > 0)
						{
							var results = [ ];
							if(searchresults[0].getAttribute("findplace") == null || searchresults[0].getAttribute("findplace") == "" || searchresults[0].getAttribute("foundnearplace") == "yes")
							{
								var named = searchresults[0].childNodes;
								for(var i=0; i<named.length; i++)
								{
									if(named[i].nodeType != 1) continue;

									results.push({
										zoom : named[i].getAttribute("zoom"),
										lon : named[i].getAttribute("lon"),
										lat : named[i].getAttribute("lat"),
										name : named[i].getAttribute("name"),
										info : named[i].getAttribute("info")
									});
								}
							}

							if(results.length > 0)
							{
								results1 = results;
								layer.showResults(results, query, dontzoom, markersvisible);
								return;
							}
						}
					}

					results1 = [ ];
					if(results2)
						layer.showResults(results2, query, dontzoom, markersvisible);
				},
				failure : function() {
					results1 = [ ];
					if(results2)
						layer.showResults(results2, query, dontzoom, markersvisible);
				}
			});

			if(!this.nameFinder2URL)
				results2 = [ ];
			else
			{
				OpenLayers.Request.POST({
					url : this.nameFinder2URL,
					data : OpenLayers.Util.getParameterString({ "FreeFormAdress" : query, "MaxResponse" : 50 }),
					headers : { "Content-type" : "application/x-www-form-urlencoded" },
					success : function(request) {
						if(results1 && results1.length > 0)
							return;
						if(request.responseXML)
						{
							var searchresults = request.responseXML.getElementsByTagName("xls:GeocodedAddress");
							var results = [ ];
							for(var i=0; i<searchresults.length; i++)
							{
								var accuracy = searchresults[i].getElementsByTagName("xls:GeocodeMatchCode");
								if(accuracy.length >= 1 && accuracy[0].getAttribute("accuracy") < 0.6)
									continue;
								var pos = searchresults[i].getElementsByTagName("gml:pos");
								if(pos.length < 1) continue;
								pos = pos[0].firstChild.data.split(" ");

								// FIXME: The determination of the name is not very proper
								var desc = [ ];
								var desc_street = searchresults[i].getElementsByTagName("xls:Street");
								if(desc_street.length >= 1 && desc_street[0].getAttribute("officialName"))
									desc.push(desc_street[0].getAttribute("officialName"));
								var desc_number = searchresults[i].getElementsByTagName("xls:Building");
								if(desc_number.length >= 1 && desc_number[0].getAttribute("number"))
									desc.push(desc_number[0].getAttribute("number"));
								var desc_postalcode = searchresults[i].getElementsByTagName("xls:PostalCode");
								if(desc_postalcode.length >= 1)
									desc.push(desc_postalcode[0].firstChild.data);
								var desc_place = searchresults[i].getElementsByTagName("xls:Place");
								for(var j=0; j<desc_place.length; j++)
								{
									if(desc_place[j].getAttribute("type") == "Municipality")
									{
										desc.push(desc_place[j].firstChild.data);
										break;
									}
								}
								for(var j=0; j<desc_place.length; j++)
								{
									if(desc_place[j].getAttribute("type") == "CountrySubdivision")
									{
										desc.push(desc_place[j].firstChild.data);
										break;
									}
								}

								results.push({
									zoom : 16,
									lon : pos[0],
									lat : pos[1],
									name : desc.join(" ")
								});
							}

							results2 = results;
							if(results1 && results1.length == 0)
								layer.showResults(results, query, dontzoom, markersvisible);
							return;
						}

						results2 = [ ];
						if(results1 && results1.length == 0)
							alert(OpenLayers.i18n("No results."));
					},
					failure : function() {
						results2 = [ ];
						if(results1 && results1.length == 0)
							alert(OpenLayers.i18n("No results."));
					}
				});
			}
		}
	},
	showResults : function(results, query, dontzoom, markersvisible) {
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
				content_heading.appendChild(document.createTextNode(" ("+(results[i].info ? results[i].info : OpenLayers.i18n("unknown"))+"), "));
			}
			else
			{
				content_strong.appendChild(document.createTextNode(results[i].info ? results[i].info : OpenLayers.i18n("unknown")));
				content_heading.appendChild(content_strong);
			}

			var content_zoom = document.createElement("a");
			content_zoom.href = "#";
			(function(i){
				content_zoom.onclick = function() {
					layer.map.setCenter(new OpenLayers.LonLat(results[i].lon, results[i].lat).transform(new OpenLayers.Projection("EPSG:4326"), layer.map.getProjectionObject()), results[i].zoom);
				};
			})(i);
			content_zoom.appendChild(document.createTextNode(OpenLayers.i18n("[Zoom]")));
			content_heading.appendChild(content_zoom);
			content.appendChild(content_heading);
			content.appendChild(makePermalinks(new OpenLayers.LonLat(results[i].lon, results[i].lat), results[i].zoom));
			var marker = this.createMarker(
				new OpenLayers.LonLat(results[i].lon, results[i].lat).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()),
				content,
				((markersvisible && typeof markersvisible[i] != "undefined" && markersvisible[i] != "0") || ((!markersvisible || typeof markersvisible[i] == "undefined") && i==0)),
				(i==0 ? this.highlightIcon : this.defaultIcon).clone(),
				dontzoom
			);
		}

		if(!dontzoom)
		{
			if(results.length == 0)
				alert(OpenLayers.i18n("No results."));
			else if(results.length == 1)
				this.map.setCenter(new OpenLayers.LonLat(results[0].lon, results[0].lat).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), results[0].zoom);
			else
				this.map.zoomToExtent(this.getDataExtent());
		}

		this.lastSearch = query;
		this.events.triggerEvent("lastSearchChange");

		this.events.triggerEvent("searchSuccess");
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.markers.GeoSearch"
});


/**
 * Displays an XML file on the map (such as GPX, KML or OSM) using a proxy and with auto-determining of the format. The colour is
 * randomly assigned. Set OpenLayers.Layer.cdauth.XML.proxy to your proxy URL (the URL will be appended using the “url” GET parameter).
*/

OpenLayers.Layer.cdauth.XML = new OpenLayers.Class(OpenLayers.Layer.GML, {
	colourCounter : 1,
	cdauthURL : null,
	initialize : function(name, url, options) {
		this.cdauthURL = url;

		var query;
		if(OpenLayers.Layer.cdauth.XML.proxy)
			query = OpenLayers.Layer.cdauth.XML.proxy + (OpenLayers.Layer.cdauth.XML.proxy.match(/\?/) ? "&" : "?") + "url=" + encodeURIComponent(url);
		else
			query = url;

		var colour;
		switch((OpenLayers.Layer.cdauth.XML.prototype.colourCounter++)%4)
		{
			case 0: colour = "red"; break;
			case 1: colour = "blue"; break;
			case 2: colour = "green"; break;
			case 3: colour = "black"; break;
		}

		OpenLayers.Layer.GML.prototype.initialize.apply(this, [ name ? name : url, query, OpenLayers.Util.extend({
			style: {
				strokeColor: colour,
				strokeWidth: 3,
				strokeOpacity: 0.5
			},
			projection: new OpenLayers.Projection("EPSG:4326"),
			zoomableInLayerSwitcher: true
		}, options) ]);
	},
	requestSuccess: function(request) {
		if(request.responseXML && request.responseXML.documentElement)
		{
			switch(request.responseXML.documentElement.tagName)
			{
				case "gpx": this.format = OpenLayers.Format.GPX; break;
				case "osm": this.format = OpenLayers.Format.OSM; break;
				case "kml": this.format = OpenLayers.Format.KML; break;
			}
		}
		this.formatOptions = { extractAttributes: false };
		try
		{
			var ret = OpenLayers.Layer.GML.prototype.requestSuccess.apply(this, arguments);
			return ret;
		}
		catch(e)
		{
			alert(OpenLayers.i18n("Error parsing file."));
			this.events.triggerEvent("loadend");
		}
	},
	CLASS_NAME : "OpenLayers.Layer.cdauth.XML"
});
OpenLayers.Layer.cdauth.XML.proxy = null;

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
		var arr_match = key.match(/(\[[^\]]*\])+$/);
		if(arr_match)
		{
			var arr_indexes = arr_match[0].substring(1, arr_match[0].length-1).split("][");
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
	if(!prefix)
		arr = [ ];
	for(var i in obj)
	{
		var key = encodeURIComponent(i);
		if(prefix)
			key = prefix+"["+key+"]";
		if(typeof obj[i] == "object")
			encodeQueryString(obj[i], key, arr);
		else
			arr.push(key+"="+encodeURIComponent(obj[i]));
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
 * @return DOMElement
*/

function makePermalinks(lonlat, zoom)
{
	var div = document.createElement("div");
	var makeEntry = function(href, text)
	{
		var li = document.createElement("li");
		var link = document.createElement("a");
		link.href = href;
		link.appendChild(document.createTextNode(OpenLayers.i18n(text)));
		li.appendChild(link);
		return li;
	};

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

	var ul = document.createElement("ul");
	ul.appendChild(makeEntry("http://data.giub.uni-bonn.de/openrouteservice/index.php?end="+lonlat.lon+","+lonlat.lat+"&lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "Get directions (OpenRouteService)"));
	ul.appendChild(makeEntry("http://www.openstreetmap.org/?lat="+lonlat.lat+"&lon="+lonlat.lon+"&mlat="+lonlat.lat+"&mlon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Permalink"));
	ul.appendChild(makeEntry("http://maps.google.com/?q="+lonlat.lat+","+lonlat.lon, "Google Maps Permalink"));
	ul.appendChild(makeEntry("http://maps.yahoo.com/broadband/#lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "Yahoo Maps Permalink"));
	ul.appendChild(makeEntry("http://osmtools.de/osmlinks/?lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Links"));
	ul.appendChild(makeEntry("http://stable.toolserver.org/geohack/geohack.php?params="+lonlat.lat+"_N_"+lonlat.lon+"_E", "Wikimedia GeoHack"));
	div.appendChild(ul);

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

/*function makeShortCode(lat, lon, zoom) {
	char_array = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@";
    var x = Math.round((lon + 180.0) * ((1 << 30) / 90.0));
    var y = Math.round((lat +  90.0) * ((1 << 30) / 45.0));
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
		str += char_array.charAt(digit);
    }
    for (var i = 5; i < Math.ceil((zoom + 8) / 3.0); ++i)
	{
		digit = (c2 >> (24 - 6 * (i - 5))) & 0x3f;
		str += char_array.charAt(digit);
    }
    for (var i = 0; i < ((zoom + 8) % 3); ++i)
	{
		str += "-";
    }
	alert("c1: "+c1+"\nc2: "+c2+"x: "+x+"\ny: "+y);
    return str;
}

function decodeShortLink(encoded)
{
	var char_array = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@";

	var lon,lat,zoom;

	var m = encoded.match(/^([A-Za-z0-9_@]+)/);
	if(!m) return false;
	zoom = m[1].length*2+encoded.length-11;

	var c1 = 0;
	var c2 = 0;
	for(var i=0,j=54; i<m[1].length; i++,j-=6)
	{
		var bits = char_array.indexOf(m[1].charAt(i));
		if(j <= 30)
			c1 |= bits >>> (30-j);
		else if(j > 30)
			c1 |= bits << (j-30);
		if(j < 30)
			c2 |= (bits & (0x3fffffff >>> j)) << j;
	}

	// Works correctly until here.

	var x = 0;
	var y = 0;

	for(var i=1,j=29; i<16; i++)
	{
		x |= ((c2 >> j--) & 1) << i;
		y |= ((c2 >> j--) & 1) << i;
	}
	for(var i=17,j=29; i<31; i++)
	{
		x |= ((c1 >> j--) & 1) << i;
		y |= ((c1 >> j--) & 1) << i;
	}

	lon = x/((1<<30)/90.0)-180.0;
	lat = y/((1<<30)/45.0)-90.0;

	alert("Lon: "+lon+"\nLat: "+lat+"\nZoom: "+zoom+"\nc1: "+c1+"\nc2: "+c2+"\nx: "+x+"\ny: "+y);
}*/

function alert_r(data)
{
	var str = "";
	for(var i in data)
		str += i+": "+data[i]+"\n";
	alert(str);
}