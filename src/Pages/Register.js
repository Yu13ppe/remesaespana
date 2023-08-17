import React from 'react';
import remesalogo from '../Assets/Images/remesalogo.png';
import remesaregister from '../Assets/Images/Register-Woman.png';
import { Input, Button, Label } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';


function Register() {
  return (
    <div className='RegisterBody'>
      <div className="card-register" style={{ width: '600px' }}>
        <img className="logo" src={remesalogo} alt="Logo" />
        <form className="form">
          <Input type="name" placeholder="Nombre" />
          <Input type="password" placeholder="Contrasena" />
          <Input type="password" placeholder="Confirma tu contrasena" />
          <Input type="email" placeholder="Email" />

          <div className="checkboxes">
            <Label>
              <Input type="checkbox" />
              Aceptar los términos y condiciones
            </Label>
          </div>

          <Button >Registrar</Button>
          <Link to='/Login' ><Button color='secondary'>Volver</Button></Link>
        </form>

        <div className="register-image-container">
          <img className="register-image" src={remesaregister} alt="Register" />
        </div>
        <div>
        </div>
      </div>
    </div>


  );
}

export { Register };