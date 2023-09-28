import React from 'react';
import { NavBar } from '../Components/NavBar';
import { Footer } from '../Components/Footer';

function TermsAndConditions() {
	return (
		<div>
			<NavBar />
			<main className="cookies-main">
				<h1 className="text-center text-remesa">Términos y Condiciones de Uso</h1>
				<h5>Fecha de entrada en vigencia: 2023</h5>

				<p>Por favor, lee atentamente estos términos y condiciones antes de utilizar el sitio web de RemesaEspana la empresa Al registrarte y utilizar nuestros servicios, aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, te rogamos que no utilices nuestro sitio web ni nuestros servicios.</p>

				<h3>1. Registro y Cuenta de Usuario</h3>
				<p> Para utilizar nuestros servicios, debes registrarte en RemesaEspana proporcionando información precisa y completa. Asegúrate de mantener tu información de registro actualizada en todo momento.
				</p>
				<p> Eres responsable de mantener la confidencialidad de tu información de inicio de sesión y de todas las actividades que ocurran bajo tu cuenta. Si sospechas que tu cuenta ha sido comprometida, notifícanos de inmediato.</p>
				<h3>2. Servicios de Cambio de Divisas</h3>
				<p> RemesaEspana proporciona servicios de cambio de divisas en euros. Los tipos de cambio y las tarifas aplicables se mostrarán en nuestro sitio web y podrán estar sujetos a cambios sin previo aviso.</p>
				<p> Al utilizar nuestros servicios, aceptas los tipos de cambio y las tarifas aplicables en el momento de la transacción.</p>
				<p> Te comprometes a proporcionar información precisa y veraz relacionada con las transacciones de cambio de divisas que realices a través de nuestro sitio web.</p>
				<h3>3. Uso Adecuado</h3>
				<p> Aceptas utilizar nuestro sitio web y servicios de manera legal y ética. No debes utilizar nuestros servicios para actividades ilegales o fraudulentas.</p>
				<p> No está permitido utilizar nuestro sitio web para distribuir contenido dañino, difamatorio, obsceno o cualquier otro material que sea inapropiado.</p>
				<h3>4. Responsabilidad y Exoneración de Responsabilidad</h3>
				<p>RemesaEspana no se hace responsable de los daños, pérdidas o perjuicios que puedan surgir como resultado del uso de nuestros servicios o de la información proporcionada en nuestro sitio web.</p>
				<p> No garantizamos la disponibilidad continua y sin interrupciones de nuestros servicios y nos reservamos el derecho de suspenderlos o interrumpirlos en cualquier momento sin previo aviso.</p>

				<h3>5. Privacidad</h3>
				<p>La recopilación y el uso de tus datos personales están sujetos a nuestra Política de Privacidad, que puedes consultar en nuestro sitio web.</p>
				<h3>6. Modificaciones de los Términos y Condiciones</h3>
				<p> Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones entrarán en vigencia inmediatamente después de su publicación en nuestro sitio web.</p>

				<h3>7. Ley Aplicable</h3>
				<p>Estos términos y condiciones se rigen por las leyes de la Unión Europea y España. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales competentes en España.</p>

				<h6>Gracias por elegir RemesaEspana. Si tienes alguna pregunta o inquietud, por favor contáctanos a través de info@remesaespana.com</h6>
			</main>

			<Footer />
		</div>
	);
}

export { TermsAndConditions };
