var gmap;
var layers = [];

function mapInit() {
	var mapOpts = {
		center: { lat: 26.5, lng: -81.0 },
		zoom: 1
	};

	gmap = new google.maps.Map(document.getElementById("map-container"), mapOpts);

	// add event listener on the map to disable the popup created by clicking on a marker
	google.maps.event.addListener(gmap, "click", function(mapEvent) {
		var popup = document.getElementById("popup");
		popup.innerHTML = ""; // since the div hasn't a specified height, setting its html to an empty string will make it disappear
	});

	// load in our kml's
	for (var i = 0; i < 13; i++) {
		var ctaLayer = new google.maps.KmlLayer({
   			url: "https://raw.githubusercontent.com/stackTom/gmapsTestKML/master/test_kml/file" + i + ".kml",
   			preserveViewport: true, // don't center the view when we render the KML's
    		suppressInfoWindows: true
  		});

  		layers.push(ctaLayer);

  		google.maps.event.addListener(ctaLayer, "click", function(KmlEvent) {
  			// add the popup...
  			var popup = document.getElementById("popup"); // this can be styled much better... just an example
  			popup.innerHTML = "My coords are " + KmlEvent.latLng.toString();
  		});
	}

	// only render the markers on the map past a certain zoom level to speed things up
	google.maps.event.addListener(gmap, "zoom_changed", function() {
		for (var i = 0; i < 13; i++) {
			if (gmap.getZoom() > 5) {
				layers[i].setMap(gmap);
			} else {
				layers[i].setMap(null);
			}
		}
	});

	console.log("done loading layers");
}
