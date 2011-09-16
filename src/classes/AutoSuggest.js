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
	setValue : function(suggestion){ this.input.val(suggestion.value); },

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
	 * @param options {Object} Options to extend this object with
	 */
	initialize : function(input, suggestionFunction, options) {
		var t = this;
		t.input = $(input);
		t.suggestionFunction = suggestionFunction;
		$.extend(t, options);

		t.input.attr("autocomplete", "off").addClass("fmAutoSuggest");

		t._list = $('<ol class="fmAutoSuggest"></ol>').appendTo(t.input.parent()).css({
			"position" : "absolute",
			"display" : "none"
		});

		t.input.keydown(function(e){ return t._keyDown(e); });

		var mouseover = false;
		t.input.add(t._list).mouseout(function() { mouseover = false; });
		t.input.add(t._list).mouseover(function(){ mouseover = true; });

		var clickOpener = function() { t._open(t.input.val()); };
		t.input.focus(function() {
			setTimeout(function() { t.input.bind("click", clickOpener); }, 150);
		});
		t.input.blur(function(){
			t.input.unbind("click", clickOpener);

			if(!mouseover)
				t._hideList();
		});
		$(input.ownerDocument).click(function(){
			if(!mouseover)
				t._hideList();
		})
	},

	_keyDown : function(e) {
		var t = this;

		var kc_down = 40;
		var kc_up = 38;
		var kc_return = 13;
		var kc_enter = 14;
		var kc_escape = 27;
		var kc_tab = 9;

		if(!e.ctrlKey && !e.altKey && !e.metaKey && e.keyCode == kc_tab)
		{
			t._hideList();
			return true;
		}

		if(!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey)
		{
			var selected = $("> li.selected", t._list);

			if(e.keyCode == kc_down || e.keyCode == kc_up)
			{
				// If list is closed, open list
				if(t._list.css("display") == "none")
					t._open(t.input.val());
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
					t.setValue(selected.data("fmAutoSuggest-suggestion"));
					t._waitingValue = t.input.val();
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

		setTimeout(function(){
			var val = t.input.val();
			if(val != t._waitingValue)
			{
				t._waitingValue = val;
				if(t._timeout != null)
				{
					clearTimeout(t._timeout);
					t._timeout = null;
				}
				t._timeout = setTimeout(function(){ t._timeout = null; t._open(val); }, t.typingTimeout);
			}
		}, 0);
		return true;
	},

	_open : function(val) {
		var t = this;

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
				t._loadingValue = null;
			});
		}
	},

	_openResult : function(value, suggestions) {
		var t = this;

		t._list.empty();
		$.each(suggestions, function(i, it) {
			$("<li></li>").data("fmAutoSuggest-suggestion", it).append(it.html).appendTo(t._list)
				.click(function(){ t.setValue($(this).data("fmAutoSuggest-suggestion")); t._hideList(); t.input.focus(); });
		});

		t._loadedValue = value;
		t._showList();
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
		}

		// Prevent showing the list if find() is currently waiting for a response
		this._loadingValue = null;

		this._list.css("display", "none");
		this._selectItem(null);
	},

	CLASS_NAME : "FacilMap.AutoSuggest"
});

})(FacilMap, OpenLayers, FacilMap.$);