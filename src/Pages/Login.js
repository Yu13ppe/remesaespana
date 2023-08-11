import React from 'react';
// import '../Assets/scss/_Login.scss';
import remesalogo from '../Assets/Images/remesalogo.png';

function Login() {
  return (


    <div className="card">
      <img className="logo" src={remesalogo} alt="Logo" />
      <form className="form">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Contrasena" />
        <button type="submit">Iniciar Sesion</button>
      </form>
      <footer>
        <a href="#">¿Olvidaste tu contraseña?</a>
      </footer>
    </div>

  );
}

export { Login };
