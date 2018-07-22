var express = require('express');
var router = express.Router();
var admin_db_controller = require('../controllers/adminDbController');

// Endpoint para obtener el arbol actual
router.get('/', (req, res) => {
    admin_db_controller.obtenerArbolBinario().then((objetoRes) => {
        res.json({
            ok: true,
            mensaje: objetoRes.mensaje,
            data: objetoRes.data
        });
    }).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    });
});

// Endpoint para borrar el arbol actual
router.delete('/', (req, res) => {
    admin_db_controller.limpiarArbolBinario().then((mensaje) => {
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