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

FacilMap.Layer.Yahoo = OpenLayers.Class(OpenLayers.Layer.Yahoo, {
	initialize: function(name, options) {
		OpenLayers.Layer.Yahoo.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
	},
	CLASS_NAME : "FacilMap.Layer.Yahoo"
});

/**
 * Set this to your Yahoo Maps App ID (which is any string you want) prior to adding the Yahoo layers
 * to your map. In theory, this will asynchronously include the API JavaScript file as soon as the Yahoo layers
 * are added to the map using {@link FacilMap.Map.addAllAvailableYahooLayers()}. In practice, it is
 * currently impossible to do that because the Yahoo Maps API relies on document.write(), so you have to leave this value null.
 * You still have to include the JavaScript file http://api.maps.yahoo.com/ajaxymap?v=3.0&appid=[Your App ID] manually,
 * but you can do that after adding the Yahoo Layers, they will then be added as soon as the API is loaded.
 * @var String
*/
FacilMap.Layer.Yahoo.APPID = null;

/**
 * Loads the Yahoo Maps API with the App ID set in {@link FacilMap.Layer.Yahoo.APPID} and calls the given callback
 * function as soon as it’s loaded.
 * @param Function callback
 * @return void
*/
FacilMap.Layer.Yahoo.loadAPI = function(callback) {
	var url = null;
	if(FacilMap.Layer.Yahoo.APPID != null)
		url = "http://api.maps.yahoo.com/ajaxymap?v=3.0&appid="+encodeURIComponent(FacilMap.Layer.Yahoo.APPID);
	FacilMap.Util.loadJavaScript(url, function() { return window.YMap != undefined; }, callback);
};