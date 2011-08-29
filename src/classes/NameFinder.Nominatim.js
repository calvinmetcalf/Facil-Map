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
 * An implementation of the NameFinder that contacts Nominatim (http://wiki.openstreetmap.org/wiki/Nominatim).
*/
fm.NameFinder.Nominatim = ol.Class(fm.NameFinder, {
	nameFinderURL : "http://open.mapquestapi.com/nominatim/v1/search",
	limit : 25,

	find : function(query, callbackFunction) {
		query.replace(/^\s+/, "").replace(/\s+$/, "");

		var nameFinder = this;

		fm.NameFinder.prototype.find.apply(this, [ query, function(results) {
			if(results != undefined && results.length > 0)
				callbackFunction(results);
			else
			{ // NameFinder
				ol.Request.GET({
					url : nameFinder.nameFinderURL,
					params : { "q": query, "format" : "xml", "polygon" : "0", "addressdetails" : "0", limit: this.limit },
					success : function(request) {
						var results = [ ];
						$("place", request.responseXML).each(function(){
							var it = $(this);
							var box = it.attr("boundingbox").split(",");
							results.push({
								lonlat : new ol.LonLat(it.attr("lon"), it.attr("lat")),
								name : it.attr("display_name"),
								info : it.attr("class"),
								icon : it.attr("icon"),
								getZoom : function(map) {
									return map.getZoomForExtent(fm.Util.toMapProjection(new ol.Bounds(box[2], box[1], box[3], box[0])));
								},
								osm : null,
								rank : 1*it.attr("place_rank")
							});
						});

						for(var i=0; i<results.length; i++)
						{
							for(var j=i; j > 0 && results[j-1].rank > results[j].rank; j--)
							{
								var tmp = results[j];
								results[j] = results[j-1];
								results[j-1] = tmp;
							}
						}

						callbackFunction(results);
					},
					failure : function() {
						callbackFunction();
					}
				});
			}
		} ]);
	},

	findNear : function(query, near, callback) {
		// TODO: What if near contains coordinates?
		this.find(query+" near "+near, callback);
	},

	CLASS_NAME : "FacilMap.NameFinder.Nominatim"
});

})(FacilMap, OpenLayers, FacilMap.$);