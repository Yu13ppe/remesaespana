import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import slogan from '../Assets/Images/sloganremesa.png';
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Recover() {
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [to, setTo] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Users`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setUser]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (event) => {

    const verifUser = user.find((user) => user.usu_email === to)
    event.preventDefault();
    if (!verifUser) {
      toast.error('El correo no existe');
      return;
    }
    try {
      await axios.post(`https://apiremesa.up.railway.app/Auth/forgotPasswordUser/${to}`);
      toast.success('El correo fue enviado con éxito');
      setTo('');

      setTimeout(() => {
        history.push('/Login');
      }, 5000);
    } catch (error) {
      console.log(error);
      toast.error('Hubo un error al enviar el correo');
    }
  };

  return (
    <div className='RecoverBody'>
      <div>
        <div className="card-recovertop">
          <img className="slogan" src={slogan} alt="slogan" />
          <p className="parrafo-login">
            ¿No tienes cuenta aún? <Link to='/Register' id='RegisterA'>¡Regístrate!</Link>
          </p>
        </div>
        <div className="card-recovertop2"></div>
        <div className="card-recover">
          <Link to='/'>
            <img className="logo" src={remesalogo} alt="Logo" />
          </Link>
          <form className="form" onSubmit={handleSubmit}>
            <Input
              className='containerCorreo'
              type="email"
              name="email"
              id="to"
              onChange={(e) => setTo(e.target.value)}
              placeholder="Introduzca su correo"
            />
            <Button type="submit" color='primary'>
              Recuperar contraseña
            </Button>
            <Link to='/Login'>
              <Button color='secondary'>
                Volver
              </Button>
            </Link>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export { Recover };
