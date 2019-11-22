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
    zoom: 15,
    layers: [openstreetmap]
});

function func_drenagem(){
	zoomLev = map.getZoom();
	console.log(zoomLev);

	//if (zoomLev >= 16){
		drenagem = L.geoJson.ajax('drenagem');

		drenagem.addTo(map);
		map.addLayer(drenagem);
		return drenagem;
	//}
}

function func_lotes(){
	zoomLev = map.getZoom();
	console.log(zoomLev);

	//if (zoomLev >= 18){
		var ext = map.getBounds();
		var nelng = ext._northEast.lng;
		var nelat = ext._northEast.lat;
		var swlng = ext._southWest.lng;
		var swlat = ext._southWest.lat;

		//map.removeLayer(lotes);	
		lotes.clearLayers();
		lotes.removeFrom(map);

		lotes = L.geoJson.ajax('lotes/'+nelng+'/'+nelat+'/'+swlng+'/'+swlat);
		
		lotes.addTo(map);
		map.addLayer(lotes);
		return lotes;
	//}
}

map.on('move', function() {
	zoomLev = map.getZoom();
	console.log(zoomLev);
	func_lotes();
	func_drenagem();
/*
	if (zoomLev >= 17){
		func_lotes();
		func_drenagem();
	}
	if (zoomLev < 17){	
		//map.removeLayer(lotes);	
		lotes.clearLayers();
		//lotes.removeFrom(map);
		drenagem.clearLayers();
	}
*/
	
})


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
