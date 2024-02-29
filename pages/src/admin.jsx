import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/adminStyle.css';
import axios from 'axios';


const AdminPage = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const cerrarSesionHandler = () => {
    localStorage.removeItem('access_token');
    window.history.replaceState(null, null, '/');
    navigate('/')
  };

  useEffect(() => {
    const obtenerJsonServer = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get("http://localhost:8080/api/test/admin", {
          headers: {
            "x-access-token": accessToken
          }
        });
        const data = response.data;
        console.log("Respuesta del servidor para la ruta de usuario:", data);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        window.alert(error.response.data.message);
        //navigate('/');
        localStorage.removeItem('access_token');
      }
    };

    obtenerJsonServer();
  }, [navigate]);

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
