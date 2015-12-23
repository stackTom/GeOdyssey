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

function mapInit() {
	var mapOpts = {
		center: { lat: 26.5, lng: -81.0 },
		zoom: 5
	};

	var gmap = new google.maps.Map(document.getElementById("map-container"), mapOpts);

	// kml method. this kml file has 25,000 points (the limit imposed by google per kml file)
	// i think one can use a max of 5 kml files
	var ctaLayer = new google.maps.KmlLayer({
    	url: "https://raw.githubusercontent.com/stackTom/test/master/geo_velocity.kml",
    	map: gmap
  	});

  	google.maps.event.addListener(ctaLayer, "click", function(event) {
  		console.log(event.featureData.description);
  	});

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
