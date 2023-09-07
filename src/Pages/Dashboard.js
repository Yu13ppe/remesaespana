import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
  FormGroup,
  Alert
} from 'reactstrap';
// import { Pie } from 'react-chartjs-2';
import { FaArrowDown, FaArrowUp, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDataContext } from '../Context/dataContext';
import { NavBar } from '../Components/NavBar';
import { NotFound404 } from './NotFound404';

function Dashboard() {
  const { accessToken } = useDataContext();

  const [movements, setMovements] = useState([]);
  const [user, setUsers] = useState([]);
  const [select, setSelect] = useState(null);
  const [modalIngreso, setModalIngreso] = useState(false);
  const toggleModalIngreso = () => setModalIngreso(!modalIngreso)
  const [modalEgreso, setModalEgreso] = useState(false);
  const toggleModalEgreso = () => setModalEgreso(!modalEgreso);

  const [totalEur, setTotalEur] = useState([]);
  const [totalUsd, setTotalUsd] = useState([]);
  const [totalGbp, setTotalGbp] = useState([]);
  const [totalBs, setTotalBs] = useState([]);

  const [admin, setAdmin] = useState([]);

  const [day, setDay] = useState(new Date().getDate().toString())
  const [month, setMonth] = useState((new Date().getMonth() + 1).toString())
  const [year, setYear] = useState(new Date().getFullYear().toString())

  const [payment, setPayment] = useState('');
  const [amount, setAmount] = useState('')

  const [showCommentBox, setShowCommentBox] = useState(false);

  const [bankOptionPay, setBankOptionPay] = useState('');
  const [banksBs, setBanksBS] = useState([]);
  const [banksUSD, setBanksUSD] = useState([]);
  const [mov_img, setMovImg] = useState(null);

  const [modalImageMov, setModalImageMov] = useState(false);
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

  const [modal, setModal] = useState(false);
  const toggle = (move) => {
    if (move.mov_type === 'Deposito') {
      toggleModalIngreso();
      setAmount(move.mov_amount)
    } else if (move.mov_type === 'Retiro') {
      toggleModalEgreso();
      setAmount(move.mov_amount)
    }
    setSelect(move);
    setModal(!modal);
  };

  const addZeros = Number => {
    if (Number.toString().length < 1) return "0".concat(Number)
    return Number;
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/movements');
      setMovements(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByTokenAdmin/${accessToken.access_token}`);
      setAdmin(response.data);
    } catch (error) {
      console.log(error);
    }
  },[setAdmin, accessToken]);
  const fetchDataUsers = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataAccBs = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/AccBs');
      setBanksBS(response.data);
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
  const fetchDataTotalEur = useCallback(async () => {
    const nowDay = new Date().getDate();
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    setDay(addZeros(nowDay));
    setMonth(addZeros(nowMonth));
    setYear(nowYear);
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Movements/totaleur/${year}-${month.length<2?'0'.concat(month):month}-${day.length<2?'0'.concat(day):day}/`);
      setTotalEur(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setTotalEur, setDay, setMonth, setYear, day, month, year]);
  const fetchDataTotalGbp = useCallback(async () => {
    const nowDay = new Date().getDate();
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    setDay(addZeros(nowDay));
    setMonth(addZeros(nowMonth));
    setYear(nowYear);
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Movements/totalgbp/${year}-${'0'.concat(month)}-${'0'.concat(day)}/`);
      setTotalGbp(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setTotalGbp, setDay, setMonth, setYear, day, month, year]);
  const fetchDataTotalUsd = useCallback(async () => {
    const nowDay = new Date().getDate();
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    setDay(addZeros(nowDay));
    setMonth(addZeros(nowMonth));
    setYear(nowYear);
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Movements/totalusd/${year}-${'0'.concat(month)}-${'0'.concat(day)}/`);
      setTotalUsd(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setTotalUsd, setDay, setMonth, setYear, day, month, year]);
  const fetchDataTotalBs = useCallback(async () => {
    const nowDay = new Date().getDate();
    const nowMonth = new Date().getMonth();
    const nowYear = new Date().getFullYear();
    setDay(addZeros(nowDay));
    setMonth(addZeros(nowMonth));
    setYear(nowYear);
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Movements/totalbs/${year}-${'0'.concat(month)}-${'0'.concat(day)}/`);
      setTotalBs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setTotalBs, setDay, setMonth, setYear, day, month, year]);

  useEffect(() => {
    fetchData();
    fetchDataUsers();
    fetchDataAccBs();
    fetchDataAccUsd();
    fetchDataTotalEur();
    fetchDataTotalGbp();
    fetchDataTotalUsd();
    fetchDataTotalBs();
    fetchDataAdmin();
  }, [fetchDataTotalEur,fetchDataTotalGbp,fetchDataTotalUsd,fetchDataTotalBs,fetchDataAdmin]);

  const handleSubmitSummary = () => {

    const totalAmountEur = parseInt(select.User.use_amountEur);
    const totalAmountUsd = parseInt(select.User.use_amountUsd);
    const totalAmountGbp = parseInt(select.User.use_amountGbp);
    const formData = new FormData();
    if (select.mov_currency === 'EUR') {
      formData.append('use_amountEur', totalAmountEur + amount);
    }
    if (select.mov_currency === 'USD') {
      formData.append('use_amountUsd', totalAmountUsd + amount);
    }
    if (select.mov_currency === 'GBP') {
      formData.append('use_amountGbp', totalAmountGbp + amount);
    }

    try {
      axios.put(
        `https://apiremesa.up.railway.app/Users/${select.User.use_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Request send successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = () => {
    const totalAmountEur = parseInt(select.User.use_amountEur);
    const totalAmountUsd = parseInt(select.User.use_amountUsd);
    const totalAmountGbp = parseInt(select.User.use_amountGbp);
    const formData = new FormData();
    if (select.mov_currency === 'EUR') {
      formData.append('use_amountEur', totalAmountEur - amount);
    }
    if (select.mov_currency === 'USD') {
      formData.append('use_amountUsd', totalAmountUsd - amount);
    }
    if (select.mov_currency === 'GBP') {
      formData.append('use_amountGbp', totalAmountGbp - amount);
    }

    try {
      axios.put(
        `https://apiremesa.up.railway.app/Users/${select.User.use_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log('Request send successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitSendVerify = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mov_status', 'V');
    formData.append('mov_accEurId', 0);
    formData.append('mov_img', mov_img);
    formData.append('mov_accUsdId', (payment === 'USD' ? parseInt(bankOptionPay) : 0));
    formData.append('mov_accBsId', (payment === 'BS' ? parseInt(bankOptionPay) : 0));

    try {
      await axios.put(
        `https://apiremesa.up.railway.app/Movements/${select.mov_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Cerrar el modal
      toggleModalEgreso();
      toast.success('¡Datos enviados con exito!', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleSubmit();
      fetchData();

      console.log('Request send successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitVerify = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mov_status', 'V');

    try {
      await axios.put(
        `https://apiremesa.up.railway.app/Movements/${select.mov_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Cerrar el modal
      toggleModalIngreso();
      toast.success('¡Datos enviados con exito!', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      handleSubmitSummary();
      fetchData();

      console.log('Request send successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmitCancel = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('mov_status', 'R');

    try {
      await axios.put(
        `https://apiremesa.up.railway.app/Movements/${select.mov_id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Cerrar el modal
      toggleModalIngreso();
      toast.success('¡Datos enviados con exito!', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      fetchData();

      console.log('Request send successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    admin.adm_role === 'A' ?
      <div>
        <NavBar />
        <div className="DashboardBody">
          <Container>
            <center>
              <h1 className="my-4">Panel de control</h1></center>
            <Row>
              <Col md="6" lg="4">
                <Link to='/Users'>
                  <div className="stat-box total-users">
                    <h2>Total de usuarios</h2>
                    <p>{user ? user.length : <b>No hay usuarios</b>}</p>
                  </div>
                </Link>
              </Col>
              <Col md="6" lg="4">
                <Link to='/userVerificated'>
                  <div className="stat-box verified-users">
                    <h2>Usuario verificados</h2>
                    <p>{user ? user.filter((user) => user.use_verif === "S").length : <b>No hay usuarios</b>}</p>
                  </div>
                </Link>
              </Col>
              <Col md="6" lg="4">
                <Link to='/UserNoVerificated'>
                  <div className="stat-box unverified-users">
                    <h2>Usuario sin verificación</h2>
                    <p>{user ? user.filter((user) => user.use_verif === "E").length : <b>No hay usuarios</b>}</p>
                  </div>
                </Link>
              </Col>
              <Col md="6" lg="3">
                <div className="stat-box total-euros">
                  <h2>Total Euros</h2>
                  <p>{totalEur.totalIn - totalEur.totalOut}</p>
                </div>
              </Col>
              <Col md="6" lg="3">
                <div className="stat-box total-euros">
                  <h2>Total Libras</h2>
                  <p>{totalGbp.totalIn - totalGbp.totalOut}</p>
                </div>
              </Col>
              <Col md="6" lg="3" >
                <div className="stat-box total-bolivars">
                  <h2>Total Dolares</h2>
                  <p>{totalUsd.totalIn - totalUsd.totalOut}</p>
                </div>
              </Col>
              <Col md="6" lg="3" >
                <div className="stat-box total-bolivars">
                  <h2>Total Bolivares</h2>
                  <p>{totalBs.totalIn - totalBs.totalOut}</p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <table className="transaction-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Moneda</th>
                      <th>Monto</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Tipo</th>
                      <th>Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {movements.filter((mov) => mov.mov_status === 'E').map(move => (
                      <tr key={move.mov_id}>
                        <td>{move.User.use_name} {move.User.use_lastName}</td>
                        <td>{move.mov_currency}</td>
                        <td>{move.mov_amount}</td>
                        <td>{move.mov_date}</td>
                        <td>
                          {move.mov_status === 'E' && <FaClock className="pending-icon" />}
                        </td>
                        <td>
                          {(move.mov_type === 'Deposito') ? (<FaArrowDown color='green' />) : null}
                          {(move.mov_type === 'Retiro') ? (<FaArrowUp color='red' />) : null}
                        </td>
                        <td>
                          <button className="details-button" onClick={() => toggle(move)}>Ver detalles</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
        </div>

        {/*  Ingreso */}
        <Modal centered isOpen={modalIngreso} size='lg' toggle={toggleModalIngreso}>
          <ModalHeader toggle={toggleModalIngreso}>Verificar Ingreso</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h5>Usuario</h5>
                {select && (
                  <>
                    <p>{select.User.use_name} {select.User.use_lastName}</p>
                    <p>{select.User.use_email}</p>
                    <p>{select.User.use_phone ? select.User.use_phone : "No cuenta con número celular"}</p>
                    <p>{select.User.use_NIE}</p>
                  </>
                )}
              </Col>
              <Col>
                <h5>Transacción</h5>
                {select && (
                  <>
                    <p>{select.mov_date}</p>
                    <p>{select.mov_amount}</p>
                    <p>{select.mov_currency}</p>
                  </>
                )}
                <Button
                  color='primary'
                  onClick={() => {
                    toggleImageMov();
                  }}>
                  Ver Imagen
                </Button>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            {select &&
              <Button color="success" onClick={handleSubmitVerify}>
                Aprobar
              </Button>}
            {select &&
              <Button color="danger" onClick={handleSubmitCancel}>
                Rechazar
              </Button>}
            <Button color="secondary" onClick={toggleModalIngreso}>
              Volver
            </Button>
          </ModalFooter>
        </Modal>

        {/*  Egreso */}
        <Modal centered isOpen={modalEgreso} toggle={() => setModalEgreso(false)}>
          <ModalHeader toggle={() => setModalEgreso(false)}>Generar retiro</ModalHeader>
          <ModalBody>
            <Alert color="success">
              <h4 className="alert-heading">
                Datos bancarios:
              </h4>
              <p>
                {select && select.mov_comment}
              </p>

            </Alert>
            <FormGroup>
              <Label for="amount">Monto a transferir</Label>
              <Input type="text" name="amount" id="amount" disabled defaultValue={select && `${select.mov_amount}`} />
            </FormGroup>
            <FormGroup>
              <Label for="currency">Elige la Moneda</Label>
              <Input
                type="select"
                id="payment"
                defaultValue={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                <option value="BS">Bolívar</option>
                <option value="USD">Dólar</option>
              </Input>
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
                {payment === 'BS' ?
                  banksBs.filter((bank) => bank.accbs_status === 'Activo').map((bank) => {
                    return bank.accbs_bank ?
                      <option value={bank.accbs_id}>{bank.accbs_bank}</option>
                      : null
                  })
                  : payment === 'USD' ?
                    banksUSD.filter((bank) => bank.accusd_status === 'Activo').map((bank) => {
                      return bank.accusd_Bank ?
                        <option value={bank.accusd_id}>{bank.accusd_Bank}</option>
                        : null
                    })
                    : null
                }
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="attachments">Adjuntar Archivo</Label>
              <Input
                disabled={showCommentBox}
                type="file"
                className="form-control-file"
                name="attachments"
                id="imageInput"
                onChange={(e) => setMovImg(e.target.files[0])}
              />
            </FormGroup>
            {showCommentBox && (
              <FormGroup>
                <Label for="comment">Comentario</Label>
                <Input type="textarea" name="comment" id="comment" />
              </FormGroup>
            )}
          </ModalBody>
          <ModalFooter>
            {!showCommentBox ? (
              <>
                <Button color="danger" onClick={() => setShowCommentBox(true)}>
                  Rechazar
                </Button>

                <Button color="success" onClick={handleSubmitSendVerify}>
                  Enviar
                </Button>
                <Button color="primary" onClick={toggleModalEgreso}>
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <Button color="warning" onClick={handleSubmitCancel}>
                  Enviar (Rechazado)
                </Button>
                <Button color="secondary" onClick={() => setShowCommentBox(false)}>
                  Volver
                </Button>
                <Button color="primary" onClick={toggleModalEgreso}>
                  Cancelar
                </Button>
              </>
            )}
          </ModalFooter>
        </Modal>

        {/* Modal De Imagen Movimientos */}
        <Modal isOpen={modalImageMov} size='lg' centered toggle={toggleImageMov}>
          <ModalHeader toggle={toggleImageMov}>Verificación de imagén</ModalHeader>
          <ModalBody>
            {select && <img style={{ width: '100%' }} alt='ImageMovement' src={`https://apiremesa.up.railway.app/Movements/image/${select.mov_img}`} />}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleImageMov}>
              Volver
            </Button>
          </ModalFooter>
        </Modal>

        <ToastContainer />
      </div>
      :
      <NotFound404 />
  );
}

export { Dashboard };
