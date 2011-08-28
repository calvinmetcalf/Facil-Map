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

	/**
	 * @param nameFinderURL {String} http://nominatim.openstreetmap.org/search. To work around the same origin policy, pass a wrapper that lives on your webspace.
	*/
	initialize : function(nameFinderURL) {
		fm.NameFinder.prototype.initialize.apply(this, [ ]);
		if(nameFinderURL)
			this.nameFinderURL = nameFinderURL;
	},

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
					params : { "q": query, "format" : "xml", "polygon" : "0", "addressdetails" : "0" },
					success : function(request) {
						var results = [ ];
						if(request.responseXML)
						{
							var searchresults = request.responseXML.getElementsByTagName("searchresults");

							if(searchresults.length > 0)
							{
								if(searchresults[0].getAttribute("findplace") == null || searchresults[0].getAttribute("findplace") == "" || searchresults[0].getAttribute("foundnearplace") == "yes")
								{
									var named = searchresults[0].childNodes;
									for(var i=0; i<named.length; i++)
									{
										if(named[i].nodeType != 1) continue;

										var box = named[i].getAttribute("boundingbox").split(",");
										(function(box) {
											results.push({
												lonlat : new ol.LonLat(named[i].getAttribute("lon"), named[i].getAttribute("lat")),
												name : named[i].getAttribute("display_name"),
												info : named[i].getAttribute("class"),
												icon : named[i].getAttribute("icon"),
												getZoom : function(map) {
													return map.getZoomForExtent(box.clone().transform(new ol.Projection("EPSG:4326"), map.getProjectionObject()));
												},
												osm : null
											});
										})(new ol.Bounds(box[2], box[1], box[3], box[0]));
									}
								}
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