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

FacilMap.Routing.Cloudmade.Format = OpenLayers.Class(OpenLayers.Format.GPX, {
	read : function(doc) {
		if (typeof doc == "string") {
			doc = OpenLayers.Format.XML.prototype.read.apply(this, [doc]);
		}

		var points = doc.getElementsByTagName("wpt");
        var point_features = [];
        for (var i = 0, len = points.length; i < len; i++) {
            point_features.push(new OpenLayers.Geometry.Point(points[i].getAttribute("lon"), points[i].getAttribute("lat")));
        }
		features = [ new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString(point_features), null) ];

		if (this.internalProjection && this.externalProjection) {
			for (var g = 0, featLength = features.length; g < featLength; g++) {
				features[g].geometry.transform(this.externalProjection, this.internalProjection);
			}
		}

		return features;
	},

	CLASS_NAME : "FacilMap.Routing.Cloudmade.Format"
});