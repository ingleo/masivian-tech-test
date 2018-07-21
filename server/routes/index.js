var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.send('Bienvenidos a la aplicación');
});

module.exports = router;