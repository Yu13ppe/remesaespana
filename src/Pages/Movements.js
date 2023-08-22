import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { useDataContext } from '../Context/dataContext'

function Movements() {
  const { user } = useDataContext();
  const [movements, setMovements] = useState([]);
  const [modalImageMov, setModalImageMov] = useState(false);
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

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
  return (
    <div>
      <h1>Movimientos</h1>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Monda</th>
            <th>Monto</th>
            <th>Referencia</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th>Banco</th>
            <th>Fecha</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {movements.map((move) => (
            move.User.use_id === user.use_id ?
              <tr key={move.mov_id}>
                <th scope="row">{move.mov_id}</th>
                <td>{move.mov_currency}</td>
                <td>{move.mov_amount}</td>
                <td>{move.mov_ref}</td>
                <td>{move.mov_type}</td>
                <td>{move.mov_status}</td>
                <td>{move.mov_acc}</td>
                <td>{move.mov_date}</td>
                <td>
                  {move.mov_img ?
                    <Button
                      color='primary'
                      onClick={() => {
                        toggleImageMov();
                      }}>
                      Ver Imagen
                    </Button>
                    :
                    <p>No se encontraron resultados</p>
                  }
                </td>
              </tr>
              :
              null
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modalImageMov} size='l' centered toggle={toggleImageMov}>
        <ModalHeader toggle={toggleImageMov}>{user.use_name} {user.use_lastName}</ModalHeader>
        <ModalBody>
          <img width={300} alt='ImageMovement' src={`https://apiremesa.up.railway.app/Movements/image/${user.mov_img}`} />
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