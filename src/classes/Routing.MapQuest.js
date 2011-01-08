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

FacilMap.Routing.MapQuest = OpenLayers.Class(FacilMap.Routing, {
	routingURL : "http://open.mapquestapi.com/directions/v0/route",
	orderedURL : "http://open.mapquestapi.com/directions/v0/optimizedRoute",
	elevationChartURL : "http://open.mapquestapi.com/elevation/v1/getElevationChart",
	attribution : OpenLayers.i18n("attribution-routing-mapquest"),

	getGPXURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var json = "{locations:[{latLng:{lat:" + this.from.lat + ",lng:" + this.from.lon +"}}";
		for(var i=0; i<this.via.length; i++)
			json += ",{latLng:{lat:" + this.via[i].lat + ",lng:" + this.via[i].lon + "}}";
		json += ",{latLng:{lat:" + this.to.lat + ",lng:" + this.to.lon + "}}]";

		json += ",options:{unit:k,generalize:0,narrativeType:none";

		if(this.medium == FacilMap.Routing.Medium.FOOT)
			json += ",routeType:pedestrian";
		else if(this.medium == FacilMap.Routing.Medium.BICYCLE)
			json += ",routeType:" + this.medium;
		else
			json += ",routeType:" + this.routingType;

		json += "}}";

		return this.routingURL + "?inFormat=json&outFormat=xml&json=" + encodeURIComponent(json);
	},

	getRouteLength : function() {
		var els = this.dom.getElementsByTagName("route")[0].childNodes;
		for(var i=0; i<els.length; i++)
		{
			if(els[i].tagName == "distance")
				return els[i].firstChild.data;
		}
	},

	getRouteDuration : function() {
		var els = this.dom.getElementsByTagName("route")[0].childNodes;
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

		if(this.medium == FacilMap.Routing.Medium.FOOT || this.medium == FacilMap.Routing.Medium.BICYCLE)
			json += ",routeType:pedestrian";
		else if(this.medium == FacilMap.Routing.Medium.BICYCLE)
			json += ",routeType:" + this.medium;
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
	},

	getElevationProfileURL : function(size) {
		var minDist = 2 * this.getRouteLength() / size.w;

		var calcDist = function(lonlat1, lonlat2) {
			// Source: http://www.movable-type.co.uk/scripts/latlong.html
			var R = 6371; // km
			var dLat = (lonlat2.lat-lonlat1.lat) * Math.PI/180;
			var dLon = (lonlat2.lon-lonlat1.lon) * Math.PI/180;
			var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
					Math.cos(lonlat1.lat * Math.PI/180) * Math.cos(lonlat2.lat * Math.PI/180) *
					Math.sin(dLon/2) * Math.sin(dLon/2);
			var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			return R * c;
		};

		var points = this.dom.getElementsByTagName("shapePoints")[0].getElementsByTagName("latLng");
		var last = null;
		var latlons = [ ];
		var dist = 0;
		for(var i=0; i < points.length; i++)
		{
			var it = new OpenLayers.LonLat(points[i].getElementsByTagName("lng")[0].firstChild.data, points[i].getElementsByTagName("lat")[0].firstChild.data);

			if(last != null)
				dist += calcDist(last, it);
			last = it;

			if(i == 0 || i == points.length-1 || dist >= minDist)
			{
				latlons.push(it.lat);
				latlons.push(it.lon);
				dist = 0;
			}
		}

		var json = "{shapeFormat:'raw',unit:'k',width:'"+size.w+"',height:'"+size.h+"',latLngCollection:["+latlons.join(",")+"]}";

		return this.elevationChartURL + "?inFormat=json&json="+encodeURIComponent(json);
	},

	CLASS_NAME : "FacilMap.Routing.MapQuest"
});