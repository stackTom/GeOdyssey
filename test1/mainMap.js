var gmap;
var layers = [];

function mapInit() {
	var mapOpts = {
		center: { lat: 26.5, lng: -81.0 },
		zoom: 4
	};

	gmap = new google.maps.Map(document.getElementById("map-container"), mapOpts);

	// add event listener on the map to disable the popup created by clicking on a marker
	google.maps.event.addListener(gmap, "click", function(mapEvent) {
		var popup = document.getElementById("popup");
		popup.style.display = "none";

		getPointData("test");
	});

	// load in our kml's
	for (var i = 0; i < 13; i++) {
		var ctaLayer = new google.maps.KmlLayer({
			url: "https://raw.githubusercontent.com/stackTom/gmapsTestKML/master/test_kml/file" + i + ".kml",
			preserveViewport: true, // don't center the view when we render the KML's
			suppressInfoWindows: true,
		});

		layers.push(ctaLayer);

		google.maps.event.addListener(ctaLayer, "click", function(KmlEvent) {
			// add the popup...
			var popup = document.getElementById("popup"); // this can be styled much better... just an example
			popup.style.display = "block";
			popup.innerHTML = "My coords are " + KmlEvent.latLng.toString();
			pop.innerHTML += " HI THERE";
		});
	}

	// only render the markers on the map past a certain zoom level to speed things up
	google.maps.event.addListener(gmap, "zoom_changed", function() {
		for (var i = 0; i < 13; i++) {
			if (gmap.getZoom() > 5) {
				layers[i].setMap(gmap);
				console.log("set map");
			} else {
				layers[i].setMap(null);
			}
		}
	});

	console.log("done loading layers");
}

function getPointData(str) {
	if (str == "") {
		return;
	}
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	// set callback
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var popup = document.getElementById("popup"); // this can be styled much better... just an example
			popup.style.display = "block";
			popup.innerHTML = "kml layers not loading... in the meantime, here is the latitude of the sql query " + xmlhttp.responseText;
		}
	};
	xmlhttp.open("GET","getPointData.php?q="+str,true);
	xmlhttp.send();
}