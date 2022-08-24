import React, { useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import customerAxios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext';

export default function NewClient() {
    const navigate = useNavigate()

  const [auth, setAuth ] = useContext( AuthContext );

  const[customers, saveCustomers] = useState({
      name: '',
      surname: '',
      company : '',
      email: '',
      phone :''
  });

  const updateState = e => {
      saveCustomers({
          ...customers, 
          [e.target.name] : e.target.value
      })

  }

  const addCustomer = e => {
      e.preventDefault();

      customerAxios.post('/customers', customers)
          .then(res => {
              if(res.data.code === 11000) {
                  Swal.fire({
                      icon: 'error',
                      title: 'Hubo un error',
                      text: 'Ese cliente ya esta registrado'
                  })
              } else {
                  Swal.fire(
                      'Se agregó el Cliente',
                      res.data.message,
                      'success'
                  )
              }
              navigate('/');
          });
  }

  const validarCliente = () => {
      const { name, surname, email, company, phone} = customers;
      let valid = !name.length || !surname.length || !email.length || !company.length || !phone.length;
      return valid;
  }

  if(!auth.auth && (localStorage.getItem('token') === auth.token ) ) {
      navigate('/login');
  }


  return (
      <>
          <h2>Nuevo Cliente</h2>
          
          <form
              onSubmit={addCustomer}
          >
              <legend>Llena todos los campos</legend>
              <div className="campo">
                  <label>Nombre:</label>
                  <input  type="text" 
                          placeholder="Nombre Cliente" 
                          name="name"
                          onChange={updateState}
                  />
              </div>

              <div className="campo">
                  <label>Apellido:</label>
                  <input type="text" 
                        placeholder="Apellido Cliente" 
                        name="surname" 
                        onChange={updateState}
                  />
              </div>
          
              <div className="campo">
                  <label>Empresa:</label>
                  <input type="text" 
                        placeholder="Empresa Cliente" 
                        name="company" 
                        onChange={updateState}
                  />
              </div>

              <div className="campo">
                  <label>Email:</label>
                  <input type="email" 
                          placeholder="Email Cliente" 
                          name="email" 
                          onChange={updateState}
                  />
              </div>

              <div className="campo">
                  <label>Teléfono:</label>
                  <input type="tel" 
                      placeholder="Teléfono Cliente" 
                      name="phone" 
                      onChange={updateState}
                  />
              </div>

              <div className="enviar">
                  <input 
                      type="submit" 
                      className="btn btn-azul" 
                      value="Agregar Cliente" 
                      disabled={ validarCliente() }
                  />
              </div>
          </form>
      </>
  )
}
