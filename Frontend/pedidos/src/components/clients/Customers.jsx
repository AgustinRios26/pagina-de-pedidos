import React, { useEffect, useState, useContext } from 'react'
import Customer from './Customer';
import {Link, useNavigate } from 'react-router-dom'
import  Spinner  from '../layout/Spinner';
import customerAxios from '../../config/axios';
import { AuthContext } from '../../context/AuthContext'


export default function Clients() {
    const [customers, saveCustomers] = useState([]);
    const navigate = useNavigate()

    const [auth, setAuth] = useContext(AuthContext)
    
    const consultarAPI = async () => {
        try {
        const getCustomers = await customerAxios.get('/customers', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
        });
        saveCustomers(getCustomers.data);
    } catch(error){
        if (error.response.status === 500) {
            navigate('/login')
          }
    }
}
    
    useEffect(() => {
        if (auth.token !== '') {

        consultarAPI();}
        else {
            navigate('/login')
        }
    }, [customers]);

        if (!customers.length) return <Spinner />


  return (
    
    <div className='.caja-contenido'>
       <h2>Clientes</h2>

    <Link to={"/customer/new"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle fa-2xl"></i>
        Nuevo Cliente
    </Link>

    <ul className="listado-clientes">
 
        {customers.map(customer => (
            <Customer
                key={customer._id}
                customer={customer} />     
        ))}
    </ul></div>
  
  )
}
