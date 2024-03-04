import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/moderatorStyle.css';
import axios from 'axios';

const ModeratorPage = () => {
  const [moderatorData, setModeratorData] = useState([]);
  const navigate = useNavigate();


  const cerrarSesionHandler = () => {
    localStorage.removeItem('access_token');
    window.history.replaceState(null, null, '/');
    navigate('/')
  };

  useEffect(() => {
    const obtenerContenidoModerator = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get("http://localhost:8080/api/test/moderator", {
          headers: {
            "x-access-token": accessToken
          }
        });
        const data = response.data;
        console.log("Respuesta del servidor:", data);
        if (data) {
          setModeratorData(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        navigate('/error', { state: { errorMessage: error.response.data.message } });
        localStorage.removeItem('access_token');
      }
    };

    obtenerContenidoModerator();
  }, [navigate]);

  return (
    <div className="main">
      <button onClick={cerrarSesionHandler}>Cerrar Sesión</button>

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
        <tbody>
          {moderatorData.map((user) => (
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

export default ModeratorPage;
