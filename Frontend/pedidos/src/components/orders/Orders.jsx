import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderDetails from './OrderDetails'
import { AuthContext } from '../../context/AuthContext'
import orderAxios from '../../config/axios'

export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);


  useEffect(() => {

    if (auth.token !== '') {
    const consultarAPi = async () => {
      try{
      const resultado = await orderAxios.get('/orders', {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
    });
      setOrders(resultado.data);
    } catch(error) {
      if(error.response.status = 500) {
        navigate('/login');
        }
    }
  }
    consultarAPi();
    } else {
      navigate('/login')
    }

  }, [orders]);


  return (
    <>
    <h2>Pedidos</h2>

    <ul className="listado-pedidos">
      {orders.map(order => (
        <OrderDetails
          key={order._id}
          order={order}
        />  
      ))}

    </ul>
  </>
  )
}
