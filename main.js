// Clases

class Accion {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    variacion () {
        return Math.floor(Math.random() * 5); /* este valor cambia todas las veces? */
        /* https://finnhub.io/ API para usar datos*/
    }
}

// Función

function eliminarAccion(accion) {

    // Busco índice donde está el elemento
    const indiceElementoAEliminar = listaDeAcciones.findIndex( (accionAEliminar) => {
        return accionAEliminar.nombre === accion.nombre;
    });

    // Borro la accion utilizando el índice
    listaDeAcciones.splice(indiceElementoAEliminar, 1);

    actualizarLS();

    renderizarAcciones(listaDeAcciones);
}

function editarNombreProducto(accion, nuevoNombre) {

    // Busco índice donde está el elemento
    const indiceElementoAModificar = listaDeAcciones.findIndex( (accionAEliminar) => {
        return accionAEliminar.nombre === accion.nombre;
    });

    // Actualizo el nombre de la accion
    listaDeAcciones[indiceElementoAModificar].nombre = nuevoNombre;

    actualizarLS();

    renderizarAcciones(listaDeAcciones);
}

function renderizarAcciones (acciones) {

    // Limpio la tabla
    bodyTabla.innerHTML = "";

    acciones.forEach( (accion) => {

        // Creamos la fila
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        const span = document.createElement("span");
        span.innerHTML = `${accion.nombre}`;
        tdNombre.append(span);

        // Agregar evento de click al span para poner el input
        span.addEventListener("click", () => {

            // Ocultar etiqueta span
            span.className = "oculta";

            // Creo el input que va a ser el cambio de nombre
            const inputCambioDeNombre = document.createElement("input");
            inputCambioDeNombre.value = accion.nombre;

            // Detecto cambio en el input
            inputCambioDeNombre.addEventListener("change", () => {

                // Obtengo el nuevo nombre de la accion a través del value del input
                const nuevoNombre = inputCambioDeNombre.value;

                // Removemos el input
                inputCambioDeNombre.remove();

                // Volver a poner el span
                span.className = "visible";

                // Editar nombre de la accion
                editarNombreAccion (accion, nuevoNombre);
            });

            // Agrego el input al td
            tdNombre.append(inputCambioDeNombre);
        });

        const tdPrecio = document.createElement("td");
        tdPrecio.innerHTML = `$${accion.precio}`;

        const tdIVA = document.createElement("td");
        tdIVA.innerHTML = `${accion.variacion()}`;

        const tdAcciones = document.createElement("td");
        const botonEliminarAccion = document.createElement("button");
        botonEliminarAccion.innerText = "Eliminar";

        // Agregar evento al boton de eliminar
        botonEliminarAccion.addEventListener("click", () => {
            eliminarAccion(accion);
        });

        tdAcciones.append(botonEliminarAccion);

        // Agrego los tds al tr
        tr.append(tdNombre);
        tr.append(tdPrecio);
        tr.append(tdIVA);
        tr.append(tdAcciones);

        // Agrego el tr al tbody
        bodyTabla.append(tr);
    });

}

function obtenerAcciones () {
    let acciones = [];

    // Obtengo lo que hay en LS
    let accionesLS = localStorage.getItem("acciones");

    // Si hay algo (Lo que significa que no me devuelve null) lo parseo y lo asigno a la variable productos
    if( accionesLS !== null) {

        // Parseo los objetos literales del JSON
        const accionesJSON = JSON.parse( accionesLS);

        // Recorro cada objeto literal e instancio un nuevo objeto de la clase Accion
        for(const accionJSON of accionesJSON) {
            acciones.push(new Accion(accionJSON.nombre, accionJSON.precio));
        }
    }

    return acciones;
}

function actualizarLS () {
    // Parseo array de objetos a JSON
    const listaDeAccionesJSON = JSON.stringify(listaDeAcciones);

    // Almaceno el JSON en LS
    localStorage.setItem("acciones", listaDeAccionesJSON);
}

// Inicio del programa

// Obtengo las acciones
const listaDeAcciones = obtenerAcciones();

const formularioCargarAcciones = document.getElementById("cargarAcciones");
const bodyTabla = document.getElementById("bodyTabla");
const inputNombre = document.getElementById("nombreDeAccion");
const inputPrecio = document.getElementById("precioDeAccion");
const inputBuscar = document.getElementById("buscarAccion");

formularioCargarAcciones.addEventListener("submit", (event) => {

    // Freno el flujo del evento
    event.preventDefault();

    // Obtengo el nombre y el precio
    const nombre = inputNombre.value;
    const precio = inputPrecio.value;

    // Limpio los inputs
    inputNombre.value = "";
    inputPrecio.value = "";

    // Agrego la accion al array
    listaDeAcciones.push(new Accion(nombre, precio));

    actualizarLS();

    // Renderizo las acciones
    renderizarAcciones(listaDeAcciones);
});

inputBuscar.addEventListener("input", () => {

    const palabraABuscar = inputBuscar.value;

    // Filtro las acciones
    const accionesFiltradas = listaDeAcciones.filter( (accion) => {
        return accion.nombre.toLowerCase().includes(palabraABuscar.toLowerCase());
    });

    renderizarAcciones(accionesFiltradas);
});

// Renderizo las acciones
renderizarAcciones(listaDeAcciones);