var openstreetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
var osm_forest = L.tileLayer('http://tile.thunderforest.com/landscape/{z}/{x}/{y}.png');

// criar pagina em branco.
var white = L.tileLayer("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAAA1BMVEX///+nxBvIAAAAH0lEQVQYGe3BAQ0AAADCIPunfg43YAAAAAAAAAAA5wIhAAAB9aK9BAAAAABJRU5ErkJggg==");

var lotes = new L.FeatureGroup();
var drenagem = new L.FeatureGroup();

var lat = -21.76219;
var lng = -43.35046;

var map = L.map('map-template', {
    center: [lat, lng],
    zoom: 16,
    layers: [openstreetmap]
});

function func_drenagem(){
	drenagem = L.geoJson.ajax('drenagem');
	return drenagem;
}

function func_lotes(){
	var ext = map.getBounds();
	var nelng = ext._northEast.lng;
	var nelat = ext._northEast.lat;
	var swlng = ext._southWest.lng;
	var swlat = ext._southWest.lat;

	lotes = L.geoJson.ajax('lotes/'+nelng+'/'+nelat+'/'+swlng+'/'+swlat);
	return lotes;
	console.log("teste");
}

map.on('moveend', function() {
	zoomLev = map.getZoom();
	
	if (zoomLev >= 15){
		func_lotes();
	}
	if (zoomLev < 15){		
		func_drenagem();
	}
	
	console.log(zoomLev);
})

map.on('zoomend', function(){
	var z = map.getZoom();
	
	if (z >= 15) {
		lotes.addTo(map);
	}
	if (z < 15){
		map.removeLayer(lotes);
		lotes.clearLayers();
		lotes.removeFrom(map);
	}
	
});

func_drenagem();
func_lotes();

var baseMaps = {    
	"openstreetmap": openstreetmap,
    "osm_forest": osm_forest,
    "White": white,    
};

var overlayMaps = {
    "Drenagem": drenagem,
    "Lotes": lotes
};

L.control.layers(baseMaps, overlayMaps).addTo(map);
/*
L.marker([lat, lng]).addTo(map)
    .bindPopup('Juiz de Fora - MG')
    .openPopup();
*/
