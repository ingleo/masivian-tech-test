const fs = require('fs');
const _ = require('underscore');
const ArbolBinario = require('../models/arbol-binario');
const Nodo = require('../models/nodo');

let arbolBinario = new ArbolBinario();
let bdJson = {};
let arrayNodos = [];

//Funcion para guardar el arbol en un archivo como base de datos 
const guardarBD = () => {
    fs.writeFile(`db/arbol.json`, bdJson, (err) => {
        if (err) {
            throw err;
        }
    });
};

// Funcion para cargar el archivo de base de datos
const cargarBD = () => {
    try {
        let arbolBinario1 = require('../../db/arbol.json');
        convertirJsonClase(arbolBinario1);
    } catch (error) {
        arbolBinario = new ArbolBinario();
    }
};

// Funcion para agregar la secuencia de nodos y agregarlos al arbol
const agregarNodos = (cadena) => {
    return new Promise((resolve, reject) => {
        cargarBD();
        let arr = cadena.split(",");
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
            resolve(`Nodos ingresados correctamente`);
        }
        guardarBD();
    });
};

// Funcion para convertir el objeto de la bd a la estructura de objetos javascript
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

// Funcion recursiva para ir armando los nodos del arbol como objetos javascript
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

// Funcion para encontrar el ancestro mas cercano de dos nodos
const encontrarAncestroCercano = (nodo1, nodo2) => {
    return new Promise((resolve, reject) => {
        cargarBD();
        let raizArbol = arbolBinario.obtenerRaiz();
        recorrerPreorden(raizArbol);
        let validaNodo1 = arrayNodos.find(valor => valor === parseInt(nodo1));
        let validaNodo2 = arrayNodos.find(valor => valor === parseInt(nodo2));

        if (validaNodo1 === undefined || validaNodo2 === undefined) {
            reject(`Uno de los nodos no esta en el arbol`);
            throw new Error('Uno de los nodos no esta en el arbol');
        } else {
            var nodoAncestro = arbolBinario.ancestroComun(raizArbol, nodo1, nodo2);
            resolve({
                mensaje: 'Se ha encontrado un ancestro',
                ancestro: nodoAncestro.valor
            });
        }
    });
};

//Recorrer el arbol para crear un array de valores
const recorrerPreorden = (nodo) => {
    if (nodo != null) {
        arrayNodos.push(nodo.valor);
        recorrerPreorden(nodo.izquierda);
        recorrerPreorden(nodo.derecha);
    }
};

//Obtener el arbol binario
const obtenerArbolBinario = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('db/arbol.json', (err, data) => {
            if (err) {
                throw err;
                reject(err);
            } else {
                resolve({
                    mensaje: 'Arbol actual',
                    data: JSON.parse(data)
                });
            }
        });
    });
};

//Limpiar el arbol binario
const limpiarArbolBinario = () => {
    return new Promise((resolve, reject) => {
        let objetoAux = {};
        fs.writeFile('db/arbol.json', JSON.stringify(objetoAux), (err) => {
            if (err) {
                throw err;
                reject(err);
            } else {
                resolve('Arbol binario vacio');
            }
        });
    });
};

module.exports = {
    guardarBD,
    cargarBD,
    agregarNodos,
    encontrarAncestroCercano,
    obtenerArbolBinario,
    limpiarArbolBinario
}