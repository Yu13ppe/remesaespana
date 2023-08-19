import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <div className="footer-left">
        <p> remesaespana.com ©2023 </p>

      </div>
      <div className="footer-right">
        <ul>
          <Link className='linkFooter' to='/'>
            <li>Cookies</li>
          </Link>
          <Link className='linkFooter' to='/'>
            <li>Privacidad</li>
          </Link>
          <Link className='linkFooter' to='/'>
            <li>Contacto</li>
          </Link>
          <Link className='linkFooter' to='/Faqs'>
            <li>Faqs</li>
          </Link>
        </ul>
      </div>
    </footer>
  )
}

export { Footer }