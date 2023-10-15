
let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

const inputNoEmpleado = document.getElementById("inputNoEmpleado");
const inputNombre = document.getElementById("inputNombre");
const inputPuesto = document.getElementById("inputPuesto");
const inputEstatus = document.getElementById("inputEstatus");
const inputDescripcion = document.getElementById("inputDescripcion");

const btnGuardar = document.getElementById("btnGuardar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const cardRegistros = document.getElementById("cardRegistros");
const divAlert = document.getElementById("divAlert");

let indexEditar = null;

class Empleado {
    constructor(noEmpleado, nombre, puesto, estatus, descripcion){
        this.noEmpleado = noEmpleado;
        this.nombre = nombre;
        this.puesto = puesto;
        this.estatus = estatus;
        this.descripcion = descripcion;
    } 
}

function guardarEmpleado(){
    let noEmpleado = inputNoEmpleado.value;
    let nombre = inputNombre.value;
    let puesto = inputPuesto.value;
    let estatus = inputEstatus.value;
    let descripcion = inputDescripcion.value;
    let empleado = new Empleado (
        noEmpleado,
        nombre,
        puesto,
        estatus,
        descripcion
    );

    if (indexEditar == null){
        empleados.push(empleado);
    }else {
        empleados[indexEditar] = empleado;
        indexEditar = null;
    }
    limpiarFormularioEmpleado();
    localStorage.setItem("empleados", JSON.stringify(empleados));
    mostrarDatos();
}

function borrarTodo() {
    localStorage.clear();
    empleados = [];
    mostrarDatos();
}

function editarEmpleado(index){
    let empleadoAEditar = empleados[index];
    recuperarDatos(empleadoAEditar);

    indexEditar = index;
}

function recuperarDatos(empleadoAEditar){
    inputNoEmpleado.value = empleadoAEditar.noEmpleado;
    inputNombre.value = empleadoAEditar.nombre;
    inputPuesto.value = empleadoAEditar.puesto;
    inputEstatus.value = empleadoAEditar.estatus;
    inputDescripcion.value = empleadoAEditar.descripcion;
}

function eliminarEmpleado(index) {
    empleados.splice(index, 1);
    localStorage.setItem("empleados", JSON.stringify(empleados));
    mostrarDatos();
}

function limpiarFormularioEmpleado(){
    inputNoEmpleado.value = "";
    inputNombre.value = "";
    inputPuesto.value = "";
    inputEstatus.value = "";
    inputDescripcion.value = "";
}

function mostrarDatos() {
    if (empleados.length === 0){
        cardRegistros.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinPeliculas">
            Sin registros
            </div>
        `
    }else {
        cardRegistros.innerHTML = "";
        empleados.forEach((empleado, index) => {
            cardRegistros.innerHTML += `
            <div class="card text-center">
            <div class="card-header">
              ${empleado.noEmpleado}
            </div>
            <div class="card-body">
              <h5 class="card-title">${empleado.nombre}</h5>
              <h5 class="card-title">${empleado.puesto}</h5>
              <p class="card-text">${empleado.descripcion}</p>
              <button type="button" class="btn btn-outline-success" id="editar-${index}" onclick="editarEmpleado(${index})">Editar</button>
              <button type="button" class="btn btn-outline-danger" id="eliminar-${index}" onclick="eliminarEmpleado(${index})">Eliminar</button>
            </div>
            <div class="card-footer text-body-secondary">
              ${empleado.estatus}
            </div>
          </div>
            `
        });
    }
}



btnGuardar.addEventListener("click", guardarEmpleado);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarDatos();