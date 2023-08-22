import React from 'react'
import logo from '../Assets/Images/remesalogo.png'
import slogan from '../Assets/Images/sloganremesa.png'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { useDataContext } from '../Context/dataContext'
import { FiLogOut } from 'react-icons/fi'
import { clearLocalStorage } from '../Hooks/useLocalStorage'

function NavBar() {
  const { logged, isAdmin } = useDataContext()

  return (
    <div className='Nav'>
      <div className='nav__logo'>
        <img src={logo}
          alt='remesaespana'
          width={150}
        />
        <img className='slogan' src={slogan}
          alt='sloganremesaespana'
          width={150}
        />
      </div>
      <div className='Menu'>
        {logged ?
          isAdmin ? (
            <ul className='nav__links'>
              <Link className='links' to='/'>
                <li className='nav__link'>Inicio</li>
              </Link>
              <Link className='links' to='/Dashboard'>
                <li className='nav__link'>Dashboard</li>
              </Link>
              <Link className='links' to='/Changes'>
                <Button className='log-btn'>Cambios</Button>
              </Link>
              <a className='links' href='/'>
                <FiLogOut style={{ fontSize: '2em', marginTop: '.2em', color: '#409192' }} onClick={clearLocalStorage} />
              </a>
            </ul>
          ) : (
            <ul className='nav__links'>
              <Link className='links' to='/'>
                <li className='nav__link'>Inicio</li>
              </Link>
              <Link className='links' to='/Faqs'>
                <li className='nav__link'>Faqs</li>
              </Link>
              <Link className='links' to='/Movements'>
                <li className='nav__link'>Movimientos</li>
              </Link>
              <Link className='links' to='/Changes'>
                <Button className='log-btn'>Cambios</Button>
              </Link>
              <a className='links' href='/'>
                <FiLogOut style={{ fontSize: '2em', marginTop: '.2em', color: '#409192' }} onClick={clearLocalStorage} />
              </a>
            </ul> 
          ) : (
            <ul className='nav__links'>
              <Link className='links' to='/'>
                <li className='nav__link'>Inicio</li>
              </Link>
              <Link className='links' to='/Faqs'>
                <li className='nav__link'>Faqs</li>
              </Link>
              <a className='links' href='#hero2'
              ><li className='nav__link'>Contacto</li>
              </a>
              <Link className='links' to='/Login'>
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