var map;
var layerMarkers;
var layerResults;
var projection = new OpenLayers.Projection("EPSG:4326");
var nameFinderProjection = new OpenLayers.Projection("EPSG:4326");
var OSMProjection = new OpenLayers.Projection("EPSG:900913");
var lastHash;
var newLocationHash;
var icon;
var iconHighlight;
var lastSearch;

OpenLayers.Layer.OSM.Minutely = OpenLayers.Class(OpenLayers.Layer.OSM, {
    initialize: function(name, options) {
	    var url = ["http://a.matt.sandbox.cloudmade.com/123/3/256/",
		       "http://b.matt.sandbox.cloudmade.com/123/3/256/",
		       "http://c.matt.sandbox.cloudmade.com/123/3/256/"
		       ];
	options = OpenLayers.Util.extend({numZoomLevels: 19, attribution: "Rendering by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>"}, options);
	var newArgs = [name, url, options];
	OpenLayers.Layer.OSM.prototype.initialize.apply(this, newArgs);
    },

    CLASS_NAME: "OpenLayers.Layer.OSM.Minutely"
});

OpenLayers.Layer.OSM.CloudMade = OpenLayers.Class(OpenLayers.Layer.OSM, {
    initialize: function(name, options) {
	var url = [
	    "http://a.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/3/256/",
	    "http://b.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/3/256/",
	    "http://c.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/3/256/"
	];
	options = OpenLayers.Util.extend({numZoomLevels: 19, attribution: "Rendering by <a href=\"http://www.cloudmade.com/\">CloudMade</a>. Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>"}, options);
	var newArgs = [name, url, options];
	OpenLayers.Layer.OSM.prototype.initialize.apply(this, newArgs);
    },

    CLASS_NAME: "OpenLayers.Layer.OSM.CloudMade"
});


function initMap()
{
	map = new OpenLayers.Map ("map", {
		controls:[
			new OpenLayers.Control.Navigation(),
			new OpenLayers.Control.PanZoomBar(),
			new OpenLayers.Control.LayerSwitcher(),
			new OpenLayers.Control.Attribution()],
		maxExtent: new OpenLayers.Bounds(-20037508.34,-20037508.34,20037508.34,20037508.34),
		maxResolution: 156543.0399,
		numZoomLevels: 19,
		units: 'm',
		projection: projection,
		displayProjection: projection
	} );

	icon = new OpenLayers.Icon('marker.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25))
	iconHighlight = new OpenLayers.Icon('marker-green.png', new OpenLayers.Size(21,25), new OpenLayers.Pixel(-9, -25))

	map.addLayer(new OpenLayers.Layer.OSM.Mapnik("Mapnik"));
	map.addLayer(new OpenLayers.Layer.OSM.Osmarender("Osmarender"));
	map.addLayer(new OpenLayers.Layer.OSM.CycleMap("CycleMap"));
	map.addLayer(new OpenLayers.Layer.OSM.Minutely("Minutely Mapnik"));
	//map.addLayer(new OpenLayers.Layer.OSM.CloudMade("CloudMade Mapnik"));
	map.addLayer(new OpenLayers.Layer.OSM("OpenStreetBrowser", "http://openstreetbrowser.org/tiles/base/", {numZoomLevels: 19}));
	map.addLayer(new OpenLayers.Layer.OpenTiles("Reit- und Wanderkarte", "http://opentiles.com/nop/get.php?", {numZoomLevels: 16, layername:'trails', attribution: "Rendering by <a href=\"http://opentiles.com/nop/\">OSMC Reit- und Wanderkarte</a>. Data by <a href=\"http://openstreetmap.org/\">OpenStreetMap</a>" }));

	map.addLayer(new OpenLayers.Layer.Google("Google Streets", {'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.Google("Google Satellite", {type: G_SATELLITE_MAP, 'sphericalMercator': true, numZoomLevels: 22}));
	map.addLayer(new OpenLayers.Layer.Google("Google Hybrid", {type: G_HYBRID_MAP, 'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.Google("Google Terrain", {type: G_PHYSICAL_MAP, 'sphericalMercator': true}));

	map.addLayer(new OpenLayers.Layer.Yahoo("Yahoo Street", {'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.Yahoo("Yahoo Satellite", {'type': YAHOO_MAP_SAT, 'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.Yahoo("Yahoo Hybrid", {'type': YAHOO_MAP_HYB, 'sphericalMercator': true}));

	/* // Virtual Earth use not allowed in combination with other mapping services
	map.addLayer(new OpenLayers.Layer.VirtualEarth("Microsoft Virtual Earth Roads", {'type': VEMapStyle.Road, 'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.VirtualEarth("Microsoft Virtual Earth Aerial", {'type': VEMapStyle.Aerial, 'sphericalMercator': true}));
	map.addLayer(new OpenLayers.Layer.VirtualEarth("Microsoft Virtual Earth Hybrid", {'type': VEMapStyle.Hybrid, 'sphericalMercator': true})); // */

	map.addLayer(new OpenLayers.Layer.XYZ("OpenAerialMap","http://tile.openaerialmap.org/tiles/1.0.0/openaerialmap-900913/${z}/${x}/${y}.png",{sphericalMercator: true}));

	/*map.addLayer(new OpenLayers.Layer.WMS('ÖPNV-Karte (PSV map)', "http://91.143.81.171/cgi-bin/mapserv?map=/data/osm/oepnv.map&", {
		layers: 'Bus_Station,Bus_Linien',
		format: 'image/png; mode=24bit'
	}, {
		numZoomLevels: 19,
		singleTile: true,
		ratio: 1
	}));*/

	map.addLayer(new OpenLayers.Layer.OpenTiles("Relief", "http://opentiles.com/nop/get.php?", {numZoomLevels: 16, isBaseLayer:true, layername:'relief', attribution: "Rendering by <a href=\"http://opentiles.com/nop/\">OSMC Reit- und Wanderkarte</a>. DEM by <a href='http://srtm.csi.cgiar.org'>CIAT</a>" }));

	layerMarkers = new OpenLayers.Layer.Markers("Markers", { displayInLayerSwitcher : false });
	map.addLayer(layerMarkers);

	layerResults = new OpenLayers.Layer.Markers("Search results", { displayInLayerSwitcher : false });
	map.addLayer(layerResults);

	doUpdateLocationHash();
	setInterval(doUpdateLocationHash, 500);

	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
		defaultHandlerOptions: {
			'single': true,
			'double': false,
			'pixelTolerance': 0,
			'stopSingle': false,
			'stopDouble': false
		},

		initialize: function(options) {
			this.handlerOptions = OpenLayers.Util.extend(
				{}, this.defaultHandlerOptions
			);
			OpenLayers.Control.prototype.initialize.apply(
				this, arguments
			);
			this.handler = new OpenLayers.Handler.Click(
				this, {
					'click': this.trigger
				}, this.handlerOptions
			);
		},

		trigger: function(e) {
			var lonlat = map.getLonLatFromViewPortPx(e.xy);
			addLonLatMarker(lonlat);
			updateLocationHash();
		}
	});

	var click = new OpenLayers.Control.Click();
	map.addControl(click);
	click.activate();

	map.events.register("move", map, updateLocationHash);
	map.events.register("changebaselayer", map, updateLocationHash);
}

function zoomToQuery(query)
{
	if(!query.lon)
		query.lon = 0;
	if(!query.lat)
		query.lat = 0;
	if(!query.zoom)
		query.zoom = 2;
	map.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(map.displayProjection, map.getProjectionObject()), query.zoom);

	if(query.layer)
	{
		var matching_layers = map.getLayersByName(query.layer);
		if(matching_layers.length > 0)
			map.setBaseLayer(matching_layers[0]);
	}

	layerMarkers.clearMarkers();
	if(query.mlat && query.mlon && typeof query.mlat == "object" && typeof query.mlon == "object")
	{
		for(var i in query.mlat)
		{
			if(typeof query.mlon[i] == "undefined") continue;
			addLonLatMarker(new OpenLayers.LonLat(query.mlon[i], query.mlat[i]).transform(map.displayProjection, map.getProjectionObject()), (query.mtitle && typeof query.mtitle == "object") ? query.mtitle[i] : null);
		}
		map.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(map.displayProjection, map.getProjectionObject()), query.zoom);
	}

	if(query.search)
	{
		document.getElementById("search-input").value = query.search;
		geoSearch(function(){map.setCenter(new OpenLayers.LonLat(query.lon, query.lat).transform(map.displayProjection, map.getProjectionObject()), query.zoom);}, query.smopen);
	}
}

function updateLocationHash()
{
	newLocationHash = true;
}

function doUpdateLocationHash()
{
	if(newLocationHash)
	{
		if(!map.getCenter())
			return;
		newLocationHash = false;

		var lonlat = map.getCenter().clone().transform(map.getProjectionObject(), map.displayProjection);
		var hashObject = {
			lon : lonlat.lon,
			lat : lonlat.lat,
			zoom : map.getZoom(),
			layer : map.baseLayer.name,
			mlon : { },
			mlat : { },
			mtitle : { },
			smopen : { }
		};
		if(lastSearch)
			hashObject.search = lastSearch;

		for(var i=0; i<layerMarkers.markers.length; i++)
		{
			var lonlat = layerMarkers.markers[i].lonlat.clone().transform(map.getProjectionObject(), map.displayProjection);
			hashObject.mlon[i] = lonlat.lon;
			hashObject.mlat[i] = lonlat.lat;
			if(layerMarkers.markers[i].cdauthTitle)
				hashObject.mtitle[i] = layerMarkers.markers[i].cdauthTitle;
		}

		for(var i=0; i<layerResults.markers.length; i++)
		{
			var visible = layerResults.markers[layerResults.markers.length-1-i].cdauthFeature.popup ? layerResults.markers[layerResults.markers.length-1-i].cdauthFeature.popup.visible() : false;
			if(visible != (i == 0))
				hashObject.smopen[i] = visible ? "1" : "0";
		}

		location.hash = "#"+encodeQueryString(hashObject);
		lastHash = location.hash;
	}
	else
	{
		var do_zoom = (location.hash != lastHash);
		lastHash = location.hash;
		if(do_zoom)
			zoomToQuery(decodeQueryString(location.hash.replace(/^#/, "")));
	}
}

function decodeQueryString(str)
{
	var obj = { };
	var str_split = str.split(";");
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

function geoSearch(zoomback, markersvisible)
{
	for(var i=0; i<layerResults.markers.length; i++)
	{
		if(layerResults.markers[i].cdauthFeature.popup)
			layerResults.markers[i].cdauthFeature.popup.destroy();
	}

	layerResults.clearMarkers();
	lastSearch = null;
	updateLocationHash();
	var search_input = document.getElementById("search-input");
	var search_button = document.getElementById("search-button");
	var string = search_input.value;
	if(!string)
		return;
	search_input.disabled = search_button.disabled = true;
	OpenLayers.loadURL("namefinder.php", { "find": string }, null, function(request) {
		search_input.disabled = search_button.disabled = false;
		if(request.responseXML)
		{
			var searchresults = request.responseXML.getElementsByTagName("searchresults");
			if(searchresults.length > 0)
			{
				lastSearch = string;
				updateLocationHash();

				var named = searchresults[0].childNodes;
				var markers = [ ];
				var zoom;
				var last_lonlat;
				var first = true;
				for(var i=0; i<named.length; i++)
				{
					if(named[i].nodeType != 1) continue;

					zoom = named[i].getAttribute("zoom");

					var lonlat = new OpenLayers.LonLat(named[i].getAttribute("lon"), named[i].getAttribute("lat")).transform(nameFinderProjection, map.getProjectionObject());
					last_lonlat = lonlat;
					var this_icon = (first ? iconHighlight : icon).clone();
					if(first) first = false;

					var feature = new OpenLayers.Feature(layerResults, lonlat);
					feature.closeBox = true;
					feature.popupClass = OpenLayers.Popup.FramedCloud;
					feature.data.popupContentHTML = "<div><strong>"+htmlspecialchars(named[i].getAttribute("name"))+"</strong> ("+htmlspecialchars(named[i].getAttribute("info") ? named[i].getAttribute("info") : "unknown")+")</div>";
					feature.data.autoSize = true;
					feature.data.icon = this_icon;
					var marker = feature.createMarker();
					var markerClick = function (evt) {
						if (this.popup == null) {
							this.popup = this.createPopup(this.closeBox);
							map.addPopup(this.popup);
							this.popup.show();
						} else {
							this.popup.toggle();
						}
						updateLocationHash();
						OpenLayers.Event.stop(evt);
					};
					marker.events.register("mousedown", feature, markerClick);
					marker.cdauthFeature = feature;
					markers.push(marker);
				}
				for(var i=markers.length-1; i>=0; i--)
				{
					if((markersvisible && typeof markersvisible[i] != "undefined" && markersvisible[i] != "0") || ((!markersvisible || typeof markersvisible[i] == "undefined") && i==0))
						markers[i].events.triggerEvent("mousedown");
					layerResults.addMarker(markers[i]);
				}

				if(zoomback)
					zoomback();
				else
				{
					if(markers.length == 0)
						alert("No results.");
					else if(markers.length == 1)
						map.setCenter(last_lonlat, zoom);
					else
						map.zoomToExtent(layerResults.getDataExtent());
				}
				return;
			}
		}
		alert("Search failed.");
	}, function() {
		search_input.disabled = search_button.disabled = false;
		alert("Search failed.");
	});
}

function htmlspecialchars(str)
{
	if(!str) return "";
	return str.replace("<", "&lt;").replace(">", "&gt;").replace("\"", "&quot;");
}

function addLonLatMarker(lonlat, title)
{
	var lonlat_readable = lonlat.clone().transform(map.getProjectionObject(), map.displayProjection);
	var this_icon = icon.clone();
	var marker = new OpenLayers.Marker(lonlat,this_icon);
	if(title)
		marker.cdauthTitle = title;
	layerMarkers.addMarker(marker);
	var framecloud = new OpenLayers.Popup.FramedCloud("lonlat", lonlat, null, (title ? "<h6 class=\"marker-heading\">"+htmlspecialchars(title)+"</div>" : "")+"<dl><dt>Longitude</dt><dd>"+Math.round(lonlat_readable.lon*100000000)/100000000+"</dd><dt>Latitude</dt><dd>"+Math.round(lonlat_readable.lat*100000000)/100000000+"</dd></dl><ul><li><a href=\"http://www.openstreetmap.org/?lat="+lonlat_readable.lat+"&amp;lon="+lonlat_readable.lon+"&amp;zoom="+map.getZoom()+"\">OpenStreetMap Permalink</a></li><li><a href=\"http://www.openstreetmap.org/?mlat="+lonlat_readable.lat+"&amp;mlon="+lonlat_readable.lon+"&amp;zoom="+map.getZoom()+"\">OpenStreetMap Marker</a></li><li><a href=\"http://maps.google.com/?q="+lonlat_readable.lat+","+lonlat_readable.lon+"\">Google Maps Marker</a></li><li><a href=\"http://maps.yahoo.com/broadband/#lat="+lonlat_readable.lat+"&amp;lon="+lonlat_readable.lon+"&amp;zoom="+map.getZoom()+"\">Yahoo Maps Permalink</a></li></ul>", this_icon, true, function(evt){if(title) delete marker.cdauthTitle; layerMarkers.removeMarker(marker); framecloud.destroy(); updateLocationHash(); OpenLayers.Event.stop(evt); });
	map.addPopup(framecloud);
}