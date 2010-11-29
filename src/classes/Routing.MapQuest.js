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
	attribution : OpenLayers.i18n("attribution-routing-mapquest"),

	getGPXURL : function() {
		if(this.from == null || this.to == null || this.medium == null || this.routingType == null)
			return null;

		var json = "{locations:[{latLng:{lat:" + this.from.lat + ",lng:" + this.from.lon +"}}";
		for(var i=0; i<this.via.length; i++)
			json += ",{latLng:{lat:" + this.via[i].lat + ",lng:" + this.via[i].lon + "}}";
		json += ",{latLng:{lat:" + this.to.lat + ",lng:" + this.to.lon + "}}]";

		json += ",options:{unit:k,generalize:0,narrativeType:none";

		if(this.medium == FacilMap.Routing.Medium.FOOT || this.medium == FacilMap.Routing.Medium.BICYCLE)
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
			if(this.medium == FacilMap.Routing.Medium.BICYCLE)
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

		if(this.medium == FacilMap.Routing.Medium.FOOT || this.medium == FacilMap.Routing.Medium.BICYCLE)
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