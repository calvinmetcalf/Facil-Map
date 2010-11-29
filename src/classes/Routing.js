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

FacilMap.Routing = OpenLayers.Class({
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
	 * @var FacilMap.Routing.Medium
	*/
	medium : null,
	/**
	 * The routing type, either fastest or shortest.
	 * @var FacilMap.Routing.Type
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
FacilMap.Routing.Medium = {
	CAR : "car",
	BICYCLE : "bicycle",
	FOOT : "foot"
};

/**
 * Route calculation mechanisms.
*/
FacilMap.Routing.Type = {
	FASTEST : "fastest",
	SHORTEST : "shortest"
};