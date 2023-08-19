import React, { useState, useEffect } from 'react';
import axios from 'axios';
import slogan from '../Assets/Images/sloganremesa.png'
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

function Recover() {
  const history = useHistory();
  const [use_email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [attemps, setAttemps] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario
    const user = users.find((user) => user.use_email === use_email);

    if (attemps === 0) {
      setError("Has superado el número de intentos. Intenta más tarde.");
    }
    else if (user) {
      // Si se encuentra el usuario, cambia de ventana
      const user = users.find(user => user.use_email === use_email);
      const use_name = `${user.use_name} ${user.use_lastName}`;
      const use_amount = `${user.use_amount}`;
      const use_verif = `${user.use_verif}`;

      history.push({
        pathname: "/Changes",
        state: {
          mail: use_email,
          name: use_name,
          amount: use_amount,
          verif: use_verif
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
    <div className='RecoverBody'>
      <div className="card-recovertop">
        <img className="slogan" src={slogan} alt="slogan" />
        <p className="parrafo-login">¿No tienes cuenta aún? <Link to='/Register' id='RegisterA'>¡Regístrate!</Link></p>
      </div>
      <div className="card-recovertop2"></div>
      <div className="card-recover">
        <img className="logo" src={remesalogo} alt="Logo" />
        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
          <Input
            className='containerCorreo'
            type="email"
            value={use_email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="exampleEmail"
            placeholder="Introduzca su correo"
          />

          <button type="submit" className='botonInicio btnLogin'>
            Recuperar contraseña
          </button>
        </form>

      </div>
    </div>
  );
}

export { Recover }