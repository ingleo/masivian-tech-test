const fs = require('fs');
const ArbolBinario = require('../models/arbol-binario');

let bdJson = {};

const guardarBD = () => {

    fs.writeFile(`db/arbol.json`, bdJson, (err) => {
        if (err) {
            throw err;
        } else {
            console.log('Se ha creado ó actualizado el arbol');
        }
    });
};

const cargarBD = () => {
    try {
        bdJson = require('../../db/arbol.json');
    } catch (error) {
        bdJson = {};
    }
};

const agregarNodos = (cadena) => {
    cargarBD();

    let arbolBinario = new ArbolBinario();
    let arr = cadena.split(",");

    arr.forEach(function(valor) {
        let valorNumero = parseInt(valor);
        arbolBinario.insertarNuevo(valorNumero);
    });

    console.log('PASÓ POR ACÁ');
    bdJson = JSON.stringify(arbolBinario);

    console.log(bdJson);
    guardarBD();

    return bdJson;
};

module.exports = {
    guardarBD,
    cargarBD,
    agregarNodos
}