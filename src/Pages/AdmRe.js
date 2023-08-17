import React, { useState, useEffect } from 'react';
import axios from 'axios';
import remesalogo from '../Assets/Images/remesalogo.png';
import slogan from '../Assets/Images/sloganremesa.png';
import { Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';

function AdmRe() {
    const history = useHistory();
    const [use_email, setEmail] = useState('');
    const [use_password, setPassword] = useState('');
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
        const user = users.find((user) => user.use_email === use_email && user.use_password === use_password);

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
        <div className="LoginBody">
            <div className="card-logintop">
                <img className="slogan" src={slogan} alt="slogan" />
                <p className="parrafo-login">¿No tienes cuenta aún? <Link to='/Register' id='RegisterA'>¡Regístrate!</Link></p>
            </div>
            <div className="card-logintop2"></div>
            <div className="card-login">
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
                    <Input
                        className='containerPassword'
                        id="examplePassword"
                        name="password"
                        placeholder="Introduzca su contraseña"
                        type="password"
                        value={use_password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className='botonInicio btnLogin'>
                        Iniciar Sesión
                    </button>
                </form>
                <div>
                    <Link className="Recover" to="/Recover">¿Olvidaste la contraseña?</Link>
                </div>
            </div>
        </div>
    );
}

export { AdmRe }