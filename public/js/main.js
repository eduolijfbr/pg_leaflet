var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osm_forest   = L.tileLayer('http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png');

var map = L.map('map-template', {
    center: [51.505, -0.09],
    zoom: 10,
    layers: [openstreetmap, osm_forest]
});

var baseMaps = {
    "openstreetmap": openstreetmap,
    "osm_forest": osm_forest
};

var overlayMaps = {
    //"Cities": cities
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

//var map = L.map('map-template').setView([51.505, -0.09], 13);

//L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
