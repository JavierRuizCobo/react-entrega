function redirectToLoginPage() {

    window.location.href = "/logInSignUp";
}

function llenarTabla(data) {

    datosJSON = data;
    const tablaBody = document.getElementById('tablaBody');

    tablaBody.innerHTML = '';

    datosJSON.forEach(role => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${role.name}</td>
        `;
        tablaBody.appendChild(fila);
    });
}


function obtenerJsonServer(){
    localStorage.removeItem('access_token');


    fetch("/api/test/all", {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        console.log("Respuesta del servidor para la ruta de usuario:", data);
        if(data){
            llenarTabla(data)
        }
    })
    .catch(error => {
        console.error("Error al realizar la solicitud GET:", error);
    });
  }
  document.addEventListener('DOMContentLoaded', obtenerJsonServer);