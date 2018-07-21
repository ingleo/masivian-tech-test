var express = require('express');
var router = express.Router();

var admin_db_controller = require('../controllers/adminDbController');

router.get('/', function(req, res) {
    res.send('PAGINA INICIO ARBOL')
});

module.exports = router;