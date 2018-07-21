//const Nodo = require('./models/nodo');
const ArbolBinario = require('./models/arbol-binario');

var arbolBinario = new ArbolBinario();

let cadena = "70,84,85";
let arr = cadena.split(",");

arr.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

let cadena2 = "70,84,78,80";
let arr2 = cadena2.split(",");

arr2.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

let cadena3 = "70,84,78,76";
let arr3 = cadena3.split(",");
arr3.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

var cadena4 = "70,49,54,51";
let arr4 = cadena4.split(",");
arr4.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

var cadena5 = "70,49,37,40";
let arr5 = cadena5.split(",");
arr5.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

var cadena6 = "70,49,37,22";
let arr6 = cadena6.split(",");
arr6.forEach(function(valor) {
    let valorNumero = parseInt(valor);
    arbolBinario.insertarNuevo(valorNumero);
});

console.log(JSON.stringify(arbolBinario));