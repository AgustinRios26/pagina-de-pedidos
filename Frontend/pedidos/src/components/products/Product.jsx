import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import productAxios from '../../config/axios';

export default function Product({product}) {
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
              productAxios.delete(`/products/${id}`)
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
    }

    const {_id, name, price, image } = product;

  return (
    <li className="producto">
            <div className="info-producto">
                <p className="nombre">{name}</p>
                <p className="precio">$ {price}</p>
                { image ? (
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="imagen" />
                ) : null  }
            </div>
            <div className="acciones">
                <Link to={`/product/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt fa-xl"></i>
                    Editar Producto
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarProducto(_id) }
                >
                    <i className="fas fa-times fa-xl"></i>
                    Eliminar Producto
                </button>
            </div>
        </li>
  )
}
