import React, { useState, useEffect } from 'react'
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
  Alert,
  FormFeedback
} from 'reactstrap';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import changes from '../Assets/Images/changes.png'
import Spain from '../Assets/Images/spain.png'
import Uk from '../Assets/Images/uk.png'
import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
import VerificationImage from '../Assets/Images/verification.png';
import ImageVerification from '../Assets/Images/ImageVerification.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Changes() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [tridModalOpen, setTridModalOpen] = useState(false);
  const [forthModalOpen, setForthModalOpen] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [bankOption, setBankOption] = useState('');
  const [bankOptionPay, setBankOptionPay] = useState('');
  const [note, setNote] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [banks, setBanks] = useState([]);

  const handleSendClick = () => {
    toast.success('Cambio realizado con exito!, En segundo tendras los bolivares en la cuenta', {
      position: 'bottom-right',
      autoClose: 10000, // Duración en milisegundos
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Cerrar el modal
    toggleTridModal();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Acceur');
      setBanks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTridModal = () => { setTridModalOpen(!tridModalOpen); };
  const toggleforthModal = () => { setForthModalOpen(!forthModalOpen); };


  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setSendAmount(inputAmount);
    const calculatedAmount = parseFloat(inputAmount) * 33;
    setReceiveAmount(calculatedAmount);
  };

  const toggleModal = () => setModalOpen(!modalOpen);

  const toggleSecondModal = () => {
    setModalOpen(false);
    setSecondModalOpen(!secondModalOpen);
    document.body.style.paddingRight = '0';
  };

  return (
    <div className='changesContainer'>
      {location.state?.user.use_verif === 's' || location.state?.user.use_verif === 'S' ?
        <div>
          <img className='changesMen' alt='changesMen' src={changes} />
          <div className='textchanges'>
            <h2>Hola {location.state?.user.use_name} {location.state?.user.use_lastName}</h2>
            <h3>${location.state?.user.use_amountUsd ? location.state?.user.use_amountUsd : 0 } | €{location.state?.user.use_amountEur  ? location.state?.user.use_amountEur : 0} | £{location.state?.user.use_amountGbp ? location.state?.user.use_amountGbp : 0}</h3>
            <h6 style={{ color: '#686868' }}>Disponible</h6>
          </div>

          <div className='changes'>
            {/* Spain - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={60} alt='Spain' /> €</Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Uk - Bs */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Uk} width={45} alt='Uk' /> £
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Usa - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Usa} alt='Usa' width={45} /> $
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Spain - Usa */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} alt='Spain' width={58} /> €
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                $ <img src={Usa} alt='Usa' width={45} />
              </Button>
            </InputGroup>

            <InputGroup className='changesBtn'>
              <div className='Btn' >
                <Button color='primary' onClick={toggleforthModal}>
                  Cargar
                </Button>
                <Button color='success' onClick={toggleTridModal}>
                  Retirar
                </Button>
              </div>
            </InputGroup>
          </div>

          {/* Cargar */}
          <Modal isOpen={tridModalOpen} toggle={toggleTridModal}>
            <ModalHeader toggle={toggleTridModal}>Ingresa tus datos bancarios</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="amountInput">Coloca el monto que deseas cargar</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      id="sendAmount"
                      placeholder="Ej. 100"
                      value={sendAmount}
                      onChange={(e) => handleAmountChange}
                      invalid={sendAmount !== "" && sendAmount <= 20} // Agrega el atributo invalid
                    />
                    {sendAmount !== "" && sendAmount <= 20 && (
                      <FormFeedback>
                        El monto mínimo es de 20$
                      </FormFeedback>
                    )}
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
                <Button onClick={handleSendClick} color="primary">
                  Enviar
                </Button>
              </Form>
            </ModalBody>
          </Modal>
                      
          {/* Retirar */}
          <Modal centered isOpen={forthModalOpen} toggle={toggleforthModal}>
            <ModalHeader toggle={toggleforthModal}>Realiza tu Carga</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="amountInput">Coloca el monto que deseas cargar</Label>
                  <InputGroup>
                    <Input
                      type="number"
                      id="sendAmount"
                      placeholder="Ej. 100"
                      defaultValue={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                    {sendAmount < "20" ?
                      <FormFeedback invalid>
                        El monto mínimo es de 20$
                      </FormFeedback>
                      :
                      null
                    }
                  </InputGroup>
                </FormGroup>

                <FormGroup>
                  <Label>Selecciona el Banco a transferir</Label>
                  <Input
                    type="select"
                    id="bankOptionPaySelect"
                    value={bankOptionPay}
                    onChange={(e) => setBankOptionPay(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="BBVA">BBVA</option>
                    <option value="SANTANDER">SANTANDER</option>
                    <option value="CAIXA">CAIXA</option>
                    <option value="BANKINTER">BANKINTER</option>
                    <option value="BIZUM">BIZUM</option>
                  </Input>
                </FormGroup>
                {bankOptionPay === "" ? null :
                  <Alert>
                    <h4 className="alert-heading">
                      Cuenta Bancaria {bankOptionPay}:
                    </h4>
                      {banks.map((bank) => {
                        return bank.acceur_Bank === bankOptionPay ? 
                            <p>
                              {bank.acceur_Bank}
                              <br/>
                              {bank.acceur_number}
                              <br/>
                              {bank.acceur_nie}
                              <br/>
                              {bank.acceur_type}
                              <br/>
                              {bank.acceur_owner}
                            </p>
                          : null
                        })}
                    <hr />
                    <p className="mb-0">
                      Al culminar la verificación del pago, el monto se verá reflejado en su plataforma.
                    </p>
                  </Alert>
                }
                <FormGroup>

                  <Label htmlFor="imageInput">Seleccionar Imagen:</Label>
                  <Input
                    type="file"
                    className="form-control-file"
                    id="imageInput"
                  />
                </FormGroup>
                <Button color="primary" onClick={handleSendClick} className='btn col-md-12'>
                  Enviar
                </Button>
              </Form>
            </ModalBody>
          </Modal>

          <ToastContainer />
        </div>
        :
        <div>
          <img className='changesMen' alt='changesMen' src={changes} />
          <div className='textchanges'>
            <h2>Hola {location.state?.user.use_name} {location.state?.user.use_lastName}</h2>
            <h3>${location.state?.user.use_amountUsd ? location.state?.user.use_amountUsd : 0 } | €{location.state?.user.use_amountEur  ? location.state?.user.use_amountEur : 0} | £{location.state?.user.use_amountGbp ? location.state?.user.use_amountGbp : 0}</h3>
            <h6 style={{ color: '#686868' }}>Disponible</h6>
          </div>

          <div className='changes'>
            {/* Spain - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} width={60} alt='Spain' /> €</Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Uk - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Uk} width={45} alt='Uk' /> £
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              />
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Usa - Bs */}
            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Usa} alt='Usa' width={45} /> $
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                Bs <img src={Venezuela} alt='Venezuela' width={45} />
              </Button>
            </InputGroup>

            {/* Spain - Usa */}

            <InputGroup className='Change-Input1'>
              <Button>
                <img src={Spain} alt='Spain' width={58} /> €
              </Button>
              <Input disabled className='centered-input'
                placeholder='1     =     33'
              >
              </Input>
              <Button >
                $ <img src={Usa} alt='Usa' width={45} />
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

          {/* Alert */}  
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

          {/* Verificación de Identidad */}
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
        </div>
      }
    </div>
  )
}

export { Changes }