import React, { useState } from 'react'
import {
  InputGroup,
  Input,
  Button,
  UncontrolledCarousel,
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,

} from 'reactstrap';
// import Men from '../Assets/Images/men.png'
import Spain from '../Assets/Images/spain.png'
// import Uk from '../Assets/Images/uk.png'
// import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
// import backgroundOval from '../Assets/Images/backgroundOval.png'
import Oval from '../Assets/Images/Oval.png'
// import Arrow from '../Assets/Images/Arrow.png'


const items = [
  {
    key: 1,
    altText: `Sabemos lo mucho que trabajas, así que te 
      facilitamos el envío de dinero a familiares y amigos. 
      Haremos que tu dinero llegue de manera cómoda,
      rápida y segura, con las mejores tasas de cambio, 
      para que el dinero que tanto te cuesta ganar llegue 
      más lejos.`
  },
  {
    key: 2,
    altText: `Remesa Espana lleva más de 4 años ofreciendo 
      servicios de envío de dinero desde cualquier parte 
      de la Unión Europea, Reino Unido y E.E.U.U a 
      Venezuela con la mayor seguridad y rápidez que 
      merecen nuestros clientes.`
  },
  {
    key: 3,
    altText: `Contamos con un equipo de atención personalizada 
      para aclarar dudas y soluciones en pocos minutos, 
      por eso mas de 1.000 de nuestros clientes nos 
      recomiendan y somos su empresa de envio más
      confiable.`
  },
];

function Home() {

  return (
    <div>
      <div className='Segmento-1'>
        <img className='Oval' src={Oval} />
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
              <img src={Spain} width={60} /> €
            </Button>
            <Input disabled
              placeholder='1     =     33'
            >
            </Input>
            <Button>
              Bs <img src={Venezuela} width={45} />
            </Button>
          </InputGroup>
          <Button className='letsGo'>
            ¡HAZLO YA!
          </Button>
        </div>
      </div>

      <div className='Segmento-2' />
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
      <div className='Segmento-5'/>
    </div>
  )
}

export { Home }