#!/bin/bash
cd "$(dirname "$0")"

list_files() {
	find "src/jquery" -type f -name "*.js" | sort_js_files
	echo "src/base.js"
	echo "src/classes/Util.js"
	find "src/olfix" -type f -name "*.js" | sort_js_files
	find "src/i18n" -type f -name "*.js" | sort_js_files
	find "src/classes" -type f -name "*.js" | grep -vx src/classes/Util.js | sort_js_files
}

sort_js_files() {
	sed -e 's/\.js$//' | sort | sed -e 's/$/.js/'
}

files="$(list_files)"

if which git > /dev/null; then
	#rev="$(git rev-list --max-count=1 HEAD)"
	#rev="$(date -u -d "1970-01-01 UTC $(git rev-list --max-count=1 --timestamp HEAD | cut -d' ' -f1) seconds" "+%FT%TZ")"
	rev="$(date -u "+%FT%TZ")"
	out_dir="builds/$rev"
	mkdir -p "$out_dir"
else
	out_dir=.
fi

echo -n > "$out_dir/facilmap_debug.js"
echo -n > "$out_dir/facilmap_src.js"
rm -f "$out_dir/facilmap.js"

echo "$files" | while read fname; do
	echo "document.write(\"<script type=\\\"text/javascript\\\" src=\\\"$fname\\\"></script>\");" >> "$out_dir/facilmap_debug.js"
	(
		echo "////////// $fname ///////////"
		cat "$fname"
		echo
		echo
	) >> "$out_dir/facilmap_src.js"
done

if [ -f yuicompressor-*.jar ]; then
	java -jar yuicompressor-*.jar "$out_dir/facilmap_src.js" > "$out_dir/facilmap.js"
else
	ln -s facilmap_src.js "$out_dir/facilmap.js"
fi

if [[ "$out_dir" != "." ]]; then
	ln -sf "$out_dir"/{facilmap.js,facilmap_src.js,facilmap_debug.js} .
fi
