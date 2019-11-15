const rotas = require('express').Router();

rotas.get('/', (req,res) => {
	res.render('index');
})

module.exports = rotas;