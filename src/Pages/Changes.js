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
import { Link } from 'react-router-dom';
import axios from 'axios';
import changes from '../Assets/Images/changes.png'
import Spain from '../Assets/Images/spain.png'
import Uk from '../Assets/Images/uk.png'
import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
import VerificationImage from '../Assets/Images/verification.png';
import ImageVerification from '../Assets/Images/ImageVerification.png'
import DniVerification from '../Assets/Images/DniVerification.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavBar } from '../Components/NavBar';
import { NotFound404 } from '../Pages/NotFound404';
import { FixeedAlert } from '../Components/FixeedAlert';
import { Contact } from '../Components/Contact';

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
  const [porcent, setPorcent] = useState(null)
  const [delivery, setDelivery] = useState('')
  const [length, setLength] = useState('')
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationMobile, setShowConfirmationMobile] = useState(false);
  const [showConfirmationCash, setShowConfirmationCash] = useState(false);
  const [showConfirmationBank, setShowConfirmationBank] = useState(false);
  const [showModal, setShowModal] = useState(false);



  const showUserStatusAlert = (userStatus) => {
    if (userStatus === 'N') {
      setAlertMessage('Usuario no verificado');
      setAlertType('error');
    } else if (userStatus === 'E') {
      setAlertMessage('Usuario en proceso de verificación');
      setAlertType('info');
    } else if (userStatus === 'S') {
      setAlertMessage('Usuario verificado');
      setAlertType('success');
    }
    setShowAlert(true);
  };

  const toggleTridModal = () => {
    setTridModalOpen(!tridModalOpen);
    setPayment('');
    setReceiveAmount('');
    setSendOption('');
    setSendAmount('');
    setBankOptionPay('');
    setDelivery('');
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
  const fetchDataPorcentId = async (id) => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/PorcentPrice/${id}`);
      setPorcent(response.data);
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
    showUserStatusAlert(user.use_verif);
  }, [fetchDataUser, user]);

  // Cambios de monto
  const handleAmountChange = (e) => {
    const inputAmount = e.target.value;
    setSendAmount(inputAmount);

    currencyPrice.forEach((coin) => {
      if (payment === 'EUR') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_EurToBs);
        if (sendOption === 'Efectivo' && porcent.por_status === 'Obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentEur) / 100) + porcent.por_deliveryPrice));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'No obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentEur) / 100) + parseFloat(delivery)));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'Oficina') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentEur) / 100)));
        }


      } else if (payment === 'GBP') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_GbpToBs);
        if (sendOption === 'Efectivo' && porcent.por_status === 'Obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentGbp) / 100) + porcent.por_deliveryPrice));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'No obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentGbp) / 100) + parseFloat(delivery)));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'Oficina') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentGbp) / 100)));
        }

      } else if (payment === 'USD') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_UsdToBs);
        if (sendOption === 'Efectivo' && porcent.por_status === 'Obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentUsd) / 100) + porcent.por_deliveryPrice));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'No obligatorio') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentUsd) / 100) + parseFloat(delivery)));
        }
        if (sendOption === 'Efectivo' && porcent.por_status === 'Oficina') {
          setReceiveUsdAmount(parseFloat(inputAmount) + (parseFloat(inputAmount) * (parseFloat(porcent.por_porcentUsd) / 100)));
        }
      }
    });
  };

  const handleAmountChangeBs = (e) => {
    const inputAmount = e.target.value;
    setSendAmount(inputAmount);

    currencyPrice.forEach((coin) => {
      if (payment === 'EUR') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_EurToBs);
      } else if (payment === 'GBP') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_GbpToBs);
      } else if (payment === 'USD') {
        setReceiveAmount(parseFloat(inputAmount) * coin.cur_UsdToBs);
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

      setShowConfirmation(false);

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
    formData.append('mov_comment', `${accNumber} ${accBank} ${accOwner} ${accTlf} ${accDni} ${sendOption} ${sendOption === 'Efectivo' && porcent ? porcent.por_stateLocation + '\n' : ''} ${sendOption === 'Efectivo' && porcent.por_comment !== '' ? porcent.por_comment + '\n' : ''} \n` + note);
    formData.append('mov_img', 'Retiro de Divisa');
    formData.append('mov_typeOutflow', sendOption);
    formData.append('mov_accEurId', (payment === 'EUR' ? 99 : 0));
    formData.append('mov_accUsdId', (payment === 'USD' ? 99 : 0));
    formData.append('mov_accGbpId', (payment === 'GBP' ? 99 : 0));
    formData.append('mov_userId', user.use_id);

    const formDataUser = new FormData();
    if (sendOption === 'Efectivo') {
      formDataUser.append('use_amountUsd', (payment === 'USD' ? user.use_amountUsd - receiveUsdAmount : user.use_amountUsd));
      formDataUser.append('use_amountGbp', (payment === 'GBP' ? user.use_amountGbp - receiveUsdAmount : user.use_amountGbp));
      formDataUser.append('use_amountEur', (payment === 'EUR' ? user.use_amountEur - receiveUsdAmount : user.use_amountEur));
    } else {
      formDataUser.append('use_amountUsd', (payment === 'USD' ? user.use_amountUsd - sendAmount : user.use_amountUsd));
      formDataUser.append('use_amountGbp', (payment === 'GBP' ? user.use_amountGbp - sendAmount : user.use_amountGbp));
      formDataUser.append('use_amountEur', (payment === 'EUR' ? user.use_amountEur - sendAmount : user.use_amountEur));
    }

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

      await axios.put(
        `https://apiremesa.up.railway.app/Users/${user.use_id}`,
        formDataUser,
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

      setShowConfirmationMobile(false);
      setShowConfirmationBank(false);
      setShowConfirmationCash(false);


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

  const handleClose = () => {
    setShowModal(false);
  };

  const handleShow = () => {
    setShowModal(true);
    // Aquí puedes realizar la solicitud a la API para obtener los datos necesarios y guardarlos en el estado.
  };

  return (
    <div>
      <div className='changesContainer'>
        {logged ? (
          user.use_verif === 'S' ? (
            <div style={{ height: '100vh' }}>
              <NavBar />
              <Contact />
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
              <Modal isOpen={tridModalOpen} size='xl' centered toggle={toggleTridModal}>
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
                    {/* Seleccionar Metodo de recibo */}
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

                    {/* SendOption en Efectivo */}
                    {/* Seleccionar Lugar de Retiro */}

                    {sendOption === 'Efectivo' &&
                      <FormGroup>
                        <Label>Ingresa tu Localidad</Label>
                        <Input
                          type="select"
                          id="bankOptionSelect"
                          defaultValue={sendOption}
                          disabled={payment === ''}
                          onChange={(e) => { fetchDataPorcentId(e.target.value) }}>
                          <option value="">Selecciona una opción</option>
                          {porcents.map((por) => {
                            return <option value={por.por_id}>{por.por_stateLocation}</option>
                          })}
                        </Input>
                      </FormGroup>}

                    {porcent && porcent.por_status === 'No obligatorio' && sendOption === 'Efectivo' &&
                      <FormGroup>
                        <Label>¿Desea delivery?</Label>
                        <Input
                          type="select"
                          id="delivery"
                          onChange={(e) => { setDelivery(e.target.value) }}>
                          <option value="">Selecciona una opción</option>
                          <option value={0}>No</option>
                          {porcent && <option value={porcent.por_deliveryPrice}>Si</option>}
                        </Input>
                      </FormGroup>}

                    {porcent && ((porcent.por_status === 'No obligatorio' && delivery === '0') || (porcent.por_status === 'Oficina')) && sendOption === 'Efectivo' &&
                      <FormGroup>
                        <Label>Pase por Oficina</Label>
                        <Input
                          type="textarea"
                          id="comment"
                          placeholder="Ej. Pase por oficina"
                          value={porcent.por_comment}
                          disabled>
                        </Input>
                      </FormGroup>}

                    {porcent && porcent.por_status === 'Obligatorio' && sendOption === 'Efectivo' &&
                      <FormGroup>
                        <Label>Delivery</Label>
                        <Input
                          type="select"
                          id="delivery"
                          disabled>
                          {porcent && <option value={porcent.por_deliveryPrice}>Si</option>}
                        </Input>
                      </FormGroup>}

                    {/* Monto a debitar */}
                    {(sendOption === 'Cuenta Bancaria' || sendOption === "Pago Movil") &&
                      <FormGroup>
                        <Label for="amountInput">Coloca el monto que deseas retirar</Label>
                        <InputGroup>
                          <Input
                            type="number"
                            id="sendAmount"
                            placeholder="Ej. 100"
                            defaultValue={sendAmount}
                            disabled={payment === '' || sendOption === ''}
                            onChange={(e) => { handleAmountChange(e) }}
                            invalid={
                              (sendAmount !== "" && sendAmount < 20) ||
                              (sendOption === 'Efectivo' ? sendAmount < 100 && sendAmount % 2 !== 0 : null) ||
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
                            (sendOption === 'Efectivo' ? sendAmount < 100 && sendAmount % 2 !== 0 ?
                              <FormFeedback>
                                El monto mínimo a retirar en efectivo es de 100
                              </FormFeedback>
                              : null
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
                      </FormGroup>}

                    {sendOption === 'Efectivo' && porcent &&
                      <FormGroup>
                        <Label for="amountInput">Monto a recibir en dolares</Label>
                        <InputGroup>
                          <Input
                            type="number"
                            id="sendAmount"
                            placeholder="Ej. 100"
                            defaultValue={sendAmount}
                            disabled={payment === '' || sendOption === '' || (porcent.por_status === 'No obligatorio' && delivery === '')}
                            onChange={(e) => { handleAmountChange(e) }}
                            invalid={
                              sendAmount === "" ||
                              sendAmount < 100 ||
                              sendAmount % 20 !== 0 ||
                              (payment === 'EUR' && user.use_amountEur < sendAmount) ||
                              (payment === 'USD' && user.use_amountUsd < sendAmount) ||
                              (payment === 'GBP' && user.use_amountGbp < sendAmount)
                            }
                          />
                          {
                            (sendAmount !== "" && sendAmount < 100 ?
                              <FormFeedback>
                                El monto mínimo a retirar es de 100
                              </FormFeedback>
                              : null) ||
                            (sendOption === 'Efectivo' && sendAmount % 20 !== 0 ?
                              <FormFeedback>
                                {sendAmount % 20 !== 0
                                  ? "El monto debe ser un múltiplo de 20"
                                  : "El monto mínimo a retirar en efectivo es de 100"}
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
                      </FormGroup>}

                    {/* Seleccionar forma de pago a recibir */}
                    {sendOption === "Cuenta Bancaria" ?
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
                      : null}
                    {porcent && sendOption === "Efectivo" ?
                      <FormGroup >
                        <Label for="receiveUsdAmountInput">Monto a debitar</Label>
                        <InputGroup>
                          <Input
                            type="text"
                            id="receiveUsdAmountInput"
                            value={receiveUsdAmount}
                            disabled
                            invalid={
                              (payment === 'EUR' && user.use_amountEur < receiveUsdAmount) ||
                              (payment === 'USD' && user.use_amountUsd < receiveUsdAmount) ||
                              (payment === 'GBP' && user.use_amountGbp < receiveUsdAmount)
                            }
                          />
                          {
                            (payment === 'EUR' ? user.use_amountEur < receiveUsdAmount ?
                              <FormFeedback>
                                El monto excede la cantidad que tiene disponible en su cuenta
                              </FormFeedback>
                              : null
                              : null
                            ) ||
                            (payment === 'USD' ? user.use_amountUsd < receiveUsdAmount ?
                              <FormFeedback>
                                El monto excede la cantidad que tiene disponible en su cuenta
                              </FormFeedback>
                              : null
                              : null
                            ) ||
                            (payment === 'GBP' ? user.use_amountGbp < receiveUsdAmount ?
                              <FormFeedback>
                                El monto excede la cantidad que tiene disponible en su cuenta
                              </FormFeedback>
                              : null
                              : null
                            )
                          }
                        </InputGroup>
                      </FormGroup>
                      : null}
                    {sendOption === "Pago Movil" ?
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
                      : null}
                    {/* Datos para Nota */}
                    {sendOption === "Cuenta Bancaria" ?
                      (
                        <FormGroup >
                          <Label for="receiveAmountInput">Ingrese su número de cuenta</Label>
                          <Input
                            type="text"
                            id="accNumber"
                            placeholder='01080000000000000000'
                            onChange={(e) => {
                              const target = e.target.value
                              setLength(target.length)
                              setAccNumber(`Numero de cuenta: ${target} \n`);
                            }}
                            maxLength={20}
                            pattern="[0-9]*" // Aceptar solo números
                            invalid={showAccNumber && length !== 20}
                            valid={showAccNumber && length === 20}
                          />
                          <FormFeedback invalid>
                            El número de cuenta debe tener exactamente 20 dígitos.
                          </FormFeedback>
                        </FormGroup>

                      ) : null}
                    {sendOption === "Efectivo" ?
                      (
                        <div className='row col-12'>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Nombre completo de quien recibe</Label>
                            <Input
                              type="text"
                              id="accBank"
                              maxLength={45}
                              placeholder='Juan Medina'
                              onChange={(e) => setAccBank(`Persona a recibir: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Cédula de quien recibe</Label>
                            <Input
                              type="text"
                              id="accDni"
                              maxLength={11}
                              placeholder='00000000'
                              onChange={(e) => setAccDni(`DNI: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">¿Quien le envia?</Label>
                            <Input
                              type="text"
                              id="setAccOwner"
                              maxLength={45}
                              placeholder='Maria Gonzalez'
                              onChange={(e) => setAccOwner(`Propietario: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Telefono de contacto</Label>
                            <Input
                              type="text"
                              id="accTlf"
                              maxLength={15}
                              placeholder='0414-000-0000'
                              onChange={(e) => setAccTlf(`Número Telefónico: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                        </div>
                      )
                      : null}
                    {sendOption === "Pago Movil" || sendOption === "Cuenta Bancaria" ?
                      (
                        <div className='row col-12'>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Ingrese el banco</Label>
                            <Input
                              type="text"
                              id="accBank"
                              maxLength={45}
                              onChange={(e) => setAccBank(`Banco: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Ingrese el propietario de la cuenta bancaria</Label>
                            <Input
                              type="text"
                              id="setAccOwner"
                              maxLength={45}
                              onChange={(e) => setAccOwner(`Propietario: ${e.target.value} \n`)}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label htmlFor="receiveAmountInput">Ingrese el número telefónico</Label>
                            <Input
                              type="text" // Cambiado a type="text"
                              id="accTlf"
                              onInput={(e) => {
                                const inputValue = e.target.value;
                                const numericValue = inputValue.replace(/\D/g, ''); // Elimina caracteres que no son dígitos
                                const truncatedValue = numericValue.slice(0, 15); // Limita a 10 dígitos
                                e.target.value = truncatedValue; // Actualiza el valor del campo
                                setAccTlf(`Número Telefónico: ${truncatedValue} \n`);
                              }}
                            />
                          </FormGroup>
                          <FormGroup className='col-6'>
                            <Label for="receiveAmountInput">Ingrese identificación</Label>
                            <Input
                              type="text"
                              id="accDni"
                              onInput={(e) => {
                                const inputValue = e.target.value;
                                const truncatedValue = inputValue.slice(0, 10); // Limita a 10 caracteres
                                e.target.value = truncatedValue; // Actualiza el valor del campo
                                setAccDni(`DNI: ${truncatedValue} \n`);
                              }}
                            />
                          </FormGroup>
                        </div>
                      ) : null}
                    {sendOption === "Pago Movil" || sendOption === "Cuenta Bancaria" ?
                      (
                        <FormGroup>
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
                      porcent && sendOption === "Efectivo" ?
                        (<FormGroup>
                          <Label for="receiveAmountInput">Ingrese la direccion de entrega </Label>
                          <Input
                            type="textarea"
                            id="noteTextArea"
                            rows="4"
                            disabled={payment === '' || porcent.por_status === 'Oficina' || (porcent.por_status === 'No obligatorio' && delivery === '0')}
                            placeholder="Direccion de entrega"
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
                        onClick={() => setShowConfirmationMobile(true)} className='btn col-md-12'>
                        Enviar
                      </Button>
                    }
                    {
                      porcent && sendOption === "Efectivo" &&
                      <Button disabled={
                        payment === '' ||
                        sendOption === '' ||
                        sendAmount === "" ||
                        ((porcent.por_status === 'Obligatorio' || (porcent.por_status === 'No obligatorio' && (delivery !== '0' || delivery !== ''))) && note === "") ||
                        (porcent.por_status === 'No obligatorio' && delivery === '' && note !== '') ||
                        (porcent.por_status === 'Obligatorio' && note === "") ||
                        // (porcent.por_status === 'No obligatorio' && delivery === '' && note !== '') ||
                        // (porcent.por_status === 'No obligatorio' && delivery === '0' && note !== '') ||
                        // (porcent.por_status === 'Oficina' && note === "") ||
                        accDni === '' ||
                        accOwner === '' ||
                        accTlf === '' ||
                        accBank === '' ||
                        sendAmount < 20 ||
                        sendAmount === "" ||
                        sendAmount < 100 ||
                        sendAmount % 20 !== 0 ||
                        (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                        (payment === 'EUR' && user.use_amountEur < receiveUsdAmount) ||

                        (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                        (payment === 'USD' && user.use_amountUsd < receiveUsdAmount) ||

                        (payment === 'GBP' ? user.use_amountGbp < sendAmount : null) ||
                        (payment === 'GBP' && user.use_amountGbp < receiveUsdAmount)
                      }
                        onClick={() => setShowConfirmationCash(true)} className='btn col-md-12' color="success">
                        Enviar
                      </Button>
                    }
                    {
                      sendOption === "Cuenta Bancaria" &&
                      <Button disabled={
                        payment === '' ||
                        sendOption === '' ||
                        accNumber === '' ||
                        accBank === '' ||
                        accOwner === '' ||
                        accTlf === '' ||
                        accDni === '' ||
                        sendAmount === '' ||
                        sendAmount < 20 ||
                        (payment === 'EUR' ? user.use_amountEur < sendAmount : null) ||
                        (payment === 'USD' ? user.use_amountUsd < sendAmount : null) ||
                        (payment === 'GBP' ? user.use_amountGbp < sendAmount : null)}
                        onClick={() => setShowConfirmationBank(true)} className='btn col-md-12'>
                        Enviar
                      </Button>
                    }
                  </Form>
                </ModalBody>
              </Modal>

              {/* Confirmacion Pago Movil */}
              <Modal isOpen={showConfirmationMobile} centered toggle={() => setShowConfirmationMobile(!showConfirmationMobile)}>
                <ModalHeader toggle={() => setShowConfirmationMobile(!showConfirmationMobile)}>Confirmación de Datos</ModalHeader>
                <ModalBody>
                  <h5>Tipo de Moneda: {payment}</h5>
                  <h5>Monto a Retirar: {sendAmount}</h5>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      handleSubmitSend(e); // Pass the event object to the function
                      setShowConfirmationMobile(false);
                    }}
                  >
                    Confirmar
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setShowConfirmationMobile(false)} // Cierra el modal de confirmación
                  >
                    Cancelar
                  </Button>
                </ModalBody>
              </Modal>

              {/* Confirmacion Transferencias Bancarias */}
              <Modal isOpen={showConfirmationBank} centered toggle={() => setShowConfirmationBank(!showConfirmationBank)}>
                <ModalHeader toggle={() => setShowConfirmationBank(!showConfirmationBank)}>Confirmación de Datos</ModalHeader>
                <ModalBody>
                  <h5>Tipo de Moneda: {payment}</h5>
                  <h5>Monto a Retirar: {sendAmount}</h5>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      handleSubmitSend(e); // Pass the event object to the function
                      setShowConfirmationBank(false);
                    }}
                  >
                    Confirmar
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setShowConfirmationBank(false)} // Cierra el modal de confirmación
                  >
                    Cancelar
                  </Button>
                </ModalBody>
              </Modal>


              {/* Confirmacion Efectivo */}
              <Modal isOpen={showConfirmationCash} centered toggle={() => setShowConfirmationCash(!showConfirmationCash)}>
                <ModalHeader toggle={() => setShowConfirmationCash(!showConfirmationCash)}>Confirmación de Datos</ModalHeader>
                <ModalBody>
                  <h5>Tipo de Moneda: {payment}</h5>
                  <h5>Monto a Retirar: {sendAmount}</h5>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      handleSubmitSend(e); // Pass the event object to the function
                      setShowConfirmationCash(false);
                    }}
                  >
                    Confirmar
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setShowConfirmationCash(false)} // Cierra el modal de confirmación
                  >
                    Cancelar
                  </Button>
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
                        onChange={(e) => setPayment(e.target.value)}>
                        <option value="">Selecciona una opción</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">Libra Esterlina</option>
                        <option value="USD">Dolar</option>
                      </Input>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="sendAmount">Coloca el monto que deseas cargar</Label>
                      <InputGroup>
                        <Input
                          type="number"
                          id="sendAmount"
                          placeholder="Ej. 100"
                          value={sendAmount}
                          disabled={payment === ''}
                          onChange={(e) => handleAmountChangeBs(e)}
                          invalid={sendAmount !== "" && (sendAmount < 20 || sendAmount.toString().length > 6)}
                        />
                        {sendAmount !== "" && sendAmount.toString().length > 6 && (
                          <FormFeedback>
                            El monto debe contener 6 cifras o menos.
                          </FormFeedback>
                        )}
                        {sendAmount !== "" && sendAmount < 20 && (
                          <FormFeedback>
                            El monto mínimo a retirar es de 20.
                          </FormFeedback>
                        )}
                      </InputGroup>
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor='bankOptionPaySelect' >Selecciona el método de carga</Label>
                      <Input
                        type="select"
                        id="bankOptionPaySelect"
                        defaultValue={bankOptionPay}
                        disabled={payment === ''}
                        onChange={(e) => { setBankOptionPay(e.target.value) }}>
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
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => setMov_img(e.target.files[0])}
                      />
                    </FormGroup>

                    <Button disabled={
                      payment === '' ||
                      mov_img === '' ||
                      sendAmount === '' ||
                      sendAmount === "" ||
                      sendAmount < 20 ||
                      (sendAmount !== "" && sendAmount.toString().length > 6)
                    }
                      color="primary"
                      onClick={() => setShowConfirmation(true)} className='btn col-md-12'>
                      Enviar
                    </Button>
                  </Form>
                </ModalBody>
              </Modal>

              <Modal isOpen={showConfirmation} centered toggle={() => setShowConfirmation(!showConfirmation)}>
                <ModalHeader toggle={() => setShowConfirmation(!showConfirmation)}>Confirmación de Datos</ModalHeader>
                <ModalBody>
                  <h5>Tipo de Moneda: {payment}</h5>
                  <h5>Monto a Retirar: {sendAmount}</h5>
                  <Button
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default form submission behavior
                      handleSubmitLoad(e); // Pass the event object to the function
                      setShowConfirmation(false);
                    }}
                  >
                    Confirmar
                  </Button>{" "}
                  <Button
                    color="secondary"
                    onClick={() => setShowConfirmation(false)} // Cierra el modal de confirmación
                  >
                    Cancelar
                  </Button>
                </ModalBody>
              </Modal>


              <ToastContainer />
            </div>
          ) : (
            <div style={{ height: '100vh' }}>
              <NavBar />
              {showAlert && <FixeedAlert message={alertMessage} type={alertType} />}
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
                  <Input
                    disabled
                    className='centered-input'
                    placeholder='Consultar estado'
                    onClick={handleShow} // Abre el modal al hacer clic en el input
                  ></Input>
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


          {/* Consultar estado */}
              <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Consulta tu estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Coloca aquí el contenido del modal, como los datos de la API */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cerrar
          </Button>
          {/* Agrega otros botones o acciones según sea necesario */}
        </Modal.Footer>
      </Modal>

              {/* Alert */}
              <Modal isOpen={modalOpen} centered toggle={toggleModal} className="responsive-modal">
                <ModalHeader>
                  <b style={{ fontFamily: 'Roboto', fontWeight: '900' }}> ¡Necesitas verificación! </b>
                </ModalHeader>
                <ModalBody className='custom-modal-content'>
                  <img src={VerificationImage} style={{ float: 'right' }} alt='Exclamation Triangle' width={120} className='modal-image' />
                  <Button style={{ background: '#409192', border: 'none', borderRadius: '15px', marginLeft: '15px' }} onClick={toggleSecondModal}>NECESITAS VERIFICACIÓN</Button>
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
              <Modal isOpen={secondModalOpen} size='lg' centered toggle={toggleSecondModal} className="responsive-modal">
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
                      <strong>IMPORTANTE:</strong> Debes subir la imágen de tu DNI o Pasaporte y otra imágen junto a tu rostro como en el ejemplo que se muestra. Los datos deben ser legibles y no debes cubrirlos de ninguna manera. El uso de esta información será únicamente para comprobar que realmente eres tú quien realizará el cambio.
                    </p>
                    <div className="form-group">
                      <Label htmlFor="imageInput">Seleccionar Imagen del Dni:</Label>
                      <Input
                        type="file"
                        className="form-control-file"
                        id="imageInput"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => setUseImg(e.target.files[0])}
                      />
                    </div>
                    <img style={{ marginLeft: '3%', marginTop: '1em', width: '200px' }} src={DniVerification} alt='Dni' className="modal-image1" />
                    <div className="form-group">
                      <Label htmlFor="imageInput">Seleccionar Imagen Tipo Selfie:</Label>
                      <Input
                        type="file"
                        className="form-control-file"
                        id="imageInputDNI"
                        accept=".jpg,.jpeg,.png,.gif"
                        onChange={(e) => setUseImgDni(e.target.files[0])}
                      />
                    </div>
                    <img style={{ marginLeft: '3%' }} src={ImageVerification} alt='ImageVerification' className="modal-image1" />
                    <div style={{ marginTop: '1em', marginLeft: '.5em' }} className="form-check">
                      <Input
                        type="checkbox"
                        className="form-check-input"
                        id="termsCheckbox"
                        checked={termsCheckbox}
                        onChange={(e) => setTermsCheckbox(e.target.checked)}
                      />
                      <Label className="form-check-label" htmlFor="termsCheckbox"> Acepto los
                        <Link to='/TermsAndConditions' style={{ paddingLeft: '5px' }} >
                          términos y condiciones
                        </Link>
                      </Label>
                    </div>

                    <Button disabled={!termsCheckbox} type='submit' className="btn col-md-12" color='success'>
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