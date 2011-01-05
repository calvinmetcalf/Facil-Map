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

FacilMap.Routing.YOURS = OpenLayers.Class(FacilMap.Routing, {
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

	getRouteLength : function() {
		var distanceEls = this.dom.getElementsByTagName("distance");
		if(distanceEls.length > 0)
			return 1*distanceEls[0].firstChild.data;
		else
			return null;
	}
});