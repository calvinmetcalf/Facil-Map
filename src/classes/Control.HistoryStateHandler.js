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
 * An instance of this class keeps the location hash part in sync with the Permalink of a map object.
 * @event hashChanged location.hash was changed.
*/
fm.Control.HistoryStateHandler = ol.Class(ol.Control, {
	/**
	 * @var FacilMap.HistoryStateHandler
	*/
	stateHandler : null,

	/**
	 * The minimum number of milliseconds that the map view has to stay the same for the history state to be updated. This way it is not
	 * updated while scrolling the map.
	 * @var Number
	*/
	minRest : 750,

	newStateTimeout : null,

	initialize : function() {
		ol.Control.prototype.initialize.apply(this, arguments);

		this.events.addEventType("stateChanged");

		this.stateHandler = new fm.HistoryStateHandler();
		this.stateHandler.events.register("stateChanged", this, this.updateMapView);
	},

	/**
	 * Initialises an interval that checks for changes in location.hash automatically.
	*/
	activate : function() {
		if(!ol.Control.prototype.activate.apply(this, arguments))
			return false;

		if(!this.map)
		{
			this.deactivate();
			return false;
		}

		this.map.events.register("newState", this, this.onNewState);
		this.stateHandler.start();

		if(this.stateHandler.getState()[this.map.uniqueId] || this.map.getCenter() == null)
			this.updateMapView();
		else
			this.updateHistoryState();

		return true;
	},

	deactivate : function() {
		if(!ol.Control.prototype.deactivate.apply(this, arguments))
			return false;

		this.stateHandler.stop();
		this.map.events.unregister("newState", this, this.onNewState);

		return true;
	},

	onNewState : function() {
		if(this.newStateTimeout)
		{
			clearTimeout(this.newStateTimeout);
			this.newStateTimeout = null;
		}

		var control = this;
		this.newStateTimeout = setTimeout(function(){
			control.newStateTimeout = null;
			control.updateHistoryState();
		}, this.minRest);
	},

	/**
	 * Updates location.hash to the current map view.
	*/
	updateHistoryState : function() {
		var state = this.map.getStateObject();
		if(fm.Util.encodeQueryString(state) == fm.Util.encodeQueryString(this.map.getDefaultStateObject()))
			state = null;

		var obj = this.stateHandler.getState();
		obj[this.map.uniqueId] = state;

		this.stateHandler.setState(obj);
		this.events.triggerEvent("stateChanged");
	},

	/**
	 * Updates the map view to show the content of location.hash.
	*/
	updateMapView : function() {
		this.map.setStateObject(this.stateHandler.getState()[this.map.uniqueId]);
		this.updateHistoryState();
	},

	CLASS_NAME : "FacilMap.Control.HistoryStateHandler"
});

})(FacilMap, OpenLayers, FacilMap.$);