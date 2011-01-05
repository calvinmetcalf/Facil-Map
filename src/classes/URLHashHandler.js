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
 * A class to control the URL hash part.
 * @event hashChanged The URL hash has been changed by the user
*/
FacilMap.URLHashHandler = OpenLayers.Class({
	/**
	 * The interval in milliseconds, how often location.hash shall be checked for changes.
	 * @var Number
	*/
	interval : 500,

	/**
	 * Is set to true on the map event newHash. Makes update() update the location hash.
	 * @var boolean
	*/
	hashChanged : false,

	/**
	 * The return value of setInterval.
	*/
	intervalObject : null,

	/**
	 * The last value of location.hash that was set by this class. If it differs from location.hash, the user has changed it.
	 * @var String
	*/
	lastHash : null,

	/**
	 * @var OpenLayers.Events
	*/
	events : null,

	initialize : function() {
		this.events = new OpenLayers.Events(this, null, [ "hashChanged" ]);
	},

	/**
	 * Starts the Interval that looks for changes.
	 * @return void
	*/
	start : function() {
		var obj = this;
		this.lastHash = this.getLocationHash();
		if(this.intervalObject == null)
			this.intervalObject = setInterval(function(){ obj.checkHash(); }, this.interval);
	},

	/**
	 * Stops the Interval that looks for changes.
	 * @return void
	*/
	stop : function() {
		if(this.intervalObject == null)
			return;
		clearInterval(this.intervalObject);
		this.intervalObject = null;
	},

	/**
	 * Checks if location.hash has changed and triggers an event then.
	 * @return void
	*/
	checkHash : function() {
		var oldHash = this.lastHash;
		this.lastHash = this.getLocationHash();
		if(this.lastHash != oldHash)
			this.events.triggerEvent("hashChanged", { oldHash: oldHash, newHash: this.lastHash });
	},

	/**
	 * Gets the part after the # in the URL.
	 * @return String
	*/
	getLocationHash : function() {
		// At least in Firefox, location.hash contains “&” if the hash part contains “%26”. This makes searching for URLs (such as OSM PermaLinks) hard and we work around that problem by extracting the desired value from location.href.
		var match = location.href.match(/#(.*)$/);
		if(match)
			return match[1];
		else
			return "";
	},

	/**
	 * Sets the location has to the given hash.
	 * @param String hash The hash part without #
	 * @return void
	*/
	setLocationHash : function(hash)
	{
		var restart = false;
		if(this.intervalObject)
		{
			this.stop();
			restart = true;
		}

		// Konqueror will reload the page when setting an empty location hash
		if(!hash && navigator.vendor.indexOf("KDE") != -1)
			location.hash = "#.";
		else
			location.hash = hash ? "#"+hash : "";

		if(restart)
			this.start();
	},

	CLASS_NAME: "FacilMap.URLHashHandler"
});