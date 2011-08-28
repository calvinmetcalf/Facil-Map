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

(function(fm, ol, $){

/**
 * Shows a list with suggestions under an input field while the user is typing.
 */

fm.AutoSuggest = ol.Class({

	input : null,
	suggestionFunction : null,
	typingTimeout : 500,

	_timeout : null,
	_list : null,

	_waitingValue : null,
	_loadingValue : null,
	_loadedValue : null,


	/**
	 * @param input {Element} The input field to enable auto-suggest for
	 * @param suggestionFunction {Function} Receives the content of the text input field as first
	 *                                      parameter and has to call the function from the second
	 *                                      parameter with an array of suggestions.
	 *                                      The suggestions are objects with the properties value
	 *                                      (the value to be set for the input field) and html (the
	 *                                      HTML code to display as suggestion).
	 */
	initialize : function(input, suggestionFunction) {
		var t = this;
		t.input = $(input);
		t.suggestionFunction = suggestionFunction;

		t.input.attr("autocomplete", "off").addClass("fmAutoSuggest");

		t.input.keydown(function(e){ t._keyDown(e); });

		var clickOpener = function() { t._open(); };
		t.input.focus(function() {
			setTimeout(function() { t.input.bind("click", clickOpener); }, 150);
		});
		t.input.blur(function(){
			t.input.unbind("click", clickOpener);

			// Wait some time before closing the suggestion list on blur so that clicking the results still works
			setTimeout(function(){ t._hideList(); }, 150);
		});

		t._list = $('<ol class="fmAutoSuggest"></ol>').appendTo(t.input.parent()).css({
			"position" : "absolute",
			"display" : "none"
		});
	},

	_keyDown : function(e) {
		var t = this;

		var kc_down = 40;
		var kc_up = 38;
		var kc_return = 13;
		var kc_enter = 14;
		var kc_escape = 27;

		if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey)
		{
			var selected = $("> li.selected", t._list);

			if(e.keyCode == kc_down || e.keyCode == kc_up)
			{
				// If list is closed, open list
				if(t._list.css("display") == "none")
					t._open();
				else
				{
					var newItem = selected[e.keyCode == kc_up ? "prev" : "next"]();
					if(newItem.size() == 0)
						newItem = $("> :"+(e.keyCode == kc_up ? "last" : "first")+"-child", t._list);
					t._selectItem(newItem);
				}
				return false;
			}
			else if(e.keyCode == kc_return || e.keyCode == kc_enter)
			{
				if(selected.size() != 0)
				{ // If item is selected, put value in input field
					t.input.val(selected.attr("data-value"));
					t.input.focus();
					t._hideList();
					return false;
				}
				else
				{ // If no item is selected, close suggestion box
					t._hideList();
				}
			}
			else if(e.keyCode == kc_escape)
			{
				t._hideList();
				return false;
			}
		}

		var val = t.input.val();
		if(t._waitingValue != val)
		{
			if(t._timeout != null)
			{
				clearTimeout(t._timeout);
				t._timeout = null;
				t._waitingValue = null;
			}
			t._timeout = setTimeout(function(){ t._timeout = null; t._waitingValue = null; t._open(); }, t.typingTimeout);
		}
		return true;
	},

	_open : function() {
		var t = this;
		var val = t.input.val();

		if(val == t._loadedValue)
			t._showList();
		else if(val == t._loadingValue)
			return;
		else if(val.length < 3)
			t._hideList();
		else
		{
			t._loadingValue = val;
			t.suggestionFunction(val, function(suggestions) {
				if(val == t._loadingValue) // t._loadingValue is set to null in _hideList()
					t._openResult(val, suggestions);
			});
		}
	},

	_openResult : function(value, suggestions) {
		var t = this;

		var selected = $("> li.selected", t._list).attr("data-value");
		t._loadedValue = value;
		t._showList();

		$.each(suggestions, function(i, it) {
			$("<li></li>").attr("data-value", it.value).append(it.html).appendTo(t._list)
				.click(function(){ t.input.val($(this).attr("data-value")); t._hideList(); });
		});
	},

	_selectItem : function(li)
	{
		$("> li.selected", this._list).removeClass("selected");

		if(li && li.size() > 0)
		{
			$(li[0]).addClass("selected");

			// Scroll to item
			var itemTop = li[0].offsetTop;
			var itemBottom = itemTop + li[0].offsetHeight;

			if(itemTop < this._list[0].scrollTop) // Need to scroll up
				this._list[0].scrollTop = itemTop;
			else if(itemBottom > this._list[0].scrollTop + this._list[0].offsetHeight) // Need to scroll down
				this._list[0].scrollTop = itemBottom - this._list[0].offsetHeight;
		}
	},

	_showList : function() {
		this._list.css({
			"top": (this.input[0].offsetTop + this.input[0].offsetHeight) + "px",
			"left": this.input[0].offsetLeft + "px",
			"min-width": this.input[0].offsetWidth + "px",
			"display" : "block"
		});
	},

	_hideList : function() {
		if(this._timeout != null)
		{
			clearTimeout(this._timeout);
			this._timeout = null;
			this._waitingValue = null;
		}

		// Prevent showing the list if find() is currently waiting for a response
		this._loadingValue = null;

		this._list.css("display", "none");
		this._selectItem(null);
	},

	CLASS_NAME : "FacilMap.AutoSuggest"
});

})(FacilMap, OpenLayers, FacilMap.$);