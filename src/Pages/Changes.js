import React, { useState } from 'react'
import {
  InputGroup,
  Input,
  Button,
  Label,
  FormGroup,
  Form,

  Modal,
  ModalHeader,
  ModalBody,

} from 'reactstrap';
import { useLocation } from "react-router-dom";
import changes from '../Assets/Images/changes.png'
import Spain from '../Assets/Images/spain.png'
import Uk from '../Assets/Images/uk.png'
import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
import VerificationImage from '../Assets/Images/verification.png';
import ImageVerification from '../Assets/Images/ImageVerification.png'

function Changes() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [tridModalOpen, setTridModalOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [bankOption, setBankOption] = useState('');
  const [note, setNote] = useState('')

  const toggleTridModal = () => {
    setTridModalOpen(!tridModalOpen);
  };

  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setAmount(inputAmount);
    const calculatedAmount = parseFloat(inputAmount) * 33;
    setReceiveAmount(calculatedAmount);
  };

  const toggleModal = () => {setModalOpen(!modalOpen);};

  const toggleSecondModal = () => {
    setModalOpen(false);
    setSecondModalOpen(!secondModalOpen);
  };

  return (
    <div className='changesContainer'>
      {location.state?.verif === 's' ?
        <div>
          <img className='changesMen' src={changes} />
          <div className='textchanges'>
            <h2>Hola {location.state?.name}</h2>
            <h3>${location.state?.amount} / €{location.state?.amount} / £{location.state?.amount}</h3>
            <h6 style={{color: '#686868'}}>Disponible</h6>
          </div>

          <div className='changes'>
            {/* Spain - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={60} /> €</Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Uk - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Uk} width={45} /> £
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Usa - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Usa} width={45} /> $
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Spain - Usa */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={58} /> €
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                $ <img src={Usa} width={45} />
              </Button>
            </InputGroup>

            <InputGroup className='changesBtn'>
              <div className='Btn' >
                <Button color='primary' onClick={toggleModal}>
                  Cargar
                </Button>
                <Button color='success' onClick={toggleTridModal}>
                  Retirar
                </Button>
              </div>
            </InputGroup>


          </div>
          <Modal isOpen={modalOpen} centered toggle={toggleModal}>
            <ModalHeader><b style={{ fontFamily: 'Roboto', fontWeight: '900' }}> ¡Necesitas verificación! </b> </ModalHeader>
            <ModalBody className='custom-modal-content'>
              <img src={VerificationImage} style={{ float: 'right' }} alt='Exclamation Triangle' width={120} />
              <Button style={{ background: '#409192', border: 'none', borderRadius: '15px', marginLeft: '15px' }} onClick={toggleSecondModal} >NECESITAS VERIFICACIÓN</Button>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='modal-text' style={{ marginRight: '10px' }}>
                  <p style={{ color: 'rgba(33, 33, 33, 0.6)', marginTop: '.5em' }}>
                    Para realizar el cambio de divisas necesitamos verificar que eres el propietario de la cuenta.
                  </p>
                  <p>Verifica tu identidad para empezar a cambiar.</p>
                </div>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={secondModalOpen} size='lg' centered toggle={toggleSecondModal}>
            <ModalHeader toggle={toggleSecondModal}>Verificación de Identidad</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <Label htmlFor="dniInput">Número de Documento de Identidad:</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="dniInput"
                    placeholder="Ingresa tu DNI"
                  />
                </div>
                <p style={{ color: 'rgba(33, 33, 33, 0.6)', marginTop: '.5em' }}>
                  Ingresa el número de documento de identidad. Lo utilizaremos para comprobar que eres realmente tú quien utilizará la plataforma.
                </p>
                <p style={{ color: '#a91111', padding: '10px' }}>
                  <strong >IMPORTANTE:</strong> Debes subir la imagen de tu DNI o Pasaporte junto a tu rostro como en el ejemplo que se muestra. Los datos deben ser legibles y no debes cubrirlos de ninguna manera. El uso de esta información será únicamente para comprobar que realmente eres tú quien realizará el cambio.
                </p>
                <div className="form-group">
                  <Label htmlFor="imageInput">Seleccionar Imagen:</Label>
                  <Input
                    type="file"
                    className="form-control-file"
                    id="imageInput"
                  />
                </div>
                <div style={{ marginTop: '1em', marginLeft: '.5em' }} className="form-check">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                  />
                  <Label className="form-check-label" htmlFor="termsCheckbox">
                    Acepto los términos y condiciones
                  </Label>
                </div>
                <img style={{ marginLeft: '30%' }} src={ImageVerification} alt='ImageVerification'></img>
                <FormGroup>
                  <Button className="btn col-md-12" color='success'>
                    Enviar
                  </Button>
                </FormGroup>
              </form>
            </ModalBody>
          </Modal>

          <Modal isOpen={tridModalOpen} toggle={toggleTridModal}>
            <ModalHeader toggle={toggleTridModal}>Ingresa tus datos bancarios</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="amountInput">Coloca el monto que deseas cambiar</Label>
                  <InputGroup>

                    <Input
                      type="number"
                      id="amountInput"
                      placeholder="Ej. 100"
                      value={amount}
                      onChange={handleAmountChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="receiveAmountInput">Monto a recibir en Bolívares</Label>
                  <InputGroup>

                    <Input
                      type="text"
                      id="receiveAmountInput"
                      value={receiveAmount}
                      disabled
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Ingresa tus datos bancarios</Label>
                  <Input
                    type="select"
                    id="bankOptionSelect"
                    value={bankOption}
                    onChange={(e) => setBankOption(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Cuenta Bancaria">Cuenta Bancaria</option>
                    <option value="Pago Movil">Pago Móvil</option>
                  </Input>
                </FormGroup>
                <FormGroup>

                  <Input
                    type="textarea"
                    id="noteTextArea"
                    rows="4"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </div>


        :
        <div>
          <img className='changesMen' src={changes} />
          <div className='textchanges'>
            <h1>¡Elige tu cambio!</h1>
            <h2>Cambios en segundos!</h2>
          </div>

          <div className='changes'>
            {/* Spain - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={60} /> €</Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Uk - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Uk} width={45} /> £
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Usa - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Usa} width={45} /> $
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                Bs <img src={Venezuela} width={45} />
              </Button>
            </InputGroup>

            {/* Spain - Usa */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={58} /> €
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                $ <img src={Usa} width={45} />
              </Button>
            </InputGroup>

            <InputGroup className='changesBtn'>
              <div className='Btn' >
                <Button color='primary' onClick={toggleModal}>
                  Cargar
                </Button>
                <Button color='success' onClick={toggleModal}>
                  Retirar
                </Button>
              </div>
            </InputGroup>


          </div>
          <Modal isOpen={modalOpen} centered toggle={toggleModal}>
            <ModalHeader><b style={{ fontFamily: 'Roboto', fontWeight: '900' }}> ¡Necesitas verificación! </b> </ModalHeader>
            <ModalBody className='custom-modal-content'>
              <img src={VerificationImage} style={{ float: 'right' }} alt='Exclamation Triangle' width={120} />
              <Button style={{ background: '#409192', border: 'none', borderRadius: '15px', marginLeft: '15px' }} onClick={toggleSecondModal} >NECESITAS VERIFICACIÓN</Button>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='modal-text' style={{ marginRight: '10px' }}>
                  <p style={{ color: 'rgba(33, 33, 33, 0.6)', marginTop: '.5em' }}>
                    Para realizar el cambio de divisas necesitamos verificar que eres el propietario de la cuenta.
                  </p>
                  <p>Verifica tu identidad para empezar a cambiar.</p>
                </div>
              </div>
            </ModalBody>
          </Modal>

          <Modal isOpen={secondModalOpen} size='lg' centered toggle={toggleSecondModal}>
            <ModalHeader toggle={toggleSecondModal}>Verificación de Identidad</ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <Label htmlFor="dniInput">Número de Documento de Identidad:</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="dniInput"
                    placeholder="Ingresa tu DNI"
                  />
                </div>
                <p style={{ color: 'rgba(33, 33, 33, 0.6)', marginTop: '.5em' }}>
                  Ingresa el número de documento de identidad. Lo utilizaremos para comprobar que eres realmente tú quien utilizará la plataforma.
                </p>
                <p style={{ color: '#a91111', padding: '10px' }}>
                  <strong >IMPORTANTE:</strong> Debes subir la imagen de tu DNI o Pasaporte junto a tu rostro como en el ejemplo que se muestra. Los datos deben ser legibles y no debes cubrirlos de ninguna manera. El uso de esta información será únicamente para comprobar que realmente eres tú quien realizará el cambio.
                </p>
                <div className="form-group">
                  <Label htmlFor="imageInput">Seleccionar Imagen:</Label>
                  <Input
                    type="file"
                    className="form-control-file"
                    id="imageInput"
                  />
                </div>
                <div style={{ marginTop: '1em', marginLeft: '.5em' }} className="form-check">
                  <Input
                    type="checkbox"
                    className="form-check-input"
                    id="termsCheckbox"
                  />
                  <Label className="form-check-label" htmlFor="termsCheckbox">
                    Acepto los términos y condiciones
                  </Label>
                </div>
                <img style={{ marginLeft: '30%' }} src={ImageVerification} alt='ImageVerification'></img>
                <FormGroup>
                  <Button className="btn col-md-12" color='success'>
                    Enviar
                  </Button>
                </FormGroup>
              </form>
            </ModalBody>
          </Modal>
        </div>}
    </div>
  )
}

export { Changes }