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
 * A map with the default values needed for OpenStreetMap and other world maps.
 * If you plan to use the getQueryMethod() function, remember to set the visibility of your overlay layers _before_ adding them to the map.
 * @event resize The map div has been resized.
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
				new OpenLayers.Control.Attribution() ],
			maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
			maxResolution: 156543.0399,
			numZoomLevels: 19,
			units: 'm',
			projection: new OpenLayers.Projection("EPSG:4326"),
			displayProjection: new OpenLayers.Projection("EPSG:4326")
		}, options) ]);
		this.events.addEventType("resize");
		this.events.addEventType("newHash");

		this.events.register("move", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changebaselayer", this, function(){ this.events.triggerEvent("newHash"); });
		this.events.register("changelayer", this, function(){ this.events.triggerEvent("newHash"); });
	},

	updateSize : function()
	{
		var ret = OpenLayers.Map.prototype.updateSize.apply(this, arguments);
		this.events.triggerEvent("resize");
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
		if(OpenLayers.Layer.cdauth.OSM.Osmarender)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.Osmarender("Osmarender"));
		if(OpenLayers.Layer.cdauth.OSM.CycleMap)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.CycleMap("CycleMap"));
		if(OpenLayers.Layer.cdauth.OSM.MinutelyMapnik)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.MinutelyMapnik("Minutely Mapnik"));
		if(OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser("OpenStreetBrowser"));
		if(OpenLayers.Layer.cdauth.OSM.Wanderkarte)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.Wanderkarte("Reit- und Wanderkarte"));
		if(OpenLayers.Layer.cdauth.OSM.OpenPisteMap)
			this.addLayer(new OpenLayers.Layer.cdauth.OSM.OpenPisteMap("OpenPisteMap"));

		if(OpenLayers.Layer.cdauth.OSM.OPNVKarte)
		{
			var psvMapLow,psvMapHigh;
			this.addLayer(psvMapLow = new OpenLayers.Layer.cdauth.OSM.OPNVKarte.Low("ÖPNV-Karte"));
			this.addLayer(psvMapHigh = new OpenLayers.Layer.cdauth.OSM.OPNVKarte.High("ÖPNV-Karte"));
			this.addOPNVEventHandler(psvMapLow, psvMapHigh);
		}

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
			this.addLayer(new OpenLayers.Layer.cdauth.other.Relief("Relief"));
	},

	/**
	 * Adds an event handler to the “zoomend” event of the map to ensure that always the right ÖPNV-Karte layer is visible on the map
	 * and its layer switcher. Adds a function updateOPNVLayer() to the map object.
	 * @param OpenLayers.Layer.cdauth.OSM.OPNVKarte.Low layerLow Your low zoom level ÖPNV-Karte layer instance.
	 * @param OpenLayers.Layer.cdauth.OSM.OPNVKarte.High layerHigh Your high zoom level ÖPNV-Karte layer instance.
	*/
	addOPNVEventHandler : function(layerLow, layerHigh)
	{
		this.updateOPNVLayer = function() {
			if(this.getZoom() >= 14)
			{
				layerLow.addOptions({displayInLayerSwitcher: false});
				layerHigh.addOptions({displayInLayerSwitcher: true});
				if(this.baseLayer == layerLow)
					this.setBaseLayer(layerHigh);
			}
			else
			{
				layerLow.addOptions({displayInLayerSwitcher: true});
				layerHigh.addOptions({displayInLayerSwitcher: false});
				if(this.baseLayer == layerHigh)
					this.setBaseLayer(layerLow);
			}
		};
		this.updateOPNVLayer();
		this.events.register("zoomend", this, this.updateOPNVLayer);
	},

	/**
	 * Zoom to the specified query object. Remember to add your layers before running this method.
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
			this.updateOPNVLayer();
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
			overlays : { }
		};

		for(var i=0; i<this.layers.length; i++)
		{ // Save overlay visibility
			if(this.layers[i].isBaseLayer) continue;
			if(this.layers[i].getVisibility() != this.cdauthDefaultVisibility[this.layers[i].name])
				hashObject.overlays[this.layers[i].name] = this.layers[i].getVisibility() ? "1" : "0";
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
	}
});

OpenLayers.Control.cdauth = { };

/**
 * A layer switcher that has a scroll bar if the height of the map is too small.
*/
OpenLayers.Control.cdauth.LayerSwitcher = OpenLayers.Class(OpenLayers.Control.LayerSwitcher, {
	loadContents : function() {
		var ret = OpenLayers.Control.LayerSwitcher.prototype.loadContents.apply(this, arguments);
		this.layersDiv.style.paddingRight = "0";
		this.layersDiv.style.overflow = "auto";
		this.map.events.register("resize", this, function(){this.layersDiv.style.maxHeight = (this.map.size.h-100)+"px"});
		return ret;
	}
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
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.Mapnik = OpenLayers.Class(OpenLayers.Layer.OSM.Mapnik);

	/**
	 * Osmarender rendering from openstreetmap.org.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.Osmarender = OpenLayers.Class(OpenLayers.Layer.OSM.Osmarender);

	/**
	 * CycleMap rendering from openstreetmap.org.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.CycleMap = OpenLayers.Class(OpenLayers.Layer.OSM.CycleMap);

	/**
	 * Minutely Mapnik rendering of OpenStreetMap data by CloudMade. See http://matt.sandbox.cloudmade.com/.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.MinutelyMapnik = OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(
				this,
				[
					name,
					[
						"http://a.matt.sandbox.cloudmade.com/123/3/256/",
						"http://b.matt.sandbox.cloudmade.com/123/3/256/",
						"http://c.matt.sandbox.cloudmade.com/123/3/256/"
					],
					OpenLayers.Util.extend({
						numZoomLevels: 19,
						attribution: "Rendering by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>"
					}, options)
				]
			);
		}
	});

	/**
	 * OpenStreetBrowser rendering of OpenStreetMap data. See http://openstreetbrowser.org/.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.OpenStreetBrowser = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://openstreetbrowser.org/tiles/base/", OpenLayers.Util.extend({numZoomLevels: 19}, options) ]);
		}
	});

	/**
	 * OpenPisteMap rendering of OpenStreetMap data. See http://openpistemap.org/.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.OpenPisteMap = new OpenLayers.Class(OpenLayers.Layer.OSM, {
		initialize: function(name, options) {
			OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://openpistemap.org/tiles/contours/", OpenLayers.Util.extend({numZoomLevels: 18}, options) ]);
		}
	});

	if(OpenLayers.Layer.WMS)
	{
		OpenLayers.Layer.cdauth.OSM.OPNVKarte = { };

		/**
		 * OpenStreetMap data rendering by ÖPNV-Karte (PSV map) for low zoom levels (< 14). Add both the low and the high zoom level layers to your map
		 * and run OpenLayers.Map.cdauth.addOPNVEventHandler() for the right layer to be visible.
		 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
		*/
		OpenLayers.Layer.cdauth.OSM.OPNVKarte.Low = new OpenLayers.Class(OpenLayers.Layer.OSM, {
			initialize: function(name, options) {
				OpenLayers.Layer.OSM.prototype.initialize.apply(this, [ name, "http://xn--pnvkarte-m4a.de/tiles/", OpenLayers.Util.extend({numZoomLevels: 19, displayInLayerSwitcher: false}, options) ]);
			}
		});

		/**
		 * OpenStreetMap data rendering by ÖPNV-Karte (PSV map) for high zoom levels (>= 14). Add both the low and the high zoom level layers to your map
		 * and run OpenLayers.Map.cdauth.addOPNVEventHandler() for the right layer to be visible.
		 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js for this to work.
		*/
		OpenLayers.Layer.cdauth.OSM.OPNVKarte.High = new OpenLayers.Class(OpenLayers.Layer.WMS, {
			initialize: function(name, options) {
				OpenLayers.Layer.WMS.prototype.initialize.apply(this, [ name, "http://xn--pnvkarte-m4a.de/cgi-bin/mapnikserv.py?", {map: '/opt/mapnik/test.xml', mode: 'view', format: 'image/png256'}, OpenLayers.Util.extend({numZoomLevels: 19, singleTile: true, projection: new OpenLayers.Projection("EPSG:900913"), displayInLayerSwitcher: false}, options) ]);
			}
		});
	}
}

if(OpenLayers.Layer.OpenTiles)
{
	/**
	 * OSM Reit- und Wanderkarte rendering of OSM foot- and bridle ways. See http://osmc.broadbox.de/.
	 * Include http://www.openstreetmap.org/openlayers/OpenStreetMap.js  and http://opentiles.com/nop/opentiles.js for this to work.
	*/
	OpenLayers.Layer.cdauth.OSM.Wanderkarte = new OpenLayers.Class(OpenLayers.Layer.OpenTiles, {
		initialize: function(name, options) {
			OpenLayers.Layer.OpenTiles.prototype.initialize.apply(this, [ name, "http://opentiles.com/nop/get.php?", OpenLayers.Util.extend({numZoomLevels: 16, layername:'trails', attribution: "Rendering by <a href=\"http://opentiles.com/nop/\">OSMC Reit- und Wanderkarte</a>. Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>" }, options) ]);
		}
	});
}

if(OpenLayers.Layer.Google)
{
	/**
	 * Google Streets (http://maps.google.com/)
	 * Get a Google map key from http://code.google.com/apis/maps/signup.html and include
	 * http://maps.google.com/maps?file=api&v=2&key=[Your key] for this to work.
	*/
	OpenLayers.Layer.cdauth.Google.Maps = new OpenLayers.Class(OpenLayers.Layer.Google, {
		initialize: function(name, options) {
			OpenLayers.Layer.Google.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		}
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
			}
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
			}
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
			}
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
			}
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
			}
		});
	}
}

if(OpenLayers.Layer.Yahoo)
{
	/**
	 * Yahoo Streets (http://maps.yahoo.com/)
	 * Include http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=cdauths-map for this to work.
	*/
	OpenLayers.Layer.cdauth.Yahoo.Maps = new OpenLayers.Class(OpenLayers.Layer.Yahoo, {
		initialize: function(name, options) {
			OpenLayers.Layer.Yahoo.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		}
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
			}
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
			}
		});
	}
}

if(OpenLayers.Layer.XYZ)
{
	/**
	 * OpenAerialMap (http://openaerialmap.org/). You may have to use the current unstable version of OpenLayers for this to be supported.
	*/
	OpenLayers.Layer.cdauth.other.OpenAerialMap = new OpenLayers.Class(OpenLayers.Layer.XYZ, {
		initialize: function(name, options) {
			OpenLayers.Layer.XYZ.prototype.initialize.apply(this, [ name, "http://tile.openaerialmap.org/tiles/1.0.0/openaerialmap-900913/${z}/${x}/${y}.png", OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
		}
	});
}

if(OpenLayers.Layer.OpenTiles)
{
	/**
	 * Reit- und Wanderkarte relief rendering.
	 * Include http://opentiles.com/nop/opentiles.js for this to work.
	*/
	OpenLayers.Layer.cdauth.other.Relief = new OpenLayers.Class(OpenLayers.Layer.OpenTiles, {
		initialize: function(name, options) {
			OpenLayers.Layer.OpenTiles.prototype.initialize.apply(this, [ name, "http://opentiles.com/nop/get.php?", OpenLayers.Util.extend({numZoomLevels: 16, isBaseLayer:true, layername:'relief', attribution: "Rendering by <a href=\"http://opentiles.com/nop/\">OSMC Reit- und Wanderkarte</a>. DEM by <a href='http://srtm.csi.cgiar.org'>CIAT</a>" }, options) ]);
		}
	});
}

/**
 * A FramedCloud that triggers an event after running setContentHTML().
 * @event setContentHTML
*/

OpenLayers.Popup.FramedCloud.cdauth = new OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
	initialize: function() {
		OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this, arguments);
		this.events.addEventType("setContentHTML");
	},
	setContentHTML: function() {
		var ret = OpenLayers.Popup.FramedCloud.prototype.setContentHTML.apply(this, arguments);
		this.events.triggerEvent("setContentHTML");
		return ret;
	}
});

/**
 * A Markers layer with a function to easily add a marker with a popup.
 * @event markersChanged A marker popup has been opened or closed.
*/

OpenLayers.Layer.cdauth.markers.Markers = new OpenLayers.Class(OpenLayers.Layer.Markers, {
	initialize : function(name, options) {
		OpenLayers.Layer.Markers.prototype.initialize.apply(this, [ name, options ]);
		this.events.addEventType("markersChanged");
	},
	defaultIcon : new OpenLayers.Icon('http://osm.cdauth.de/map/marker.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25)),
	/**
	 * Creates a marker with a popup (OpenLayers.Popup.FramedCloud) on this layer. The visibility of the popup can be toggled by clicking
	 * on the marker.
	 * @param OpenLayers.LonLat lonlat The position of the marker.
	 * @param String popupContent The HTML content of the popup.
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
			feature.data.autoSize = true;
		}
		var marker = feature.createMarker();
		marker.events.addEventType("close");
		marker.events.addEventType("open");
		if(popupContent)
		{
			feature.createPopup(true);
			feature.popup.panMapIfOutOfView = !noPan;
			this.map.addPopup(feature.popup);
			OpenLayers.Event.observe(feature.popup.closeDiv, "click", OpenLayers.Function.bindAsEventListener(function(e)
			{
				this.popup.hide();
				layer.events.triggerEvent("markersChanged");
				this.marker.events.triggerEvent("close");
				OpenLayers.Event.stop(e);
			}, feature));

			if(popupVisible)
				feature.popup.show();
			else
				feature.popup.hide();

			var layer = this;
			marker.events.register("mousedown", feature, function (evt) {
				this.popup.toggle();
				this.marker.events.triggerEvent(this.popup.visible() ? "close" : "open");
				OpenLayers.Event.stop(evt);
				layer.events.triggerEvent("markersChanged");
			});
		}
		marker.cdauthFeature = feature;
		this.addMarker(marker);
		return marker;
	}
});

/**
 * A Markers layer for adding LonLat markers. These markers display their coordinates and list various Permalinks to other map services.
 * Run addClickControl() for the functionality of creating a marker when clicking.
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
	addClickControl : function() {
		this.map.events.register("click", this, function(e){
			var lonlat = this.map.getLonLatFromViewPortPx(e.xy);
			this.addLonLatMarker(lonlat);
		});
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
			this.markers[i].cdauthFeature.popup.setContentHTML((this.markers[i].cdauthTitle ? "<h6 class=\"marker-heading\">"+htmlspecialchars(this.markers[i].cdauthTitle)+"</h6>" : "")+makePermalinks(this.markers[i].lonlat.clone().transform(this.map.getProjectionObject(), this.map.displayProjection), this.map.getZoom()));
	}
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
	defaultIcon : false,
	highlighIcon : false,

	/**
	 * @param String nameFinderURL http://gazetteer.openstreetmap.org/namefinder/search.xml (search=%s will be appended). To work around the same origin policy, pass a wrapper that lives on your webspace.
	 * @param OpenLayers.Icon defaultIcon The default icon to use for the search result markers.
	 * @param OpenLayers.Icon highlightIcon The marker icon to use for the first search result.
	*/
	initialize: function(name, nameFinderURL, defaultIcon, highlightIcon, options) {
		OpenLayers.Layer.cdauth.markers.Markers.prototype.initialize.apply(this, [ name, options ]);
		this.nameFinderURL = nameFinderURL;
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
	 * @param boolean zoomback Don’t zoom to the search result but keep the current view of the map. If this is set, no alert box will indicate that the search returned no results.
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
		if(query_match = query.match(/^(-?\s*\d+([.,]\d+)?)\s*[,;]?\s*(-?\s*\d+([.,]\d+)?)$/))
		{ // Coordinates
			results = [ {
				zoom : this.map.getZoom(),
				lon : query_match[3].replace(",", ".").replace(/\s+/, ""),
				lat : query_match[1].replace(",", ".").replace(/\s+/, ""),
				info : "Coordinates"
			} ];
			results[0].name = results[0].lat+","+results[0].lon;
			this.showResults(results, query, zoomback, markersvisible);
		}
		else if((query_match = query.match(/^http:\/\/.*\?(.*)$/)) && typeof (query_urlPart = decodeQueryString(query_match[1])).lon != "undefined" && typeof query_urlPart.lat != "undefined")
		{ // OpenStreetMap Permalink
			results = [ {
				lon : query_urlPart.lon,
				lat : query_urlPart.lat,
				info : "Coordinates"
			} ];
			if(typeof query_urlPart.zoom == "undefined")
				results[0].zoom = this.map.getZoom();
			else
				results[0].zoom = query_urlPart.zoom;
			this.showResults(results, query, zoomback, markersvisible);
		}
		else
		{ // NameFinder
			var layer = this;
			OpenLayers.loadURL(this.nameFinderURL, { "find": query }, null, function(request) {
				if(request.responseXML)
				{
					var searchresults = request.responseXML.getElementsByTagName("searchresults");
					if(searchresults.length > 0)
					{
						var named = searchresults[0].childNodes;
						var results = [ ];
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

						layer.showResults(results, query, dontzoom, markersvisible);

						return;
					}
				}
				layer.events.triggerEvent("searchFailure");
				alert("Search failed.");
			}, function() {
				layer.events.triggerEvent("searchFailure");
				alert("Search failed.");
			});
		}
	},
	showResults : function(results, query, dontzoom, markersvisible) {
		for(var i=results.length-1; i>=0; i--)
		{
			var marker = this.createMarker(
				new OpenLayers.LonLat(results[i].lon, results[i].lat).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()),
				"<h6 class=\"result-heading\"><strong>"+htmlspecialchars(results[i].name)+"</strong> ("+htmlspecialchars(results[i].info ? results[i].info : "unknown")+"), <a href=\"#\">[Zoom]</a></h6>"+makePermalinks(new OpenLayers.LonLat(results[i].lon, results[i].lat), results[i].zoom),
				((markersvisible && typeof markersvisible[i] != "undefined" && markersvisible[i] != "0") || ((!markersvisible || typeof markersvisible[i] == "undefined") && i==0)),
				(i==0 ? this.highlightIcon : this.defaultIcon).clone(),
				dontzoom
			);

			marker.cdauth = {
				lonlat: new OpenLayers.LonLat(results[i].lon, results[i].lat),
				zoom: results[i].zoom,
				update: function(){
					OpenLayers.Event.observe(this.cdauthFeature.popup.contentDiv.getElementsByTagName("a")[0], "click", OpenLayers.Function.bindAsEventListener(function(e) {
						this.map.setCenter(this.cdauth.lonlat.transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), this.cdauth.zoom);
						OpenLayers.Event.stop(e);
					}, marker));
				}
			};

			marker.cdauthFeature.popup.events.register("setContentHTML", marker, marker.cdauth.update);
			marker.cdauthFeature.popup.events.triggerEvent("setContentHTML");
		}

		if(!dontzoom)
		{
			if(results.length == 0)
				alert("No results.");
			else if(results.length == 1)
				this.map.setCenter(new OpenLayers.LonLat(results[0].lon, results[0].lat).transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()), results[0].zoom);
			else
				this.map.zoomToExtent(this.getDataExtent());
		}

		this.lastSearch = query;
		this.events.triggerEvent("lastSearchChange");

		this.events.triggerEvent("searchSuccess");
	}
});

/**
 * An OpenStreetBugs layer (currently read-only). Parses the GPX output from http://openstreetbugs.schokokeks.org/
 * (see http://wiki.openstreetmap.org/wiki/User:Emka/new_OSB). http://openstreetbugs.appspot.com/ does not work as the GPX output
 * does not provide bug IDs.
 * @event markersUpdating The refresh() function has been called and an AJAX request has been started
 * @event markersUpdated The AJAX response has successfully been retreived and new bugs have been added to the map.
 * @event updateFailed There was a problem receiving the AJAX response.
*/

OpenLayers.Layer.cdauth.markers.OpenStreetBugs = new OpenLayers.Class(OpenLayers.Layer.Markers, {
	iconError : new OpenLayers.Icon("http://openstreetbugs.appspot.com/icon_error.png", new OpenLayers.Size(22,22), new OpenLayers.Pixel(-11, -11)),
	iconValid : new OpenLayers.Icon("http://openstreetbugs.appspot.com/icon_valid.png", new OpenLayers.Size(22,22), new OpenLayers.Pixel(-11, -11)),
	osbugs : { },
	osbURL : { },
	/**
	 * @param String osbURL The URL to use (usually a file on your webspace proxying http://openstreetbugs.schokokeks.org/api/0.1/getGPX
	*/
	initialize : function(name, osbURL, options)
	{
		OpenLayers.Layer.Markers.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({opacity: .7}, options) ]);
		this.osbURL = osbURL;
		this.events.addEventType("markersUpdating");
		this.events.addEventType("markersUpdated");
		this.events.addEventType("updateFailed");
		this.events.register("visibilitychanged", this, this.refresh);
	},
	afterAdd : function()
	{
		var ret = OpenLayers.Layer.Markers.prototype.afterAdd.apply(this, arguments);
		this.map.events.register("moveend", this, this.refresh);
		this.refresh();
		return ret;
	},
	addBugMarker : function(id, lonlat, html, status) {
		if(this.osbugs[id]) return;

		var feature = new OpenLayers.Feature(this, lonlat.clone().transform(new OpenLayers.Projection("EPSG:4326"), this.map.getProjectionObject()));
		feature.closeBox = false;
		feature.popupClass = OpenLayers.Popup.FramedCloud;
		feature.data.icon = (status == 1 ? this.iconValid.clone() : this.iconError.clone())
		feature.data.popupContentHTML = html;
		feature.data.autoSize = true;
		var marker = feature.createMarker();
		marker.events.register("click", feature, function(evt)
		{
			this.cdauthClicked = !this.cdauthClicked;
			if(this.cdauthClicked)
			{
				if(this.popup)
					this.popup.show();
				else
					map.addPopup(this.createPopup());
			}
			else
				this.popup.hide();
			OpenLayers.Event.stop(evt);
		});
		marker.events.register("mouseover", feature, function(evt)
		{
			if(!this.cdauthClicked)
			{
				if(this.popup)
					this.popup.show();
				else
					map.addPopup(this.createPopup());
			}
			OpenLayers.Event.stop(evt);
		});
		marker.events.register("mouseout", feature, function(evt)
		{
			if(!this.cdauthClicked)
				this.popup.hide();
			OpenLayers.Event.stop(evt);
		});

		this.osbugs[id] = feature;
		this.addMarker(marker);
	},
	/**
	 * Fetches the OpenStreetBugs of the currently visible map extent if this layer is visible and adds the bugs to the map. This is
	 * automatically called when the map extent changes.
	*/
	refresh : function()
	{
		if(!this.getVisibility())
			return;
		var extent_obj = this.map.getExtent();
		if(!extent_obj)
			return;
		var extent = extent_obj.transform(this.map.getProjectionObject(), new OpenLayers.Projection("EPSG:4326")).toArray();
		for(var i=0; i<4; i++)
			extent[i] = Math.round(extent[i]*100000)/100000;
		var layer = this;
		this.events.triggerEvent("markersUpdating");
		OpenLayers.loadURL(this.osbURL, { "l" : extent[0], "b" : extent[1], "r" : extent[2], "t" : extent[3], "limit" : 500 }, null, function(request) {
			if(request.responseXML)
			{
				var points = request.responseXML.getElementsByTagName("wpt");
				for(var i=0; i<points.length; i++)
				{
					var desc_l = points[i].getElementsByTagName("desc");
					if(desc_l.length < 1 || !desc_l[0].firstChild)
						continue;
					var closed_l = points[i].getElementsByTagName("closed");
					if(closed_l.length < 1)
						continue;
					var id_l = points[i].getElementsByTagName("id");
					if(id_l.length < 1 || !id_l[0].firstChild)
						continue;
					layer.addBugMarker(id_l[0].firstChild.data, new OpenLayers.LonLat(points[i].getAttribute("lon"), points[i].getAttribute("lat")), desc_l[0].firstChild.data, closed_l[0].firstChild ? closed_l[0].firstChild.data : 0);
				}
				layer.events.triggerEvent("markersUpdated");
			}
			else
				layer.events.triggerEvent("updateFailed");
		}, function() { layer.events.triggerEvent("updateFailed"); });
	}
});

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
				var cur_key = decodeURIComponent(arr_indexes[j]);
				if(cur_key.length == 0)
				{
					cur_key = 0;
					while(typeof cur_el[cur_key] != "undefined")
						cur_key++;
				}
				if(j == arr_indexes.length-1)
					cur_el[cur_key] = decodeURIComponent(str_split[i].substr(equal_sign+1));
				else
				{
					if(!cur_el[cur_key] || typeof cur_el[cur_key] != "object")
						cur_el[cur_key] = { };
					cur_el = cur_el[cur_key];
				}
			}
		}
		else
			obj[decodeURIComponent(key)] = decodeURIComponent(str_split[i].substr(equal_sign+1));
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
 * @return String
*/

function makePermalinks(lonlat, zoom)
{
	return "<dl>"
		+ "<dt>Latitude</dt><dd>"+Math.round(lonlat.lat*100000000)/100000000+"</dd>"
		+ "<dt>Longitude</dt><dd>"+Math.round(lonlat.lon*100000000)/100000000+"</dd>"
		+ "</dl><ul>"
		+ "<li><a href=\"http://data.giub.uni-bonn.de/openrouteservice/index.php?end="+lonlat.lon+","+lonlat.lat+"&amp;lat="+lonlat.lat+"&amp;lon="+lonlat.lon+"&amp;zoom="+zoom+"\">Get directions (OpenRouteService)</a></li>"
		+ "<li><a href=\"http://www.openstreetmap.org/?lat="+lonlat.lat+"&amp;lon="+lonlat.lon+"&amp;mlat="+lonlat.lat+"&amp;mlon="+lonlat.lon+"&amp;zoom="+zoom+"\">OpenStreetMap Permalink</a></li>"
		+ "<li><a href=\"http://maps.google.com/?q="+lonlat.lat+","+lonlat.lon+"\">Google Maps Permalink</a></li>"
		+ "<li><a href=\"http://maps.yahoo.com/broadband/#lat="+lonlat.lat+"&amp;lon="+lonlat.lon+"&amp;zoom="+zoom+"\">Yahoo Maps Permalink</a></li>"
		+ "<li><a href=\"http://osmtools.de/osmlinks/?lat="+lonlat.lat+"&amp;lon="+lonlat.lon+"&amp;zoom="+zoom+"\">OpenStreetMap Links</a></li>"
		+ "<li><a href=\"http://stable.toolserver.org/geohack/geohack.php?params="+lonlat.lat+"_N_"+lonlat.lon+"_E\">Wikimedia GeoHack</a></li>"
		+ "<li><a href=\"http://openstreetbugs.org/?lat="+lonlat.lat+"&amp;lon="+lonlat.lon+"&amp;zoom="+zoom+"\">OpenStreetBugs</a></li>"
		+ "</ul>";
}

function alert_r(data)
{
	var str = "";
	for(var i in data)
		str += i+": "+data[i]+"\n";
	alert(str);
}
