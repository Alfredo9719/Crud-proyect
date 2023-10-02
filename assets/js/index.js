
let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

const inputNoEmpleado = document.getElementById("inputNoEmpleado");
const inputNombre = document.getElementById("inputNombre");
const inputPuesto = document.getElementById("inputPuesto");
const inputEstatus = document.getElementById("inputEstatus");
const inputDescripcion = document.getElementById("inputDescripcion");

const btnGuardar = document.getElementById("btnGuardar");
const btnEliminarTodo = document.getElementById("btnEliminarTodo");

const tablaRegistros = document.getElementById("tablaRegistros");

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

    }
    localStorage.setItem("empleados", JSON.stringify(empleados));
}



btnGuardar.addEventListener("click", guardarEmpleado);