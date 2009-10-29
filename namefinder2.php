<?php
/*
	This file is part of cdauth’s map.

	OSM Route Manager is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	cdauth’s map is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with cdauth’s map.  If not, see <http://www.gnu.org/licenses/>.

	Obtain the source code from http://svn.cdauth.de/viewvc.cgi/Tools/osm/map/
	or svn://svn.cdauth.de/tools/osm/map/.
*/

	/**
	 * Proxy for http://data.giub.uni-bonn.de/openrouteservice/php/OpenLSLUS_Geocode.php. Redirects the POST request there.
	*/

	ini_set("display_errors", "Off");

	function arrayToQuery(&$array, &$query, $prefix="")
	{
		foreach($array as $k=>$v)
		{
			$k = (strlen($prefix) > 0 ? $prefix."[".rawurlencode($k)."]" : rawurlencode($k));
			if(is_array($v))
				arrayToQuery(&$query, $k);
			else
				$query[] = $k."=".urlencode($v);
		}
	}

	$request = array();
	arrayToQuery(&$_POST, &$request);
	$request = implode("&", $request);

	$fh = fsockopen("data.giub.uni-bonn.de", 80);
	fwrite($fh, "POST /openrouteservice/php/OpenLSLUS_Geocode.php HTTP/1.0\r\n");
	fwrite($fh, "Host: data.giub.uni-bonn.de\r\n");
	fwrite($fh, "User-Agent: ".rawurlencode("cdauth’s map")."\r\n");
	fwrite($fh, "X-Forwarded-For: ".$_SERVER["REMOTE_ADDR"]."\r\n");
	fwrite($fh, "Connection: close\r\n");
	fwrite($fh, "Content-type: application/x-www-form-urlencoded\r\n");
	fwrite($fh, "Content-length: ".strlen($request)."\r\n");
	foreach($_SERVER as $k=>$v)
	{
		if(substr($k, 0, 5) != "HTTP_" || $k == "HTTP_HOST" || $k == "HTTP_KEEP_ALIVE" || $k == "HTTP_CONNECTION")
			continue;
		$key = explode("_", $k);
		array_shift($key);
		foreach($key as $k1=>$v1)
			$key[$k1] = ucfirst($v1);
		$k = implode("-", $key);
		if($k == "User-Agent")
			$k = "X-Forwarded-User-Agent";
		fwrite($fh, $k.": ".$v."\r\n");
	}
	fwrite($fh, "\r\n");
	fwrite($fh, $request);

	while(($line = fgets($fh)) !== false)
	{
		$line = str_replace(array("\r", "\n"), "", $line);
		if(strlen($line) < 1)
			break;
		header($line);
	}

	fpassthru($fh);