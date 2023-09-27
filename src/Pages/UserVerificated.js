import React, { useState, useEffect, useCallback } from 'react'
import {
  Button,
  Table,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  UncontrolledPopover,
  PopoverHeader,
  PopoverBody
} from 'reactstrap'
import { NotFound404 } from './NotFound404';
import axios from 'axios'
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineClockCircle } from 'react-icons/ai'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { useDataContext } from '../Context/dataContext'
import { NavBar } from '../Components/NavBar';
import {Spinner} from '../Components/Spinner'; // Ajusta la ruta de importación según tu estructura de archivos


function UserVerificated() {
  const { accessAdminToken } = useDataContext();
  const [users, setUsers] = useState([]);

  const [modalImageUser, setModalImageUser] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [modalMovements, setModalMovements] = useState(false);
  const [modalViewer, setModalViewer] = useState(false);
  const [modalImageMov, setModalImageMov] = useState(false);

  const [select, setSelect] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const [admin, setAdmin] = useState([]);

  const [use_name, setNombre] = useState('');
  const [use_lastName, setLastName] = useState('');
  const [use_email, setEmail] = useState('');
  const [use_password, setPassword] = useState('');
  const [use_dni, setDNI] = useState('');
  const [use_verif, setVerif] = useState('');
  const use_img = '';
  const [use_amountEur, setAmountEur] = useState(Number);
  const [use_amountUsd, setAmountUsd] = useState(Number);
  const [use_amountGbp, setAmountGbp] = useState(Number);
  const [selectedUser, setSelectedUser] = useState(null);

  const [movements, setMovements] = useState([]);
  const [selectMov, setSelectMov] = useState([])

  const toggleImageUser = () => setModalImageUser(!modalImageUser);
  const toggleUser = () => {
    setModalUser(!modalUser);
    if (modalUser === false) {
      setNombre('');
      setLastName('');
      setEmail('');
      setPassword('');
      setDNI('');
      setVerif('');
      setAmountEur('');
      setAmountUsd('');
      setAmountGbp('');
    }
  }

  const toggleMovements = () => setModalMovements(!modalMovements);
  const toggleViewer = () => setModalViewer(!modalViewer);
  const toggleImageMov = () => setModalImageMov(!modalImageMov);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900); // Simula que la carga demora 2 segundos
  }, []);

  const filteredUsuarios = users.filter(user => {
    const fullName = `${user.use_name} ${user.use_lastName} ${user.use_dni}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  const fetchDataAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByTokenAdmin/${accessAdminToken.access_token}`);
      setAdmin(response.data);
    } catch (error) {
    }
  }, [setAdmin, accessAdminToken]);

  useEffect(() => {
    fetchData();
    fetchDataMovements();
    fetchDataAdmin();
  }, [fetchDataAdmin]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/users');
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataMovements = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Movements');
      setMovements(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = user => {
    setSelectedUser(user);
    toggleUser();

    setNombre(user.use_name);
    setLastName(user.use_lastName);
    setEmail(user.use_email);
    setPassword(user.use_password);
    setDNI(user.use_dni);
    setVerif(user.use_verif);
    setAmountEur(user.use_amountEur);
    setAmountUsd(user.use_amountUsd);
    setAmountGbp(user.use_amountGbp);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (selectedUser) {
        await axios.put(
          `https://apiremesa.up.railway.app/Users/${selectedUser.use_id}`,
          {
            use_name,
            use_lastName,
            use_dni,
            use_email,
            use_password,
            use_img,
            use_verif,
            use_amountUsd,
            use_amountEur,
            use_amountGbp
          });
        setSelectedUser(null);

        fetchData();
        toggleUser();
        toggleViewer();
      } else {
        await axios.post(
          'https://apiremesa.up.railway.app/Users/create',
          {
            use_name,
            use_lastName,
            use_dni,
            use_email,
            use_password,
            use_img,
            use_verif,
            use_amountUsd,
            use_amountEur,
            use_amountGbp
          }
        );
      }
      fetchData();
      toggleUser();

    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async id => {
    try {
      await axios.delete(
        `https://apiremesa.up.railway.app/Users/${id}`
      );
      fetchData();
      toggleViewer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    {isLoading ? (
      <Spinner />
    ) : (
      <>
        {admin.adm_role === 'A' ? (
          <div>
            <NavBar />
        <div className='userContent'>
          <h1 className='titleUser'>
            Usuarios
          </h1>
          <div className="container">
            <div className='row m-5 col-12'>
              <div className='d-flex align-items-center col-12'>
                <Input
                  type="text"
                  className="form-control search-input"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Buscar Usuario..."
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={toggleUser}
                >
                  Agregar Usuario
                </button>
              </div>
            </div>
          </div>

          {/* Tabla De Usuarios */}
          <Table bordered hover responsive striped className='userTable'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Verificación</th>
                <th>USD</th>
                <th>EUR</th>
                <th>GBP</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsuarios.filter((user) => user.use_verif === 'S').map((user) => (
                  <tr key={user.use_id}
                    onClick={() => {
                      setSelect(user);
                      toggleViewer();
                    }}>
                    <th scope="row">{user.use_id}</th>
                    <td>{user.use_name}</td>
                    <td>{user.use_lastName}</td>
                    <td>{user.use_dni ? user.use_dni : <p>No se encontraron resultados</p>}</td>
                    <td>
                      {user.use_verif === "s" || user.use_verif === "S" ?
                        <AiOutlineCheckCircle style={{ color: "green", fontSize: "2em" }} />
                        :
                        <AiOutlineCloseCircle style={{ color: "red", fontSize: "2em" }} />}
                    </td>
                    <td>{user.use_amountUsd ? user.use_amountUsd : 0}</td>
                    <td>{user.use_amountEur ? user.use_amountEur : 0}</td>
                    <td>{user.use_amountGbp ? user.use_amountGbp : 0}</td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* Modal De Imagen Usuarios */}
          <Modal centered isOpen={modalImageUser} toggle={toggleImageUser}>
            <ModalHeader toggle={toggleImageUser}>{select.use_name} {select.use_lastName}</ModalHeader>
            <ModalBody>
              <img style={{ width: '100%' }} alt='ImageUser' src={`https://apiremesa.up.railway.app/Users/image/${select.use_img}`} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleImageUser}>
                Volver
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal De Agregar Usuarios */}
          <Modal centered isOpen={modalUser} toggle={toggleUser}>
            <ModalHeader toggle={toggleUser}>{selectedUser ? 'Editar Usuario' : 'Agregar Usuario'}</ModalHeader>
            <ModalBody>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="nombre" className="form-label">
                    Nombre:
                  </label>
                  <Input
                    type="text"
                    defaultValue={use_name}
                    onChange={e => setNombre(e.target.value)}
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre"
                    maxLength="45"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellido" className="form-label">
                    Apellido:
                  </label>
                  <Input
                    type="text"
                    defaultValue={use_lastName}
                    onChange={e => setLastName(e.target.value)}
                    className="form-control"
                    id="aombre"
                    placeholder="Apellido"
                    maxLength="45"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <Input
                    type="email"
                    defaultValue={use_email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    maxLength="45"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <Input
                    type="password"
                    defaultValue={use_password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    maxLength="45"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dni" className="form-label">
                    DNI:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_dni}
                    onChange={e => setDNI(e.target.value)}
                    className="form-control"
                    id="dni"
                    placeholder="DNI"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">
                    Verificación:
                  </label>
                  <div>
                    <Input
                      type="radio"
                      id="noVerificated"
                      value="N"
                      checked={use_verif === 'N'}
                      onChange={event => setVerif(event.target.value)}
                      name="N"
                    />
                    <label htmlFor="noVerificated" className="form-label">No Verificado</label>
                  </div>
                  <div>
                    <Input
                      type="radio"
                      id="Verificated"
                      name="Verificated"
                      value="S"
                      checked={use_verif === 'S'}
                      onChange={event => setVerif(event.target.value)}
                    ></Input>
                    <label htmlFor="Verificated" className="form-label">Verificado</label>
                  </div>
                </div>
                <div className="col-md-6">
                  <label htmlFor="Eur" className="form-label">
                    Euros:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_amountEur}
                    onChange={e => setAmountEur(e.target.value)}
                    className="form-control"
                    id="Eur"
                    placeholder="Eur"
                    pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Usd" className="form-label">
                    Dolares:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_amountUsd}
                    onChange={e => setAmountUsd(e.target.value)}
                    className="form-control"
                    id="Usd"
                    placeholder="Usd"
                    pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="Gbp" className="form-label">
                    Libras:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_amountGbp}
                    onChange={e => setAmountGbp(e.target.value)}
                    className="form-control"
                    id="Gbp"
                    placeholder="Gbp"
                    pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleSubmit}>
                {selectedUser ? 'Editar' : 'Agregar'}
              </Button>
              <Button color="secondary" onClick={toggleUser}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal De Ver Usuarios */}
          <Modal className='mt-5' isOpen={modalViewer} size='lg' centered toggle={toggleViewer}>
            <ModalHeader>{select.use_name} {select.use_lastName}
              {select.use_verif === "s" || select.use_verif === "S" ?
                <AiOutlineCheckCircle style={{ color: "green", fontSize: "1em" }} />
                :
                <AiOutlineCloseCircle style={{ color: "red", fontSize: "1em" }} />}
            </ModalHeader>
            <ModalBody>
              <Table bordered hover responsive striped>
                <thead>
                  <tr>
                    <th>Correo</th>
                    <th>DNI</th>
                    <th>Imagen</th>
                    <th>USD</th>
                    <th>EUR</th>
                    <th>GBP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{select.use_email}</td>
                    <td>{select.use_dni ? select.use_dni : <p>No se encontraron resultados</p>}</td>
                    <td>
                      {select.use_verif === "s" || select.use_verif === "S" ?
                        <Button
                          color='primary'
                          onClick={() => {
                            setSelect(select);
                            toggleImageUser();
                          }}>
                          Ver Imagen
                        </Button>
                        :
                        <p>No se encontraron resultados</p>
                      }
                    </td>
                    <td>{select.use_amountUsd ? select.use_amountUsd : 0}</td>
                    <td>{select.use_amountEur ? select.use_amountEur : 0}</td>
                    <td>{select.use_amountGbp ? select.use_amountGbp : 0}</td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button
                color="success"
                id="PopoverLegacy1"
                type="button"
                onClick={toggleMovements}
              >
                Movimientos
              </Button>

              <Button
                color="danger"
                id="PopoverLegacy"
                type="button"
              >
                Eliminar
              </Button>

              <UncontrolledPopover
                placement="top"
                target="PopoverLegacy"
                trigger="legacy"
              >
                <PopoverHeader className="align-item-centered">
                  ¿Estas segur@ que quieres eliminar?
                </PopoverHeader>
                <PopoverBody className="align-item-centered">
                  Una vez eliminado no podras volver a ver los datos de este usuario, ¿Estas segur@?
                  <Button
                    color="danger"
                    id="PopoverLegacy"
                    type="button"
                    onClick={() => handleDelete(select.use_id)}
                  >
                    Eliminar
                  </Button>
                </PopoverBody>
              </UncontrolledPopover>

              <Button
                color="warning"
                onClick={() => { handleEdit(select) }}
              >
                Editar
              </Button>
              <Button
                color="secondary"
                onClick={() => { toggleViewer(); setSelectedUser(null) }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal De Imagen Movimientos */}
          <Modal isOpen={modalImageMov} size='lg' centered toggle={toggleImageMov}>
            <ModalHeader toggle={toggleImageMov}>{select.use_name} {select.use_lastName}</ModalHeader>
            <ModalBody>
              <img style={{ width: '100%' }} alt='ImageMovement' src={`https://apiremesa.up.railway.app/Movements/image/${selectMov.mov_img}`} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggleImageMov}>
                Volver
              </Button>
            </ModalFooter>
          </Modal>

          {/* Modal De Movimientos */}
          <Modal className='mt-5' isOpen={modalMovements} size='xl' centered toggle={toggleMovements}>
            <ModalHeader>Movimientos de {select.use_name} {select.use_lastName}</ModalHeader>
            <ModalBody>
              <Table bordered hover responsive striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Moneda</th>
                    <th>Monto</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Comentario</th>
                    <th>Imagen</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.reverse().map((move) => (
                    move.User.use_id === select.use_id ?
                      <tr key={move.mov_id}>
                        <th scope="row">{move.mov_id}</th>
                        <td>{move.mov_currency}</td>
                        <td>{move.mov_amount}</td>
                        <td>
                          {(move.mov_type === 'Deposito') ? (<FaArrowDown color='green' />) : null}
                          {(move.mov_type === 'Retiro') ? (<FaArrowUp color='red' />) : null}
                        </td>
                        <td>
                          {move.mov_status === 'R' ? (
                            <AiOutlineCloseCircle style={{ color: 'red', fontSize: '2em' }} /> // Icono de reloj
                          ) : move.mov_status === 'V' ? (
                            <AiOutlineCheckCircle style={{ color: 'green', fontSize: '2em' }} /> // Icono de equis
                          ) : (
                            <AiOutlineClockCircle style={{ color: 'blue', fontSize: '2em' }} /> // Icono de check
                          )}
                        </td>
                        <td>{move.mov_date}</td>
                        <td dangerouslySetInnerHTML={{ __html: move.mov_comment.replace(/\n/g, "<br/>") }} />
                        <td>
                          {move.mov_img ?
                            <Button
                              color='primary'
                              onClick={() => {
                                setSelectMov(move);
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onClick={toggleMovements}
              >
                Volver
              </Button>
            </ModalFooter>
          </Modal>

        </div >
      </div>
     ) : (
      <NotFound404 />
    )}
  </>
)}
</div>
)
}

export { UserVerificated }