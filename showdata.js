//*window.onload = function () {
    document.addEventListener('DOMContentLoaded', function() {
        var params = new URLSearchParams(location.search);
        var tableBody = document.getElementById('dataBody');
    
        for (var pair of params.entries()) {
            var field = pair[0];
            var value = pair[1] || "null";
    
            var newRow = tableBody.insertRow();
            var cell1 = newRow.insertCell(0);
            var cell2 = newRow.insertCell(1);
            cell1.textContent = field;
            cell2.textContent = value;
        }
    });
    
    