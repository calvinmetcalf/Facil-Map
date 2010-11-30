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

FacilMap.Layer.Google = OpenLayers.Class(OpenLayers.Layer.Google, {
	initialize: function(name, options) {
		OpenLayers.Layer.Google.prototype.initialize.apply(this, [ name, OpenLayers.Util.extend({sphericalMercator: true}, options) ]);
	},
	CLASS_NAME : "FacilMap.Layer.Google"
});

/**
 * Set this to your Google Maps API key (http://code.google.com/apis/maps/signup.html) prior to adding the Google layers
 * to your map. In theory, this will asynchronously include the API JavaScript file as soon as the Google layers
 * are added to the map using {@link FacilMap.Map.addAllAvailableGoogleLayers()}. In practice, it is
 * currently impossible to do that because the Google Maps API relies on document.write(), so you have to leave this value null.
 * You still have to include the JavaScript file http://maps.google.com/maps?file=api&v=2&key=[Your key] manually,
 * but you can do that after adding the Google Layers, they will then be added as soon as the API is loaded.
 * @var String
*/
FacilMap.Layer.Google.API_KEY = null;

/**
 * Loads the Google Maps API with the API key set in {@link FacilMap.Layer.Google.API_KEY} and calls the given callback
 * function as soon as it’s loaded.
 * @param Function callback
 * @return void
*/
FacilMap.Layer.Google.loadAPI = function(callback) {
	var url = null;
	if(FacilMap.Layer.Google.API_KEY != null)
		url = "http://maps.google.com/maps?file=api&v=2&key="+encodeURIComponent(FacilMap.Layer.Google.API_KEY);
	FacilMap.Util.loadJavaScript(url, function() { return window.GMap2 != undefined; }, callback);
};