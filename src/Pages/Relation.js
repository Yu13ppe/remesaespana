import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NavBar } from '../Components/NavBar';
import { useDataContext } from '../Context/dataContext';
import { NotFound404 } from './NotFound404';
import { Table, Input, Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';

function Relation() {
  const { accessAdminToken } = useDataContext();
  const [admin, setAdmin] = useState([]);
  const [movements, setMovements] = useState([]);
  const [banksEUR, setBanksEUR] = useState([]);
  const [banksGBP, setBanksGBP] = useState([]);
  const [banksUSD, setBanksUSD] = useState([]);
  const [banksBS, setBanksBS] = useState([]);
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

  // JOSE MARDITO PARA BOLAS
  // Aqui para hacer un ingreso o egreso manualmente hice esto pero aja no lo terminexdd
  //Mi idea es hacer algo igual a changes (Crear un movimiento de retiro o carga por banco seleccionado pero aja se me quemo el cerebro por la hora)
  // const performOperation = async () => {
  //   try {

  //     const response = await axios.put(`https://apiremesa.up.railway.app/Movements`, {
  //       operationType,
  //       amount,
  //     });

  //     fetchData();

  //     toggleModal();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const calculateTotals = () => {
    let totalEur = 0;
    let totalGbp = 0;
    let totalUsd = 0;
    let totalBs = 0;

    movements.forEach((movement) => {
      const total = parseFloat(movement.tor_total);

      if (movement.AccountsEur) {
        totalEur += total;
      } else if (movement.AccountsGbp) {
        totalGbp += total;
      } else if (movement.AccountsUsd) {
        totalUsd += total;
      } else if (movement.AccountsBs) {
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
    const fullName = `${mov.tor_date}`.toLowerCase();
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
  }, [fetchDataAdmin]);

  return (
    admin.adm_role === 'A' ? (
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
              {filteredRelation.map((movement) => (
                (movement.AccountsEur?.acceur_Bank !== 'Ghost' &&
                  movement.AccountsBs?.accbs_bank !== 'Ghost' &&
                  movement.AccountsGbp?.accgbp_Bank !== 'Ghost' &&
                  movement.AccountsUsd?.accusd_Bank !== 'Ghost') ? (
                  <tr key={movement.tor_id}>
                    <td>
                      {filteredRelation
                        .filter((mov) => (
                          mov.AccountsEur?.acceur_Bank !== 'Ghost' &&
                          mov.AccountsBs?.accbs_bank !== 'Ghost' &&
                          mov.AccountsGbp?.accgbp_Bank !== 'Ghost' &&
                          mov.AccountsUsd?.accusd_Bank !== 'Ghost'
                        ))
                        .indexOf(movement) + 1
                      }
                    </td>
                    <td>
                      {movement.AccountsBs ? `${movement.AccountsBs.accbs_bank} (${movement.AccountsBs.accbs_owner}) `: ''}
                      {movement.AccountsEur ? `${movement.AccountsEur.acceur_Bank} (${movement.AccountsEur.acceur_owner}) `: ''}
                      {movement.AccountsGbp ? `${movement.AccountsGbp.accgbp_Bank} (${movement.AccountsGbp.accgbp_owner}) `: ''}
                      {movement.AccountsUsd ? `${movement.AccountsUsd.accusd_Bank} (${movement.AccountsUsd.accusd_owner}) `: ''}
                    </td>
                    <td>{movement.tor_totalIn}</td>
                    <td>{movement.tor_totalOut}</td>
                    <td>{movement.tor_total}</td>
                    <td>{movement.tor_date}</td>
                    <td>{movement.tor_currencyPrice}</td>
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
                    onChange={(e) => setOperationType(e.target.value)}
                  >
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
                      value={selectedCurrency}
                      onChange={(e) => setSelectedCurrency(e.target.value)}
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="EUR">Euros</option>
                      <option value="GBP">Libras</option>
                      <option value="USD">Dólares</option>
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
              <Button color="primary" >
                Realizar Operación
              </Button>{' '}
              <Button color="secondary" onClick={toggleModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    ) : (
      <NotFound404 />
    )
  );
}

export { Relation };
