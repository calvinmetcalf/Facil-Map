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

var FacilMap = {
	olBackup : { },
	apiUrl : ".",
	$ : jQuery.noConflict(true)
};

(function(fm, ol, $){

	$("script").each(function(){
		var m = (""+$(this).attr("src")).match(/^(.*)\/facilmap(_.*)?\.js(\?|$)/i);
		if(m)
		{
			fm.apiUrl = m[1];
			return false;
		}
	});

	OpenLayers.ImgPath = fm.apiUrl+"/img/openlayers/";

	setTimeout(function(){
		// Execute after loading all the JavaScript files

		fm.Util.loadCSSFile(fm.apiUrl+"/css/jquery/jquery-ui-1.8.15.custom.css", true);
		fm.Util.loadCSSFile(fm.apiUrl+"/css/facilmap.css", true);
	}, 0);

})(FacilMap, OpenLayers, FacilMap.$);