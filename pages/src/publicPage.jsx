import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/publicStyle.css';

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

  const obtenerJsonServer = () => {
    localStorage.removeItem('access_token');

    fetch("http://localhost:8080/api/test/all", {
      method: "GET",
    })
      .then(response => response.json())
      .then(data => {
        console.log("Respuesta del servidor para la ruta de usuario:", data);
        if (data) {
          setData(data);
        }
      })
      .catch(error => {
        console.error("Error al realizar la solicitud GET:", error);
      });
  };

  useEffect(() => {
    obtenerJsonServer();
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
