import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/userStyle.css';
import axios from 'axios';

const UserPage = () => {
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
        const response = await axios.get("http://localhost:8080/api/test/user", {
          headers: {
            "x-access-token": accessToken
          }
        });
        const data = response.data;
        console.log("Respuesta del servidor:", data);
        if (data) {
          setUserData(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        navigate('/error', { state: { errorMessage: error.response.data.message } });
        localStorage.removeItem('access_token');
      }
    };

    obtenerJsonServer();
  }, [navigate]);

  return (
    <div className="main">
      <button onClick={cerrarSesionHandler}>Cerrar Sesión</button>

      <h1>Contenido del Usuario</h1>
      <h2>Muestra todos los usuarios con rol user</h2>

      <table>
        <thead>
          <tr>
            <th>Nombre usuario</th>
            <th>Email</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.roles[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPage;
