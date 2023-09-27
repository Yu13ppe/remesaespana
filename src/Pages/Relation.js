import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavBar } from '../Components/NavBar';
import { useDataContext } from '../Context/dataContext';
import { NotFound404 } from './NotFound404';
import { toast, ToastContainer } from 'react-toastify';
import { Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import { Spinner } from '../Components/Spinner';

function Relation() {
  const { accessAdminToken } = useDataContext();
  const [admin, setAdmin] = useState([]);
  const [movements, setMovements] = useState([]);
  const [banksEUR, setBanksEUR] = useState([]);
  const [banksGBP, setBanksGBP] = useState([]);
  const [banksUSD, setBanksUSD] = useState([]);
  const [banksBS, setBanksBS] = useState([]);
  const [movs, setMovs] = useState([]);
  // const date = new Date();
  // const day = date.getDate();
  // const month = date.getMonth() + 1;
  // const year = date.getFullYear();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [operationType, setOperationType] = useState('');

  // Estados para el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [amount, setAmount] = useState(0);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 900);
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    if (operationType === 'Ingreso') {
      const formData = new FormData();
      formData.append('bal_currency', selectedCurrency);
      formData.append('bal_amount', amount);
      formData.append('bal_type', 'Deposito');
      formData.append('bal_comment', 'Ingreso de Administración');
      formData.append('bal_accEurId', (selectedCurrency === 'EUR' ? parseInt(selectedBank) : 0));
      formData.append('bal_accUsdId', (selectedCurrency === 'USD' ? parseInt(selectedBank) : 0));
      formData.append('bal_accGbpId', (selectedCurrency === 'GBP' ? parseInt(selectedBank) : 0));
      formData.append('bal_accBsId', (selectedCurrency === 'BS' ? parseInt(selectedBank) : 0));

      try {
        await axios.post(
          'https://apiremesa.up.railway.app/BalanceAcc/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (selectedCurrency === 'EUR') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accEurId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'USD') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accUsdsId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'GBP') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accGbpId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'BS') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accBsId: parseInt(selectedBank)
          });
        }

        toggleModal();
        fetchData();
        toast.success('Cambio realizado con exito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log('Request sent successfully');
      } catch (error) {
        console.error('Error:', error);
      }
    }

    if (operationType === 'Egreso') {
      const formData = new FormData();
      formData.append('bal_currency', selectedCurrency);
      formData.append('bal_amount', amount);
      formData.append('bal_type', 'Retiro');
      formData.append('bal_comment', 'Retiro de Administración');
      formData.append('bal_accEurId', (selectedCurrency === 'EUR' ? parseInt(selectedBank) : 0));
      formData.append('bal_accUsdId', (selectedCurrency === 'USD' ? parseInt(selectedBank) : 0));
      formData.append('bal_accGbpId', (selectedCurrency === 'GBP' ? parseInt(selectedBank) : 0));
      formData.append('bal_accBsId', (selectedCurrency === 'BS' ? parseInt(selectedBank) : 0));

      try {
        await axios.post(
          'https://apiremesa.up.railway.app/BalanceAcc/create',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (selectedCurrency === 'EUR') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accEurId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'USD') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accUsdsId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'GBP') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accGbpId: parseInt(selectedBank)
          });
        }
        if (selectedCurrency === 'BS') {
          await axios.post(
            `https://apiremesa.up.railway.app/TotalRegister/create`, {
            tor_accBsId: parseInt(selectedBank)
          });
        }

        toggleModal();
        fetchData();
        toast.success('Cambio realizado con exito!', {
          position: 'bottom-right',
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        console.log('Request sent successfully');
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const calculateTotals = () => {
    let totalEur = 0;
    let totalGbp = 0;
    let totalUsd = 0;
    let totalBs = 0;

    movements.forEach((totalReg) => {
      const total = parseFloat(totalReg.tor_total);

      if (totalReg.AccountsEur) {
        totalEur += total;
      } else if (totalReg.AccountsGbp) {
        totalGbp += total;
      } else if (totalReg.AccountsUsd) {
        totalUsd += total;
      } else if (totalReg.AccountsBs) {
        totalBs += total;
      }
    });

    return {
      totalEur,
      totalGbp,
      totalUsd,
      totalBs,
    };
  };

  const { totalEur, totalGbp, totalUsd, totalBs } = calculateTotals();

  const filteredRelation = movements.filter((mov) => {
    const fullName = `${mov.tor_date} 
    ${mov.AccountsBs ? mov.AccountsBs.accbs_bank : null} 
    ${mov.AccountsEur ? mov.AccountsEur.acceur_Bank : null} 
    ${mov.AccountsGbp ? mov.AccountsGbp.accgbp_Bank : null} 
    ${mov.AccountsUsd ? mov.AccountsUsd.accusd_Bank : null} `.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/TotalRegister');
      setMovements(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDataMovs = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Movements/date/${2023}-${'09'}-${26}`);
      setMovs(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [setMovs]);
  const fetchDataAdmin = useCallback(async () => {
    try {
      const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByTokenAdmin/${accessAdminToken.access_token}`);
      setAdmin(response.data);
    } catch (error) {
    }
  }, [setAdmin, accessAdminToken]);
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
  const fetchDataBS = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/Accbs');
      setBanksBS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchDataAdmin();
    fetchDataEUR();
    fetchDataGBP();
    fetchDataUSD();
    fetchDataBS();
    fetchDataMovs();
  }, [fetchDataAdmin, fetchDataMovs]);

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
                <h1 className='titleUser'>Relación</h1>
                <div className="container">
                  <div className='row m-5 col-12'>
                    <div className='d-flex align-items-center col-12'>
                      <Input
                        type="text"
                        className="form-control search-input"
                        defaultValue={searchQuery}
                        onChange={handleSearch}
                        placeholder="Buscar Relacion..."
                      />
                    </div>
                  </div>
                </div>
                <Table success bordered hover responsive striped className='userTable table-success'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Banco</th>
                      <th>Total Ingreso</th>
                      <th>Total Egreso</th>
                      <th>Total</th>
                      <th>Fecha</th>
                      <th>Tasa de Cambio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRelation.map((totalReg) => (
                      (totalReg.AccountsEur?.acceur_Bank !== 'Ghost' &&
                        totalReg.AccountsBs?.accbs_bank !== 'Ghost' &&
                        totalReg.AccountsGbp?.accgbp_Bank !== 'Ghost' &&
                        totalReg.AccountsUsd?.accusd_Bank !== 'Ghost') ? (
                        <tr key={totalReg.tor_id}>
                          <td>
                            {filteredRelation
                              .filter((mov) => (
                                mov.AccountsEur?.acceur_Bank !== 'Ghost' &&
                                mov.AccountsBs?.accbs_bank !== 'Ghost' &&
                                mov.AccountsGbp?.accgbp_Bank !== 'Ghost' &&
                                mov.AccountsUsd?.accusd_Bank !== 'Ghost'
                              ))
                              .indexOf(totalReg) + 1
                            }
                          </td>
                          <td>
                            {totalReg.AccountsBs ? `${totalReg.AccountsBs.accbs_bank} (${totalReg.AccountsBs.accbs_owner}) ` : ''}
                            {totalReg.AccountsEur ? `${totalReg.AccountsEur.acceur_Bank} (${totalReg.AccountsEur.acceur_owner}) ` : ''}
                            {totalReg.AccountsGbp ? `${totalReg.AccountsGbp.accgbp_Bank} (${totalReg.AccountsGbp.accgbp_owner}) ` : ''}
                            {totalReg.AccountsUsd ? `${totalReg.AccountsUsd.accusd_Bank} (${totalReg.AccountsUsd.accusd_owner}) ` : ''}
                          </td>
                          <td>{totalReg.tor_totalIn}</td>
                          <td>{totalReg.tor_totalOut}</td>
                          <td>{totalReg.tor_total}</td>
                          <td>{totalReg.tor_date}</td>
                          <td>{totalReg.tor_currencyPrice}</td>
                        </tr>
                      ) : null
                    ))}
                  </tbody>
                </Table>
                <div className="totals-table">
                  <h2>Totales</h2>
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Moneda</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Euros</td>
                        <td>{totalEur}</td>
                      </tr>
                      <tr>
                        <td>Libras</td>
                        <td>{totalGbp}</td>
                      </tr>
                      <tr>
                        <td>Dólares</td>
                        <td>{totalUsd}</td>
                      </tr>
                      <tr>
                        <td>Bolívares</td>
                        <td>{totalBs}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <Button color="primary" onClick={toggleModal}>Agregar Ingreso/Egreso</Button>

                <Table success bordered hover responsive striped className='userTable table-success'>
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
                    {movs.map((mov) => (
                      <tr key={mov.mov_id}>
                        <td>{mov.mov_currency}</td>
                        <td>{mov.mov_amount}</td>
                        <td>{mov.mov_date}</td>
                        <td>{mov.mov_status}</td>
                        <td>{mov.mov_type}</td>
                        <td>{mov.mov_comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Modal isOpen={modalOpen} size='lg' centered toggle={toggleModal}>
                  <ModalHeader toggle={toggleModal}>Agregar Ingreso/Egreso</ModalHeader>
                  <ModalBody>
                    <form>
                      <div className="form-group">
                        <label htmlFor="operationType">Tipo de Operación:</label>
                        <select
                          id="operationType"
                          className="form-control"
                          value={operationType}
                          onChange={(e) => setOperationType(e.target.value)}>
                          <option value="">Seleccione una opción</option>
                          <option value="Ingreso">Ingreso</option>
                          <option value="Egreso">Egreso</option>
                        </select>
                      </div>
                      {operationType && (
                        <div className="form-group">
                          <label htmlFor="currency">Seleccionar Moneda:</label>
                          <select
                            id="currency"
                            className="form-control"
                            defaultValue={selectedCurrency}
                            onChange={(e) => setSelectedCurrency(e.target.value)}
                          >
                            <option value="">Seleccione una opción</option>
                            <option value="EUR">Euro</option>
                            <option value="GBP">Libra Esterlina</option>
                            <option value="USD">Dolar</option>
                            <option value="BS">Bolívares</option>
                          </select>
                        </div>
                      )}
                      {operationType && (
                        <div className="form-group" hidden={selectedCurrency === ''}>
                          <label htmlFor="bank">Seleccionar Banco:</label>
                          <select
                            id="bank"
                            className="form-control"
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                          >
                            <option value="">Selecciona una opción</option>
                            {selectedCurrency === 'EUR' ?
                              banksEUR.filter((bank) => bank.acceur_Bank !== 'Ghost').map((bank) => (
                                <option key={bank.acceur_id} value={bank.acceur_id}>
                                  {bank.acceur_Bank} ({bank.acceur_owner})
                                </option>)
                              ) : null
                            }
                            {selectedCurrency === 'GBP' ?
                              banksGBP.filter((bank) => bank.accgbp_Bank !== 'Ghost').map((bank) => (
                                <option key={bank.accgbp_id} value={bank.accgbp_id}>
                                  {bank.accgbp_Bank} ({bank.accgbp_owner})
                                </option>)
                              ) : null
                            }
                            {selectedCurrency === 'USD' ?
                              banksUSD.filter((bank) => bank.accusd_Bank !== 'Ghost').map((bank) => (
                                <option key={bank.accusd_id} value={bank.accusd_id}>
                                  {bank.accusd_Bank} ({bank.accusd_owner})
                                </option>)
                              ) : null
                            }
                            {selectedCurrency === 'BS' ?
                              banksBS.filter((bank) => bank.accbs_bank !== 'Ghost').map((bank) => (
                                <option key={bank.accbs_id} value={bank.accbs_id}>
                                  {bank.accbs_bank} ({bank.accbs_owner})
                                </option>)
                              ) : null
                            }
                          </select>
                        </div>
                      )}

                      {operationType !== 'Ingreso' || selectedBank === "" ? null :
                        <Alert>
                          <h4 className="alert-heading">
                            Cuenta Bancaria:
                          </h4>
                          {selectedCurrency === 'EUR' ?
                            banksEUR.map((bank) => {
                              return bank.acceur_id === parseInt(selectedBank) ?
                                <p>
                                  Banco: {bank.acceur_Bank}
                                  <br />
                                  Cuenta: {bank.acceur_number}
                                  <br />
                                  NIE/NIF: {bank.acceur_nie}
                                  <br />
                                  Propietario: {bank.acceur_owner}
                                </p>
                                : null
                            })
                            : selectedCurrency === 'USD' ?
                              banksUSD.map((bank) => {
                                return bank.accusd_id === parseInt(selectedBank) ?
                                  <p>
                                    Banco: {bank.accusd_Bank}
                                    <br />
                                    Propietario: {bank.accusd_owner}
                                    <br />
                                    Email: {bank.accusd_email}
                                  </p>
                                  : null
                              })
                              : selectedCurrency === 'GBP' ?
                                banksGBP.map((bank) => {
                                  return bank.accgbp_id === parseInt(selectedBank) ?
                                    <p>
                                      Banco: {bank.accgbp_Bank}
                                      <br />
                                      Cuenta: {bank.accgbp_number}
                                      <br />
                                      DNI: {bank.accgbp_Ident}
                                      <br />
                                      Propietario: {bank.accgbp_owner}
                                    </p>
                                    : null
                                })
                                :
                                banksBS.map((bank) => {
                                  return bank.accbs_id === parseInt(selectedBank) ?
                                    <p>
                                      Banco: {bank.accbs_bank}
                                      <br />
                                      Cuenta: {bank.accbs_number}
                                      <br />
                                      Propietario: {bank.accbs_owner}
                                    </p>
                                    : null
                                })

                          }
                          <hr />
                          <p className="mb-0">
                            Al culminar la verificación del pago, el monto se verá reflejado en su plataforma.
                          </p>
                        </Alert>
                      }
                      {operationType && (
                        <div className="form-group" hidden={selectedCurrency === ''}>
                          <label htmlFor="amount">Monto:</label>
                          <input
                            type="number"
                            id="amount"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                          />
                        </div>
                      )}
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>
                      Realizar Operación
                    </Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>
                      Cancelar
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
              <ToastContainer />
            </div>

          ) : (
            <NotFound404 />
          )}
        </>
      )}
    </div>
  );
}

export { Relation };