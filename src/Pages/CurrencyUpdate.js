import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Input,
  InputGroup
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { useDataContext } from '../Context/dataContext';
import { NavBar } from '../Components/NavBar';
import { NotFound404 } from './NotFound404';
import Spain from '../Assets/Images/spain.png'
import Uk from '../Assets/Images/uk.png'
import Usa from '../Assets/Images/usa.png'
import Venezuela from '../Assets/Images/venezuela.png'
import { Footer } from '../Components/Footer';


function CurrencyUpdate() {
  const { isAdmin } = useDataContext();

  const [currencyPrice, setCurrencyPrice] = useState([]);

  const [formData, setFormData] = useState({
    cur_EurToBs: '',
    cur_EurToUsd: '',
    cur_GbpToBs: '',
    cur_GbpToUsd: '',
    cur_UsdToBs: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://apiremesa.up.railway.app/CurrencyPrice');
      setCurrencyPrice(response.data);
      // Set default values from the database
      setFormData(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async event => {
    event.preventDefault();

    try {
      await axios.put(
        `https://apiremesa.up.railway.app/CurrencyPrice/1`,
        formData // Send the entire formData
      );

      fetchData();
      toast.success('¡Datos cambiados con éxito!', {
        position: 'bottom-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    // Update the formData state with the modified input value
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    isAdmin ? (
      <div>
        <NavBar />

        <div className='currencyContainer'>
        {/* Cambios */}

        <div className='currency'>
          {currencyPrice.map((coin) => {
            return (
            <div className="input-group-container">
              <InputGroup className='Change-Input1'>
                <Button>
                  <img src={Spain} width={45} alt='Spain' />
                </Button>
                <Input
                  name="cur_EurToBs"
                  value={formData.cur_EurToBs}
                  className='centered-input'
                  onChange={handleInputChange}
                />
                <Button >
                  Bs <img src={Venezuela} alt='Venezuela' width={45} />
                </Button>
              </InputGroup>

              <InputGroup className='Change-Input1'>
                <Button>
                  <img src={Uk} width={45} alt='Spain' />
                </Button>
                <Input
                  name="cur_GbpToBs"
                  value={formData.cur_GbpToBs}
                  className='centered-input'
                  onChange={handleInputChange}
                />
                <Button >
                  Bs <img src={Venezuela} alt='Venezuela' width={45} />
                </Button>
              </InputGroup>

              <InputGroup className='Change-Input1'>
                <Button>
                  <img src={Usa} width={45} alt='Spain' />
                </Button>
                <Input
                  name="cur_UsdToBs"
                  value={formData.cur_UsdToBs}
                  className='centered-input'
                  onChange={handleInputChange}
                />
                <Button >
                  Bs <img src={Venezuela} alt='Venezuela' width={45} />
                </Button>
              </InputGroup>

              <InputGroup className='Change-Input1'>
                <Button>
                  <img src={Uk} width={45} alt='Spain' />
                </Button>
                <Input
                  name="cur_GbpToUsd"
                  value={formData.cur_GbpToUsd}
                  className='centered-input'
                  onChange={handleInputChange}
                />
                <Button >
                  Bs <img src={Usa} alt='Venezuela' width={45} />
                </Button>
              </InputGroup>

              <InputGroup className='Change-Input1'>
                <Button>
                  <img src={Spain} width={45} alt='Spain' />
                </Button>
                <Input
                  name="cur_EurToUsd"
                  value={formData.cur_EurToUsd}
                  className='centered-input'
                  onChange={handleInputChange}
                />
                <Button >
                  Bs <img src={Usa} alt='USA' width={45} />
                </Button>

                
              </InputGroup>

              
            </div>
            )
          })}
<Button clasName='update-button' style={{ width: '200px', height: '200px', margin: 'auto'}} color='success' onClick={handleEdit}>
                Actualizar
              </Button>
          <ToastContainer />
          
        </div>
        
      </div>
      <Footer/>
      </div>
       
    ) 
      : <NotFound404 />
  )
}

export { CurrencyUpdate }