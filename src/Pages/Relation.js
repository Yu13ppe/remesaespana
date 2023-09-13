// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   Button,
//   Table,
//   Input,
//   Nav,
//   NavItem,
//   NavLink,
// } from 'reactstrap';
// import axios from 'axios';
// import { AiOutlinePound, AiOutlineDollar, AiOutlineEuro } from 'react-icons/ai';
// import { NavBar } from '../Components/NavBar';
// import { useDataContext } from '../Context/dataContext';
// import { NotFound404 } from './NotFound404';

// function Relation() {
//   const { accessToken } = useDataContext();
//   const [movements, setMovements] = useState([]);
//   const [filteredMovements, setFilteredMovements] = useState([]);
//   const [admin, setAdmin] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredRelation = movements.filter((mov) => {
//     const fullName = `${mov.mov_date}`.toLowerCase();
//     return fullName.includes(searchQuery.toLowerCase());
//   });

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('https://apiremesa.up.railway.app/movements');
//       setMovements(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchDataAdmin = useCallback(async () => {
//     try {
//       const response = await axios.get(`https://apiremesa.up.railway.app/Auth/findByTokenAdmin/${accessToken.access_token}`);
//       setAdmin(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [setAdmin, accessToken]);

//   useEffect(() => {
//     fetchData();
//     fetchDataAdmin();
//   }, [fetchDataAdmin]);

//   return (
//     admin.adm_role === 'A' ? (
//       <div>
//         <NavBar />
//         <div className='userContent'>
//           <h1 className='titleUser'>Relación</h1>
//           <div className="container">
//             <div className='row m-5 col-12'>
//               <div className='d-flex align-items-center col-12'>
//                 <Input
//                   type="text"
//                   className="form-control search-input"
//                   defaultValue={searchQuery}
//                   onChange={handleSearch}
//                   placeholder="Buscar Usuario..."
//                 />
//               </div>
//             </div>
//           </div>
//           <Table success bordered hover responsive striped className='userTable table-success'>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Banco</th>
//                 <th>Moneda</th>
//                 <th>Total Ingreso</th>
//                 <th>Total Egreso</th>
//                 <th>Total</th>
//                 <th>Fecha</th>
//               </tr>
//             </thead>
//             <tbody>

//             </tbody>
//           </Table>
//         </div>
//       </div>
//     ) : (
//       <NotFound404 />
//     )
//   );
// }

// export { Relation }

// function Relation() {
//   const [movements, setMovements] = useState([]);
//   const [filteredMovements, setFilteredMovements] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('EUR');
//   const [consolidatedData, setConsolidatedData] = useState({});
//   const [currentDate, setCurrentDate] = useState('');

//   const toggleCurrency = (currency) => {
//     // Verificar si la moneda seleccionada es diferente a la actual antes de cambiarla
//     if (currency !== selectedCurrency) {
//       setSelectedCurrency(currency);
//       // Limpiar o reestablecer los estados relevantes aquí, por ejemplo, filteredMovements y consolidatedData
//       setFilteredMovements([]);
//       setConsolidatedData({});
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('https://apiremesa.up.railway.app/movements');
//         const movementsData = response.data;
//         setMovements(movementsData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const currentDate = new Date().toISOString().split('T')[0];
//     const filtered = movements.filter((move) => {
//       return move.mov_date === currentDate && move.mov_currency === selectedCurrency;
//     });
//     setFilteredMovements(filtered);
//   }, [movements, selectedCurrency]);

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const getIngresosEgresos = async (date, accId, currency) => {
//     try {
//       let endpoint;

//       if (currency === 'EUR') {
//         endpoint = `https://apiremesa.up.railway.app/Movements/totaleur/${date}/${accId}`;
//       } else if (currency === 'GBP') {
//         endpoint = `https://apiremesa.up.railway.app/Movements/totalgbp/${date}/${accId}`;
//       } else if (currency === 'USD') {
//         endpoint = `https://apiremesa.up.railway.app/Movements/totalusd/${date}/${accId}`;
//       }

//       const response = await axios.get(endpoint);
//       const data = response.data;
//       const ingresos = data.totalIn;
//       const egresos = data.totalOut;
//       return { ingresos, egresos };
//     } catch (error) {
//       console.error(error);
//       return { ingresos: 0, egresos: 0 };
//     }
//   };

//   const consolidateByBankAndCurrency = async () => {
//     const consolidatedData = {};

//     for (const move of filteredMovements) {
//       const bankName = move.mov_currency === 'EUR' ? move.AccountsEur?.acceur_Bank :
//         move.mov_currency === 'GBP' ? move.AccountsGbp?.accgbp_Bank :
//         move.AccountsUsd?.accusd_Bank;
//       const currency = move.mov_currency;
//       const accId = move.mov_currency === 'EUR' ? move.AccountsEur?.acceur_id :
//         move.mov_currency === 'GBP' ? move.AccountsGbp?.accgbp_id :
//         move.AccountsUsd?.accusd_id;
//       const date = move.mov_date;

//       const { ingresos, egresos } = await getIngresosEgresos(date, accId, currency);

//       if (!consolidatedData[bankName]) {
//         consolidatedData[bankName] = {
//           bankName,
//           EUR: { ingresos: 0, egresos: 0 },
//           GBP: { ingresos: 0, egresos: 0 },
//           USD: { ingresos: 0, egresos: 0 },
//           date: date,
//         };
//       }

//       consolidatedData[bankName][currency].ingresos += ingresos;
//       consolidatedData[bankName][currency].egresos += egresos;
//     }

//     return consolidatedData;
//   };

//   useEffect(() => {
//     consolidateByBankAndCurrency().then((consolidatedData) => {
//       setConsolidatedData(consolidatedData);
//     });
//   }, [filteredMovements, selectedCurrency]);

//   return (
//     isAdmin ? (
//       <div>
//         <NavBar />
//         <div className='userContent'>
//           <h1 className='titleUser'>Relación</h1>
//           <div className="container">
//             <div className='row m-5 col-12'>
//               <div className='d-flex align-items-center col-12'>
//                 <Input
//                   type="text"
//                   className="form-control search-input"
//                   defaultValue={searchQuery}
//                   onChange={handleSearch}
//                   placeholder="Buscar Usuario..."
//                 />
//               </div>
//             </div>
//           </div>

//           <Nav tabs>
//             <NavItem>
//               <NavLink
//                 className={classnames({ active: selectedCurrency === 'EUR' })}
//                 onClick={() => toggleCurrency('EUR')}
//               >
//                 Euro
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 className={classnames({ active: selectedCurrency === 'GBP' })}
//                 onClick={() => toggleCurrency('GBP')}
//               >
//                 Libra
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink
//                 className={classnames({ active: selectedCurrency === 'USD' })}
//                 onClick={() => toggleCurrency('USD')}
//               >
//                 Dólar
//               </NavLink>
//             </NavItem>
//           </Nav>

//           <Table success bordered hover responsive striped className='userTable table-success'>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Banco</th>
//                 <th>Moneda</th>
//                 <th>Total Ingreso</th>
//                 <th>Total Egreso</th>
//                 <th>Total</th>
//                 <th>Fecha</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.keys(consolidatedData).map((bankName) => (
//                 <tr key={bankName}>
//                   <th scope="row">{bankName}</th>
//                   <td>{bankName}</td>
//                   <td>{selectedCurrency}</td>
//                   <td>{consolidatedData[bankName][selectedCurrency].ingresos}</td>
//                   <td>{consolidatedData[bankName][selectedCurrency].egresos}</td>
//                   <td>{consolidatedData[bankName][selectedCurrency].ingresos - consolidatedData[bankName][selectedCurrency].egresos}</td>
//                   <td>{consolidatedData[bankName].date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>
//       </div>
//     ) : (
//       <h1>Error404</h1>
//     )
//   );
// }

// export { Relation };
