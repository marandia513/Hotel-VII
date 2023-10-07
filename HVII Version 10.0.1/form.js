window.onload = function () {
const carousel = document.querySelector('.container_form');    

//Obtener referencias a los campos de fecha
var fechaIngreso = document.getElementById("fecha_ingreso");
var fechaEgreso = document.getElementById("fecha_egreso");    
// Agregar un evento de cambio al campo de fecha de ingreso
fechaIngreso.addEventListener("change", function () {
    // Establecer la fecha mínima en el campo de fecha de egreso como la fecha seleccionada en el campo de fecha de ingreso
    fechaEgreso.min = fechaIngreso.value;
});

// Obtener referencias a los campos de fecha
var fechaIngreso = document.getElementById("fecha_ingreso");
var fechaEgreso = document.getElementById("fecha_egreso");
// Obtener la fecha actual en formato ISO
var fechaActual = new Date().toISOString().split("T")[0];
// Establecer la fecha mínima en el campo de fecha de ingreso como la fecha actual
fechaIngreso.min = fechaActual;
// Agregar un evento de cambio al campo de fecha de ingreso
fechaIngreso.addEventListener("change", function () {
// Establecer la fecha mínima en el campo de fecha de egreso como la fecha seleccionada en el campo de fecha de ingreso
    fechaEgreso.min = fechaIngreso.value;
});

} 