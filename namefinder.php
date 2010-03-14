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

	Obtain the source code from http://gitorious.org/cdauths-map
	or git://gitorious.org/cdauths-map/map.git.
*/

	/**
	 * Proxy for http://gazetteer.openstreetmap.org/namefinder/search.xml. Redirects the find GET parameter there.
	*/

	ini_set("display_errors", "Off");

	$fh = fsockopen("nominatim.openstreetmap.org", 80);
	fwrite($fh, "GET /search?".$_SERVER["QUERY_STRING"]." HTTP/1.0\r\n");
	fwrite($fh, "Host: nominatim.openstreetmap.org\r\n");
	fwrite($fh, "User-Agent: ".rawurlencode("cdauth’s map")."\r\n");
	fwrite($fh, "X-Forwarded-For: ".$_SERVER["REMOTE_ADDR"]."\r\n");
	fwrite($fh, "Connection: close\r\n");
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

	while(($line = fgets($fh)) !== false)
	{
		$line = str_replace(array("\r", "\n"), "", $line);
		if(strlen($line) < 1)
			break;
		header($line);
	}

	fpassthru($fh);