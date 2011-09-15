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
	fm.Control.Loading = ol.Class(fm.Control, {
		_loadingInstances : 0,
		_interval : null,

		draw : function(px) {
			var ret = fm.Control.prototype.draw.apply(this, arguments);

			$(this.div).append("<p>"+ol.i18n("Loading")+"</p>");
			this._update();

			return ret;
		},

		loadStart : function() {
			this._loadingInstances++;
			this._update();
		},

		loadEnd : function() {
			this._loadingInstances--;
			this._update();
		},

		_update : function() {
			var visible = (this._loadingInstances > 0);
			$(this.div).css("display", visible ? "block" : "none");

			if(visible && this._interval == null)
			{
				var text = ol.i18n("Loading");
				var el = $("> p", this.div);
				this._interval = setInterval(function(){
					switch(el.html()) {
						case text: el.html("."+text+"."); break;
						case "."+text+".": el.html(".."+text+".."); break;
						case ".."+text+"..": el.html("..."+text+"..."); break;
						default: el.html(text); break;
					}
				}, 1000);
			}
			else if(!visible && this._interval != null)
			{
				clearInterval(this._interval);
				this._interval = null;
			}
		},

		CLASS_NAME : "FacilMap.Control.Loading"
	});
})(FacilMap, OpenLayers, FacilMap.$);