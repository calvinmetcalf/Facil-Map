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
 * Extends a FramedCloud with various useful features. An event is triggered during closing instead of passing the callback function
 * to the initialize function. You may pass a DOM element for the popup content instead of HTML code.
 * This FramedCloud supports the OpenLayers.Popup.OPACITY setting. On mouse over, the opacity is set to 1.
 * @event close
*/

FacilMap.Popup.FramedCloud = OpenLayers.Class(OpenLayers.Popup.FramedCloud, {
	contentDom: null,
	autoSize: false,
	minSize: new OpenLayers.Size(300, 200),
	_defaultZIndex : null,
	initialize: function(id, lonlat, contentSize, contentDom, anchor, closeBox, closeBoxCallback) {
		var closeCallback = function(e){ if(closeBoxCallback) closeBoxCallback(); OpenLayers.Event.stop(e); this.events.triggerEvent("close"); };
		OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this, [ id, lonlat, contentSize, null, anchor, closeBox, closeCallback ] );

		this.events.addEventType("close");

		this.setContentHTML(contentDom);

		OpenLayers.Event.observe(this.div, "mouseover", OpenLayers.Function.bindAsEventListener(function(){ FacilMap.Util.changeOpacity(this.div, 1.0); }, this));
		OpenLayers.Event.observe(this.div, "mouseout", OpenLayers.Function.bindAsEventListener(function(){ FacilMap.Util.changeOpacity(this.div, this.opacity); }, this));
	},
	setContentHTML: function(contentDom) {
		if(typeof contentDom == "object")
		{
			this.contentDom = contentDom;
			this.contentHTML = null;
		}
		else if(contentDom != null)
		{
			this.contentDom = null;
			this.contentHTML = contentDom;
		}

		if(this.contentHTML != null)
			OpenLayers.Popup.FramedCloud.prototype.setContentHTML.apply(this, arguments);
		else if(this.contentDiv != null && this.contentDom != null && this.contentDom != this.contentDiv.firstChild)
		{
			while(this.contentDiv.firstChild)
				this.contentDiv.removeChild(this.contentDiv.firstChild);
			this.contentDiv.appendChild(this.contentDom);

			// Copied from OpenLayers.Popup.setContentHTML():
			if (this.autoSize)
			{
                this.registerImageListeners();
                this.updateSize();
            }
		}
	},
	setOpacity: function(opacity) {
		if(opacity != undefined)
			this.opacity = opacity;

		if(this.div != null)
		{
			OpenLayers.Util.modifyDOMElement(this.div, null, null, null, null, null, null, this.opacity);
			if(this._defaultZIndex)
				this.div.style.zIndex = this._defaultZIndex;
		}
	},
	unsetOpacity: function() {
		if(this.div != null)
		{
			this._defaultZIndex = this.div.style.zIndex;
			OpenLayers.Util.modifyDOMElement(this.div, null, null, null, null, null, null, 1.0);
			this.div.style.zIndex = 2000;
		}
	},
	destroy: function() {
		this.contentDom = null;
		OpenLayers.Popup.FramedCloud.prototype.destroy.apply(this, arguments);
	},
	CLASS_NAME : "FacilMap.Popup.FramedCloud"
});