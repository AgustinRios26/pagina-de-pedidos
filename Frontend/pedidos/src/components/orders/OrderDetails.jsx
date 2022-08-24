import React from 'react'
import Swal from 'sweetalert2';
import orderAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom'



export default function OrderDetails({order}) {
    const {customer} = order;
    const {_id} = order;
    const navigate = useNavigate()

    const eliminarProducto = id => {

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Una vez eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText : 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
              orderAxios.delete(`/orders/${id}`)
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Eliminado',
                            res.data.message,
                            'success'
                        )
                    }
                })
            }
        })
        navigate('/order')

    }

  

  return (
    <>
    <li className="pedido">
        <div className="info-pedido">
            <p className="id">ID: {customer._id}</p>
            <p className="nombre">Cliente: {customer.name} {customer.surname}</p>

            <div className="articulos-pedido">
                <p className="productos">Artículos Pedido: </p>
                <ul>
                   { order.order.map(articulos => (
                        <li 
                        key={order._id+articulos.product._id}
                        >
                            <p>{articulos.product.name}</p>
                            <p>Precio: ${articulos.product.price}</p>
                            <p>Cantidad: {articulos.amount}</p>
                        </li>

                   ))}
                </ul>
            </div>
            <p className="total">Total: {order.total} </p>
        </div>
        <div className="acciones">
            <button type="button" 
            className="btn btn-rojo btn-eliminar"
            onClick={() => eliminarProducto(_id)} >
                <i className="fas fa-times fa-2xl"></i>
                Eliminar Pedido
            </button>
        </div>
    </li>
</>
  )
}
