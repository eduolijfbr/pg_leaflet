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

drenagem = L.geoJson.ajax('drenagem');

function bounds(){

	var ext = map.getBounds();
	map.fitBounds(ext);
	var ext = map.getBounds();
	var nelng = ext._northEast.lng;
	var nelat = ext._northEast.lat;
	var swlng = ext._southWest.lng;
	var swlat = ext._southWest.lat;

	var text = +nelng+'/'+nelat+'/'+swlng+'/'+swlat;
	return text;

}

map.on('move', function() {
	zoomLev = map.getZoom();
	
    if(zoomLev >= 16){
		map.removeLayer(lotes);
		lotes.clearLayers();

		var text = bounds();
		lotes = L.geoJson.ajax('lotes/'+text, {style: polySymbol_lotes});
		//lotes = L.geoJson.ajax('lotes/'+nelng+'/'+nelat+'/'+swlng+'/'+swlat, {style: polySymbol_lotes});
		lotes.addTo(map);
		
	}else{
		map.removeLayer(lotes);
		lotes.clearLayers();
	}
});

var baseMaps = {    
	"openstreetmap": openstreetmap,
    "osm_forest": osm_forest,
    "White": white,    
};

var overlayMaps = {
    "Drenagem": drenagem,
    //"Lotes": lotes
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

polySymbol_lotes = {
	color: "#000000",
	weight: 2,
	fillOpacity: 0
};
