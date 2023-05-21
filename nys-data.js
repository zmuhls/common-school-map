let nycMap = L.map("map");

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(nycMap);

nycMap.setView([40.7690, -73.920], 12);

L.geoJSON(geojsonFeature, {
    onEachFeature: (feature, layer) => {
        layer.bindPopup(`<h3>${feature.properties.school}</h3> 
                     <hr>
                     <b>${feature.properties.address}</b><br>
                     <b>${feature.properties.status}<hr>${feature.properties.established}</b>`);
    }
}).addTo(nycMap);

let schools = geojsonFeature.features.map(feature => feature.properties.school)
.filter(school => school !== "")
.sort();

console.log(schools);

schools.forEach(school => {
    $("#sidebar").append(`<a href ='#'><li>${school}</li></a>`);
});

$("#sidebar").on("click", "li", function() {
    let schoolText = $(this).text();
    let feature = geojsonFeature.features.find(feature => feature.properties.school === schoolText);
    if (feature) {
        let coordinates = feature.geometry.coordinates;
        nycMap.panTo(new L.LatLng(coordinates[1], coordinates[0]));
        nycMap.setZoom(16);
    } else {
        console.error(`School not found: ${schoolText}`);
    }
});

const sidebar = L.control.sidebar('sidebar').addTo(nycMap);