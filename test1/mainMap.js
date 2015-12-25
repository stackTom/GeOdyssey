// subclassing would have been nice here, but subclassing in JS is kind of really annoying
// from the basics I've seen...
function GreenCircle(mapToDisplayOn, centerPoint) {
	this.gCircle =  new google.maps.Circle({
      strokeColor: "green",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "green",
      fillOpacity:1,
      map: mapToDisplayOn,
      center: centerPoint,
      radius: 1000000 // big on purpose so you can see it
    });

	this.gCircle.addListener("click", function() {
    	console.log("I WAS CLICKED");
    });
}

// jQuery find is way too slow. No idea what sort of magic Google uses to parse KML's into
// placemarks so quickly. EDIT: an optimization I made to make it quicker: find only "Document"
// in the data and not each placemark, as this was way too slow
function customKmlLayer(url, map, marker) {
	this.placemarks = [];
	var oldThis = this;
	//url = "doc.kml";

	$.get(url, function(data) {
		//loop through placemarks tags
		$(data).find("Document").each(function(index, value) {
			//get coordinates and place name
			var findObj = $(this).find("coordinates");
			var coords = [];
			$(this).find("coordinates").each(function() {
				coords.push(this.innerHTML);
			});
			var place = $(this).find("name").text();
			var numCoords = coords.length;
			/*var img = {
				url: "http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_green.png",
				origin: new google.maps.Point(0, 0),
				scaledSize: new google.maps.Size(7, 8)
			};*/
			for (var i = 0; i < numCoords; i++) {
				var c = coords[i].split(",");

				var marker = new google.maps.Marker({
					position: { lat: parseFloat(c[1]), lng: parseFloat(c[0]) },
					//icon: img,
					//map: map,
					title: "place"
				});
				marker.addListener("click", function() {
					console.log(this.position.lat());
				});
				oldThis.placemarks.push(marker);
			}
		});
		// jQuery GET is async, so we gotta figure out a way to call a func to create the
		// markers on the map, else we might get an undefined array. example, when the below
		// two lines were below, the get async thread wouldn't finish in time before these two
		// lines were called, leading to an undefined array. solution: pass an onDone function
		// to thi function
		marker.addMarkers(oldThis.placemarks);
		console.log("done marker");
	});
}

function doSetTimeout(i, map, cluster) {
	setTimeout(function() {
			var ctaLayer = new customKmlLayer("https://raw.githubusercontent.com/stackTom/gmapsTestKML/master/test_kml/file" + i + ".kml",
							map, cluster);
			console.log("done layer " + i);
		}, 1000);
}

function mapInit() {
	var mapOpts = {
		center: { lat: 26.5, lng: -81.0 },
		zoom: 1
	};

	var gmap = new google.maps.Map(document.getElementById("map-container"), mapOpts);
	var test = new MarkerClusterer(gmap);

	// kml method. this kml file has 25,000 points (the limit imposed by google per kml file)
	// i think one can use a max of 5 kml files

	for (var i = 1; i < 13; i++) {
		doSetTimeout(i, gmap, test);
	}

  	/*google.maps.event.addListener(ctaLayer, "click", function(event) {
  		console.log(event.featureData);
  	});*/

	// my test circle/point class. one could have a loop to plot these. i am working on a test for this now
	// so we can determine which is more efficient/practical for our purposes. might get it done today as it
	// requires me to have a python script which extracts coordinates from a kml file so we can use those coords
	// and not have to come up with 25k coords by ourselves...
  	//var testCircle = new GreenCircle(gmap, gmap.getCenter());


  	// slow as hell. maybe i have a bug? maybe so as the circles aren't coming out in the right place
  	// asynchronouse, gonna make a json file out of the coordinates
  	/*$.getJSON("test.json", function(json) {
  		console.log(json);

  		var arLength = json.points.length - 20000;

  		for (var i = 0; i < arLength; i++) {
  			var circle = new GreenCircle(gmap, json.points[i]);
  		}
  		console.log("done");
	});*/

	console.log("map loaded");
}