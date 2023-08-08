import React from 'react'
import logo from '../Assets/Images/remesalogo.png'
import slogan from '../Assets/Images/sloganremesa.png'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

function NavBar() {
  return (
    <div className='nav'>
      <div className='logo'>
        <img src={logo}
          alt='remesaespana'
          width={150}
        />
        <img src={slogan}
          alt='sloganremesaespana'
          width={150}
        />
      </div>
      <div className='menu'>
        <ul>
          <Link to='/'><li>Inicio</li></Link>
          <Link to='/Faqs'><li>Faqs</li></Link>
          <Link to='/'><li>Contacto</li></Link>
          <Link to='/Login'><Button className='log-btn'>Ingresar</Button></Link>
        </ul>
      </div >
    </div>
  )
}

export {NavBar}