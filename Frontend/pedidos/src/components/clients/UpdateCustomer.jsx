import React, { useState, useEffect} from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import customerAxios from '../../config/axios';

export default function UpdateCustomer() {
       const { id } = useParams();
       const navigate = useNavigate()
      
       const[customer, dataCustomer] = useState({
        name: '',
        surname: '',
        company : '',
        email: '',
        phone :''
    });
   
       const consultarAPI = async () => {
        const clienteConsulta = await customerAxios.get(`/customers/${id}`);
        dataCustomer(clienteConsulta.data);
      
       }
       
       useEffect( () => {
           consultarAPI();
       }, []);
   
       const updateState = e => {
           dataCustomer({
               ...customer, 
               [e.target.name] : e.target.value
           })
       }
   
       const actualizarCliente = e => {
           e.preventDefault();
            customerAxios.put(`/customers/${customer._id}`, customer) 
               .then(res => {
                   // validar si hay errores de mongo 
                   if(res.data.code === 11000) {
                       Swal.fire({
                           icon: 'error',
                           title: 'Hubo un error',
                           text: 'Ese cliente ya esta registrado'
                       })
                   } else {
                       Swal.fire(
                           'Correcto',
                           'Se actualizó Correctamente',
                           'success'
                       )
                   }
   
                  navigate('/');
               })
       }
   
       const validarCliente = () => {
        const { name, surname, email, company, phone} = customer;
          let valid = !name.length || !surname.length || !email.length || !company.length || !phone.length;
          return valid;
    }
  
  return (
    <>
    <h2>Editar Cliente</h2>
    
    <form
        onSubmit={actualizarCliente}
    >
        <legend>Llena todos los campos</legend>
        <div className="campo">
            <label>Nombre:</label>
            <input  type="text" 
                    placeholder="Nombre Cliente" 
                    name="name"
                    onChange={updateState}
                    value={customer.name}
            />
        </div>

        <div className="campo">
            <label>Apellido:</label>
            <input type="text" 
                  placeholder="Apellido Cliente" 
                  name="surname" 
                  onChange={updateState}
                  value={customer.surname}
            />
        </div>
    
        <div className="campo">
            <label>Empresa:</label>
            <input type="text" 
                  placeholder="Empresa Cliente" 
                  name="company" 
                  onChange={updateState}
                  value={customer.company}
            />
        </div>

        <div className="campo">
            <label>Email:</label>
            <input type="email" 
                    placeholder="Email Cliente" 
                    name="email" 
                    onChange={updateState}
                    value={customer.email}
            />
        </div>

        <div className="campo">
            <label>Teléfono:</label>
            <input type="tel" 
                placeholder="Teléfono Cliente" 
                name="phone" 
                onChange={updateState}
                value={customer.phone}
            />
        </div>

        <div className="enviar">
            <input 
                type="submit" 
                className="btn btn-azul" 
                value="Guardar Cambios" 
                disabled={ validarCliente() }
            />
        </div>
    </form>
</>
  )
}
