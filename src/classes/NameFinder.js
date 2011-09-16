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

(function(fm, ol, $){

/**
 * An abstract class whose implementations connect to a NameFinder.
*/
fm.NameFinder = ol.Class({
	initialize : function(options) {
		ol.Util.extend(this, options);

		this.makeSuggestions = $.proxy(this.makeSuggestions, this);
	},

	/**
	 * Perform a search through a NameFinder. This function itself does not connect to an actual NameFinder, it only finds one result if
	 * the query String consists of coordinates encoded in a Lat,Lon string or an OpenStreetMap Permalink.
	 * @param query {String} The query string.
	 * @param callbackFunction {Function} A function that is executed when the search has been performed. The function takes one argument that
	 *                                  contains an array with the results. It is undefined if an error has occurred. Each result is an object
	 *                                  with the following properties:
	 *                                  * OpenLayers.LonLat lonlat The coordinates of the result
	 *                                  * String name: The title of the result.
	 *                                  * String info: Some additional information about the result, such as the type.
	 *                                  * function getZoom(OpenLayers.Map): Returns the zoom level that the search result should be displayed at on the given map.
	 *                                  * Node osm: The associated OSM object or null.
	 * @return {void}
	*/
	find : function(query, callbackFunction) {
		query = query.replace(/^\s+/, "").replace(/\s+$/, "");

		var lonlat = this.isLonLatQuery(query);
		if(lonlat)
		{
			var results = [ {
				id : 0,
				lonlat : lonlat.lonlat,
				info : ol.i18n("Coordinates"),
				name : lonlat.lonlat.lat + ", " + lonlat.lonlat.lon,
				getZoom : function(map) {
					return lonlat.zoom;
				}
			} ];
			callbackFunction(results);
		}
		else
			callbackFunction([ ]);
	},

	/**
	 * Performs a search for POIs near the specified place.
	 * @param query {String}
	 * @param near {String}
	 * @param callbackFunction {Function}
	 */
	findNear : function(query, near, callbackFunction) {
		callbackFunction([ ]);
	},

	/**
	 * Performs multiple searches and calls a callbackFunction when all of them are done.
	 * @param queries {Array} An array of search queries
	 * @param callbackFunction {Function} Will receive an object as parameter, the keys being the queries
	 *                                    and the values being the return values of {@link #find}.
	 */
	findMultiple : function(queries, callbackFunction) {
		var todo = 0;
		var t = this;
		var ret = { };
		$.each(queries, function(i, it) {
			todo++;
			t.find(it, function(result) {
				ret[it] = result;
				if(--todo == 0)
					callbackFunction(ret);
			});
		});
	},

	/**
	 * Checks whether the given query string is a representation of coordinates, such as
	 * 48.123,5.123 or an OSM permalink.
	 * @param query {String}
	 * @return {Object} An object with the properties “lonlat” and “zoom” or null
	 */
	isLonLatQuery : function(query) {
		var query = query.replace(/^\s+/, "").replace(/\s+$/, "");
		var query_match;
		var query_urlPart;
		if(query_match = query.match(/^http:\/\/(www\.)?osm\.org\/go\/([-A-Za-z0-9_@]+)/))
		{ // Coordinates, shortlink
			return fm.Util.decodeShortLink(query_match[2]);
		}
		else if(query_match = query.match(/^(-?\s*\d+([.,]\d+)?)\s*[,;]?\s*(-?\s*\d+([.,]\d+)?)$/))
		{ // Coordinates
			return {
				lonlat : new ol.LonLat(query_match[3].replace(",", ".").replace(/\s+/, ""), query_match[1].replace(",", ".").replace(/\s+/, "")),
				zoom : 15
			};
		}
		else if((query_match = query.match(/^http:\/\/.*\?(.*)$/)) && typeof (query_urlPart = fm.Util.decodeQueryString(query_match[1])).lon != "undefined" && typeof query_urlPart.lat != "undefined")
		{ // OpenStreetMap Permalink
			return {
				lonlat : new ol.LonLat(query_urlPart.lon, query_urlPart.lat),
				zoom : (query_urlPart.zoom == undefined ? 15 : 1*query_urlPart.zoom)
			};
		}

		return null;
	},

	/**
	 * A function to use as suggestion function for {@link FacilMap.AutoSuggest}.
	 * @param query {String}
	 * @param callback {Function}
	 */
	makeSuggestions : function(query, callback) {
		this.find(query, function(results) {
			var ret = [ ];
			$.each(results, function(i, it) {
				ret.push({
					html : "<strong>"+fm.Util.htmlspecialchars(it.name)+"</strong> ("+fm.Util.htmlspecialchars(it.info)+")",
					value : it.name,
					result : it
				});
			});
			callback(ret);
		});
	},

	CLASS_NAME : "FacilMap.NameFinder"
});

})(FacilMap, OpenLayers, FacilMap.$);