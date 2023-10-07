window.onload = function () {
    let showdata = document.querySelector('.table');
    var args = location.search.substr(1).split('&');

    for (var i = 0; i < args.length; ++i) {
        var parts = args[i].split('=');
        if (parts.length === 2) { // Verifica que haya dos partes (nombre y valor)
            var field = decodeURIComponent(parts[0]); // Decodifica el nombre
            var value = decodeURIComponent(parts[1]); // Decodifica el valor

            // Crea una nueva fila de tabla para cada par de parámetros
            var row = document.createElement('tr');
            var nameCell = document.createElement('td');
            nameCell.textContent = field;
            var valueCell = document.createElement('td');
            valueCell.textContent = value;

            // Agrega las celdas a la fila
            row.appendChild(nameCell);
            row.appendChild(valueCell);

            // Agrega la fila a la tabla
            showdata.appendChild(row);
        }
    }
}
