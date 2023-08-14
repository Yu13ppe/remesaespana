import React from 'react'
import { useLocation } from "react-router-dom";

function Profile() {
  const location = useLocation();

  return (
    <div>
    { location.state?.verif === 's'?
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Perfil</h5>
          <h6 className="card-subtitle mb-2 text-muted">Nombre: {location.state?.name}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Correo: {location.state?.mail}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Saldo: {location.state?.amount}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Verificado: {location.state?.verif}</h6>
        </div>
      </div>
      :
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Perfil</h5>
          <h6 className="card-subtitle mb-2 text-muted">Nombre: {location.state?.name}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Correo: {location.state?.mail}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Saldo: {location.state?.amount}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Verificado: {location.state?.verif}</h6>
          <h6 className="card-subtitle mb-2 text-muted">Verificación pendiente</h6>
        </div>
      </div>
  }
    </div>
  )
}

export {Profile}