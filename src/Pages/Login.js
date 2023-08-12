import React, { useState } from 'react';
// import '../Assets/scss/_Login.scss';
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

const users = [
  {
    email: 'portillo@gmail.com',
    password: '130302',
  }
]

function Login() {
  const history = useHistory();
  const [usu_email, setEmail] = useState('');
  const [usu_password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [attemps, setAttemps] = useState(3);

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const user = users.find((user) => user.email === usu_email && user.password === usu_password);

    if (attemps === 0) {
      setError("Has superado el número de intentos. Intenta más tarde.");
    }
    else if (user) {
      // Si se encuentra el usuario, cambia de ventana
      // const usuario = users.find(usuario => usuario.email === usu_email);
      // const usu_name = `${usuario.usu_name} ${usuario.usu_lastName}`;
      // const fechaNacimiento = new Date(usuario.usu_birthday);
      // const usu_birthday = new Date(Date.now() - fechaNacimiento.getTime()).getFullYear() - 1970;

      history.push({
        pathname: "/Profile",
        state: {
          mail: usu_email,
        }
      });
    }
    else {
      // Si no se encuentra el usuario, establece un mensaje de error
      setAttemps(attemps - 1);
      setError(`Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`);
    }
  };


  return (


    <div className="card">
      <img className="logo" src={remesalogo} alt="Logo" />
      <form className="form" onSubmit={handleSubmit}>
        <Input
          className='containerCorreo'
          type="email"
          value={usu_email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="exampleEmail"
          placeholder="Introduzca su correo"
        />
        <Input
          className='containerPassword'
          id="examplePassword"
          name="password"
          placeholder="Introduzca su contraseña"
          type="password"
          value={usu_password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className='botonInicio btnLogin'>
          Iniciar Sesión
        </button>
      </form>
      <footer>
        <Link to="/Recover">¿Olvidaste la contraseña?</Link>
      </footer>
    </div>

  );
}

export { Login };
