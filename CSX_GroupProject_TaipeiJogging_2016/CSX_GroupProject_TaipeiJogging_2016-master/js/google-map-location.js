function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map-2'), {
    center: {lat: 25.087818, lng: 121.538607},
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

  // Create the search box and link it to the UI element.
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
		// var place01 = searchBox.getPlace();
		// var location01 = "Address:" + place01.formatted_address + "<br>";
		// location01 += "Lat:" + place01.geometry.location.A + "<br>";
		// location01 += "Log:" + place01.geometry.location.F;
		// document.getElementById('info-output').innerHTML = location01
  });

  var markers = [];
  // [START region_getplaces]
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();

		if (places.length == 0) {
	 return;
 }

 // Clear out the old markers.
 markers.forEach(function(marker) {
	 marker.setMap(null);
 });
 markers = [];

 // For each place, get the icon, name and location.
 var bounds = new google.maps.LatLngBounds();
 places.forEach(function(place) {
	 var icon = {
		 url: place.icon,
		 size: new google.maps.Size(71, 71),
		 origin: new google.maps.Point(0, 0),
		 anchor: new google.maps.Point(17, 34),
		 scaledSize: new google.maps.Size(25, 25)
	 };

	 // Create a marker for each place.
	 markers.push(new google.maps.Marker({
		 map: map,
		 icon: icon,
	title: place.name,
	position: place.geometry.location
}));

if (place.geometry.viewport) {
	// Only geocodes have viewport.
	bounds.union(place.geometry.viewport);
} else {
	bounds.extend(place.geometry.location);
}
});
map.fitBounds(bounds);
});
// [END region_getplaces]
}
