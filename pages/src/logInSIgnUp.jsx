import { useState } from 'react';
import './styles/style.css';

const LogInSignUp = () => {
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

  const handleSignUpChange = (e) => {
    setSignUpFormData({
      ...signUpFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRolesChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setSignUpFormData({
      ...signUpFormData,
      roles: selectedOptions,
    });
  };

  const handleSignInChange = (e) => {
    setSignInFormData({
      ...signInFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signUpFormData),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      window.alert(data.message);
      document.getElementById("signupForm").reset();
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signInFormData),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Respuesta del servidor:", data);

      if (data.accessToken) {
        localStorage.setItem('access_token', data.accessToken);

        const accessToken = localStorage.getItem('access_token');

        fetch("http://localhost:8080/api/auth/userfile", {
          method: "GET",
          headers: {
            "x-access-token": `${accessToken}`
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          console.log(response)
          window.location.href = response.url;
          return response;
        })
        .catch(error => {
          console.error("Error al obtener el contenido del archivo:", error);
        });
      } else {
        window.alert(data.message);
      }

      document.getElementById("signinForm").reset();
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="signup">
        <form id="signupForm" onSubmit={handleSignUpSubmit}>
          <label htmlFor="chk" aria-hidden="true">Registrarse</label>
          <input type="text" name="username" id="userNameSignUp" placeholder="Nombre de usuario" required="" onChange={handleSignUpChange} />
          <input type="email" name="email" placeholder="Email" required="" onChange={handleSignUpChange} />
          <input type="password" name="password" placeholder="Contraseña" required="" onChange={handleSignUpChange} />
          <select name="roles" id="roles" required="" onChange={handleRolesChange}>
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
          <label htmlFor="chk" aria-hidden="true">Iniciar sesión</label>
          <input type="text" name="username" id="userName" placeholder="Nombre de usuario" required="" onChange={handleSignInChange} />
          <input type="password" name="password" placeholder="Contraseña" required="" onChange={handleSignInChange} />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
};

export default LogInSignUp;
