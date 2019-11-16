const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const fs = require('fs');

// inicializacao
const app = express();

// configuracao
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//rotas
app.use(require('./rotas/'));

// camadas
app.use(require('./pg/'));

// arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// iniciando servidor
app.listen(3000, () =>{
	console.log('Executando na porta 3000');
})