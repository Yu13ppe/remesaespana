import React from 'react';
import remesalogo from '../Assets/Images/remesalogo.png';
import remesaregister from '../Assets/Images/Register-Woman.png';

function Register() {
  return (
    <div className="card-container">
      <div className="card">
        <div className="form-container">
          <img className="logo" src={remesalogo} alt="Logo" />
          <form className="form">
            <input type="name" placeholder="Nombre" />
            <input type="password" placeholder="Contrasena" />
            <input type="password" placeholder="Confirma tu contrasena" />
            <input type="email" placeholder="email" />

            <div className="checkboxes">
              <label>
                <input type="checkbox" />
                Aceptar los términos y condiciones
              </label>
            </div>

            <button type="submit">Registrar</button>
          </form>
          <button className="small-gray-button">Volver</button>
        </div>
        <img className="register-image" src={remesaregister} alt="Register" />
      </div>
    </div>
  );
}

export { Register };
