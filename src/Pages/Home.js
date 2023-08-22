import React, { useState } from 'react'
// import axios from 'axios';
import {
  InputGroup,
  Input,
  Button
} from 'reactstrap';
import Reasons01 from '../Assets/Images/Reasons-01.png';
import Image1 from '../Assets/Images/0.png';
import Image2 from '../Assets/Images/clock.png';
import Image3 from '../Assets/Images/bank.png';
import Image4 from '../Assets/Images/20.png';
import {
  FaRegClock,
  FaSlackHash,
  FaRegEnvelope,
  FaPhone
} from 'react-icons/fa';
import Spain from '../Assets/Images/spain.png'
import Uk from '../Assets/Images/uk.png'
import Venezuela from '../Assets/Images/venezuela.png'
import Oval from '../Assets/Images/Oval.png'
import EEUU from '../Assets/Images/usa.png';
// import { useDataContext } from '../Context/dataContext';


function Home() {
  const [currencyImage, setCurrencyImage] = useState(Spain);
  // const { currencyPrice, setCurrencyPrice } = useDataContext();

  const handleCurrencyChange = () => {
    if (currencyImage === Spain) {
      setCurrencyImage(EEUU);
    } else if (currencyImage === EEUU) {
      setCurrencyImage(Uk);
    } else {
      setCurrencyImage(Spain);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('https://apiremesa.up.railway.app/currencyPrice');
  //     setCurrencyPrice(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);


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
            <Button onClick={handleCurrencyChange}>
              <img src={currencyImage} alt='Currency' width={45} /> €
            </Button>
            {currencyImage === Spain ?
              <Input disabled className='centered-input'
                placeholder={'1  =  ' + 33}
              />
              : null
            }
            {/* {currencyImage === Uk ?
              <Input disabled
                placeholder={'  1     =     ' + (currencyPrice.map(coin => coin.cur_GbpToBs))}
              />
              : null
            }
            {currencyImage === EEUU ?
              <Input disabled
                placeholder={'  1     =     ' + (currencyPrice.map(coin => coin.cur_UsdToBs))}
              />
              : null
            } */}
            <Button>
              Bs <img src={Venezuela} alt='Venezuela' width={45} />
            </Button>
          </InputGroup>
          <Button className='letsGo'>
            ¡HAZLO YA!
          </Button>
        </div>
      </div>
      <div className='Segmento-2'>
        <div className="chose-us">
          <div className="main-chose">
            <div className="inner-chose">
              <div className="main-review">
                <div className="inner-review">
                  <img src={Image1} alt="image1" />
                  <div className='enviom1'>
                    <p>Sin Comisiones</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="inner-chose">
              <div className="main-review">
                <div className="inner-review">
                  <img src={Image3} alt="image1" />

                  <p>Disponemos de Todos los Bancos de Venezuela</p>
                </div>
              </div>
            </div>

            <div className="inner-chose">
              <div className="main-review">
                <div className="inner-review">

                  <img src={Image2} alt="image1" />

                  <p>Recibe tu Remesa en Pocos Minutos</p>
                </div>
              </div>
            </div>

            <div className="main-review">
              <div className="inner-review">
                <div className="inner-chose">
                  <img src={Image4} alt="image1" />
                  <div className='enviom'>
                    <p >Envío Minimo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="Segmento-3">
        <div className="card1">
          <div className="content">
            <div className="title">
              <h3>PASOS PARA EMPEZAR</h3>
            </div>
            <div className="text">
              <li>Regístrate en nuestra web y llena todos los campos.</li>
              <li>Revisa tu correo electrónico y verifica el código de validación que te enviamos.</li>
              <li>Toma una foto legible de tu identificación.</li>
              <li>Sube tu identificación a la web.</li>
              <li>¡Espera tu validación y empieza a cambiar!</li>
            </div>
            <br></br>
            <div className="btn-container">
              <button>Empieza ya</button>
            </div>
          </div>
          <div className="img-card"></div>
        </div>

        {/* <div className="Segmento-3-Content">
                <div className="Texto-Izquierdo">
                    <h2>Pasos para empezar:</h2>
                    <ol>
                        <li>Regístrate en nuestra web y llena todos los campos.</li>
                        <li>Revisa tu correo electrónico y verifica el código de validación que te enviamos.</li>
                        <li>Toma una foto legible de tu identificación.</li>
                        <li>Sube tu identificación a la web.</li>
                        <li>¡Espera tu validación y empieza a cambiar!</li>
                    </ol>
                </div>
            </div> */}
        {/* <div className="Imagen-Derecho">
                <img src={Segmento3} alt="Imagen de ejemplo" />
            </div> */}
      </div>
      <div className='Segmento-4'>
        <section id="hero" className="d-flex align-items-center">
          <div className="container position-relative" data-aos="fade-up" data-aos-delay="500">
            <h1>COMO PODEMOS AYUDARTE</h1>
            <h2>Ofrecemos el mejor servicio al mejor precio</h2>
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
            <a href="#about" className="btn-get-started scrollto">Empieza Con Nosotros</a>
          </div>
        </section>
      </div>

      <div className="Segmento-5">
        <img src={Reasons01} alt="Imagen de razones" />
      </div>

      <div id='about' className='Segmento-6'>

        <section id='hero2'>
          <div id="contact" className="contact">
            <div className="container">

              <div className="section-title">
              </div>

              <div className="row mt-2">

                <div className="col-md-6 d-flex align-items-stretch">
                  <div className="info-box">
                    <div className="icon">
                      <FaRegClock style={{ fontSize: '30px' }} />
                    </div>
                    <div className="info">
                      <h3>Horario</h3>
                      <p>Lunes a Sabado desde las 12:00-22:00</p>
                    </div>
                  </div>
                </div>


                <div className="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch">
                  <div className="info-box">
                    <div className='icon'>
                      <FaSlackHash style={{ fontSize: '30px' }} />
                    </div>
                    <h3>Social Profiles</h3>
                    <div className="social-links">
                      <a href="https://www.t.me/yuseppe" className="telegram"><i className="bi bi-telegram"></i></a>
                      <a href="https://www.facebook.com/josedaniel.portillofinol/" className="facebook"><i
                        className="bi bi-facebook"></i></a>
                      <a href="https://www.instagram.com/josed.portillo/" className="instagram"><i className="bi bi-instagram"></i></a>
                      <a href="https://api.whatsapp.com/send/?phone=%2B584246725408&text&type=phone_number&app_absent=0"
                        className="whatsapp"><i className="bi bi-whatsapp"></i></a>
                      <a href="https://github.com/Yu13ppe" className="github"><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 mt-4 d-flex align-items-stretch">
                  <div className="info-box">
                    <div className='icon'>
                      <FaRegEnvelope style={{ fontSize: '30px' }} />
                    </div>
                    <div className='info'>
                      <h3>Email Me</h3>
                      <p>joseportillo2002.jdpf@gmail.com</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mt-4 d-flex align-items-stretch">
                  <div className="info-box">
                    <div className='icon'>
                      <FaPhone style={{ fontSize: '30px' }} />
                    </div>
                    <div className='info'>
                      <h3>Call Me</h3>
                      <p>+58 424 672 5408 </p>
                    </div>
                  </div>
                </div>
              </div>

              <form className="php-email-form mt-4" name="contact-jp" method="POST" data-netlify="true">
                <div className="row">
                  <div className="col-md-6 form-group">
                    <Input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                  </div>
                  <div className="col-md-6 form-group mt-3 mt-md-0">
                    <Input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <Input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                </div>
                <div className="form-group mt-3">
                  <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                </div>
                <div className="my-3">
                  <div className="loading">Loading</div>
                  <div className="error-message"></div>
                  <div className="sent-message">Your message has been sent. Thank you!</div>
                </div>
                <div className="text-center"><button type="submit" value="send" name="send">Send Message</button></div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>





  )
}

export { Home }