import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, ModalBody, ModalFooter, ModalHeader, Input } from 'reactstrap'
import axios from 'axios'
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai'

function Movements() {
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
          const response = await axios.get('https://apiremesa.up.railway.app/movements');
          setUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>

    </div>
  )
}

export {Movements}