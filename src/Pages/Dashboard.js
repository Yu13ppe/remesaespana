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
  ModalHeader
} from 'reactstrap';
// import { Pie } from 'react-chartjs-2';
import { FaArrowDown, FaArrowUp, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';
import { NavBar } from '../Components/NavBar';


function Dashboard() {
  const { isAdmin } = useDataContext();

  const [movements, setMovements] = useState([]);
  const [user, setUsers] = useState([]);
  const [select, setSelect] = useState([]);
  const [modalIngreso, setModalIngreso] = useState(false);
  const toggleModalIngreso = () => setModalIngreso(!modalIngreso)
  const [modalEgreso, setModalEgreso] = useState(false);
  const toggleModalEgreso = () => setModalEgreso(!modalEgreso);

  const [modalImageMov, setModalImageMov] = useState(false);
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal)
    if (select.mov_type === 'Deposito') {
      toggleModalIngreso();
    }
    if (select.mov_type === 'Retiro') {
      toggleModalEgreso();
    }
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
                          <button className="details-button" onClick={() => {
                            move.mov_type === 'Deposito' && toggleModalIngreso();
                            move.mov_type === 'Retiro' && toggleModalEgreso();
                            setSelect(move);
                            console.log(select)
                          }} >Ver detalles</button>
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
            {/* {
              select.map((selected) => {
                <Row>
                  <Col>
                    <h5>Usuario</h5>
                    <p>{selected.User.use_name} {selected.User.use_lastName}</p>
                    <p>{selected.User.use_email}</p>
                    <p>{selected.User.use_phone? selected.User.use_phone : "No cuenta con número célular"}</p>
                    <p>{selected.User.use_NIE}</p>
                  </Col>
                  <Col>
                    <h5>Transacción</h5>
                    <p>{selected.mov_date}</p>
                    <p>{selected.mov_amount}</p>
                    <p>{selected.mov_currency}</p>
                    <Button
                      color='primary'
                      onClick={() => {
                        toggleImageMov();
                      }}>
                      Ver Imagen
                    </Button>
                  </Col>
                </Row>
              })
            } */}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalIngreso}>
              Volver
            </Button>
          </ModalFooter>
        </Modal>

        <Modal centered isOpen={modalEgreso} size='lg' toggle={toggleModalEgreso}>
          <ModalHeader toggle={toggleModalEgreso}></ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <h5>Usuario</h5>
                <p>Nombre</p>
                <p>Apellido</p>
                <p>Correo</p>
                <p>Telefono</p>
                <p>Documento</p>
              </Col>
              <Col>
                <h5>Transaccion</h5>
                <p>Fecha</p>
                <p>Monto</p>
                <p>Moneda</p>
                <p>Referencia</p>
                <p>Imagen</p>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModalEgreso}>
              Volver
            </Button>
          </ModalFooter>
        </Modal>

        {/* <Modal isOpen={modalImageMov} size='lg' centered toggle={toggleImageMov}>
          <ModalHeader toggle={toggleImageMov}>Verificación de imagén</ModalHeader>
          <ModalBody>
            <img style={{ width: '100%' }} alt='ImageMovement' src={`https://apiremesa.up.railway.app/Movements/image/${select.mov_img}`} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleImageMov}>
              Volver
            </Button>
          </ModalFooter>
        </Modal> */}

      </div>
      :
      <h1>Error404</h1>
  );
}

export { Dashboard };
