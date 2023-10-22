traerDatosAPI()
// Define una función llamada traerDatosAPI que realizará una solicitud a una API.
function traerDatosAPI() {
// Utiliza la función fetch para realizar una solicitud GET a la URL de la API.
fetch('https://api.open-meteo.com/v1/forecast?latitude=-40.7617&longitude=-71.6463&current=temperature_2m,is_day&forecast_days=1')
// La función then() se encarga de manejar la respuesta de la solicitud.
    .then(datos => datos.json()) // Convierte los datos de la respuesta a formato JSON y retorna una promesa.
        // Cuando se resuelva la promesa anterior, ejecuta esta función de devolución de llamada.
        .then(datos => {
        const temperatura = datos.current.temperature_2m;
        //console.log(`La temperatura actual es de ${temperatura} grados .`);
        // Actualiza el contenido del elemento HTML con el id "contenido".
        contenido.innerHTML += `
        <div class="show_api">
        <!-- Muestra una imagen obtenida de los datos de la API. -->
        La temperatura actual es  ${temperatura} °C                     
                        </div>`;
                    })
        }