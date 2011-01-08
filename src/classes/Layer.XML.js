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

/**
 * Displays an XML file on the map (such as GPX, KML or OSM) auto-determining of the format. The colour is
 * randomly assigned.
 * If you set FacilMap.Layer.XML.relationURL, OSM sub-relations will be loaded in additional requests.
 * Include the JavaScript http://api.facilmap.org/ajax-proxy/ajax-proxy.js to "disable" the Same Origin Policy.
 * Otherwise, you might have to set OpenLayers.ProxyHost to a URL on your server. The actual URL will be appended
 * to that in encoded form.
 * @event allloadend If an array of URL is passed, this is only called when the last URL is actually loaded.
*/

FacilMap.Layer.XML = OpenLayers.Class(OpenLayers.Layer.GML, {
	fmURL : null,
	relations : null,
	colour : null,
	toLoad : 0,
	style : {
		strokeColor: this.colour,
		strokeWidth: 3,
		strokeOpacity: 0.5
	},
	projection : new OpenLayers.Projection("EPSG:4326"),
	zoomableInLayerSwitcher : true,

	initialize : function(name, url, options) {
		this.fmURL = url;
		this.relations = { };
		this.shortName = "xml"+FacilMap.Layer.XML.shortNameI++;

		if(this.colour == null)
		{
			switch((FacilMap.Layer.XML.colourCounter++)%4)
			{
				case 0: this.colour = "red"; break;
				case 1: this.colour = "blue"; break;
				case 2: this.colour = "green"; break;
				case 3: this.colour = "black"; break;
			}
		}

		OpenLayers.Layer.GML.prototype.initialize.apply(this, [ name ? name : url, url, options ]);

		this.events.addEventType("allloadend");
	},
	afterAdd : function() {
		var ret = OpenLayers.Layer.GML.prototype.afterAdd.apply(this, arguments);
		this.map.setLayerZIndex(this, 0);
		return ret;
	},
	loadGML : function(url) {
		if(!url)
		{
			if(!this.loaded)
			{
				url = this.url;
				this.loaded = true;
			}
			else
				return;
		}

		if(!(url instanceof Array))
			url = [ url ];
		this.events.triggerEvent("loadstart");
		for(var i=0; i<url.length; i++)
		{
			if(!url[i])
				continue;
			this.toLoad++;
			OpenLayers.Request.GET({
				url: url[i],
				success: function() {
					this.requestSuccess.apply(this, arguments);
					if(--this.toLoad == 0)
						this.events.triggerEvent("allloadend");
				},
				failure: function() {
					this.requestFailure.apply(this, arguments);
					if(--this.toLoad == 0)
						this.events.triggerEvent("allloadend");
				},
				scope: this
			});
		}
	},
	requestSuccess : function(request) {
		if(request.responseXML && request.responseXML.documentElement)
		{
			switch(request.responseXML.documentElement.tagName)
			{
				case "gpx":
					if(request.responseXML.documentElement.getAttribute("creator") == "CloudMade")
						this.format = FacilMap.Routing.Cloudmade.Format;
					else
						this.format = OpenLayers.Format.GPX;
					break;
				case "osm": this.format = OpenLayers.Format.OSM; break;
				case "kml": this.format = OpenLayers.Format.KML; break;
				case "response": this.format = FacilMap.Routing.MapQuest.Format;
			}
		}
		this.formatOptions = { extractAttributes: false };
		try
		{
			OpenLayers.Layer.GML.prototype.requestSuccess.apply(this, arguments);
		}
		catch(e)
		{
			alert(OpenLayers.i18n("Error parsing file."));
			this.events.triggerEvent("loadend");
		}

		if(FacilMap.Layer.XML.relationURL && this.format == OpenLayers.Format.OSM && request.responseXML)
		{
			var relations = request.responseXML.getElementsByTagName("relation");
			for(var i=0; i<relations.length; i++)
			{
				var id = relations[i].getAttribute("id");
				if(this.relations[id])
					continue;
				this.relations[id] = true;

				var url = OpenLayers.String.format(FacilMap.Layer.XML.relationURL, {"id": id});
				if(url == this.url)
					continue;
				this.loadGML(url);
			}
		}
	},
	getQueryObject : function() {
		var obj = { };
		if(this.removableInLayerSwitcher)
			obj.url = this.fmURL;
		return obj;
	},
	setQueryObject : function(obj) {
		if(obj.url != undefined && obj.url != this.fmURL)
		{
			this.fmUrl = obj.url;
			this.setUrl(obj.url);
		}
	},

	CLASS_NAME : "FacilMap.Layer.XML"
});

/**
 * Set this to the XML URL that shall be loaded for relations referenced in OSM files. “${id}" will be replaced by the ID of the relation.
 * @var String
*/
FacilMap.Layer.XML.relationURL = "http://www.openstreetmap.org/api/0.6/relation/${id}/full";

FacilMap.Layer.XML.colourCounter = 1;
FacilMap.Layer.XML.shortNameI = 1;