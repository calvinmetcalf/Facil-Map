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

/**
 * An instance of this class keeps the location hash part in sync with the Permalink of a map object.
 * @event hashChanged location.hash was changed.
*/
FacilMap.Control.URLHashHandler = OpenLayers.Class(OpenLayers.Control, {
	/**
	 * @var FacilMap.URLHashHandler
	*/
	hashHandler : null,

	/**
	 * The minimum number of milliseconds that the map view has to stay the same for the location hash to be updated. This way it is not
	 * updated while scrolling the map.
	 * @var Number
	*/
	minRest : 750,

	locationUpdateTimeout : null,

	initialize : function() {
		OpenLayers.Control.prototype.initialize.apply(this, arguments);

		this.events.addEventType("hashChanged");

		this.hashHandler = new FacilMap.URLHashHandler();
		this.hashHandler.events.register("hashChanged", this, this.updateMapView);
	},

	/**
	 * Initialises an interval that checks for changes in location.hash automatically.
	*/
	activate : function() {
		if(!OpenLayers.Control.prototype.activate.apply(this, arguments))
			return false;

		if(!this.map)
		{
			this.deactivate();
			return false;
		}

		this.map.events.register("newHash", this, this.newHashHandler);
		this.hashHandler.start();

		if(this.hashHandler.getLocationHash() != "")
			this.updateMapView();
		else
			this.updateLocationHash();

		return true;
	},

	deactivate : function() {
		if(!OpenLayers.Control.prototype.deactivate.apply(this, arguments))
			return false;

		this.hashHandler.stop();
		map.events.unregister("newHash", this, this.newHashHandler);

		return true;
	},

	newHashHandler : function() {
		if(this.locationUpdateTimeout)
		{
			clearTimeout(this.locationUpdateTimeout);
			this.locationUpdateTimeout = null;
		}

		var control = this;
		this.locationUpdateTimeout = setTimeout(function(){
			control.locationUpdateTimeout = null;
			control.updateLocationHash();
		}, this.minRest);
	},

	/**
	 * Updates location.hash to the current map view.
	*/
	updateLocationHash : function() {
		var queryObject = this.map.getQueryObject();
		if(!queryObject)
			return false;
		this.hashHandler.setLocationHash(FacilMap.Util.encodeQueryString(queryObject));
		this.events.triggerEvent("hashChanged");
		return true;
	},

	/**
	 * Updates the map view to show the content of location.hash.
	*/
	updateMapView : function() {
		var query_object = FacilMap.Util.decodeQueryString(this.hashHandler.getLocationHash());
		this.map.zoomToQuery(query_object);
		this.updateLocationHash();
	},

	CLASS_NAME : "FacilMap.Control.URLHashHandler"
});