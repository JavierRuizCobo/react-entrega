import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/publicStyle.css';
import axios from 'axios';

const PublicPage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const redirectToLoginPage = () => {
    navigate("/logInSignUp")
  };

  const llenarTabla = (data) => {
    const tablaBody = data.map((role) => (
      <tr key={role.name}>
        <td>{role.name}</td>
      </tr>
    ));

    return tablaBody;
  };

  useEffect(() => {
    
    const obtenerContenidoPublico = async () => {

      try {
        localStorage.removeItem('access_token');
        const response = await axios.get("http://localhost:8080/api/test/all");

        const data = response.data;
        if(data) {
          setData(data)
        }
        
      } catch (error) {
        console.error("Error al realizar la solicitud GET:", error);
      }

    };

    obtenerContenidoPublico();
  }, []);

  return (
    <div id="container">
      <button id="loginButton" onClick={redirectToLoginPage}>Iniciar Sesión / Registrarse</button>

      <h1>Contenido público</h1>
      <table id="miTabla">
        <thead>
          <tr>
            <th>Roles que puedes tener</th>
          </tr>
        </thead>
        <tbody id="tablaBody">{llenarTabla(data)}</tbody>
      </table>
    </div>
  );
};

export default PublicPage;
