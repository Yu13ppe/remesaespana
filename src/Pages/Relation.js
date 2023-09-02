import React, { useState, useEffect } from 'react'
import {
  Button,
  Table,
  // Modal,
  // ModalBody,
  // ModalFooter,
  // ModalHeader,
  Input
} from 'reactstrap'
import { ToastContainer, 
  // toast 
} from 'react-toastify';
import axios from 'axios'
import { AiOutlinePound, AiOutlineDollar, AiOutlineEuro } from 'react-icons/ai'
import { useDataContext } from '../Context/dataContext'
import { NavBar } from '../Components/NavBar';

function Relation() {
  const { isAdmin } = useDataContext();
  const [movement, setMovements] = useState([]);

  const [modalImageUser, setModalImageUser] = useState(false);
  // const [select, setSelect] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const toggleImageUser = () => setModalImageUser(!modalImageUser);

  // const filteredUsuarios = movement.filter(bal => {
  //   const fullName = `${bal.bal_currency} ${bal.AccountsEur} ${bal.AccountsGbp} ${bal.AccountsUsd}`.toLowerCase();
  //   return fullName.includes(searchQuery.toLowerCase());
  // });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

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

  const combinedSummary = movement.reduce((summary, item) => {
    if (item.mov_type === "Deposito" || item.mov_type === "Retiro") {
      const bankKey = item.AccountsEur
        ? item.AccountsEur.acceur_Bank
        : item.AccountsGbp
          ? item.AccountsGbp.accgbp_Bank
          : item.AccountsUsd.accusd_Bank;
          const bankTotal = item.AccountsEur
          ? item.AccountsEur.acceur_balance
          : item.AccountsGbp
            ? item.AccountsGbp.accgbp_balance
            : item.AccountsUsd.accusd_balance;

      const currency = item.mov_currency;
      const id = item.mov_id;
      const total = bankTotal;
      const date = item.mov_date;

      if (!summary[bankKey]) {
        summary[bankKey] = {
          totalDeposit: 0,
          totalWithdrawal: 0,
          currency: currency,
          id: id,
          total: total,
          date: date,
        };
      }

      if (item.mov_type === "Deposito") {
        summary[bankKey].totalDeposit += item.mov_amount;
      } else if (item.mov_type === "Retiro") {
        summary[bankKey].totalWithdrawal += item.mov_amount;
      }
    }

    return summary;
  }, {});

  return (
    isAdmin ?
      <div>
        <NavBar />
        <div className='userContent'>
          <h1 className='titleUser'>
            Relacion
          </h1>
          <div className="container">
            <div className='row m-5 col-12'>
              <div className='d-flex align-items-center col-12'>
                <Input
                  type="text"
                  className="form-control search-input"
                  defaultValue={searchQuery}
                  onChange={handleSearch}
                  placeholder="Buscar Usuario..."
                />
              </div>
            </div>
          </div>

          {/* Tabla De Usuarios */}
          <Table success bordered hover responsive striped className='userTable table-success'>
            <thead>
              <tr>
                <th>#</th>
                <th>Banco</th>
                <th>Moneda</th>
                <th>Ingreso</th>
                <th>Egreso</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(combinedSummary).map((bankKey) => {
                  const bankInfo = combinedSummary[bankKey];
                  return (
                    <tr key={bankKey}>
                      <th scope="row">{bankInfo.id}</th>
                      <th>{bankKey}</th>
                      <td>{bankInfo.currency === 'EUR' && <span>{bankInfo.currency} <AiOutlineEuro style={{ fontSize: "2em" }}/></span>} 
                      {bankInfo.currency === 'GBP' && <span>{bankInfo.currency} <AiOutlinePound style={{ fontSize: "2em" }}/></span>} 
                      {bankInfo.currency === 'USD' && <span>{bankInfo.currency} <AiOutlineDollar style={{ fontSize: "2em" }}/></span>}
                      </td>
                      <td>{bankInfo.totalDeposit}</td>
                      <td>{bankInfo.totalWithdrawal}</td>
                      <td>{bankInfo.total}</td>
                      <td>{bankInfo.date}</td>
                      <td>
                        <Button color='primary' onClick={() => toggleImageUser()}>
                          Ver detalles
                        </Button>
                      </td>
                      {/* <td>
                        <Button className='mr-5' color="warning">
                          Editar
                        </Button>
                        <Button color="danger" id="PopoverLegacy" type="button">
                          Eliminar
                        </Button>
                      </td> */}
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>

          {/* Modal De Imagen Usuarios */}
          {/* <Modal centered isOpen={modalImageUser} size='lg' toggle={toggleImageUser}>
            <ModalHeader toggle={toggleImageUser}>{select.use_name} {select.use_lastName}</ModalHeader>
            <ModalBody>
              <img style={{ width: '100%' }} alt='ImageUser' src={`https://apiremesa.up.railway.app/Users/image/${select.use_img}`} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleImageUser}>
                Volver
              </Button>
            </ModalFooter>
          </Modal> */}

          <ToastContainer />

        </div >
      </div>
      :
      (<h1>Error404</h1>)
  )
}

export { Relation }