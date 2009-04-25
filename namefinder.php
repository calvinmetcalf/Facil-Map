<?php
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