import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/adminStyle.css';
import axios from 'axios';


const AdminPage = () => {
  const [adminData, setAdminData] = useState([]);
  const navigate = useNavigate();

  const cerrarSesionHandler = () => {
    localStorage.removeItem('access_token');
    window.history.replaceState(null, null, '/');
    navigate('/')
  };

  useEffect(() => {
    const obtenerContenidoAdmin = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await axios.get("http://localhost:8080/api/test/admin", {
          headers: {
            "x-access-token": accessToken
          }
        });
        const data = response.data;
        if (data) {
          setAdminData(data);
        }
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
        navigate('/error', { state: { errorMessage: error.response.data.message } });
        localStorage.removeItem('access_token');
      }
    };
    obtenerContenidoAdmin();
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
          {adminData.map((user) => (
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
