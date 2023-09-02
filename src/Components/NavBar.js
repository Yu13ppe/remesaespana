import React, { useState } from 'react'
import logo from '../Assets/Images/remesalogo.png'
import slogan from '../Assets/Images/sloganremesa.png'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'
import { FiLogOut } from 'react-icons/fi'
import { clearLocalStorage } from '../Hooks/useLocalStorage'

function NavBar() {
  const { logged, isAdmin } = useDataContext()
  const [menuOpen, setMenuOpen] = useState(false);


  return (
    <div className='Nav'>
      <div className='nav__logo'>
        <img src={logo}
          alt='remesaespana'
        />
        <img className='slogan' src={slogan}
          alt='sloganremesaespana'
        />
      </div>
      <div className='MenuPrincipal'>
        <div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {logged ?
          isAdmin ? (
            <ul className={menuOpen ? "open" : ""}>
              <Link className='' to='/'>
                <li className=''>Inicio</li>
              </Link>
              <Link className='' to='/Dashboard'>
                <li className=''>Panel</li>
              </Link>
              <Link className='' to='/Banks'>
                <li className=''>Bancos</li>
              </Link>
              <Link className='' to='/Changes'>
                <Button className='log-btn'>Cambios</Button>
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
              <a className='' href='#hero2'
              ><li className=''>Contacto</li>
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