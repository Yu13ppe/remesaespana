import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Col,
  Button,
  Card,
  CardTitle,
  CardBody,
  CardSubtitle,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useDataContext } from '../Context/dataContext';
import { NavBar } from '../Components/NavBar';
import { NotFound404 } from './NotFound404';
import BBVA from '../Assets/Images/Banks/BBVA.png'
import SANTANDER from '../Assets/Images/Banks/SANTANDER.png'
import Revolut from '../Assets/Images/Banks/REVOLUT.png'
import Wise from '../Assets/Images/Banks/WISE.png'
import BofA from '../Assets/Images/Banks/BANKOFAMERICA.png'
import Wells from '../Assets/Images/Banks/WELLSFARGO.png'
import Zelle from '../Assets/Images/Banks/ZELLE.png'
import Cajamar from '../Assets/Images/Banks/CAJAMAR.jpg'
import Unicaja from '../Assets/Images/Banks/UNICAJA.png'
import Bankinter from '../Assets/Images/Banks/BANKINTER.png'
import Bizum from '../Assets/Images/Banks/BIZUM.jpg'
import Caixa from '../Assets/Images/Banks/CAIXABANK.png'

function Banks() {
  const { accessAdminToken } = useDataContext();

  const [banksEur, setBanksEUR] = useState([]);
  const [banksUsd, setBanksUSD] = useState([]);
  const [banksGbp, setBanksGBP] = useState([]);
  const [selectModal, setSelectModal] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [admin, setAdmin] = useState([]);

  const [acceur_Bank, setAcceur_Bank] = useState('');
  const [acceur_owner, setAcceur_owner] = useState('');
  const [acceur_number, setAcceur_number] = useState('');
  const [acceur_nie, setAcceur_nie] = useState('');
  const [acceur_phone, setAcceur_phone] = useState('');

  const [accgbp_Bank, setAccgbp_Bank] = useState('');
  const [accgbp_owner, setAccgbp_owner] = useState('');
  const [accgbp_number, setAccgbp_number] = useState('');
  const [accgbp_Ident, setAccgbp_Ident] = useState('');
  const [accgbp_phone, setAccgbp_phone] = useState('');

  const [accusd_Bank, setAccusd_Bank] = useState('');
  const [accusd_owner, setAccusd_owner] = useState('');
  const [accusd_email, setAccusd_email] = useState('');
  const [accusd_number, setAccusd_number] = useState('');
  const [accusd_Ident, setAccusd_Ident] = useState('');
  const [accusd_phone, setAccusd_phone] = useState('');

  const [typeAcc, setTypeAcc] = useState('');

  const [modal, setModal] = useState(false);
  const toggle = () => { setModal(!modal) };
  const [modal1, setModal1] = useState(false);
  const toggle1 = () => { setModal1(!modal1) };

  const filteredBanks = [...banksEur, ...banksGbp, ...banksUsd].filter(Bank => {
    const fullName = `${Bank.acceur_Bank} ${Bank.accgbp_Bank} ${Bank.accusd_Bank} `.toLowerCase();
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
  },[setAdmin, accessAdminToken]);

  const fetchDataEUR = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Acceur');
      setBanksEUR(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataGBP = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Accgbp');
      setBanksGBP(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataUSD = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Accusd');
      setBanksUSD(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataEUR();
    fetchDataGBP();
    fetchDataUSD();
    fetchDataAdmin();
  }, [fetchDataAdmin]);

  const handleSubmit = async event => {
    event.preventDefault();

    if (typeAcc === 'EUR') {
      try {
        await axios.post(
          'https://apiremesa.up.railway.app/Acceur/create',
          {
            acceur_Bank,
            acceur_owner,
            acceur_number,
            acceur_nie,
            acceur_phone,
            acceur_type: 'Normal',
            acceur_status: 'Activo'
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Cuenta creada con exito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle();

      } catch (error) {
        console.log(error);
      }
    }

    if (typeAcc === 'GBP') {
      try {
        await axios.post(
          'https://apiremesa.up.railway.app/Accgbp/create',
          {
            accgbp_Bank,
            accgbp_owner,
            accgbp_number,
            accgbp_Ident,
            accgbp_phone,
            accgbp_status: "Activo"
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Cuenta creada con exito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle();

      } catch (error) {
        console.log(error);
      }
    }

    if (typeAcc === 'USD') {
      try {
        await axios.post(
          'https://apiremesa.up.railway.app/Accusd/create',
          {
            accusd_Bank,
            accusd_owner,
            accusd_email,
            accusd_number,
            accusd_Ident,
            accusd_phone,
            accusd_type: 'Normal',
            accusd_status: 'Activo'
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Cuenta creada con exito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle();

      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async event => {
    event.preventDefault();

    if (selectModal.acceur_Bank) {
      try {
        await axios.put(
          `https://apiremesa.up.railway.app/Acceur/${selectModal.acceur_id}`,
          {
            acceur_status: (selectModal.acceur_status === 'Desactivo' ? 'Activo' : 'Desactivo')
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Datos cambiados con exito!', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle1();

      } catch (error) {
        console.log(error);
      }
    }
    if (selectModal.accgbp_Bank) {
      try {
        await axios.put(
          `https://apiremesa.up.railway.app/Accgbp/${selectModal.accgbp_id}`,
          {
            accgbp_status: (selectModal.accgbp_status === 'Desactivo' ? 'Activo' : 'Desactivo')
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Datos cambiados con exito!', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle1();

      } catch (error) {
        console.log(error);
      }

    }
    if (selectModal.accusd_Bank) {
      try {
        await axios.put(
          `https://apiremesa.up.railway.app/Accusd/${selectModal.accusd_id}`,
          {
            accusd_status: (selectModal.accusd_status === 'Desactivo' ? 'Activo' : 'Desactivo')
          }
        );

        fetchDataEUR();
        fetchDataGBP();
        fetchDataUSD();

        toast.success('¡Datos cambiados con exito!', {
          position: 'bottom-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        toggle1();

      } catch (error) {
        console.log(error);
      }
    }
  }

  const banksImages = [
    {
      name: "BBVA",
      Component: BBVA
    },
    {
      name: "Santander",
      Component: SANTANDER
    },
    {
      name: "Revolut",
      Component: Revolut
    },
    {
      name: "Wise",
      Component: Wise
    },
    {
      name: "Bank of America",
      Component: BofA
    },
    {
      name: "Wells Fargo",
      Component: Wells
    },
    {
      name: "Zelle",
      Component: Zelle
    },
    {
      name: "Cajamar",
      Component: Cajamar
    },
    {
      name: "Unicaja",
      Component: Unicaja
    },
    {
      name: "Bankinter",
      Component: Bankinter
    },
    {
      name: "Bizum",
      Component: Bizum
    },
    {
      name: "Caixa",
      Component: Caixa
    },
  ]

  return (
    admin.adm_role === 'A' ?
      <div>
        <NavBar />
        <div className="BanksBody">
          <Container>
            <h1 className="my-4">Cuentas bancarias</h1>
            <div className="container">
              <div className='row m-5 col-12'>
                <div className='d-flex align-items-center col-12'>
                  <Input
                    type="text"
                    className="form-control search-input"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Buscar Banco..."
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={toggle}
                  >
                    Agregar cuenta
                  </button>
                </div>
              </div>
            </div>

            <div className="cards row m-4">
              {filteredBanks.filter((bank) => bank.acceur_Bank !== 'Ghost' && bank.accgbp_Bank !== 'Ghost' && bank.accusd_Bank !== 'Ghost').map(bank => (
                <Col className="col">
                  <Card className='card mt-2 align-items-center'
                    onClick={() => {
                      setSelectModal(bank);
                      toggle1();
                    }}
                    style={{
                      backgroundColor: '#fff9',
                      borderRadius: '10px',
                      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    }}>
                    {bank.acceur_Bank && <CardTitle className="text-center mt-3">{bank.acceur_Bank}</CardTitle>}
                    {bank.accgbp_Bank && <CardTitle className="text-center mt-3">{bank.accgbp_Bank}</CardTitle>}
                    {bank.accusd_Bank && <CardTitle className="text-center mt-3">{bank.accusd_Bank}</CardTitle>}
                    {bank.acceur_Bank && <CardBody>
                      {banksImages.map((img) => (
                        img.name === bank.acceur_Bank ? (
                          <img src={img.Component} width={150} className="text-center" alt={bank.acceur_Bank} />
                        ) : null
                      ))}
                    </CardBody>}
                    {bank.accgbp_Bank && <CardBody>
                      {banksImages.map((img) => (
                        img.name === bank.accgbp_Bank ?
                          <img src={img.Component} width={150} className="text-center" alt={bank.acceur_Bank} />
                          : null
                      ))}
                    </CardBody>}
                    {bank.accusd_Bank && <CardBody>
                      {banksImages.map((img) => (
                        img.name === bank.accusd_Bank ?
                          <img src={img.Component} width={150} className="text-center" alt={bank.acceur_Bank} />
                          : null
                      ))}
                    </CardBody>}
                    {bank.acceur_Bank && <CardSubtitle className="text-center">
                      {bank.acceur_status === 'Activo' ?
                        <Alert>
                          Habilitado
                        </Alert>
                        :
                        <Alert color="danger">
                          Deshabilitado
                        </Alert>
                      }
                    </CardSubtitle>}
                    {bank.accgbp_Bank && <CardSubtitle className="text-center">
                      {bank.accgbp_status === 'Activo' ?
                        <Alert>
                          Habilitado
                        </Alert>
                        :
                        <Alert color="danger">
                          Deshabilitado
                        </Alert>
                      }
                    </CardSubtitle>}
                    {bank.accusd_Bank && <CardSubtitle className="text-center">
                      {bank.accusd_status === 'Activo' ?
                        <Alert>
                          Habilitado
                        </Alert>
                        :
                        <Alert color="danger">
                          Deshabilitado
                        </Alert>
                      }
                    </CardSubtitle>}
                  </Card>
                </Col>
              ))}
            </div>
          </Container>
        </div >

        {/* Modal De Editar Cuenta */}
        <Modal className='mt-5' isOpen={modal1} size='l' centered toggle={toggle1}>
          <ModalHeader style={{ width: '100%' }} >
            {banksImages.map((img) =>
              img.name === selectModal.acceur_Bank ?
                <img style={{ float: 'right', marginLeft: '17em' }} src={img.Component} width={80} alt={selectModal.acceur_Bank} className="float-right" />
                : null
            )}
            {banksImages.map((img) =>
              img.name === selectModal.accgbp_Bank ?
                <img style={{ float: 'right', marginLeft: '17em' }} src={img.Component} width={80} alt={selectModal.accgbp_Bank} className="float-right" />
                : null
            )}
            {banksImages.map((img) =>
              img.name === selectModal.accusd_Bank ?
                <img style={{ float: 'right', marginLeft: '17em' }} src={img.Component} width={80} alt={selectModal.accusd_Bank} className="float-right" />
                : null
            )}
            {selectModal.acceur_Bank &&
              <FormGroup row >
                <h5 style={{ margin: '.5em', fontWeight: '700' }}> {selectModal.acceur_Bank} </h5>
              </FormGroup>
            }
            {selectModal.accgbp_Bank &&
              <FormGroup row >
                <h5 style={{ margin: '.5em', fontWeight: '700' }}> {selectModal.accgbp_Bank} </h5>

              </FormGroup>
            }
            {selectModal.accusd_Bank &&
              <FormGroup row >
                <h5 style={{ margin: '.5em', fontWeight: '700' }}> {selectModal.accusd_Bank} </h5>
              </FormGroup>
            }
          </ModalHeader>
          <ModalBody>
            {selectModal.acceur_Bank &&
              <div>
                <h5>Detalles de la cuenta:</h5>
                <ul>
                  <li><strong>Banco:</strong> {selectModal.acceur_Bank}</li>
                  <li><strong>Propietario:</strong> {selectModal.acceur_owner}</li>
                  <li><strong>Número de cuenta:</strong> {selectModal.acceur_number}</li>
                  <li><strong>NIE:</strong> {selectModal.acceur_nie}</li>
                  <li><strong>Teléfono:</strong> {selectModal.acceur_phone}</li>
                  <li><strong>Tipo:</strong> {selectModal.acceur_type}</li>
                  <li><strong>Estado:</strong> {selectModal.acceur_status}</li>
                  <li><strong>Saldo:</strong> {selectModal.acceur_balance}</li>
                </ul>
              </div>
            }
            {selectModal.accgbp_Bank &&
              <div>
                <h5>Detalles de la cuenta:</h5>
                <ul>
                  <li><strong>Banco:</strong> {selectModal.accgbp_Bank}</li>
                  <li><strong>Propietario:</strong> {selectModal.accgbp_owner}</li>
                  <li><strong>Número de cuenta:</strong> {selectModal.accgbp_number}</li>
                  <li><strong>NIE:</strong> {selectModal.accgbp_nie}</li>
                  <li><strong>Teléfono:</strong> {selectModal.accgbp_phone}</li>
                  <li><strong>Tipo:</strong> {selectModal.accgbp_type}</li>
                  <li><strong>Estado:</strong> {selectModal.accgbp_status}</li>
                  <li><strong>Saldo:</strong> {selectModal.accgbp_balance}</li>
                </ul>
              </div>
            }
            {selectModal.accusd_Bank &&
              <div>
                <h5>Detalles de la cuenta:</h5>
                <ul>
                  <li><strong>Banco:</strong> {selectModal.accusd_Bank}</li>
                  <li><strong>Propietario:</strong> {selectModal.accusd_owner}</li>
                  <li><strong>Número de cuenta:</strong> {selectModal.accusd_number}</li>
                  <li><strong>NIE:</strong> {selectModal.accusd_nie}</li>
                  <li><strong>Teléfono:</strong> {selectModal.accusd_phone}</li>
                  <li><strong>Tipo:</strong> {selectModal.accusd_type}</li>
                  <li><strong>Estado:</strong> {selectModal.accusd_status}</li>
                  <li><strong>Saldo:</strong> {selectModal.accusd_balance}</li>
                </ul>
              </div>
            }
          </ModalBody>
          <ModalFooter>
            {
              selectModal.accusd_Bank ?
                selectModal.accusd_status === 'Desactivo' ?
                  <Button onClick={handleEdit} color='success'>
                    Habilitar
                  </Button>
                  :
                  <Button onClick={handleEdit} color="danger">
                    Deshabilitar
                  </Button>
                :
                null
            }
            {
              selectModal.acceur_Bank ?
                selectModal.acceur_status === 'Desactivo' ?
                  <Button onClick={handleEdit} color='success'>
                    Habilitar
                  </Button>
                  :
                  <Button onClick={handleEdit} color="danger">
                    Deshabilitar
                  </Button>
                :
                null
            }
            {
              selectModal.accgbp_Bank ?
                selectModal.accgbp_status === 'Desactivo' ?
                  <Button onClick={handleEdit} color='success'>
                    Habilitar
                  </Button>
                  :
                  <Button onClick={handleEdit} color="danger">
                    Deshabilitar
                  </Button>
                :
                null
            }

            <Button
              color="secondary"
              onClick={() => { toggle1() }}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        {/* Modal De Agregar Cuenta */}
        <Modal centered isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Crear Cuenta bancaria</ModalHeader>
          <ModalBody>
            <div className="row g-3">
              <div className="col-md-12">
                <label htmlFor="nombre" className="form-label">
                  Seleccione la moneda de la cuenta bancaria:
                </label>
                <Input
                  type="select"
                  id="typeAcc"
                  defaultValue={typeAcc}
                  onChange={(e) => setTypeAcc(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="EUR">Euro</option>
                  <option value="GBP">Libra Esterlina</option>
                  <option value="USD">Dolar</option>
                </Input>
              </div>
              {
                typeAcc === 'EUR' ?
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">
                      Nombre del Banco:
                    </label>
                    <Input
                      type="select"
                      id="acceur_Bank"
                      defaultValue={acceur_Bank}
                      onChange={(e) => setAcceur_Bank(e.target.value)}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="BBVA">BBVA</option>
                      <option value="Santander">Santander</option>
                      <option value="Revolut">Revolut</option>
                      <option value="Wise">Wise</option>
                      <option value="Cajamar">Cajamar</option>
                      <option value="Unicaja">Unicaja</option>
                      <option value="Caixa">Caixa</option>
                      <option value="Bizum">Bizum</option>
                      <option value="Bankinter">Bankinter</option>
                      <option value="Revolut">Revolut</option>
                    </Input>
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'EUR' ?
                  <div className="col-md-6">
                    <label htmlFor="acceur_owner" className="form-label">
                      Nombre del Titular:
                    </label>
                    <Input
                      type="text"
                      id="acceur_owner"
                      defaultValue={acceur_owner}
                      onChange={(e) => setAcceur_owner(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'EUR' ?
                  <div className="col-md-6">
                    <label htmlFor="acceur_number" className="form-label">
                      Numero de Cuenta:
                    </label>
                    <Input
                      type="text"
                      id="acceur_number"
                      defaultValue={acceur_number}
                      onChange={(e) => setAcceur_number(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'EUR' ?
                  <div className="col-md-6">
                    <label htmlFor="acceur_phone" className="form-label">
                      Telefono:
                    </label>
                    <Input
                      type="text"
                      id="acceur_phone"
                      defaultValue={acceur_phone}
                      onChange={(e) => setAcceur_phone(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'EUR' ?
                  <div className="col-md-6">
                    <label htmlFor="acceur_nie" className="form-label">
                      NIE:
                    </label>
                    <Input
                      type="text"
                      id="acceur_nie"
                      defaultValue={acceur_nie}
                      onChange={(e) => setAcceur_nie(e.target.value)}
                    />
                  </div>
                  :
                  null
              }

              {
                typeAcc === 'GBP' ?
                  <div className="col-md-6">
                    <label htmlFor="accgbp_Bank" className="form-label">
                      Nombre del Banco:
                    </label>
                    <Input
                      type="select"
                      id="accgbp_Bank"
                      defaultValue={accgbp_Bank}
                      onChange={(e) => setAccgbp_Bank(e.target.value)}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Revolut">Revolut</option>
                      <option value="Wise">Wise</option>
                    </Input>
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'GBP' ?
                  <div className="col-md-6">
                    <label htmlFor="accgbp_owner" className="form-label">
                      Nombre del Titular:
                    </label>
                    <Input
                      type="text"
                      id="accgbp_owner"
                      defaultValue={accgbp_owner}
                      onChange={(e) => setAccgbp_owner(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'GBP' ?
                  <div className="col-md-6">
                    <label htmlFor="accgbp_number" className="form-label">
                      Numero de Cuenta:
                    </label>
                    <Input
                      type="text"
                      id="accgbp_number"
                      defaultValue={accgbp_number}
                      onChange={(e) => setAccgbp_number(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'GBP' ?
                  <div className="col-md-6">
                    <label htmlFor="accgbp_Ident" className="form-label">
                      Identificación:
                    </label>
                    <Input
                      type="text"
                      id="accgbp_Ident"
                      defaultValue={accgbp_Ident}
                      onChange={(e) => setAccgbp_Ident(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'GBP' ?
                  <div className="col-md-6">
                    <label htmlFor="accgbp_phone" className="form-label">
                      Telefono:
                    </label>
                    <Input
                      type="text"
                      id="accgbp_phone"
                      defaultValue={accgbp_phone}
                      onChange={(e) => setAccgbp_phone(e.target.value)}
                    />
                  </div>
                  :
                  null
              }

              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_Bank" className="form-label">
                      Nombre del Banco:
                    </label>
                    <Input
                      type="select"
                      id="accusd_Bank"
                      defaultValue={accusd_Bank}
                      onChange={(e) => setAccusd_Bank(e.target.value)}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Bank of America">Bank of America</option>
                      <option value="Wells Fargo">Wells Fargo</option>
                      <option value="Zelle">Zelle</option>
                    </Input>
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_owner" className="form-label">
                      Nombre del Titular:
                    </label>
                    <Input
                      type="text"
                      id="accusd_owner"
                      defaultValue={accusd_owner}
                      onChange={(e) => setAccusd_owner(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_email" className="form-label">
                      Correo:
                    </label>
                    <Input
                      type="email"
                      id="accusd_email"
                      defaultValue={accusd_email}
                      onChange={(e) => setAccusd_email(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_number" className="form-label">
                      Numero de Cuenta:
                    </label>
                    <Input
                      type="text"
                      id="accusd_number"
                      defaultValue={accusd_number}
                      onChange={(e) => setAccusd_number(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_Ident" className="form-label">
                      Identificación:
                    </label>
                    <Input
                      type="text"
                      id="accusd_Ident"
                      defaultValue={accusd_Ident}
                      onChange={(e) => setAccusd_Ident(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
              {
                typeAcc === 'USD' ?
                  <div className="col-md-6">
                    <label htmlFor="accusd_phone" className="form-label">
                      Telefono:
                    </label>
                    <Input
                      type="text"
                      id="accusd_phone"
                      defaultValue={accusd_phone}
                      onChange={(e) => setAccusd_phone(e.target.value)}
                    />
                  </div>
                  :
                  null
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleSubmit}>
              Agregar
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <ToastContainer />
      </div >
      :
      <NotFound404 />
  );
}

export { Banks }
