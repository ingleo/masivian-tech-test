const Nodo = require('./nodo');

class ArbolBinario {

    constructor() {
        //Raiz
        this.raiz = null;
    }

    //Inserta nuevo nodo
    insertarNuevo(valor) {
        var nuevoNodo = new Nodo(valor);

        if (this.raiz === null) {
            this.raiz = nuevoNodo;
        } else {
            this.insertarNodo(this.raiz, nuevoNodo);
        }
    }

    //Inserta el nodo en el arbol
    insertarNodo(nodo, nuevoNodo) {
        if (nuevoNodo.valor === nodo.valor) {
            return;
        }

        if (nuevoNodo.valor < nodo.valor) {
            if (nodo.izquierda === null) {
                nodo.izquierda = nuevoNodo;
            } else {
                this.insertarNodo(nodo.izquierda, nuevoNodo);
            }
        } else {
            if (nodo.derecha === null) {
                nodo.derecha = nuevoNodo;
            } else {
                this.insertarNodo(nodo.derecha, nuevoNodo);
            }
        }
    }

    //Encontrar el ancestro común mas cercano
    ancestroComun(nodoRaiz, nodo1, nodo2) {

        if (nodoRaiz === null) {
            return null;
        }

        //si es menor a raiz
        if (nodoRaiz.valor > nodo1 && nodoRaiz.valor > nodo2) {
            return this.ancestroComun(nodoRaiz.izquierda, nodo1, nodo2);
        }

        //si es mayor a raiz
        if (nodoRaiz.valor < nodo1 && nodoRaiz.valor < nodo2) {
            return this.ancestroComun(nodoRaiz.derecha, nodo1, nodo2);
        }

        return nodoRaiz;
    }

}

module.exports = ArbolBinario;