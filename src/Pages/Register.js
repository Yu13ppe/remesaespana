import React, { useState } from 'react';
import axios from 'axios';
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input, Button, Label, FormFeedback, InputGroup } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { FaUser, FaLock, FaRegEnvelope } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const history = useHistory();
  const [use_name, setUse_name] = useState('');
  const [use_lastName, setUse_lastName] = useState('');
  const [use_email, setUse_email] = useState('');
  const [use_password, setUse_password] = useState('');
  const [use_confirm, setUse_confirm] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post(
        'https://apiremesa.up.railway.app/Auth/register',
        {
          use_name,
          use_lastName,
          use_dni: '',
          use_email,
          use_password,
          use_phone: '',
          use_verif: 'N',
          use_img: ''
        }
      );

      toast.success('¡Registro exitoso!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        history.push('/Login');
      }, 5000);

    } catch (error) {
      toast.error(error.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className='RegisterBody'>
      <div className="card-register" style={{ width: '600px' }}>
        <Link to='/'>
          <img className="logo" src={remesalogo} alt="Logo" />
        </Link>
        <form onSubmit={handleSubmit} className="form">
          <div className='inputs'>
            <div className='row col-12'>
              <div className='d-flex align-items-center col-12'>
                <FaUser style={{ marginTop: '30px', paddingTop: '5px', paddingRight: '5px', fontSize: '35px' }} />
                <Input
                  className='input'
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => setUse_name(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row col-12'>
              <div className='d-flex align-items-center col-12'>
                <FaUser style={{ marginTop: '30px', paddingTop: '5px', paddingRight: '5px', fontSize: '35px' }} />
                <Input
                  className='input'
                  type="text"
                  placeholder="Apellido"
                  onChange={e => setUse_lastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row col-12'>
              <div className='d-flex align-items-center col-12'>
                <FaRegEnvelope style={{ marginTop: '30px', paddingTop: '5px', paddingRight: '5px', fontSize: '35px' }} />
                <Input
                  className='input'
                  type="email"
                  placeholder="Email"
                  onChange={e => setUse_email(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row col-12'>
              <div className='d-flex align-items-center col-12'>
                <FaLock style={{ marginTop: '30px', paddingTop: '5px', paddingRight: '5px', fontSize: '35px' }} />
                <Input
                  className='input'
                  type="password"
                  placeholder="Contraseña"
                  onChange={e => setUse_password(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className='row col-12'>
              <div className='d-flex align-items-center col-12'>
                <InputGroup>
                  <FaLock style={{ marginTop: '30px', paddingRight: '5px', fontSize: '35px' }} />
                  <Input
                    className='input'
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
                </InputGroup>
              </div>

            </div>

          </div>

          <div className="checkboxes">
            <Label>
              <Input type="checkbox" />
              Aceptar los términos y condiciones
            </Label>
          </div>

          <Button type='submit' >Registrar</Button>
          <Link to='/Login'><Button color='secondary'>Volver</Button></Link>
        </form>

        <div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export { Register };