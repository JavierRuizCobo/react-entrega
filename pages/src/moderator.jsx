import { useEffect } from 'react';
import './styles/moderatorStyle.css';

const ModeratorPage = () => {
  useEffect(() => {
    const cerrarSesionHandler = () => {
      localStorage.removeItem('access_token');
      window.history.replaceState(null, null, '/');
      window.location.href = '/';
    };

    document.getElementById('cerrarSesionBtn').addEventListener('click', cerrarSesionHandler);

    return () => {
      document.getElementById('cerrarSesionBtn').removeEventListener('click', cerrarSesionHandler);
    };
  }, []);

  const llenarTabla = (data) => {
    const tablaBody = document.getElementById('tablaBody');

    tablaBody.innerHTML = '';

    data.forEach((user) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.roles[0]}</td>
      `;
      tablaBody.appendChild(fila);
    });
  };

  const obtenerJsonServer = () => {
    const accessToken = localStorage.getItem('access_token');

    fetch("http://localhost:8080/api/test/moderator", {
      method: "GET",
      headers: {
        "x-access-token": `${accessToken}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor para la ruta de usuario:", data);
      if (data) {
        llenarTabla(data);
      }
    })
    .catch(error => {
      console.error("Error al realizar la solicitud GET:", error);
      window.location.href = '/';
      localStorage.removeItem('access_token');
    });
  };

  useEffect(() => {
    obtenerJsonServer();
  }, []);

  return (
    <div className="main">
      <button id="cerrarSesionBtn">Cerrar Sesión</button>
      <h1>Contenido del Moderador</h1>
      <h2>Muestra todos los usuarios con rol user o moderador</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody id="tablaBody">
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorPage;
