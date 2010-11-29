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
 * Shows a calculated route on the map. Add this layer to a map and set the different paramters using the set* functions. As soon as all
 * parameters are set, the route will be displayed. The parameters can be updated then and the route will be recalculated.

 * @event draggedRoute The route was changed using drag and drop.
*/
FacilMap.Layer.XML.Routing = OpenLayers.Class(FacilMap.Layer.XML, {
	HOVER_MAX_DISTANCE : 10,

	fromIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/route-start.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),
	toIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/route-stop.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),
	viaIcon : new OpenLayers.Icon('http://osm.cdauth.eu/map/yellow.png', new OpenLayers.Size(20,34), new OpenLayers.Pixel(-10, -34)),

	colour : "blue",

	provider : FacilMap.Routing.MapQuest, // is instantiated in the initialize() function

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
		FacilMap.Layer.XML.prototype.initialize.apply(this, [ name, undefined, options ]);

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
		FacilMap.Layer.XML.prototype.setMap.apply(this, arguments);

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
	 * @param FacilMap.Layer.XML.Routing.Medium medium The means of transportation to use for this route.
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
	 * @param FacilMap.Layer.XML.Routing.Type type The route calculation mechanism to use for this route.
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

		FacilMap.Layer.XML.prototype.requestSuccess.apply(this, arguments);

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
		FacilMap.Layer.XML.prototype.moveTo.apply(this, arguments);
		if(zoomChanged || !this.markersDrawn || !dragging)
		{
			for(var i=0, len=this.markers.length; i<len; i++)
				this.drawMarker(this.markers[i]);
            this.markersDrawn = true;
		}
	}
});