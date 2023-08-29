import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
// import { Pie } from 'react-chartjs-2';
import { FaArrowDown, FaArrowUp, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';
import { NavBar } from '../Components/NavBar';


function Dashboard() {
  const { isAdmin, user } = useDataContext();

  const [movements, setMovements] = useState([]);
  // const [modalImageMov, setModalImageMov] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/movements');
      setMovements(response.data);
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
                    <p>{user ? user.filter((user) => user.use_verif === 'S').length : <b>No hay usuarios</b>}</p>
                  </div>
                </Link>
              </Col>
              <Col md="6" lg="4" >
                <div className="stat-box total-bolivars">
                  <h2>Total Bolivars</h2>
                  <p>{data.totalBolivars}</p>
                </div>
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
                    {movements.filter((move) => move.mov_status === 'E').map(move => (
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
                          <button className="details-button">Ver detalles</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      :
      <h1>Error404</h1>
  );
}

export { Dashboard };
