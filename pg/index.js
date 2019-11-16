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
	const loteid = parseInt(request.params.loteid)
	pool.query('SELECT row_to_json(fc) FROM (SELECT \'FeatureCollection\' As type, array_to_json(array_agg(f)) As features FROM (SELECT \'Feature\' As type, ST_AsGeoJSON(ST_Multi(st_transform(lg.geom,4326)))::json As geometry, row_to_json((lg.gid, lg.codrede)) As properties FROM drenagem As lg) As f) As fc;', (error, results) => {
	    if (error) {
	      throw error
	    }
	    
	    origin = results.rows;
		origin = Object.assign({}, origin);
		origin = origin[0];
		origin = origin['row_to_json'];

	    response.status(200).json(origin);
	/*
		fs.writeFile("drenagem.geojson", JSON.stringify(origin), function(err) {
		    if(err) {
		        return console.log(err);
		    }

		    console.log("The file was saved!");
		});
	*/
    })
})

module.exports = camadas;