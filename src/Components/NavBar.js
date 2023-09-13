import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import logo from '../Assets/Images/remesalogo.png'
import slogan from '../Assets/Images/sloganremesa.png'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'
import { FiLogOut } from 'react-icons/fi'
import { clearLocalStorage } from '../Hooks/useLocalStorage'

function NavBar() {
  const { logged, accessAdminToken } = useDataContext()
  const [menuOpen, setMenuOpen] = useState(false);
  const [admin, setAdmin] = useState([]);

  const fetchDataAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByTokenAdmin/${accessAdminToken.access_token}`);
      setAdmin(response.data);
    } catch (error) {
    }
  },[setAdmin, accessAdminToken]);

  useEffect(() => {
    fetchDataAdmin();
  }, [fetchDataAdmin]);

  return (
    <div className='Nav'>
      <Link to='/'>
      <div className='nav__logo'>
        <img src={logo}
          alt='remesaespana'
        />
        <img className='slogan' src={slogan}
          alt='sloganremesaespana'
        />
      </div>
      </Link>
      <div className='MenuPrincipal'>
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {logged ?
          admin.adm_role === 'A' ? (
            <ul className={menuOpen ? "open" : ""}>
              <Link className='' to='/'>
                <li className=''>Inicio</li>
              </Link>
              <Link className='' to='/CurrencyUpdate'>
                <li className=''>Tasa</li>
              </Link>
              <Link className='' to='/Banks'>
                <li className=''>Bancos</li>
              </Link>
              <Link className='' to='/Dashboard'>
                <Button className='log-btn'>Panel</Button>
              </Link>
              <a className='' href='/'>
                <FiLogOut style={{ fontSize: '2em', marginTop: '.2em', color: '#409192' }} onClick={clearLocalStorage} />
              </a>
            </ul>
          ) : (
            <ul className={menuOpen ? "open" : ""}>
              <Link className='' to='/'>
                <li className=''>Inicio</li>
              </Link>
              <Link className='' to='/Faqs'>
                <li className=''>Faqs</li>
              </Link>
              <Link className='' to='/Movements'>
                <li className=''>Movimientos</li>
              </Link>
              <Link className='' to='/Changes'>
                <Button className='log-btn'>Cambios</Button>
              </Link>
              <a className='links' href='/'>
                <FiLogOut style={{ fontSize: '2em', marginTop: '.2em', color: '#409192' }} onClick={clearLocalStorage} />
              </a>
            </ul>
          ) : (
            <ul className={menuOpen ? "open" : ""}>
              <Link className='' to='/'>
                <li className=''>Inicio</li>
              </Link>
              <Link className='' to='/Faqs'>
                <li className=''>Faqs</li>
              </Link>
              <a className='' href='/#hero2'>
                <li className=''>Contacto</li>
              </a>
              <Link className='' to='/Login'>
                <Button className='log-btn'>Ingresar</Button>
              </Link>
            </ul>
          )
        }
      </div >
    </div>
  )
}

export { NavBar }