
let empleados = JSON.parse(localStorage.getItem("empleados")) || [];

const inputNoEmpleado = document.getElementById("inputNoEmpleado");
const inputNombre = document.getElementById("inputNombre");
const inputPuesto = document.getElementById("inputPuesto");
const inputEstatus = document.getElementById("inputEstatus");
const inputDescripcion = document.getElementById("inputDescripcion");

const btnGuardar = document.getElementById("btnGuardar");
const btnBorrarTodo = document.getElementById("btnBorrarTodo");

const tablaRegistros = document.getElementById("tablaRegistros");
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

    }
    localStorage.setItem("empleados", JSON.stringify(empleados));
    mostrarDatos();
}

function borrarTodo() {
    localStorage.clear();
    empleados = [];
    mostrarDatos();
}

function mostrarDatos() {
    if (empleados.length === 0){
        tablaRegistros.innerHTML = `
        <div class="alert alert-primary" role="alert" id="alertSinPeliculas">
            Sin registros
            </div>
        `
    }else {
        tablaRegistros.innerHTML = "";
        empleados.forEach((empleado, index) => {
            tablaRegistros.innerHTML += `
            <tr>
            <th scope="row">${empleado.noEmpleado}</th>
            <td>${empleado.nombre}</td>
            <td>${empleado.puesto}</td>
            <td>${empleado.estatus}</td>
            <td>${empleado.descripcion}</td>
            <td><button type="button" class="btn btn-success" id="editar-${index}" onclick="editarEmpleado(${index})">Editar</button></td>
            <td><button type="button" class="btn btn-danger" id="eliminar-${index}" onclick="eliminarEmpleado(${index})">Eliminar</button></td>
          </tr>
            `
        });
    }
    console.log("muestra")
}



btnGuardar.addEventListener("click", guardarEmpleado);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarDatos();