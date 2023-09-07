import React, { useState, useEffect, useCallback } from 'react'
import { Button, Table, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { NavBar } from '../Components/NavBar';
import { useDataContext } from '../Context/dataContext';

function Movements() {
  const { accessToken } = useDataContext();
  const [movements, setMovements] = useState([]);
  const [select, setSelect] = useState([]);
  const [modalImageMov, setModalImageMov] = useState(false);
  const [user, setUser] = useState([])
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/movements');
      setMovements(response.data);
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
  },[setUser, accessToken]);

  useEffect(() => {
    fetchData();
    fetchDataUser();
  }, [fetchDataUser]);

  return (
    <div>
      <NavBar />
      <h1>Movimientos</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Monda</th>
            <th>Monto</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {movements.filter((move) => move.User.use_id === user.use_id).map((move) => (
            // move.User.use_id === user.use_id ?
            <tr key={move.mov_id}>
              <th scope="row">{move.mov_id}</th>
              <td>{move.mov_currency}</td>
              <td>{move.mov_amount}</td>
              <td>{move.mov_type}</td>
              <td>{move.mov_status}</td>
              <td>{move.mov_date}</td>
              <td>
                {move.mov_img ?
                  <Button
                    color='primary'
                    onClick={() => {
                      toggleImageMov();
                      setSelect(move);
                    }}>
                    Ver Imagen
                  </Button>
                  :
                  <p>No se encontraron resultados</p>
                }
              </td>
            </tr>
            // :
            // null
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalImageMov} size='lg' centered toggle={toggleImageMov}>
        <ModalHeader toggle={toggleImageMov}>{user.use_name} {user.use_lastName}</ModalHeader>
        <ModalBody>
          <img style={{ width: '100%' }} alt='ImageMovement' src={`https://apiremesa.up.railway.app/Movements/image/${select.mov_img}`} />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleImageMov}>
            Volver
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export { Movements }