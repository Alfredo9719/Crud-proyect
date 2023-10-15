
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
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Guardado con exito',
            showConfirmButton: false,
            timer: 2500,
          })
    }else {
        empleados[indexEditar] = empleado;
        indexEditar = null;
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Modificado con exito',
            showConfirmButton: false,
            timer: 2500,
          })
    }
    limpiarFormularioEmpleado();
    localStorage.setItem("empleados", JSON.stringify(empleados));
    mostrarDatos();
}

function borrarTodo() {
    localStorage.clear();
    empleados = [];
    Swal.fire({
        title: '¿Estas seguro?',
        text: "¡Estos son cambios irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Borrado!',
            'Archivos Eliminados',
            'success',
            mostrarDatos()
          )
        }
      })
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
    Swal.fire({
        title: '¿Estas seguro?',
        text: "¡Estos son cambios irreversibles!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'SI, Borrar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Borrado!',
            'Empleado eliminado',
            'success',
            mostrarDatos()
          )
        }
      })
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