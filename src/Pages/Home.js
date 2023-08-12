import React
  // { useState } 
  from 'react'
import {
  InputGroup,
  Input,
  Button,
  // UncontrolledCarousel,
  // Carousel,
  // CarouselItem,
  // CarouselControl,
  // CarouselIndicators,
  // CarouselCaption,

} from 'reactstrap';
// import Men from '../Assets/Images/men.png'
import Spain from '../Assets/Images/spain.png'
// import Uk from '../Assets/Images/uk.png'
// import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
// import backgroundOval from '../Assets/Images/backgroundOval.png'
import Oval from '../Assets/Images/Oval.png'
// import Arrow from '../Assets/Images/Arrow.png'


// const items = [
//   {
//     key: 1,
//     altText: `Sabemos lo mucho que trabajas, así que te 
//       facilitamos el envío de dinero a familiares y amigos. 
//       Haremos que tu dinero llegue de manera cómoda,
//       rápida y segura, con las mejores tasas de cambio, 
//       para que el dinero que tanto te cuesta ganar llegue 
//       más lejos.`
//   },
//   {
//     key: 2,
//     altText: `Remesa Espana lleva más de 4 años ofreciendo 
//       servicios de envío de dinero desde cualquier parte 
//       de la Unión Europea, Reino Unido y E.E.U.U a 
//       Venezuela con la mayor seguridad y rápidez que 
//       merecen nuestros clientes.`
//   },
//   {
//     key: 3,
//     altText: `Contamos con un equipo de atención personalizada 
//       para aclarar dudas y soluciones en pocos minutos, 
//       por eso mas de 1.000 de nuestros clientes nos 
//       recomiendan y somos su empresa de envio más
//       confiable.`
//   },
// ];

function Home() {

  return (
    <div>
      <div className='Segmento-1'>
        <img className='Oval' alt='Oval' src={Oval} />
        <div className='text'>
          <h1>Envía remesas a</h1>
          <div className='bgVzla'>
          </div>
          <h2>Venezuela</h2>
          <p>Líder en envíos de divisas en Europa a  <br /> Venezuela y E.E.U.U</p>
        </div>
        <div>
          <InputGroup className='Change-Input'>
            <Button>
              <img src={Spain} alt='Spain' width={60} /> €
            </Button>
            <Input disabled
              placeholder='1     =     33'
            >
            </Input>
            <Button>
              Bs <img src={Venezuela} alt='Venezuela' width={45} />
            </Button>
          </InputGroup>
          <Button className='letsGo'>
            ¡HAZLO YA!
          </Button>
        </div>
      </div>

      <div className='Segmento-2' >

      </div>
      <div className='Segmento-3' />
      <div className='Segmento-4'>
        <div className='text'>
          <p>
            Sabemos lo mucho que trabajas, así que te
            facilitamos el envío de dinero a familiares y amigos.
            Haremos que tu dinero llegue de manera cómoda,
            rápida y segura, con las mejores tasas de cambio,
            para que el dinero que tanto te cuesta ganar llegue
            más lejos.
            <br />
            <br />
            Remesa Espana lleva más de 4 años ofreciendo
            servicios de envío de dinero desde cualquier parte
            de la Unión Europea, Reino Unido y E.E.U.U a
            Venezuela con la mayor seguridad y rápidez que
            merecen nuestros clientes.
            <br />
            <br />
            Contamos con un equipo de atención personalizada
            para aclarar dudas y soluciones en pocos minutos,
            por eso mas de 1.000 de nuestros clientes nos
            recomiendan y somos su empresa de envio más
            confiable.
          </p>
        </div>
      </div>
      <div className='Segmento-5' />
      <div className='Segmento-6'>
        <div id="contact" class="contact">
          <div class="container">

            <div class="section-title">
              <h2>Contact</h2>
              <p>Contact Me</p>
            </div>

            <div class="row mt-2">

              <div class="col-md-6 d-flex align-items-stretch">
                <div class="info-box">
                  <i class="bx bx-map"></i>
                  <h3>My Address</h3>
                  <p>Maracaibo, Zulia. Venezuela</p>
                </div>
              </div>

              <div class="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
                <div class="info-box">
                  <i class="bx bx-share-alt"></i>
                  <h3>Social Profiles</h3>
                  <div class="social-links">
                    <a href="https://www.t.me/yuseppe" class="telegram"><i class="bi bi-telegram"></i></a>
                    <a href="https://www.facebook.com/josedaniel.portillofinol/" class="facebook"><i
                      class="bi bi-facebook"></i></a>
                    <a href="https://www.instagram.com/josed.portillo/" class="instagram"><i class="bi bi-instagram"></i></a>
                    <a href="https://api.whatsapp.com/send/?phone=%2B584246725408&text&type=phone_number&app_absent=0"
                      class="whatsapp"><i class="bi bi-whatsapp"></i></a>
                    <a href="https://github.com/Yu13ppe" class="github"><i class="bi bi-github"></i></a>
                  </div>
                </div>
              </div>

              <div class="col-md-6 mt-4 d-flex align-items-stretch">
                <div class="info-box">
                  <i class="bx bx-envelope"></i>
                  <h3>Email Me</h3>
                  <p>joseportillo2002.jdpf@gmail.com</p>
                </div>
              </div>
              <div class="col-md-6 mt-4 d-flex align-items-stretch">
                <div class="info-box">
                  <i class="bx bx-phone-call"></i>
                  <h3>Call Me</h3>
                  <p>+58 424 672 5408 </p>
                </div>
              </div>
            </div>

            <form class="php-email-form mt-4" name="contact-jp" method="POST" data-netlify="true">
              <div class="row">
                <div class="col-md-6 form-group">
                  <Input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <Input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required/>
                </div>
              </div>
              <div class="form-group mt-3">
                <Input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit" value="send" name="send">Send Message</button></div>
            </form>


          </div>
        </div>
      </div>
    </div>
  )
}

export { Home }