import React, { useState, useEffect, useCallback } from 'react'
import { useDataContext } from '../Context/dataContext';
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
import { FaExclamationCircle } from 'react-icons/fa';
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
import { NavBar } from '../Components/NavBar';
import { Footer } from '../Components/Footer';
import { NotFound404 } from '../Pages/NotFound404';

function Changes() {
  const [modalOpen, setModalOpen] = useState(false);
  const [secondModalOpen, setSecondModalOpen] = useState(false);
  const [tridModalOpen, setTridModalOpen] = useState(false);
  const [forthModalOpen, setForthModalOpen] = useState(false);
  const [fifthModalOpen, setFifthModalOpen] = useState(false);
  const [receiveAmount, setReceiveAmount] = useState(0);
  const [receiveUsdAmount, setReceiveUsdAmount] = useState(0);
  const [bankOptionPay, setBankOptionPay] = useState('');
  const [note, setNote] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [use_dni, setUseDNI] = useState('');
  const [use_img, setUseImg] = useState('');
  const [termsCheckbox, setTermsCheckbox] = useState(false);
  const [banksEUR, setBanksEUR] = useState([]);
  const [banksGBP, setBanksGBP] = useState([]);
  const [banksUSD, setBanksUSD] = useState([]);
  const [user, setUser] = useState([]);
  const [use_imgDni, setUseImgDni] = useState('');
  const { logged, accessToken, currencyPrice } = useDataContext();
  const [mov_img, setMov_img] = useState('');
  const [payment, setPayment] = useState('');
  const [sendOption, setSendOption] = useState('');
  const [accNumber, setAccNumber] = useState('');
  const [accBank, setAccBank] = useState('');
  const [accOwner, setAccOwner] = useState('');
  const [accTlf, setAccTlf] = useState('');
  const [accDni, setAccDni] = useState('');
  const [showAccNumber, setShowAccNumber] = useState(false);
  const [porcents, setPorcents] = useState([])
  const [porcent, setPorcent] = useState('')

  const toggleTridModal = () => {
    setTridModalOpen(!tridModalOpen);
    setPayment('');
    setReceiveAmount('');
    setSendOption('');
    setSendAmount('');
    setBankOptionPay('');
    setPayment('');
    setNote('')
  };
  const toggleforthModal = () => {
    setForthModalOpen(!forthModalOpen);
    setPayment('');
    setSendAmount('');
    setBankOptionPay('')
  };
  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleSecondModal = () => {
    setModalOpen(false);
    setSecondModalOpen(!secondModalOpen);
    document.body.style.paddingRight = '0';
  };
  const toggleFifthModal = () => {
    setSecondModalOpen(false);
    setFifthModalOpen(!fifthModalOpen);
    document.body.style.paddingRight = '0';
  }

  const fetchDataPorcent = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/PorcentPrice');
      setPorcents(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchDataAccEur = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Acceur');
      setBanksEUR(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAccGbp = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/AccGbp');
      setBanksGBP(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAccUsd = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/AccUsd');
      setBanksUSD(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataUser = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByToken/${accessToken.access_token}`);
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setUser, accessToken]);

  useEffect(() => {
    fetchDataAccEur();
    fetchDataAccGbp();
    fetchDataAccUsd();
    fetchDataUser();
    fetchDataPorcent();
  }, [fetchDataUser]);

  // Cambios de monto
  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setSendAmount(inputAmount);

    currencyPrice.forEach((coin) => {
      if (payment === 'EUR') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_EurToBs);
        setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent) / 100)));
      } else if (payment === 'GBP') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_GbpToBs);
        setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent) / 100)));
      } else if (payment === 'USD') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_UsdToBs);
        setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent) / 100)));
      }
    });
  };

  //Enviar a espera una carga
  const handleSubmitLoad = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mov_currency', payment);
    formData.append('mov_amount', sendAmount);
    formData.append('mov_type', 'Deposito');
    formData.append('mov_status', 'E');
    formData.append('mov_comment', 'Carga de Divisa');
    formData.append('mov_img', mov_img);
    formData.append('use_imgDni', use_imgDni);
    formData.append('mov_accEurId', (payment === 'EUR' ? parseInt(bankOptionPay) : 0));
    formData.append('mov_accUsdId', (payment === 'USD' ? parseInt(bankOptionPay) : 0));
    formData.append('mov_accGbpId', (payment === 'GBP' ? parseInt(bankOptionPay) : 0));
    formData.append('mov_userId', user.use_id);

    try {
      await axios.post(
        'https://apiremesa.up.railway.app/Movements/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toggleforthModal();
      toast.success('Cambio realizado con exito!, En un momento se vera reflejado tu ingreso en la plataforma', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log('Request sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //Enviar a espera un retiro
  const handleSubmitSend = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mov_currency', payment);
    formData.append('mov_amount', sendAmount);
    formData.append('mov_type', 'Retiro');
    formData.append('mov_status', 'E');
    formData.append('mov_comment', `${accNumber} \n ${accBank} \n ${accOwner} \n ${accTlf} \n ${accDni} \n` + note);
    formData.append('mov_img', 'Retiro de Divisa');
    formData.append('mov_accEurId', (payment === 'EUR' ? 99 : 0));
    formData.append('mov_accUsdId', (payment === 'USD' ? 99 : 0));
    formData.append('mov_accGbpId', (payment === 'GBP' ? 99 : 0));
    formData.append('mov_userId', user.use_id);

    try {
      await axios.post(
        'https://apiremesa.up.railway.app/Movements/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      toggleTridModal();
      toast.success('Cambio realizado con exito!, En un momento tu egreso será procesado', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log('Request sent successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Verificacion DNI
  const handleSubmitVerifyDni = () => {

    const formData = new FormData();
    formData.append('use_imgDni', use_imgDni);

    try {
      axios.put(
        `https://apiremesa.up.railway.app/Users/dni/${user.use_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Request edit successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Verificacion User
  const handleSubmitVerify = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('use_dni', use_dni);
    formData.append('use_img', use_img);
    formData.append('use_verif', 'E');

    try {
      await axios.put(
        `https://apiremesa.up.railway.app/Users/${user.use_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      handleSubmitVerifyDni();
      toggleSecondModal();
      toast.success('¡Datos enviados con exito!. En minutos un administrador verificará tus datos', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });



      console.log('Request edit successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className='changesContainer'>
        {logged ? (
          user.use_verif === 'S' ? (
            <div style={{ height: '100vh' }}>
              <NavBar />
              <img className='changesMen' alt='changesMen' src={changes} />
              <div className='textchanges'>
                <h2>Hola {user.use_name} {user.use_lastName}</h2>
                <h3>${user.use_amountUsd ? user.use_amountUsd : 0} | €{user.use_amountEur ? user.use_amountEur : 0} | £{user.use_amountGbp ? user.use_amountGbp : 0}</h3>
                <h6 style={{ color: '#686868' }}>Disponible</h6>
              </div>

              {/* Cambios */}
              <div className='changes'>

                {/* Spain - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Spain} width={45} alt='Spain' /> Eur
                    </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_EurToBs))}
                  />
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Uk - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Uk} width={45} alt='Uk' /> Gbp
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_GbpToBs))}
                  />
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Usa - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Usa} alt='Usa' width={45} /> Usd
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_UsdToBs))}
                  >
                  </Input>
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Spain - Usa */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Spain} alt='Spain' width={45} /> Eur
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_EurToUsd))}
                  >
                  </Input>
                  <Button >
                    Usd <img src={Usa} alt='Usa' width={45} />
                  </Button>
                </InputGroup>
                
                {/* Buttons */}
                <InputGroup className='changesBtn'>
                  <div className='Btn' >
                    <Button color='primary' onClick={toggleforthModal}>
                      Recargar
                    </Button>
                    <Button color='success' onClick={toggleTridModal}>
                      Retirar
                    </Button>
                  </div>
                </InputGroup>
              </div>

              {/* Retirar */}
              <Modal isOpen={tridModalOpen} size='lg' centered toggle={toggleTridModal}>
                <ModalHeader toggle={toggleTridModal}>Ingresa tus datos bancarios</ModalHeader>
                <ModalBody>
                  <Form>
                    {/* Seleccionar Moneda a debitar */}
                    <FormGroup>
                      <Label>Selecciona el tipo de moneda a retirar</Label>
                      <Input
                        type="select"
                        id="payment"
                        defaultValue={payment}
                        onChange={(e) => setPayment(e.target.value)}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Libra Esterlina</option>
                        <option value="USD">Dolar</option>
                      </Input>
                    </FormGroup>
                    {/* Seleccionar Banco a recibir */}
                    <FormGroup>
                      <Label>Ingresa tus datos bancarios</Label>
                      <Input
                        type="select"
                        id="bankOptionSelect"
                        defaultValue={sendOption}
                        disabled={payment === ''}
                        onChange={(e) => {
                          setSendOption(e.target.value);
                          setShowAccNumber(e.target.value === 'Cuenta Bancaria');
                        }}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Efectivo">Efectivo (Dolares)</option>
                        <option value="Cuenta Bancaria">Cuenta Bancaria</option>
                        <option value="Pago Movil">Pago Móvil</option>
                      </Input>
                    </FormGroup>
                    {/* Seleccionar Lugar de Retiro */}
                    {sendOption === 'Efectivo' &&
                      <FormGroup>
                        <Label>Ingresa tus datos bancarios</Label>
                        <Input
                          type="select"
                          id="bankOptionSelect"
                          defaultValue={sendOption}
                          disabled={payment === ''}
                          onChange={(e) => { setPorcent(e.target.value) }}
                        >
                          <option value="">Selecciona una opción</option>
                          {porcents.map((por) => {
                            return <option value={por.por_porcent}>{por.por_location}</option>
                          })}
                        </Input>
                      </FormGroup>}
                    {/* Monto a debitar */}
                    <FormGroup>
                      <Label for="amountInput">Coloca el monto que deseas retirar</Label>
                      <InputGroup>
                        <Input
                          type="number"
                          id="sendAmount"
                          placeholder="Ej. 100"
                          defaultValue={sendAmount}
                          disabled={payment === ''}
                          onChange={(e) => handleAmountChange(e)}
                          invalid={
                            (sendAmount !== "" && sendAmount < 20) ||
                            (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                            (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                            (payment === 'GBP' ? user.use_amountGbp < sendAmount : null)}
                        />
                        {
                          (sendAmount !== "" && sendAmount < 20 ?
                            <FormFeedback>
                              El monto mínimo a retirar es de 20
                            </FormFeedback>
                            : null) ||
                          (payment === 'EUR' ? user.use_amountEur < sendAmount ?
                            <FormFeedback>
                              El monto excede la cantidad que tiene disponible en su cuenta
                            </FormFeedback>
                            : null
                            : null
                          ) ||
                          (payment === 'USD' ? user.use_amountUsd < sendAmount ?
                            <FormFeedback>
                              El monto excede la cantidad que tiene disponible en su cuenta
                            </FormFeedback>
                            : null
                            : null
                          ) ||
                          (payment === 'GBP' ? user.use_amountGbp < sendAmount ?
                            <FormFeedback>
                              El monto excede la cantidad que tiene disponible en su cuenta
                            </FormFeedback>
                            : null
                            : null
                          )}
                      </InputGroup>
                    </FormGroup>
                    {/* Seleccionar forma de pago a recibir */}
                    {
                      sendOption === "Cuenta Bancaria" ?
                        <FormGroup>
                          <Label for="receiveAmountInput">Monto a recibir en Bolivares</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="receiveAmountInput"
                              value={receiveAmount}
                              disabled
                            />
                          </InputGroup>
                        </FormGroup>
                        : null
                    }
                    {
                      sendOption === "Efectivo" ?
                        <FormGroup >
                          <Label for="receiveUsdAmountInput">Monto a recibir en Dolares</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="receiveUsdAmountInput"
                              value={receiveUsdAmount}
                              valid
                              disabled
                            />
                            <FormFeedback valid>
                              Multiplos de 20 (Valido solo en Caracas y Maracaibo)
                            </FormFeedback>
                          </InputGroup>
                        </FormGroup>
                        :
                        null
                    }
                    {
                      sendOption === "Pago Movil" ?
                        <FormGroup>
                          <Label for="receiveAmountInput">Monto a recibir en Bolivares</Label>
                          <InputGroup>
                            <Input
                              type="text"
                              id="receiveAmountInput"
                              value={parseInt(receiveAmount)}
                              disabled
                            />
                          </InputGroup>
                        </FormGroup>
                        :
                        null
                    }
                    {/* Datos para Nota */}
                    {
                      sendOption === "Cuenta Bancaria" ?
                        (<FormGroup >
                          <Label for="receiveAmountInput">Ingrese su número de cuenta</Label>
                          <Input
                            type="text"
                            id="accNumber"
                            placeholder='01080000000000000000'
                            value={accNumber}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              // Usar una expresión regular para eliminar cualquier carácter que no sea número
                              const numericValue = inputValue.replace(/[^0-9]/g, '');
                              setAccNumber(`Numero de cuenta: ${numericValue}`);
                            }}
                            maxLength={20}
                            pattern="[0-9]*" // Aceptar solo números
                            invalid={showAccNumber && (accNumber.length !== 20)}
                            valid={showAccNumber && (accNumber.length === 20)}
                          />
                          <FormFeedback invalid>
                            El número de cuenta debe tener exactamente 20 dígitos.
                          </FormFeedback>
                        </FormGroup>

                        )
                        :
                        null
                    }
                    {
                      sendOption === "Pago Movil" || sendOption === "Cuenta Bancaria" ?
                        (
                          <div className='row col-12'>
                            <FormGroup className='col-6'>
                              <Label for="receiveAmountInput">Ingrese el banco</Label>
                              <Input
                                type="text"
                                id="accBank"
                                onChange={(e) => setAccBank(`Banco: ${e.target.value}`)}
                              />
                            </FormGroup>
                            <FormGroup className='col-6'>
                              <Label for="receiveAmountInput">Ingrese el propietario de la cuenta bancaria</Label>
                              <Input
                                type="text"
                                id="setAccOwner"
                                onChange={(e) => setAccOwner(`Propietario: ${e.target.value}`)}
                              />
                            </FormGroup>
                            <FormGroup className='col-6'>
                              <Label for="receiveAmountInput">Ingrese el número teléfonico</Label>
                              <Input
                                type="text"
                                id="accTlf"
                                onChange={(e) => setAccTlf(`Número Telefónico: ${e.target.value}`)}
                              />
                            </FormGroup>
                            <FormGroup className='col-6'>
                              <Label for="receiveAmountInput">Ingrese identificación</Label>
                              <Input
                                type="text"
                                id="accDni"
                                onChange={(e) => setAccDni(`DNI: ${e.target.value}`)}
                              />
                            </FormGroup>
                          </div>
                        )
                        :
                        null
                    }
                    {
                      sendOption === "Pago Movil" || sendOption === "Cuenta Bancaria" ?
                        (<FormGroup>
                          <Label for="receiveAmountInput">Ingrese un comentario (opcional)</Label>
                          <Input
                            type="textarea"
                            id="noteTextArea"
                            rows="4"
                            disabled={payment === ''}
                            placeholder="Ingrese algun comentario"
                            onChange={(e) => setNote(
                              `Nota: ${e.target.value}`
                            )}
                          />
                        </FormGroup>
                        )
                        :
                        null
                    }
                    {
                      sendOption === "Efectivo" ?
                        (<FormGroup>
                          <Label for="receiveAmountInput">Ingrese Los datos requeridos </Label>
                          <Input
                            type="textarea"
                            id="noteTextArea"
                            rows="4"
                            disabled={payment === ''}
                            placeholder="Ingrese la ubicacion a donde desea recibir y un numero de contacto"
                            onChange={(e) => setNote(
                              `Nota: ${e.target.value}`
                            )}
                          />
                        </FormGroup>
                        )
                        :
                        null
                    }
                    {
                      sendOption === "Pago Movil" &&
                      <Button disabled={
                        payment === '' ||
                        sendOption === '' ||
                        accBank === '' ||
                        accOwner === '' ||
                        accTlf === '' ||
                        accDni === '' ||
                        sendAmount === "" ||
                        sendAmount < 20 ||
                        (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                        (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                        (payment === 'GBP' ? user.use_amountGbp < sendAmount : null)}
                        onClick={handleSubmitSend} className='btn col-md-12' color="primary">
                        Enviar
                      </Button>
                    }
                    {
                      sendOption === "Efectivo" &&
                      <Button disabled={
                        payment === '' ||
                        sendOption === '' ||
                        sendAmount === "" ||
                        note === "" ||
                        sendAmount < 20 ||
                        (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                        (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                        (payment === 'GBP' ? user.use_amountGbp < sendAmount : null)}
                        onClick={handleSubmitSend} className='btn col-md-12' color="primary">
                        Enviar
                      </Button>
                    }
                    {
                      sendOption === "Cuenta bancaria" &&
                      <Button disabled={
                        payment === '' ||
                        sendOption === '' ||
                        accNumber === '' ||
                        accBank === '' ||
                        accOwner === '' ||
                        accTlf === '' ||
                        accDni === '' ||
                        sendAmount === "" ||
                        sendAmount < 20 ||
                        (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                        (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                        (payment === 'GBP' ? user.use_amountGbp < sendAmount : null)}
                        onClick={handleSubmitSend} className='btn col-md-12' color="primary">
                        Enviar
                      </Button>
                    }
                  </Form>
                </ModalBody>
              </Modal>

              {/* Cargar */}
              <Modal centered isOpen={forthModalOpen} size='lg' toggle={toggleforthModal}>
                <ModalHeader toggle={toggleforthModal}>Realiza tu Carga</ModalHeader>
                <ModalBody>
                  <Form>
                    <FormGroup>
                      <Label>Selecciona el tipo de moneda a cargar</Label>
                      <Input
                        type="select"
                        id="payment"
                        defaultValue={payment}
                        onChange={(e) => setPayment(e.target.value)}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Libra Esterlina</option>
                        <option value="USD">Dolar</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label for="amountInput">Coloca el monto que deseas cargar</Label>
                      <InputGroup>
                        <Input
                          type="number"
                          id="sendAmount"
                          placeholder="Ej. 100"
                          defaultValue={sendAmount}
                          disabled={payment === ''}
                          onChange={(e) => handleAmountChange(e)}
                          invalid={sendAmount !== "" && sendAmount < 20} // Agrega el atributo invalid
                        />
                        {sendAmount !== "" && sendAmount < 20 && (
                          <FormFeedback>
                            El monto mínimo a retirar es de 20
                          </FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label>Selecciona el Banco a transferir</Label>
                      <Input
                        type="select"
                        id="bankOptionPaySelect"
                        defaultValue={bankOptionPay}
                        disabled={payment === ''}
                        onChange={(e) => { setBankOptionPay(e.target.value) }}
                      >
                        <option value="">Selecciona una opción</option>
                        {payment === 'EUR' ?
                          banksEUR.filter((bank) => bank.acceur_status === 'Activo').map((bank) => {
                            return bank.acceur_Bank ?
                              <option value={bank.acceur_id}>{bank.acceur_Bank}</option>
                              : null
                          })
                          : payment === 'USD' ?
                            banksUSD.filter((bank) => bank.accusd_status === 'Activo').map((bank) => {
                              return bank.accusd_Bank ?
                                <option value={bank.accusd_id}>{bank.accusd_Bank}</option>
                                : null
                            })
                            : payment === 'GBP' ?
                              banksGBP.filter((bank) => bank.accgbp_status === 'Activo').map((bank) => {
                                return bank.accgbp_Bank ?
                                  <option value={bank.accgbp_id}>{bank.accgbp_Bank}</option>
                                  : null
                              })
                              : null
                        }
                      </Input>
                    </FormGroup>

                    {bankOptionPay === "" ? null :
                      <Alert>
                        <h4 className="alert-heading">
                          Cuenta Bancaria:
                        </h4>
                        {payment === 'EUR' ?
                          banksEUR.map((bank) => {
                            return bank.acceur_id === parseInt(bankOptionPay) && bank.acceur_status === 'Activo' ?
                              <p>
                                Banco: {bank.acceur_Bank}
                                <br />
                                Cuenta: {bank.acceur_number}
                                <br />
                                NIE/NIF: {bank.acceur_nie}
                                <br />
                                Propietario: {bank.acceur_owner}
                              </p>
                              : null
                          })
                          : payment === 'USD' ?
                            banksUSD.map((bank) => {
                              return bank.accusd_id === parseInt(bankOptionPay) ?
                                <p>
                                  Banco: {bank.accusd_Bank}
                                  <br />
                                  {bank.accusd_type}
                                  <br />
                                  Propietario: {bank.accusd_owner}
                                  <br />
                                  Email: {bank.accusd_email}
                                </p>
                                : null
                            })
                            : payment === 'GBP' ?
                              banksGBP.map((bank) => {
                                return bank.accgbp_id === parseInt(bankOptionPay) ?
                                  <p>
                                    Banco: {bank.accgbp_Bank}
                                    <br />
                                    Cuenta: {bank.accgbp_number}
                                    <br />
                                    DNI: {bank.accgbp_Ident}
                                    <br />
                                    Propietario: {bank.accgbp_owner}
                                  </p>
                                  : null
                              })
                              : null
                        }
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
                        disabled={payment === ''}
                        onChange={(e) => setMov_img(e.target.files[0])}
                      />
                    </FormGroup>

                    <Button disabled={
                      payment === '' ||
                      mov_img === '' ||
                      sendAmount === '' ||
                      sendAmount === "" ||
                      sendAmount < 20}
                      color="primary"
                      onClick={handleSubmitLoad} className='btn col-md-12'>
                      Enviar
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>

              <ToastContainer />
            </div>
          ) : (
            <div style={{ height: '100vh' }}>
              <NavBar />
              <img className='changesMen' alt='changesMen' src={changes} />
              <div className='textchanges'>
                <h2>Hola {user.use_name} {user.use_lastName}</h2>
                <h3>${user.use_amountUsd ? user.use_amountUsd : 0} | €{user.use_amountEur ? user.use_amountEur : 0} | £{user.use_amountGbp ? user.use_amountGbp : 0}</h3>
                <h6 style={{ color: '#686868' }}>Disponible</h6>
              </div>

              {/* Cambios */}
              <div className='changes'>
                {/* Spain - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Spain} width={45} alt='Spain' /> Eur
                    </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_EurToBs))}
                  />
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Uk - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Uk} width={45} alt='Uk' /> Gbp
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_GbpToBs))}
                  />
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Usa - Bs */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Usa} alt='Usa' width={45} /> Usd
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_UsdToBs))}
                  >
                  </Input>
                  <Button >
                    Bs <img src={Venezuela} alt='Venezuela' width={45} />
                  </Button>
                </InputGroup>

                {/* Spain - Usa */}
                <InputGroup className='Change-Input1'>
                  <Button>
                    <img src={Spain} alt='Spain' width={45} /> Eur
                  </Button>
                  <Input disabled className='centered-input'
                    placeholder={'1  =  ' + (currencyPrice.map(coin => coin.cur_EurToUsd))}
                  >
                  </Input>
                  <Button >
                    Usd <img src={Usa} alt='Usa' width={45} />
                  </Button>
                </InputGroup>

                <InputGroup className='changesBtn'>
                  <div className='Btn' >
                    <Button color='primary' onClick={user.use_verif === 'N' ? toggleModal : toggleFifthModal}>
                      Recargar
                    </Button>
                    <Button color='success' onClick={user.use_verif === 'N' ? toggleModal : toggleFifthModal}>
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
                  <form onSubmit={handleSubmitVerify}>
                    <div className="form-group">
                      <Label htmlFor="dniInput">Número de Documento de Identidad:</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="dniInput"
                        placeholder="Ingresa tu DNI"
                        value={use_dni}
                        onChange={(e) => setUseDNI(e.target.value)}
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
                        onChange={(e) => setUseImg(e.target.files[0])}
                      />
                    </div>
                    <div className="form-group">
                      <Label htmlFor="imageInput">Seleccionar Imagen del DNI:</Label>
                      <Input
                        type="file"
                        className="form-control-file"
                        id="imageInputDNI"
                        onChange={(e) => setUseImgDni(e.target.files[0])}
                      />
                    </div>
                    <div style={{ marginTop: '1em', marginLeft: '.5em' }} className="form-check">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="termsCheckbox"
                        checked={termsCheckbox}
                        onChange={(e) => setTermsCheckbox(e.target.checked)}
                      />
                      <Label className="form-check-label" htmlFor="termsCheckbox">
                        Acepto los términos y condiciones
                      </Label>
                    </div>
                    <img style={{ marginLeft: '30%' }} src={ImageVerification} alt='ImageVerification'></img>

                    <Button
                      disabled={
                        !termsCheckbox ||
                        use_dni === '' ||
                        use_img === '' ||
                        use_imgDni === ''}
                      type='submit'
                      className="btn col-md-12"
                      color='success'>
                      Enviar
                    </Button>
                  </form>
                </ModalBody>
              </Modal>

              {/* Verificación en proceso */}
              <Modal isOpen={fifthModalOpen} centered toggle={toggleFifthModal}>
                <ModalHeader toggle={toggleFifthModal}>Verificación en proceso</ModalHeader>
                <ModalBody>
                  <div style={{ textAlign: 'center' }}>
                    <FaExclamationCircle style={{ fontSize: '48px', marginBottom: '20px', color: 'red' }} />
                    <p>Tu usuario está en proceso de verificación.</p>
                    <p>Espera a que un administrador apruebe tu identidad.</p>
                    <p>El tiempo estimado de verificación dentro de nuestro horario laboral es de aproximadamente 20 minutos.</p>
                  </div>
                </ModalBody>
              </Modal>

              <ToastContainer />
              <Footer />
            </div>
          )
        ) : (
          <NotFound404 />
        )}
      </div >
    </div>
  )
}

export { Changes }