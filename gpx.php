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

	try
	{
		if(!isset($_GET["url"]))
			throw new Exception("url GET parameter needed.");

		$url = $_GET["url"];
		$number_of_redirects = 0;
		while($url !== false && $number_of_redirects++ < 10)
		{
			if(!preg_match("/^http:\\/\\/([a-z0-9.-]+)(:([0-9]+))?(\\/[^\\s]*)\$/", $url, $m))
				throw new Exception("Not a valid http URL.");

			$fh = fsockopen($m[1], $m[2] ? $m[3] : 80);
			if(!$fh)
				throw new Exception("Error opening socket.");

			fwrite($fh, "GET ".$m[4]." HTTP/1.0\r\n");
			fwrite($fh, "Host: ".$m[1]."\r\n");
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

			$headers = array();
			$content_type = null;

			while(($line = fgets($fh)) !== false)
			{
				$line = str_replace(array("\r", "\n"), "", $line);
				if(strlen($line) < 1)
					break;
				$headers[] = $line;
				if(preg_match("/^Location:\s*(.*)\$/i", $line, $m))
				{
					$url = $m[1];
					continue 2;
				}
				if(preg_match("/^Content-type:\s*(.*?)(;\s*charset=.*)?\$/i", $line, $m))
					$content_type = $m[1];
			}

			if(!$content_type || !in_array($content_type, array("application/x-gpx+xml", "application/gpx+xml", "text/xml", "application/xml", "application/x-osm+xml", "application/osm+xml")))
				throw new Exception("Content-type unacceptable.");

			foreach($headers as $header)
				header($header);

			fpassthru($fh);

			$url = false;
		}

		if($url !== false)
			throw new Exception("Maximum number of redirects exceeded.");
	}
	catch(Exception $e)
	{
		header("Status: 500", true, 500);
		echo $e->getMessage();
	}