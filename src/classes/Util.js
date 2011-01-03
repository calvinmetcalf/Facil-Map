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

FacilMap.Util = {
	/**
	 * decodeURIComponent() throws an exception if the string contains invalid constructions (such as a % sign not followed by a 2-digits hexadecimal number). This function returns the original string in case of an error.
	 * @param String str
	 * @return String
	*/
	decodeURIComponentTolerantly: function(str) {
		try
		{
			return decodeURIComponent(str);
		}
		catch(e)
		{
			return str;
		}
	},

	/**
	 * Decodes a URL query string (the part after the ?).
	 * @param String str
	 * @return Object
	*/
	decodeQueryString: function(str) {
		var obj = { };
		var str_split = str.split(/[;&]/);
		for(var i=0; i<str_split.length; i++)
		{
			var equal_sign = str_split[i].indexOf("=");
			if(equal_sign < 1) continue;

			var key = str_split[i].substr(0, equal_sign);
			var arr_match = key.match(/(\[[^\]]*\]|\.[^.]+)+$/);
			if(arr_match)
			{
				var arr_indexes = arr_match[0].replace(/^[.\[]/, "").replace(/\]$/, "").split(/\]\[|\./);
				arr_indexes.unshift(key.substr(0, key.length-arr_match[0].length));
				var cur_el = obj;
				for(var j=0; j<arr_indexes.length; j++)
				{
					var cur_key = FacilMap.Util.decodeURIComponentTolerantly(arr_indexes[j]);
					if(cur_key.length == 0)
					{
						cur_key = 0;
						while(typeof cur_el[cur_key] != "undefined")
							cur_key++;
					}
					if(j == arr_indexes.length-1)
						cur_el[cur_key] = FacilMap.Util.decodeURIComponentTolerantly(str_split[i].substr(equal_sign+1));
					else
					{
						if(!cur_el[cur_key] || typeof cur_el[cur_key] != "object")
							cur_el[cur_key] = { };
						cur_el = cur_el[cur_key];
					}
				}
			}
			else
				obj[FacilMap.Util.decodeURIComponentTolerantly(key)] = FacilMap.Util.decodeURIComponentTolerantly(str_split[i].substr(equal_sign+1));
		}
		return obj;
	},

	/**
	 * Encodes an Object to a URL query string.
	 * @param Object obj
	*/
	encodeQueryString: function(obj, prefix, arr) {
		if(obj == null)
			return "";

		if(!prefix)
			arr = [ ];
		for(var i in obj)
		{
			var key = encodeURIComponent(i);
			if(prefix)
				key = prefix+"."+key;
			switch(typeof obj[i])
			{
				case "object":
					FacilMap.Util.encodeQueryString(obj[i], key, arr);
					break;
				case "boolean":
					arr.push(key+"="+(obj[i] ? "1" : "0"));
					break;
				case "undefined":
					break;
				default:
					arr.push(key+"="+encodeURIComponent(obj[i]));
			}
		}
		return arr.join(";");
	},

	/**
	 * Replaces <, > and " in the string with their HTML entities.
	*/
	htmlspecialchars: function(str) {
		if(!str) return "";
		return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
	},

	/**
	 * Returns HTML code with Permalinks to various Map services at the specified position with the specified zoom level.
	 * @param OpenLayers.LonLat lonlat
	 * @param Number zoom
	 * @param DOMElement osm An XML OpenStreetMap object to show the tags of.
	 * @return DOMElement
	*/
	makePermalinks: function(lonlat, zoom, osm) {
		var div = document.createElement("div");

		// Latitude and Longitude

		var dl = document.createElement("dl");
		var el;
		el = document.createElement("dt");
		el.appendChild(document.createTextNode(OpenLayers.i18n("Latitude")));
		dl.appendChild(el);
		el = document.createElement("dd");
		el.appendChild(document.createTextNode(Math.round(lonlat.lat*100000000)/100000000));
		dl.appendChild(el);
		el = document.createElement("dt");
		el.appendChild(document.createTextNode(OpenLayers.i18n("Longitude")));
		dl.appendChild(el);
		el = document.createElement("dd");
		el.appendChild(document.createTextNode(Math.round(lonlat.lon*100000000)/100000000));
		dl.appendChild(el);
		div.appendChild(dl);

		// Links to other maps

		var fieldset = document.createElement("fieldset");
		fieldset.className = "content-hidden";
		var legend = document.createElement("legend");
		var legendLink = document.createElement("a");
		legendLink.href = "javascript:";
		legendLink.onclick = function() { fieldset.className = (fieldset.className == "content-hidden" ? "content-visible" : "content-hidden"); };
		legendLink.appendChild(document.createTextNode(OpenLayers.i18n("Links to other maps")));
		legend.appendChild(legendLink);
		fieldset.appendChild(legend);

		var makeEntry = function(href, text)
		{
			var li = document.createElement("li");
			var link = document.createElement("a");
			link.href = href;
			link.appendChild(document.createTextNode(OpenLayers.i18n(text)));
			li.appendChild(link);
			return li;
		};

		var ul = document.createElement("ul");
		ul.className = "fieldset-content";
		ul.appendChild(makeEntry("http://www.openstreetmap.org/?mlat="+lonlat.lat+"&mlon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Permalink"));
		ul.appendChild(makeEntry("http://osm.org/go/"+FacilMap.Util.encodeShortLink(lonlat, zoom)+"?m", "OpenStreetMap Shortlink"));
		ul.appendChild(makeEntry("http://maps.google.com/?q="+lonlat.lat+","+lonlat.lon, "Google Maps Permalink"));
		ul.appendChild(makeEntry("http://maps.yahoo.com/broadband/#lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "Yahoo Maps Permalink"));
		ul.appendChild(makeEntry("http://osmtools.de/osmlinks/?lat="+lonlat.lat+"&lon="+lonlat.lon+"&zoom="+zoom, "OpenStreetMap Links"));
		ul.appendChild(makeEntry("http://stable.toolserver.org/geohack/geohack.php?params="+lonlat.lat+"_N_"+lonlat.lon+"_E", "Wikimedia GeoHack"));
		fieldset.appendChild(ul);

		div.appendChild(fieldset);

		// OSM tags

		if(osm != undefined)
		{
			var tagFieldset = document.createElement("fieldset");
			tagFieldset.className = "content-visible";
			var tagLegend = document.createElement("legend");
			var tagLegendLink = document.createElement("a");
			tagLegendLink.href = "javascript:";
			tagLegendLink.onclick = function() { tagFieldset.className = (tagFieldset.className == "content-hidden" ? "content-visible" : "content-hidden"); };
			tagLegendLink.appendChild(document.createTextNode(OpenLayers.i18n("Tags")));
			tagLegend.appendChild(tagLegendLink);
			tagFieldset.appendChild(tagLegend);

			var tagDl = document.createElement("dl");
			tagDl.className = "fieldset-content";
			var tags = osm.getElementsByTagName("tag");
			for(var i=0; i<tags.length; i++)
			{
				var tagDt = document.createElement("dt");
				tagDt.appendChild(document.createTextNode(tags[i].getAttribute("k")));
				var tagDd = document.createElement("dd");
				tagDd.appendChild(FacilMap.Util.formatTagValue(tags[i].getAttribute("v"), tags[i].getAttribute("k")));
				tagDl.appendChild(tagDt);
				tagDl.appendChild(tagDd);
			}

			tagFieldset.appendChild(tagDl);
			div.appendChild(tagFieldset);
		}

		return div;
	},

	/**
	 * Inserts the DOM node “node” after the node “after”.
	*/
	domInsertAfter: function(node, after) {
		if(after.nextSibling)
			after.parentNode.insertBefore(node, after.nextSibling);
		else
			after.parentNode.appendChild(node);
	},

	shortLinkCharArray: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_@",

	/**
	 * Creates the relevant string of an OSM Shortlink. Copied from http://www.openstreetmap.org/javascripts/site.js, function makeShortCode().
	 * @param OpenLayers.LonLat lonlat Coordinates in WGS-84
	 * @param Number zoom
	 * @return String
	*/
	encodeShortLink: function(lonlat, zoom) {
		var x = Math.round((1*lonlat.lon + 180.0) * ((1 << 30) / 90.0));
		var y = Math.round((1*lonlat.lat +  90.0) * ((1 << 30) / 45.0));
		// hack around the fact that JS apparently only allows 53-bit integers?!?
		// note that, although this reduces the accuracy of the process, it's fine for
		// z18 so we don't need to care for now.
		var c1 = 0, c2 = 0;
		for (var i = 31; i > 16; --i)
		{
			c1 = (c1 << 1) | ((x >> i) & 1);
			c1 = (c1 << 1) | ((y >> i) & 1);
		}
		for (var i = 16; i > 1; --i)
		{
			c2 = (c2 << 1) | ((x >> i) & 1);
			c2 = (c2 << 1) | ((y >> i) & 1);
		}

		var str = "";
		for (var i = 0; i < Math.ceil((zoom + 8) / 3.0) && i < 5; ++i)
		{
			digit = (c1 >> (24 - 6 * i)) & 0x3f;
			str += FacilMap.Util.shortLinkCharArray.charAt(digit);
		}
		for (var i = 5; i < Math.ceil((zoom + 8) / 3.0); ++i)
		{
			digit = (c2 >> (24 - 6 * (i - 5))) & 0x3f;
			str += FacilMap.Util.shortLinkCharArray.charAt(digit);
		}
		for (var i = 0; i < ((zoom + 8) % 3); ++i)
		{
			str += "-";
		}
		return str;
	},

	/**
	 * Decodes a string from FacilMap.Util.encodeShortLink().
	 * @param String encoded
	 * @return Object (lonlat: OpenLayers.LonLat, zoom: Number)
	*/
	decodeShortLink: function(encoded) {
		var lon,lat,zoom;

		var m = encoded.match(/^([A-Za-z0-9_@]+)/);
		if(!m) return false;
		zoom = m[1].length*2+encoded.length-11;

		var c1 = 0;
		var c2 = 0;
		for(var i=0,j=54; i<m[1].length; i++,j-=6)
		{
			var bits = FacilMap.Util.shortLinkCharArray.indexOf(m[1].charAt(i));
			if(j <= 30)
				c1 |= bits >>> (30-j);
			else if(j > 30)
				c1 |= bits << (j-30);
			if(j < 30)
				c2 |= (bits & (0x3fffffff >>> j)) << j;
		}

		var x = 0;
		var y = 0;

		for(var j=29; j>0;)
		{
			x = (x << 1) | ((c1 >> j--) & 1);
			y = (y << 1) | ((c1 >> j--) & 1);
		}
		for(var j=29; j>0;)
		{
			x = (x << 1) | ((c2 >> j--) & 1);
			y = (y << 1) | ((c2 >> j--) & 1);
		}

		x *= 4; // We can’t do <<= 2 here as x and y may be greater than 2³¹ and then the value would become negative
		y *= 4;

		lon = x*90.0/(1<<30)-180.0;
		lat = y*45.0/(1<<30)-90.0;

		return {
			lonlat : new OpenLayers.LonLat(lon, lat),
			zoom : zoom
		};
	},

	/**
	 * Makes a usable class name out of an OpenLayers.Class object. Adds all parent classes to the class name, too.
	 * The class name for an FacilMap.Map object would be "fmMap olMap" for example.
	 * The class name is determined by the CLASS_NAME property.
	 * @param Object olObject Either a class returned by OpenLayers.Class() or an instance of such a class.
	 * @return String
	*/
	makeClassName: function(olObject) {
		var array = arguments[1];
		if(array == undefined)
			array = { };

		if(olObject != undefined)
		{
			var olClass = (olObject.prototype != undefined ? olObject.prototype : olObject);
			if(olClass.CLASS_NAME != undefined)
				array[olClass.CLASS_NAME.replace("OpenLayers.", "ol").replace("FacilMap.", "fm").replace(/\./g, "")] = true;
			if(olClass.fmParentClasses != undefined)
			{
				for(var i=0; i<olClass.fmParentClasses.length; i++)
					FacilMap.Util.makeClassName(olClass.fmParentClasses[i], array);
			}
		}

		if(arguments[1] == undefined)
		{
			var ret = "";
			for(var it in array)
			{
				if(ret != "")
					ret += " ";
				ret += it;
			}
			return ret;
		}
	},

	/**
	 * Changes the opacity of the given element to a new value, slowly fading there.
	 * @param Element el The DOM element to change the opacity for
	 * @param Number opacity The new opacity (1.0 for not transparent, 0.0 for invisible).
	 * @param Number ms The time span for the fading in milliseconds (defaults to 750).
	 * @return void
	*/
	changeOpacity: function(el, opacity, ms) {
		var changeOpacity = FacilMap.Util.changeOpacity;

		if(changeOpacity.timeouts == undefined)
			changeOpacity.timeouts = { };

		var timeoutObj = null;
		for(var i in changeOpacity.timeouts)
		{
			if(changeOpacity.timeouts[i] != undefined && changeOpacity.timeouts[i].el === el)
			{
				timeoutObj = i;
				break;
			}
		}
		if(timeoutObj == null)
		{
			var i=0;
			while(changeOpacity.timeouts[i] != undefined)
				i++;
			timeoutObj = i;
			changeOpacity.timeouts[timeoutObj] = { el : el, timeout : null }
		}
		else if(changeOpacity.timeouts[timeoutObj].timeout != null)
			clearTimeout(changeOpacity.timeouts[timeoutObj].timeout);

		if(ms == undefined)
			ms = 750;
		var initTime = new Date().getTime();
		var initOpacity = 1 * (el.style.opacity == undefined || el.style.opacity == "" ? 1 : 1*el.style.opacity);
		var callback = function() {
			var period = new Date().getTime()-initTime;
			if(period > ms)
				period = ms;
			var newOpacity = initOpacity+(period/ms)*(opacity-initOpacity);
			OpenLayers.Util.modifyDOMElement(el, null, null, null, null, null, null, newOpacity);

			if(period < ms)
				changeOpacity.timeouts[timeoutObj].timeout = setTimeout(callback, 100);
			else
				changeOpacity.timeouts[timeoutObj] = undefined;
		};
		callback();
	},

	/**
	 * Loads a JavaScript file and then calls a callback function. Another callback function has to be provided that
	 * checks if the JavaScript file has been loaded (for example by checking whether a variable set there exists)
	 * and returns true in that case. In case a JavaScript file with the same URL has already been loaded, the
	 * success callback function will be called immediately without loading the JavaScript file for a second time.
	 * If the loadCheck function is ommitted, the success function will not be called.
	 * @var String url The URL of the JavaScript file. If null, no URL will be loaded but the success function will still be called.
	 * @var Function loadCheck A function that returns true if the JavaScript file has been loaded or null.
	 * @var Function success A function that will be called once the loadCheck function returns true for the first time.
	*/
	loadJavaScript: function(url, loadCheck, success) {
		var load = true;
		if(url == null || (loadCheck != null && loadCheck()))
			load = false;
		else
		{
			var scripts = document.getElementsByTagName("script");
			for(var i=0; i<scripts.length; i++)
			{
				if(FacilMap.Util.makeAbsoluteURL(scripts[i].src) == FacilMap.Util.makeAbsoluteURL(url))
				{
					load = false;
					break;
				}
			}
		}

		if(load)
		{
			var scriptTag = document.createElement("script");
			scriptTag.type = "text/javascript";
			scriptTag.src = url;
			document.getElementsByTagName("head")[0].appendChild(scriptTag);
		}

		if(loadCheck != null && success != null)
		{
			var callback = function(nextWait) {
				if(loadCheck())
					success();
				else
				{
					var newWait = nextWait*2;
					if(newWait > 10000)
						newWait = 10000;
					setTimeout(function(){ callback(newWait); }, nextWait);
				}
			};
			callback(10);
		}
	},

	/**
	 * Convert a relative URL to an absolute URL.
	 * @param String url
	 * @return String
	*/
	makeAbsoluteURL: function(url) {
		// See http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue/472729#472729
		var el = document.createElement("div");
		el.innerHTML = "<a href=\"" + FacilMap.Util.htmlspecialchars(url) + "\">x</a>";
		return el.firstChild.href;
	},

	/**
	 * Returns a DOM node with a formatted value of the value paramter. The value paramter is the value of a tag of an OSM object, the key
	 * paramter is the appropriate key after whose rules the value will be formatted (for example the value for the url key will be formatted
	 * as a link to this url).
	 * @param String value The value of an OSM tag
	 * @param String key The key of an OSM tag
	 * @return Element A DOM element with the formatted value
	*/
	formatTagValue: function(value, key) {
		var SEPARATOR_PATTERN = /;/;

		var ret = document.createElement("span");

		while(value.length > 0)
		{
			var sepPosition = value.search(SEPARATOR_PATTERN);
			var sep = value.match(SEPARATOR_PATTERN);
			var thisValue;
			if(sepPosition = -1)
			{
				thisValue = value;
				value = "";
			}
			else
			{
				thisValue = value.substr(0, sepPosition);
				value = value.substr(sepPosition + sep[0].length);
			}

			var el;
			if(key.match(/^url:?/i))
			{
				el = document.createElement("a");
				el.href = thisValue;
				el.appendChild(document.createTextNode(thisValue));
				break;
			}
			else if(key.match(/^wiki:symbol:?/i))
			{
				el = document.createElement("a");
				el.href = "http://wiki.openstreetmap.org/wiki/Image:"+thisValue;
				el.appendChild(document.createTextNode(thisValue));
				break;
			}
			else if(key.match(/^wiki:?/i))
			{
				el = document.createElement("a");
				el.href = "http://wiki.openstreetmap.org/wiki/"+thisValue;
				el.appendChild(document.createTextNode(thisValue));
				break;
			}
			else
				el = document.createTextNode(thisValue);

			ret.appendChild(el);
			if(sepPosition != -1)
				ret.appendChild(sep[0]);
		}

		return ret;
	},

	/**
	 * Get an array of the keys of an object.
	 * @param Object obj
	 * @return Array<String>
	*/
	getIndexes: function(obj) {
		var ret = [ ];
		for(var i in obj)
			ret.push(i);
		return ret;
	},

	alert_r: function(data) {
		var str = "";
		for(var i in data)
			str += i+": "+data[i]+"\n";
		alert(str);
	},

	debugOutput: function(string) {
		var debugOutput = FacilMap.Util.debugOutput;
		if(debugOutput.textarea == null)
		{
			debugOutput.textarea = document.createElement("textarea");
			debugOutput.textarea.style.width = "75%";
			debugOutput.textarea.style.height = "50%";
			debugOutput.textarea.style.bottom = "0";
			debugOutput.textarea.style.left = "0";
			debugOutput.textarea.style.position = "fixed";
			debugOutput.textarea.id = "fm-debug";
			document.getElementsByTagName("body")[0].appendChild(debugOutput.textarea);
			debugOutput.textarea.onmouseover = function(){ FacilMap.Util.changeOpacity(this, 1); };
			debugOutput.textarea.onmouseout = function(){ FacilMap.Util.changeOpacity(this, 0.5); };
			debugOutput.textarea.onmouseout();
		}
		debugOutput.textarea.value = new Date()+": "+string+"\n\n"+debugOutput.textarea.value;
	}
}
