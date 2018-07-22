require('./config/config');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

const adminDbController = require('./controllers/adminDbController');

//creacion de app express
const app = express();

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar la carpeta rutas
app.use(express.static(path.resolve(__dirname, '../public')));

//definición de variables de rutas
var indexRouter = require('./routes/index.js');
var nodosRouter = require('./routes/nodos.js');
var arbolRouter = require('./routes/arbol.js');

app.use('/v1', indexRouter);
app.use('/v1/nodos', nodosRouter);
app.use('/v1/arbol', arbolRouter);


//inicio del servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});