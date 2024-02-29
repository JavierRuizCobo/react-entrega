import { useState } from 'react';
import './styles/style.css';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpFormData),
      });

      const data = await response.json();

      console.log(data);
      window.alert(data.message);
      document.getElementById('signupForm').reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signInFormData),
      });

      const data = await response.json();

      console.log('Respuesta del servidor:', data);

      if (data.accessToken) {
        localStorage.setItem('access_token', data.accessToken);

        const accessToken = localStorage.getItem('access_token');

        try {
          const response = await fetch('http://localhost:8080/api/auth/userfile', {
            method: 'GET',
            headers: {
              'x-access-token': `${accessToken}`,
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          console.log(data.rol)
          navigate(data.rol);

        } catch (error) {
          console.error('Error al obtener el contenido del archivo:', error);
        }
      } else {
        window.alert(data.message);
      }

      document.getElementById('signinForm').reset();
    } catch (error) {
      console.error(error);
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
          <select name="roles" id="roles" required onChange={handleRolesChange}>
            <option value="" disabled selected>Elegir rol</option>
            <option value="user">Usuario</option>
            <option value="moderator">Moderador</option>
            <option value="admin">Administrador</option>
          </select>
          <button type="submit">Registrar</button>
        </form>
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
      </div>
    </div>
  );
  }  

  export default LogInSignUp;
