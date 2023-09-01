import React, { useState, useEffect } from 'react';
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
  FormText,
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
  const { isAdmin } = useDataContext();

  const [movements, setMovements] = useState([]);
  const [user, setUsers] = useState([]);
  const [select, setSelect] = useState(null);
  const [modalIngreso, setModalIngreso] = useState(false);
  const toggleModalIngreso = () => setModalIngreso(!modalIngreso)
  const [modalEgreso, setModalEgreso] = useState(false);
  const toggleModalEgreso = () => setModalEgreso(!modalEgreso);

  const [showCommentBox, setShowCommentBox] = useState(false);

  const [amount, setAmount] = useState(Number)

  const [modalImageMov, setModalImageMov] = useState(false);
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

  const [modal, setModal] = useState(false);
  const toggle = (move) => {
    if (move.mov_type === 'Deposito') {
      toggleModalIngreso();
      setAmount(parseInt(move.mov_amount))
    } else if (move.mov_type === 'Retiro') {
      toggleModalEgreso();
    }
    setSelect(move);
    setModal(!modal);
  };


  useEffect(() => {
    fetchData();
    fetchDataUsers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/movements');
      setMovements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataUsers = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const data = {
    totalUsers: 100,
    totalEuros: 15000,
    verifiedUsers: 75,
    totalBolivars: 4500000,
  };

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
      toast.success('¡Datos enviados con exito!. En minutos un administrador verificará tus datos', {
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
      toast.success('¡Datos enviados con exito!. En minutos un administrador verificará tus datos', {
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
    isAdmin ?
      <div>
        <NavBar />
        <div className="DashboardBody">
          <Container>
            <center>
              <h1 className="my-4">Dashboard</h1></center>
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
              <Col md="6" lg="4">
                <div className="stat-box total-euros">
                  <h2>Total Euros</h2>
                  <p>{data.totalEuros}</p>
                </div>
              </Col>
              <Col md="6" lg="4" >
                <div className="stat-box total-bolivars">
                  <h2>Total Bolivars</h2>
                  <p>{data.totalBolivars}</p>
                </div>
              </Col>
              <Col md="6" lg="4" >
                <div className="stat-box total-bolivars">
                  <h2>Total Bolivars</h2>
                  <p>{data.totalBolivars}</p>
                </div>
              </Col>
            </Row>
            <Row>
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

        <Modal centered isOpen={modalEgreso} toggle={() => setModalEgreso(false)}>
        <ModalHeader toggle={() => setModalEgreso(false)}>DATOS BANCARIOS</ModalHeader>
        <ModalBody>
          <Alert color="success">DATOS BANCARIOS</Alert>
          <FormGroup>
            <Label for="currency">Elige la Moneda</Label>
            <Input disabled={showCommentBox} type="select" name="currency" id="currency">
              <option value="bolivar">Bolívar</option>
              <option value="dolar">Dólar</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="attachments">Adjuntar Archivo</Label>
            <Input disabled={showCommentBox} type="file" name="attachments" id="attachments" multiple />
            <FormText color="muted">
              Puede seleccionar más de un archivo.
            </FormText>
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

              <Button color="success" onClick={() => setModalEgreso(false)}>
                Enviar
              </Button>
              <Button color="primary" onClick={() => setModalEgreso(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button color="warning" onClick={() => setModalEgreso(false)}>
                Enviar (Rechazado)
              </Button>
              <Button color="secondary" onClick={() => setShowCommentBox(false)}>
                Volver
              </Button>
            </>
          )}
        </ModalFooter>
      </Modal>

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
      <NotFound404/>
  );
}

export { Dashboard };
