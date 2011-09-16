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

		var t = this;

		fm.NameFinder.prototype.find.apply(this, [ query, function(results) {
			if(results != undefined && results.length > 0)
				callbackFunction(results);
			else
			{ // NameFinder
				ol.Request.GET({
					url : t.nameFinderURL,
					params : { "q": query, "format" : "xml", "polygon" : "0", "addressdetails" : "1", "limit" : t.limit },
					success : function(request) {
						var results = [ ];
						$("searchresults > place", request.responseXML).each(function(){
							var place = $(this);

							var box = place.attr("boundingbox").split(",");
							var path = [ ];
							$("> *", place).not("country_code,boundary").each(function(){
								var part = $(this).text();
								if(part)
									path.unshift(part);
							});

							results.push({
								id : place.attr("place_id"),
								lonlat : new ol.LonLat(place.attr("lon"), place.attr("lat")),
								path : path,
								info : place.attr("class"),
								icon : place.attr("icon"),
								//name : place.attr("display_name"),
								getZoom : function(map) {
									return map.getZoomForExtent(fm.Util.toMapProjection(new ol.Bounds(box[2], box[1], box[3], box[0]), map));
								},
								osm : null,
								rank : 1*place.attr("place_rank")
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

						t.normaliseResultNames(results);

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
		var lonlat = this.isLonLatQuery(near);
		if(lonlat)
			near = "["+lonlat.lonlat.lat+","+lonlat.lonlat.lon+"]";
		this.find(query+" near "+near, callback);
	},

	normaliseResultNames : function(results) {
		var obj = { };

		var getObjForPath = function(path, cur) {
			cur = (cur || obj);
			path = [ ].concat(path);
			var p = path.shift();
			if(!cur[p])
				cur[p] = { };
			return (path.length == 0 ? cur[p] : getObjForPath(path, cur[p]));
		};

		$.each(results, function(i, it) {
			getObjForPath(it.path);
		});

		$.each(results, function(i, it) {
			var pathPart = [ ];
			var toIndex = 1;
			$.each(it.path, function(i2, it2) {
				pathPart.push(it2);
				if(fm.Util.getIndexes(getObjForPath(pathPart)).length > 1)
					toIndex = i2+2;
			});
			var pathPart = it.path.slice(0, toIndex);

			if(pathPart.length != it.path.length)
				pathPart.push(it.path[it.path.length-1]);
			it.name = pathPart.reverse().join(", ");
		});
	},

	CLASS_NAME : "FacilMap.NameFinder.Nominatim"
});

})(FacilMap, OpenLayers, FacilMap.$);