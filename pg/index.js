const camadas = require('express').Router();
const fs = require('fs');
const pg = require('pg');

const pool = new pg.Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'dbSOGEO',
	password: 'edufis76',
	port: '5432'
});


camadas.get('/drenagem', (request, response) => {

	var string_text = "SELECT row_to_json(fc) FROM (SELECT \'FeatureCollection\' As type, array_to_json(array_agg(f)) As features FROM (SELECT \'Feature\' As type, ST_AsGeoJSON(ST_Multi(st_transform(lg.geom,4326)))::json As geometry, row_to_json((lg.gid, lg.codrede)) As properties FROM drenagem As lg) As f) As fc;";
	pool.query(string_text, (error, results) => {
	    if (error) {
	      throw error
	    }	    
	    origin = results.rows;
		origin = Object.assign({}, origin);
		origin = origin[0];
		origin = origin['row_to_json'];
	    response.status(200).json(origin);

    })
})

camadas.get('/lotes/:nelng/:nelat/:swlng/:swlat', (request, response) => {

	const nelng = request.params.nelng;
	const nelat = request.params.nelat;
	const swlng = request.params.swlng;
	const swlat = request.params.swlat;

	var string_text = "SELECT row_to_json(fc) FROM (SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features FROM (SELECT 'Feature' As type, ST_AsGeoJSON(ST_Multi(st_transform(lg.geom,4326)))::json As geometry, row_to_json((lg.gid, lg.loteid	)) As properties FROM (select a.gid, a.geom, a.loteid from lotes a, (select st_transform(st_makepolygon(ed_extent_to_line ("+nelng+", "+nelat+", "+swlng+", "+swlat+", 4326)),29193) as geom) b where st_intersects(a.geom, st_transform(b.geom,29193))) As lg) As f) As fc;";
	//console.log(string_text);
	
	pool.query(string_text, (error, results) => {
	    if (error) {
	      throw error
	    }	    
	    origin = results.rows;
		origin = Object.assign({}, origin);
		origin = origin[0];
		origin = origin['row_to_json'];
	    response.status(200).json(origin);

    })
   
})

module.exports = camadas;