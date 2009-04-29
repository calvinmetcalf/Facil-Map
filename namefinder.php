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

	ini_set("display_errors", "Off");

	$fh = fsockopen("gazetteer.openstreetmap.org", 80);
	fwrite($fh, "GET /namefinder/search.xml?find=".rawurlencode(isset($_GET["find"]) ? $_GET["find"] : "")." HTTP/1.0\r\n");
	fwrite($fh, "Host: gazetteer.openstreetmap.org\r\n");
	fwrite($fh, "X-Forwarded-For: ".$_SERVER["REMOTE_ADDR"]."\r\n");
	foreach($_SERVER as $k=>$v)
	{
		if(substr($k, 0, 5) != "HTTP_" || $k == "HTTP_HOST")
			continue;
		$key = explode("_", $k);
		array_shift($key);
		foreach($key as $k1=>$v1)
			$key[$k1] = ucfirst($v1);
		fwrite($fh, implode("-", $key).": ".$v."\r\n");
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