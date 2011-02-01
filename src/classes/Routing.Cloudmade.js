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

FacilMap.Routing.Cloudmade = OpenLayers.Class(FacilMap.Routing, {
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

	getRouteLength : function() {
		var extensions = this.dom.getElementsByTagName("extensions");
		if(extensions.length > 0)
		{
			var distance = extensions[0].getElementsByTagName("distance");
			if(distance.length > 0)
				return distance[0].firstChild.data/1000;
		}
		return null;
	},

	getRouteDuration : function() {
		var extensions = this.dom.getElementsByTagName("extensions");
		if(extensions.length > 0)
		{
			var duration = extensions[0].getElementsByTagName("time");
			if(duration.length > 0)
				return duration[0].firstChild.data/3600;
		}
		return null;
	},

	CLASS_NAME : "FacilMap.Routing.Cloudmade"
});