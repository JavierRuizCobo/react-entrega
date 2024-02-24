import { useEffect, useState } from 'react';
import './styles/adminStyle.css';

const AdminPage = () => {
  const [userData, setUserData] = useState([]);

  const cerrarSesionHandler = () => {
    localStorage.removeItem('access_token');
    window.history.replaceState(null, null, '/');
    window.location.href = '/';
  };

  useEffect(() => {
    const obtenerJsonServer = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch("http://localhost:8080/api/test/admin", {
          method: "GET",
          headers: {
            "x-access-token": accessToken
          }
        });
        const data = await response.json();
        console.log("Respuesta del servidor para la ruta de usuario:", data);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        window.location.href = '/';
        localStorage.removeItem('access_token');
      }
    };

    obtenerJsonServer();
  }, []);

  return (
    <div className="main">
      <button onClick={cerrarSesionHandler}>Cerrar Sesión</button>

      <h1>Contenido del Admin</h1>
      <h2>Muestra todos los usuarios</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre usuario</th>
            <th>Email</th>
            <th>Creado</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.createdAt}</td>
              <td>{user.roles[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
