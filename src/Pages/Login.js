import React, { useState } from 'react';
import axios from 'axios';
import remesalogo from '../Assets/Images/remesalogo.png';
import slogan from '../Assets/Images/sloganremesa.png';
import { Input, Alert } from 'reactstrap';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';
import { FaUser, FaLock, } from 'react-icons/fa';

function Login() {
  const history = useHistory();
  const [use_email, setEmail] = useState('');
  const [use_password, setPassword] = useState('');
  const [tkn, setTkn] = useState('');
  const [error, setError] = useState("");
  const [attemps, setAttemps] = useState(3);
  const {setLogged, setAccessToken, logged } = useDataContext();
  const [alertVisible, setAlertVisible] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const fetchData = async (email, password) => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/login/${email}/${password}`);
      setAccessToken(response.data.data);
      const response2 = await axios.get(`https://apiremesa.up.railway.app/Auth/findByToken/${response.data.data.access_token}`);
      setTkn(response2.data);
      setLogged(true);
      history.push({
        pathname: "/Changes",
        state: {
          user: tkn,
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario

    fetchData(use_email, use_password)

    if (attemps === 0) {
      setError("Has superado el número de intentos. Intenta más tarde.");
      setAlertVisible(true);
      setInputDisabled(true);
    }
    else {
      setAttemps(attemps - 1);
      const error = `Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`;
      setError(error);
      setAlertVisible(true);
    }
  };

  return (
    logged ? (
      <Redirect to="/Changes" />
    ) :
    (<div className="LoginBody">
      <div>
        <div className="card-logintop">
          <img className="slogan" src={slogan} alt="slogan" />
          <p className="parrafo-login">¿No tienes cuenta aún? <Link to='/Register' id='RegisterA'>¡Regístrate!</Link></p>
        </div>
        <div className="card-logintop2"></div>
        <div className="card-login">
          <Link to='/'>
            <img className="logo" src={remesalogo} alt="Logo" />
          </Link>
          <form className="form" onSubmit={handleSubmit}>
            {error && (
              <Alert color="danger" isOpen={alertVisible}>
                {error}
                <br></br>
                <Link to="/Recover" className="recover-link">
                  Recuperar contraseña
                </Link>
              </Alert>)}
            <div className="container">
              <div className='row col-12'>
                <div className='d-flex align-items-center col-12'>
                  <FaUser style={{ paddingBottom: '15px', fontSize: '45px' }} />
                  <Input
                    className={`containerCorreo ${inputDisabled ? 'disabled' : ''}`}
                    type="email"
                    value={use_email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    id="exampleEmail"
                    placeholder="Introduzca su correo"
                    disabled={inputDisabled}
                  />

                </div>
              </div>

              <div className='row col-12'>
                <div className='d-flex align-items-center col-12'>
                  <FaLock style={{ paddingBottom: '20px', fontSize: '45px' }} />
                  <Input
                    className={`containerPassword ${inputDisabled ? 'disabled' : ''}`}
                    id="examplePassword"
                    name="password"
                    placeholder="Introduzca su contraseña"
                    type="password"
                    value={use_password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={inputDisabled}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className='botonInicio btnLogin'>
              Iniciar Sesión
            </button>
          </form>
          <div>
            <Link className="Recover" to="/Recover">¿Olvidaste la contraseña?</Link>
          </div>
        </div>
      </div>
    </div>)
  );
}

export { Login };
