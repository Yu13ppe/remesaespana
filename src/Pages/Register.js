import React, { useState } from 'react';
import axios from 'axios';
import remesalogo from '../Assets/Images/remesalogo.png';
import remesaregister from '../Assets/Images/Register-Woman.png';
import { Input, Button, Label, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';


function Register() {
  const [use_name, setUse_name] = useState('');
  const [use_lastName, setUse_lastName] = useState('');
  const [use_email, setUse_email] = useState('');
  const [use_password, setUse_password] = useState('');
  const [use_confirm, setUse_confirm] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post(
        'https://apiremesa.up.railway.app/Users/create',
        {
          use_name,
          use_lastName,
          use_NIE: '',
          use_passport: '',
          use_email,
          use_password,
          use_phone: '',
          use_verif: 'N',
          use_img: ''
        }
      );

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='RegisterBody'>
      <div className="card-register" style={{ width: '600px' }}>
        <img className="logo" src={remesalogo} alt="Logo" />
        <form onSubmit={handleSubmit} className="form">

          <Input
            type="text"
            placeholder="Nombre"
            onChange={(e)=>setUse_name(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Apellido"
            onChange={e => setUse_lastName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={e => setUse_email(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            onChange={e => setUse_password(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirma tu contraseña"
            onChange={e => setUse_confirm(e.target.value)}
            required
            invalid={use_confirm !== use_password}
          />
          {use_confirm !== use_password && (
            <FormFeedback invalid>
              Las claves deben ser iguales
            </FormFeedback>
          )}

          <div className="checkboxes">
            <Label>
              <Input type="checkbox" />
              Aceptar los términos y condiciones
            </Label>
          </div>

          <Button type='submit' >Registrar</Button>
          <Link to='/Login'><Button color='secondary'>Volver</Button></Link>
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