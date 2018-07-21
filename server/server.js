require('./config/config');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const adminDbController = require('./controllers/adminDbController');

//creacion de app express
const app = express();

// parser application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//definición de variables de rutas
var indexRouter = require('./routes/index.js');
var nodosRouter = require('./routes/nodos.js');
var arbolRouter = require('./routes/arbol.js');

app.use('/', indexRouter);
app.use('/nodos', nodosRouter);
app.use('/arbol', arbolRouter);


//inicio del servidor
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});

//adminDbController.agregarNodos("70,84,85");
//adminDbController.agregarNodos("70,84,78,80");
//adminDbController.agregarNodos("70,84,78,76");
//adminDbController.agregarNodos("70,49,54,51");
//adminDbController.agregarNodos("70,49,37,40");
//adminDbController.agregarNodos("70,49,37,22");