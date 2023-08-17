import React from 'react'
import { Input, Label } from 'reactstrap';
function Faqs() {
  return (
    <div className='BodyFaqs'>
      <div className='container-faqs'>
        <div className='Tab'>
          <input type="radio" name="acc" id="acc1"></input>
          <Label for="acc1">
            <h2>01</h2>
            <h3>¿Qué bancos tienen para enviar a Venezuela?</h3>
          </Label>
          <div className='content-faqs'>
            <p>
              Tenemos disponibles cuentas en las siguientes entidades bancarias
            </p>
            <p>
              <br></br>
              <ul>Banesco</ul>
              <ul>BBA Provincial</ul>
              <ul>Mercantil</ul>
              <ul>Banco de Venezuela</ul>
              <ul>Banco Nacional de credito</ul>
              <ul>Pago Movil</ul>
            </p>
          </div>
        </div>
        <div className='Tab'>
          <input type="radio" name="acc" id="acc2"></input>
          <Label for="acc2">
            <h2>02</h2>
            <h3>¿Entregan dólares en efectivo en Venezuela?</h3>
          </Label>
          <div className='content-faqs'>
            <p>Sí, sólo en Caracas y Maracaibo. El mínimo necesario para entregar dólares en efectivo es de 100$ (cien dólares).</p>
          </div>
        </div>
        <div className='Tab'>
          <input type="radio" name="acc" id="acc3"></input>
          <Label for="acc3">
            <h2>03</h2>
            <h3>¿Reciben transferencias desde toda la Unión Europea?</h3>
          </Label>
          <div className="content-faqs">
            <p>Sí. El pago se realiza cuando el monto enviado se hace efectivo en nuestra cuenta y según la tasa de dicho día.</p>
          </div>
        </div>
        <div className='Tab'>
          <input type="radio" name="acc" id="acc4"></input>
          <Label for="acc4">
            <h2>04</h2>
            <h3>¿Reciben depósitos de cajeros?</h3>
          </Label>
          <div className="content-faqs">
            <p>No. Disculpe las molestias, pero no recibimos depósitos en efectivo a través de cajeros.</p>
          </div>
        </div>
        <div className='Tab'>
          <input type="radio" name="acc" id="acc5"></input>
          <Label for="acc5">
            <h2>05</h2>
            <h3>¿Cuantos minutos demora la transferencia a venezuela?</h3>
          </Label>
          <div className="content-faqs">
            <p>Nuestro tiempo de pago es de unos 20 minutos</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Faqs }