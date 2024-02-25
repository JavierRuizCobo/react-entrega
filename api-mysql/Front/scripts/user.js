document.getElementById('cerrarSesionBtn').addEventListener('click', function() {

    localStorage.removeItem('access_token');

    window.location.href = '/';
});


function llenarTabla(data) {

    datosJSON = data;
    const tablaBody = document.getElementById('tablaBody');

    tablaBody.innerHTML = '';

    console.log(datosJSON);

    datosJSON.forEach(user => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${user.username}</td>
          <td>${user.email}</td>
          <td>${user.roles[0]}</td>
        `;
        tablaBody.appendChild(fila);
    });
}


function obtenerJsonServer(){
    const accessToken = localStorage.getItem('access_token')
    fetch("/api/test/user", {
        method: "GET",
        headers: {
            "x-access-token": `${accessToken}`
        }
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
        window.location.href = '/';
        localStorage.removeItem('access_token');

    });
  }

  document.addEventListener('DOMContentLoaded', obtenerJsonServer);