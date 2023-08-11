import React from 'react'
import logo from '../Assets/Images/remesalogo.png'
import slogan from '../Assets/Images/sloganremesa.png'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

function NavBar() {
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
        <ul className='nav__links'>
          <Link className='links' to='/'>
            <li className='nav__link'>Inicio</li>
          </Link>
          <Link className='links' to='/Faqs'>
            <li className='nav__link'>Faqs</li>
          </Link>
          <Link className='links' to='/'
          ><li className='nav__link'>Contacto</li>
          </Link>
          <Link className='links' to='/Login'>
            <Button className='log-btn'>Ingresar</Button>
          </Link>
        </ul>
      </div >
      
    </div>
  )
}

export { NavBar }