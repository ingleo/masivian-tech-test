var express = require('express');
var router = express.Router();

var admin_db_controller = require('../controllers/adminDbController');

// Endpoint para agregar una secuencia de nodos a un arbol binario
router.post('/', function(req, res) {
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


module.exports = router;