// import React, { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
import slogan from '../Assets/Images/sloganremesa.png';
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function RecoverUpdate() {
  // const [user, setUser] = useState([]);
  // const [to, setTo] = useState("");

  // const fetchData = useCallback(async () => {
  //   try {
  //     const response = await axios.get(`https://apiremesa.up.railway.app/Users`);
  //     setUser(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [setUser]);

  // useEffect(() => {
  //   fetchData();
  // }, [fetchData]);

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
          <form className="form">
            <Input
              className='containerCorreo'
              type="password"
              name="text"
              id="to"
              // onChange={(e) => setTo(e.target.value)}
              placeholder="Introduzca su contraseña"
            />
            <Input
              className='containerCorreo'
              type="password"
              name="email"
              id="to"
              // onChange={(e) => setTo(e.target.value)}
              placeholder="Introduzca su contraseña"
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
    </div>
  );
}

export { RecoverUpdate };
