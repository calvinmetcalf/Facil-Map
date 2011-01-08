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
 * Like {@link OpenLayers.Control.KeyboardDefaults} with varios fixes.
 *
 * Disables the keyboard control when the focus is on a form field that is controlled by the keyboard (such as an input field).
 * See bug http://trac.openlayers.org/ticket/1027
*/
FacilMap.Control.KeyboardDefaults = OpenLayers.Class(OpenLayers.Control.KeyboardDefaults, {
	/**
	 * If this is set to true, the keyboard control is only enabled when the mouse curser is on the map.
	 * @var Boolean
	 */
	onlyOnMouseOver : true,

	mouseover : false,

	setMap : function(map) {
		if(this.onlyOnMouseOver)
		{
			OpenLayers.Event.observe(map.viewPortDiv, "mouseover", OpenLayers.Function.bindAsEventListener(function(){ this.mouseover = true; }, this));
			OpenLayers.Event.observe(map.viewPortDiv, "mouseout", OpenLayers.Function.bindAsEventListener(function(){ this.mouseover = false; }, this));
		}

		return OpenLayers.Control.KeyboardDefaults.prototype.setMap.apply(this, arguments);
	},

	defaultKeyPress : function(evt) {
		if(this.onlyOnMouseOver && !this.mouseover)
			return;

		if(!evt.target)
			evt.target = evt.srcElement;
		if(evt.target && evt.target.nodeName && (evt.target.nodeName.toLowerCase() == "input" && evt.target.type.toLowerCase() != "checkbox" && evt.target.type.toLowerCase() != "button" && evt.target.type.toLowerCase() != "submit" && evt.target.type.toLowerCase() != "clear" || evt.target.tagName.toLowerCase() == "textarea" || evt.target.tagName.toLowerCase() == "select"))
			return true;
		if(evt.altKey || evt.ctrlKey)
			return true;
		OpenLayers.Control.KeyboardDefaults.prototype.defaultKeyPress.apply(this, [ evt ]);

		switch(evt.keyCode)
		{ // List copied from OpenLayers.Control.KeyboardDefaults
			case OpenLayers.Event.KEY_LEFT:
			case OpenLayers.Event.KEY_RIGHT:
			case OpenLayers.Event.KEY_UP:
			case OpenLayers.Event.KEY_DOWN:
			case 33: // Page Up. Same in all browsers.
			case 34: // Page Down. Same in all browsers.
			case 35: // End. Same in all browsers.
			case 36: // Home. Same in all browsers.
			case 43:  // +/= (ASCII), keypad + (ASCII, Opera)
			case 61:  // +/= (Mozilla, Opera, some ASCII)
			case 187: // +/= (IE)
			case 107: // keypad + (IE, Mozilla)
			case 45:  // -/_ (ASCII, Opera), keypad - (ASCII, Opera)
			case 109: // -/_ (Mozilla), keypad - (Mozilla, IE)
			case 189: // -/_ (IE)
			case 95:  // -/_ (some ASCII)
				OpenLayers.Event.stop(evt);
		}
	},
	CLASS_NAME : "FacilMap.Control.KeyboardDefaults"
});