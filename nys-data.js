let nycMap;
nycMap = L.map("map");

// create tile layer
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(nycMap);

nycMap.setView([40.7690, -73.920], 12);

L.geoJSON(geojsonFeature).addTo(nycMap);

// show each school on the map
L.geoJSON(geojsonFeature, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.school + "</h3> <hr> <b>" + feature.properties.address + "</b><br>" + "<b>" + feature.properties.status + "<hr>" + feature.properties.established + "</b>");
    }
}).addTo(nycMap);

let schools = geojsonFeature.features.map(function(feature) {
    return feature.properties.school;
}).filter(function(school) {
    return school !== "";
}).sort();
console.log(schools);

schools.forEach(function(school) {
    $("#sidebar").append("<a href ='#'><li>" + school + "</li></a>");
});

$("#sidebar").on("click", "li", function() {
    let schoolText = $(this).text(); // get the text of the neighborhood
    let coordinates = geojsonFeature.features.find(function(feature) {
        return feature.properties.school === schoolText; //check if the text matches the neighborhood in the dataset
    }).geometry.coordinates; // get the coordinates of the neighborhood
    nycMap.panTo(new L.LatLng(coordinates[1], coordinates[0]));
    // zoom in
    nycMap.setZoom(16);
});

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data &copy; OpenStreetMap contributors'
      }).addTo(nycMap);

const sidebar = L.control.sidebar('sidebar').addTo(nycMap);