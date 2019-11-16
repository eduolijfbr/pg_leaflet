var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osm_forest = L.tileLayer('http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png');

// criar pagina em branco.
var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");

var drenagem = L.geoJson.ajax('drenagem');

var lat = -21.76219;
var lng = -43.35046;

var map = L.map('map-template', {
    center: [lat, lng],
    zoom: 10,
    layers: [openstreetmap, osm_forest, white]
});

var baseMaps = {
    "openstreetmap": openstreetmap,
    "osm_forest": osm_forest
};

var overlayMaps = {
    "Drenagem": drenagem,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

L.marker([lat, lng]).addTo(map)
    .bindPopup('Juiz de Fora - MG')
    .openPopup();

