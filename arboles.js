class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izq = null;
        this.der = null;
    }
}

class ArbolBinario {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        this.raiz = this._insertarRec(this.raiz, valor);
    }

    _insertarRec(nodo, valor) {
        if (nodo == null) return new Nodo(valor);

        if (valor < nodo.valor) nodo.izq = this._insertarRec(nodo.izq, valor);
        else if (valor > nodo.valor) nodo.der = this._insertarRec(nodo.der, valor);

        return nodo;
    }

    buscar(valor) {
        return this._buscarRec(this.raiz, valor);
    }

    _buscarRec(nodo, valor) {
        if (nodo == null) return false;
        if (valor == nodo.valor) return true;

        return valor < nodo.valor 
            ? this._buscarRec(nodo.izq, valor)
            : this._buscarRec(nodo.der, valor);
    }

    eliminar(valor) {
        this.raiz = this._eliminarRec(this.raiz, valor);
    }

    _eliminarRec(nodo, valor) {
        if (nodo == null) return null;

        if (valor < nodo.valor) nodo.izq = this._eliminarRec(nodo.izq, valor);
        else if (valor > nodo.valor) nodo.der = this._eliminarRec(nodo.der, valor);
        else {
            if (!nodo.izq) return nodo.der;
            if (!nodo.der) return nodo.izq;

            let sucesor = this._min(nodo.der);
            nodo.valor = sucesor.valor;
            nodo.der = this._eliminarRec(nodo.der, sucesor.valor);
        }

        return nodo;
    }

    _min(nodo) {
        while (nodo.izq) nodo = nodo.izq;
        return nodo;
    }

    // RECORRIDOS
    preorden() {
        let res = [];
        this._pre(this.raiz, res);
        return res;
    }
    _pre(nodo, res) {
        if (!nodo) return;
        res.push(nodo.valor);
        this._pre(nodo.izq, res);
        this._pre(nodo.der, res);
    }

    inorden() {
        let res = [];
        this._in(this.raiz, res);
        return res;
    }
    _in(nodo, res) {
        if (!nodo) return;
        this._in(nodo.izq, res);
        res.push(nodo.valor);
        this._in(nodo.der, res);
    }

    postorden() {
        let res = [];
        this._post(this.raiz, res);
        return res;
    }
    _post(nodo, res) {
        if (!nodo) return;
        this._post(nodo.izq, res);
        this._post(nodo.der, res);
        res.push(nodo.valor);
    }
}

// -----------------------------------------

let arbol = new ArbolBinario();
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// FUNCIONES INTERACTIVAS
function insertar() {
    let valor = parseInt(document.getElementById("valor").value);
    if (isNaN(valor)) return alert("Ingresa un número");
    arbol.insertar(valor);
    dibujar();
}

function eliminar() {
    let valor = parseInt(document.getElementById("valor").value);
    if (isNaN(valor)) return alert("Ingresa un número");
    arbol.eliminar(valor);
    dibujar();
}

function buscar() {
    let valor = parseInt(document.getElementById("valor").value);
    if (isNaN(valor)) return alert("Ingresa un número");

    if (arbol.buscar(valor)) alert("El valor SÍ está en el árbol");
    else alert("No se encontró");
}

function mostrarRecorridos() {
    document.getElementById("recorridos").innerHTML =
        "Preorden: " + arbol.preorden().join(", ") + "<br>" +
        "Inorden: " + arbol.inorden().join(", ") + "<br>" +
        "Postorden: " + arbol.postorden().join(", ");
}

// -----------------------------------------

// DIBUJAR ÁRBOL EN CANVAS
function dibujarNodo(nodo, x, y, distancia) {
    if (!nodo) return;

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fillStyle = "#87CEFA";
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.fillText(nodo.valor, x - 5, y + 4);

    if (nodo.izq) {
        ctx.moveTo(x, y);
        ctx.lineTo(x - distancia, y + 60);
        ctx.stroke();
        dibujarNodo(nodo.izq, x - distancia, y + 60, distancia / 1.6);
    }
    if (nodo.der) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + distancia, y + 60);
        ctx.stroke();
        dibujarNodo(nodo.der, x + distancia, y + 60, distancia / 1.6);
    }
}

function dibujar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "16px Arial";
    if (arbol.raiz) dibujarNodo(arbol.raiz, canvas.width / 2, 40, 150);
}

document.getElementById("menu").addEventListener("click", function() {
    // Aquí puedes poner lógica extra antes de ir a la página
    window.location.href = "index.html";
});
