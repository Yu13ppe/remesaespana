import React, { useState, useEffect } from 'react'
import {
  Button,
  Table,
  Input
} from 'reactstrap'
import {
  ToastContainer,
} from 'react-toastify';
import axios from 'axios'
import { AiOutlinePound, AiOutlineDollar, AiOutlineEuro } from 'react-icons/ai'
import { useDataContext } from '../Context/dataContext'
import { NavBar } from '../Components/NavBar';

function Relation() {
  const { isAdmin } = useDataContext();
  const [movement, setMovements] = useState([]);
  // const [totalEur, setTotalEur] = useState([]);
  // const [date, setDate] = useState('');
  // const [accId, setAccId] = useState('');


  const [modalImageUser, setModalImageUser] = useState(false);
  // const [select, setSelect] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const toggleImageUser = () => setModalImageUser(!modalImageUser);

  const filteredRelation = movement.filter(mov => {
    const fullName = `${mov.mov_currency} ${mov.AccountsEur} ${mov.AccountsGbp} ${mov.AccountsUsd} ${mov.mov_date}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/movements');
      const movements = response.data;
      setMovements(movements);
      // fetchDataTotalEur(movements);
    } catch (error) {
      console.log(error);
    }
  };

  // const fetchDataTotalEur = async (date, accId) => {
  //   try {
  //     const response = await axios.get(`https://apiremesa.up.railway.app/Movements/totaleur/${date}/${accId}`);
  //     setTotalEur(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

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
                filteredRelation.map((move) => {
                  // let date = "";
                  // let accId = "";

                  // if (move.mov_currency === 'EUR') {
                  //   date = move.mov_date;
                  //   accId = move.AccountsEur.acceur_id;
                  //   fetchDataTotalEur(date, accId);
                  // } else if (move.mov_currency === 'GBP') {
                  //   accId = move.AccountsGbp.accgbp_id;
                  // } else if (move.mov_currency === 'USD') {
                  //   accId = move.AccountsUsd.accusd_id;
                  // }

                  return (
                    <tr key={move.mov_id}>
                      <th scope="row">{move.mov_id}</th>
                      <td>{move.mov_currency === 'EUR' ? move.AccountsEur?.acceur_Bank : move.AccountsGbp?.accgbp_Bank || move.AccountsUsd?.accusd_Bank}</td>
                      <td>
                        {move.mov_currency === 'EUR' && <span>{move.mov_currency} <AiOutlineEuro style={{ fontSize: "2em" }} /></span>}
                        {move.mov_currency === 'GBP' && <span>{move.mov_currency} <AiOutlinePound style={{ fontSize: "2em" }} /></span>}
                        {move.mov_currency === 'USD' && <span>{move.mov_currency} <AiOutlineDollar style={{ fontSize: "2em" }} /></span>}
                      </td>
                      {/* <td>{totalEur ? totalEur.totalIn : 72}</td>
                      <td>{totalEur ? totalEur.totalOut : 72}</td>
                      <td>{totalEur ? totalEur.totalIn - totalEur.totalOut : 72}</td> */}
                      <td>{move.mov_date}</td>
                      <td>
                        <Button color='primary' onClick={() => toggleImageUser()}>
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                  )
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