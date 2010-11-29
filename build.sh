#!/bin/bash
list_files() {
	echo "src/base.js"
	echo "src/classes/Util.js"
	find "src/olfix" -type f -name "*.js" | sort
	find "src/i18n" -type f -name "*.js" | sort
	find "src/classes" -type f -name "*.js" | grep -vx src/classes/Util.js | sort
}

files="$(list_files)"

echo -n > facilmap_debug.js
echo -n > facilmap_src.js
rm -f facilmap.js

echo "$files" | while read fname; do
	echo "document.write(\"<script type=\\\"text/javascript\\\" src=\\\"$fname\\\"></script>\");" >> facilmap_debug.js
	(
		echo "////////// $fname ///////////"
		cat "$fname"
		echo
		echo
	) >> facilmap_src.js
done

if [ -f yuicompressor-*.jar ]; then
	java -jar yuicompressor-*.jar facilmap_src.js > facilmap.js
else
	ln -s facilmap_src.js facilmap.js
fi
