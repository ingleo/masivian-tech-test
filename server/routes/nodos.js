var express = require('express');
var router = express.Router();
var admin_db_controller = require('../controllers/adminDbController');

// Endpoint para agregar una secuencia de nodos a un arbol binario
router.post('/', (req, res) => {
    let body = req.body;
    admin_db_controller.agregarNodos(req.body.secuencia).then((mensaje) => {
        res.json({
            ok: true,
            mensaje
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// Endpoint para consultar el ancestro mas cercano de dos nodos
router.get('/ancestro/', (req, res) => {
    let nodo1 = req.query.nuno;
    let nodo2 = req.query.ndos;

    admin_db_controller.encontrarAncestroCercano(nodo1, nodo2).then((objetoRes) => {
        res.json({
            ok: true,
            mensaje: objetoRes.mensaje,
            ancestro: objetoRes.ancestro
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

module.exports = router;