import React from 'react';
import { Container, Row, Col } from 'reactstrap';
// import { Pie } from 'react-chartjs-2';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDataContext } from '../Context/dataContext';

function Dashboard() {
  const {isAdmin} = useDataContext();

  const data = {
    totalUsers: 100,
    totalEuros: 15000,
    verifiedUsers: 75,
    totalBolivars: 4500000,
  };

  const transactions = [
    {
      id: 1,
      name: 'John Doe',
      exchangeType: 'Euros',
      date: '2023-08-20',
      status: 'approved',
    },
    {
      id: 2,
      name: 'Jane Smith',
      exchangeType: 'Dollars',
      date: '2023-08-19',
      status: 'rejected',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      exchangeType: 'Pounds',
      date: '2023-08-18',
      status: 'pending',
    },
  ];

  return (
    isAdmin? 
    <div className="DashboardBody">
      <Container>
        <center>
          <h1 className="my-4">Dashboard</h1></center>
        <Row>
          <Col md="6" lg="3">
            <div className="stat-box total-users">
              <h2>Total Users</h2>
              <p>{data.totalUsers}</p>
            </div>
          </Col>
          <Col md="6" lg="3">
            <div className="stat-box total-euros">
              <h2>Total Euros</h2>
              <p>{data.totalEuros}</p>
            </div>
          </Col>
          <Col md="6" lg="3">
            <div className="stat-box verified-users">
              <h2>Verified Users</h2>
              <p>{data.verifiedUsers}</p>
            </div>
          </Col>
          <Col md="6" lg="3" >
            <Link to='/Users'>
              <div className="stat-box total-bolivars">
                <h2>Total Bolivars</h2>
                <p>{data.totalBolivars}</p>
              </div>
            </Link>
          </Col>
        </Row>
        <Row>
        </Row>
        <Row>
          <Col>

            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Name and Surname</th>
                  <th>Exchange Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.exchangeType}</td>
                    <td>{transaction.date}</td>
                    <td>
                      {transaction.status === 'approved' && <FaCheckCircle className="approved-icon" />}
                      {transaction.status === 'rejected' && <FaTimesCircle className="rejected-icon" />}
                      {transaction.status === 'pending' && <FaClock className="pending-icon" />}
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
    :
    <h1>Error404</h1>
  );
}

export { Dashboard };
