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
 * A class to control the history state saved in the browser’s location bar.
 * @event stateChanged The history state has been changed by the user
*/
fm.HistoryStateHandler = ol.Class({
	/**
	 * The interval in milliseconds, how often location.hash shall be checked for changes.
	 * @var Number
	*/
	interval : 500,

	/**
	 * The return value of setInterval.
	*/
	intervalObject : null,

	/**
	 * The last value of location.hash that was set by this class. If it differs from location.hash, the user has changed it.
	 * @var {Object}
	*/
	lastHash : null,

	/**
	 * @var OpenLayers.Events
	*/
	events : null,

	eventHandler : null,
	started : false,

	initialize : function() {
		this.events = new ol.Events(this, null, [ "stateChanged" ]);

		if("onhashchange" in window)
			this.eventHandler = ol.Function.bindAsEventListener(this.checkHash, this);;
	},

	/**
	 * Starts the Interval that looks for changes.
	 * @return {void}
	*/
	start : function() {
		if(this.started)
			return;

		var obj = this;
		this.lastHash = this._getLocationHash();

		if(this.eventHandler)
			ol.Event.observe(window, "hashchange", this.eventHandler);
		else
			this.intervalObject = setInterval(function(){ obj.checkHash(); }, this.interval);

		this.started = true;
	},

	/**
	 * Stops the Interval that looks for changes.
	 * @return {void}
	*/
	stop : function() {
		if(!this.started)
			return;

		if(this.eventHandler)
			ol.Event.stopObserving(window, "hashchange", this.eventHandler);
		else
		{
			clearInterval(this.intervalObject);
			this.intervalObject = null;
		}

		this.started = false;
	},

	/**
	 * Checks if location.hash has changed and triggers an event then.
	 * @return {void}
	*/
	checkHash : function() {
		var oldHash = this.lastHash;
		this.lastHash = this._getLocationHash();
		if(this.lastHash != oldHash)
			this.events.triggerEvent("stateChanged");
	},

	/**
	 * Gets the current state.
	 * @return {Object}
	*/
	getState : function() {
		return fm.Util.decodeQueryString(this._getLocationHash())
	},

	/**
	 * Sets the new object as state. The stateChanged event will not be fired.
	 * @param state {Object} The new state object
	 * @return {void}
	*/

	setState : function(state) {
		this._setLocationHash(fm.Util.encodeQueryString(state));
	},

	/**
	 * @return {String}
	 */
	_getLocationHash : function() {
		// At least in Firefox, location.hash contains “&” if the hash part contains “%26”. This makes searching for URLs (such as OSM PermaLinks) hard and we work around that problem by extracting the desired value from location.href.
		var match = location.href.match(/#(.*)$/);
		if(match)
			return match[1];
		else
			return "";
	},

	/**
	 * @param hash {String}
	 */
	_setLocationHash : function(hash)
	{
		if(hash == this._getLocationHash())
			return;

		var restart = false;
		if(this.started)
		{
			this.stop();
			restart = true;
		}

		// Konqueror will reload the page when setting an empty location hash
		if(!hash && (""+navigator.vendor).indexOf("KDE") != -1)
			location.hash = "#.";
		else
			location.hash = hash ? "#"+hash : "";

		if(restart)
			this.start();
	},

	CLASS_NAME: "FacilMap.HistoryStateHandler"
});

})(FacilMap, OpenLayers, FacilMap.$);