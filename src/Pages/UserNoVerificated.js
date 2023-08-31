import React, { useState, useEffect } from 'react'
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
  PopoverBody,
} from 'reactstrap'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { useDataContext } from '../Context/dataContext'
import { NavBar } from '../Components/NavBar';

function UserNoVerificated() {
  const { isAdmin } = useDataContext();
  const [users, setUsers] = useState([]);

  const [modalImageUser, setModalImageUser] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [modalViewer, setModalViewer] = useState(false);

  const [select, setSelect] = useState([])
  const [searchQuery, setSearchQuery] = useState('');

  const [use_name, setNombre] = useState('');
  const [use_lastName, setLastName] = useState('');
  const [use_email, setEmail] = useState('');
  const [use_password, setPassword] = useState('');
  const [use_NIE, setNie] = useState('');
  const [use_passport, setPassport] = useState('');
  const [use_phone, setPhone] = useState('');
  const [use_verif, setVerif] = useState('');
  const use_img = '';
  const [use_amountEur, setAmountEur] = useState(Number);
  const [use_amountUsd, setAmountUsd] = useState(Number);
  const [use_amountGbp, setAmountGbp] = useState(Number);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleImageUser = () => setModalImageUser(!modalImageUser);
  const toggleUser = () => {
    setModalUser(!modalUser);
    if (modalUser === false) {
      setNombre('');
      setLastName('');
      setEmail('');
      setPassword('');
      setNie('');
      setPassport('');
      setPhone('');
      setVerif('');
      setAmountEur('');
      setAmountUsd('');
      setAmountGbp('');
    }
  }

  const toggleViewer = () => setModalViewer(!modalViewer);

  const filteredUsuarios = users.filter(user => {
    const fullName = `${user.use_name} ${user.use_lastName} ${user.use_NIE} ${user.use_passport}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/users');
      setUsers(response.data);
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
    setNie(user.use_NIE);
    setPassport(user.use_passport);
    setPhone(user.use_phone);
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
            use_NIE,
            use_passport,
            use_email,
            use_password,
            use_phone,
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

        toast.success('¡Cambio realizado con éxito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        await axios.post(
          'https://apiremesa.up.railway.app/Users/create',
          {
            use_name,
            use_lastName,
            use_NIE,
            use_passport,
            use_email,
            use_password,
            use_phone,
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
    isAdmin ?
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
                  defaultValue={searchQuery}
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
          <Table success bordered hover responsive striped className='userTable table-success'>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>NIE/NIF</th>
                <th>Verificacion</th>
                <th>Imagen</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                filteredUsuarios.filter((user) => user.use_verif === 'E').map((user) => (
                  <tr key={user.use_id}
                    onClick={() => {
                      setSelect(user);
                    }}>
                    <th scope="row">{user.use_id}</th>
                    <td>{user.use_name}</td>
                    <td>{user.use_lastName}</td>
                    <td>{user.use_NIE ? user.use_NIE : <p>No se encontraron resultados</p>}</td>
                    <td><AiOutlineClockCircle style={{ color: "blue", fontSize: "2em" }} /></td>
                    <td>
                      <Button
                        color='primary'
                        onClick={() => {
                          toggleImageUser();
                        }}>
                        Ver Imagen
                      </Button>
                    </td>
                    <td>
                      <Button className='mr-5'
                        color="warning"
                        onClick={() => { handleEdit(user) }}
                      >
                        Editar
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>

          {/* Modal De Imagen Usuarios */}
          <Modal centered isOpen={modalImageUser} size='lg' toggle={toggleImageUser}>
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
                    disabled={selectedUser}
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
                    disabled={selectedUser}
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
                    disabled={selectedUser}
                    placeholder="Email"
                    maxLength="45"
                    required
                  />
                </div>
                <div hidden={selectedUser} className="col-md-6">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <Input
                    type="password"
                    defaultValue={use_password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    hidden={selectedUser}
                    placeholder="Password"
                    maxLength="45"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="nie" className="form-label">
                    NIE:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_NIE}
                    onChange={e => setNie(e.target.value)}
                    className="form-control"
                    disabled={selectedUser}
                    id="nie"
                    placeholder="NIE"
                  />
                </div>
                <div hidden className="col-md-6">
                  <label htmlFor="passport" className="form-label">
                    Pasaporte:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_passport}
                    onChange={e => setPassport(e.target.value)}
                    className="form-control"
                    id="passport"
                    placeholder="passport"
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Telefono:
                  </label>
                  <Input
                    type="number"
                    defaultValue={use_phone}
                    onChange={e => setPhone(e.target.value)}
                    className="form-control"
                    disabled={selectedUser}
                    id="phone"
                    placeholder="Phone"
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
                    disabled={selectedUser}
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
                    disabled={selectedUser}
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
                    disabled={selectedUser}
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

          <ToastContainer />

        </div >
      </div>
      :
      (<h1>Error404</h1>)
  )
}

export { UserNoVerificated }