import React, { useState, useEffect } from 'react';
import axios from 'axios';
import remesalogo from '../Assets/Images/remesalogo.png';
import { Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';

function AdmRe() {
    const history = useHistory();
    const [adm_email, setEmail] = useState('');
    const [adm_password, setPassword] = useState('');
    const [admins, setAdmin] = useState([]);
    const [error, setError] = useState("");
    const [attemps, setAttemps] = useState(3);
    const { setIsAdmin, setLogged } = useDataContext();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://apiremesa.up.railway.app/admin');
            setAdmin(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario
        const adm = admins.find((adm) => adm.adm_email === adm_email && adm.adm_password === adm_password);

        if (attemps === 0) {
            setError("Has superado el número de intentos. Intenta más tarde.");
        }
        else if (adm) {
            // Si se encuentra el usuario, cambia de ventana
            const admin = admins.find(user => user.adm_email === adm_email);

            if (admin.adm_role === "a" || admin.adm_role === "A") {
                setIsAdmin(true);
                setLogged(true);
                history.push({
                    pathname: "/Dashboard",
                    state: {
                        user: admin,
                    }
                });
            }
        }
        else {
            // Si no se encuentra el usuario, establece un mensaje de error
            setAttemps(attemps - 1);
            setError(`Correo o contraseña incorrectos. Inténtalo de nuevo. Intentos restantes: ${attemps}`);
        }
    };


    return (
        <div className='AdmBody'>
            <div className="card-admtop2"></div>
            <div className="card-adm">
                <img className="logo" src={remesalogo} alt="Logo" />
                <form className="form" onSubmit={handleSubmit}>
                    {error && <div className="error">{error}</div>}
                    <Input
                        className='containerCorreo'
                        type="email"
                        value={adm_email}
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
                        value={adm_password}
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