const fs = require('fs');
const ArbolBinario = require('../models/arbol-binario');
const Nodo = require('../models/nodo');

let arbolBinario = new ArbolBinario();
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
        let arbolBinario = require('../../db/arbol.json');
        convertirJsonClase(arbolBinario);
    } catch (error) {
        arbolBinario = new ArbolBinario();
    }
};


const agregarNodos = (cadena) => {
    return new Promise((resolve, reject) => {
        cargarBD();
        let arr = cadena.split(",");
        arr.forEach(function(valor) {

        })

        arr.forEach(function(valor) {
            if (isNaN(valor)) {
                reject(`El nodo ${valor} es una letra y no puede ser guardado`);
                throw new Error('El nodo es una letra');
            }
            let valorNumero = parseInt(valor);
            arbolBinario.insertarNuevo(valorNumero);
        });
        bdJson = JSON.stringify(arbolBinario);

        if (!bdJson) {
            reject(`Existe un error guardando los nodos a la bd`);
        } else {
            resolve(`Secuencia ingresada correctamente`);
        }
        guardarBD();
    });
};


const convertirJsonClase = (objetoJson) => {

    if (arbolBinario.raiz === null) {
        var raiz = new Nodo(objetoJson.raiz.valor);
        arbolBinario.raiz = raiz;
        if (objetoJson.raiz.izquierda !== null) {
            let nodoRaizIzquierdo = new Nodo(objetoJson.raiz.izquierda.valor);
            arbolBinario.raiz.izquierda = nodoRaizIzquierdo;
            agregarNodo(objetoJson.raiz.izquierda, arbolBinario.raiz.izquierda);
        }
        if (objetoJson.raiz.derecha !== null) {
            let nodoRaizDerecho = new Nodo(objetoJson.raiz.derecha.valor);
            arbolBinario.raiz.derecha = nodoRaizDerecho;
            agregarNodo(objetoJson.raiz.derecha, arbolBinario.raiz.derecha);
        }
    }
}

const agregarNodo = (objetoJson, ruta) => {

    if (objetoJson.izquierda !== null) {
        let nodoIzquierdo = new Nodo(objetoJson.izquierda.valor);
        ruta.izquierda = nodoIzquierdo;
        agregarNodo(objetoJson.izquierda, ruta.izquierda);
    }

    if (objetoJson.derecha !== null) {
        let nodoDerecho = new Nodo(objetoJson.derecha.valor);
        ruta.derecha = nodoDerecho;
        agregarNodo(objetoJson.derecha, ruta.derecha);
    }
}

module.exports = {
    guardarBD,
    cargarBD,
    agregarNodos
}