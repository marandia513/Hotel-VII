document.addEventListener('DOMContentLoaded', function () {
    var reservaForm = document.getElementById('reservaForm');
    reservaForm.addEventListener('submit', function (event) {
        var isValid = true;

        // Validación de nombre
        var nombre = document.getElementById('nombre');
        if (nombre.value.trim() === '') {
            alert('Por favor, ingresa tu nombre.');
            isValid = false;
        }

        // Validación de apellido
        var apellido = document.getElementById('apellido');
        if (apellido.value.trim() === '') {
            alert('Por favor, ingresa tu apellido.');
            isValid = false;
        }

        // Validación de email
        var email = document.getElementById('email');
        if (email.value.trim() === '') {
            alert('Por favor, ingresa tu email.');
            isValid = false;
        } else if (!email.validity.valid) { // Validación de formato de email
            alert('Por favor, ingresa un email válido.');
            isValid = false;
        }

        // Validación de contacto
        var contacto = document.getElementById('contacto');
        if (contacto.value.trim() === '') {
            alert('Por favor, ingresa un número de contacto.');
            isValid = false;
        }

        // Validación de fechas
        var fechaEntrada = document.getElementById('fecha_entrada');
        var fechaSalida = document.getElementById('fecha_salida');
        if (fechaEntrada.value === '') {
            alert('Por favor, selecciona una fecha de entrada.');
            isValid = false;
        }
        if (fechaSalida.value === '') {
            alert('Por favor, selecciona una fecha de salida.');
            isValid = false;
        }
        if (fechaEntrada.value > fechaSalida.value) {
            alert('La fecha de entrada no puede ser posterior a la fecha de salida.');
            isValid = false;
        }

        // Validación de cantidad de adultos
        var cantidadAdultos = document.getElementById('can_may');
        if (cantidadAdultos.value < 1) {
            alert('Debe haber al menos un adulto.');
            isValid = false;
        }

        // Validación de cantidad de menores
        var cantidadMenores = document.getElementById('can_men');
        if (cantidadMenores.value < 0) {
            alert('La cantidad de menores no puede ser negativa.');
            isValid = false;
        }

        // Si alguna validación falla, previene el envío del formulario
        if (!isValid) {
            event.preventDefault();
        }
    });
});
