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

// Make use of ajax-proxy (http://gitorious.org/ajax-proxy/ajax-proxy)
// Include http://api.facilmap.org/ajax-proxy/ajax-proxy.js to "disable" the Same Origin Policy.
FacilMap.Util.loadJavaScript("http://api.facilmap.org/ajax-proxy/ajax-proxy.js", function() { return window.AjaxProxyXMLHttpRequest != undefined; }, function() { OpenLayers.Request.XMLHttpRequest = AjaxProxyXMLHttpRequest; });