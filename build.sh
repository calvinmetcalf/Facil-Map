#!/bin/bash
list_files() {
	echo "src/base.js"
	find "src/olfix" -type f -name "*.js" | sort
	find "src/i18n" -type f -name "*.js" | sort
	find "src/classes" -type f -name "*.js" | sort
}

files="$(list_files)"

echo -n > facilmap_debug.js
echo -n > facilmap.js

echo "$files" | while read fname; do
	echo "document.write(\"<script type=\\\"text/javascript\\\" src=\\\"$fname\\\"></script>\");" >> facilmap_debug.js
	(
		echo "////////// $fname ///////////"
		cat "$fname"
		echo
		echo
	) >> facilmap.js
done
