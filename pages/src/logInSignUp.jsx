import { useState } from 'react';
import './styles/style.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogInSignUp = () => {
  const navigate = useNavigate();

  const [signUpFormData, setSignUpFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: [],
  });

  const [signInFormData, setSignInFormData] = useState({
    username: '',
    password: '',
  });

  const [signUpError, setsignUpError] = useState(null);
  const [logInError, logInSetError] = useState(null);

  const handleSignUpChange = (event) => {
    setSignUpFormData({
      ...signUpFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRolesChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSignUpFormData({
      ...signUpFormData,
      roles: selectedOptions,
    });
  };

  const handleSignInChange = (event) => {
    setSignInFormData({
      ...signInFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signup', signUpFormData);

      console.log(response.data);
      window.alert(response.data.message);
      document.getElementById('signupForm').reset();

    } catch (error) {
      console.error(error);
      setsignUpError(error.response.data.message)
      document.getElementById('signupForm').reset();
    }
  };


  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', signInFormData);

      console.log('Respuesta del servidor:', response.data);

      if (response.data.accessToken) {
        localStorage.setItem('access_token', response.data.accessToken);

        const accessToken = localStorage.getItem('access_token');

        try {
          const userFileResponse = await axios.get('http://localhost:8080/api/auth/userfile', {
            headers: {
              'x-access-token': accessToken,
            },
          });

          const data = userFileResponse.data;
          navigate(data.rol);
        } catch (error) {
          console.error('Error al obtener el contenido del archivo:', error);
        }
      } else {
        window.alert(response.data.message);
      }

      document.getElementById('signinForm').reset();
    } catch (error) {
      console.error(error.response.data.message);
      logInSetError(error.response.data.message);
    }
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />
  
      <div className="signup">
        <form id="signupForm" onSubmit={handleSignUpSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Registrarse
          </label>
          <input
            type="text"
            name="username"
            id="userNameSignUp"
            placeholder="Nombre de usuario"
            required
            onChange={handleSignUpChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleSignUpChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={handleSignUpChange}
          />
          <select name="roles" id="roles" required onChange={handleRolesChange} defaultValue="">
            <option value="" disabled>Elegir rol</option>
            <option value="user">Usuario</option>
            <option value="moderator">Moderador</option>
            <option value="admin">Administrador</option>
          </select>

          <button type="submit">Registrar</button>
        </form>
        <p className="Error">
              {signUpError}
            </p>
      </div>
  
      <div className="login">
        <form id="signinForm" onSubmit={handleSignInSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Iniciar sesión
          </label>
          <input
            type="text"
            name="username"
            id="userName"
            placeholder="Nombre de usuario"
            required
            onChange={handleSignInChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            required
            onChange={handleSignInChange}
          />
          <button type="submit">Iniciar sesión</button>
        </form>
        <p className="Error">
              {logInError}
            </p>
      </div>
    </div>
  );
  }  

  export default LogInSignUp;
