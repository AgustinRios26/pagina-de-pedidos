import React from 'react'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2';
import customerAxios from '../../config/axios';

export default function Customer({customer}) {

    const { _id, name, surname, company, email, phone } = customer;

	const eliminarCliente = idCustomer => {
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un cliente eliminado no se puede recuperar",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.value) {
                customerAxios.delete(`/customers/${idCustomer}`)
                    .then(res => {
                        Swal.fire(  
                            'Eliminado', 
                            res.data.message, 
                            'success'
                        );
                    });
                    
			}
		});
	};


  return (
    <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{name} {surname}</p>
                <p className="empresa">{company}</p>
                <p>{email}</p>
                <p>{phone}</p>
            </div>
            <div className="acciones">
                <Link to={`/customer/edit/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt fa-xl"></i>
                            Editar Cliente
                </Link>
                <Link to={`/order/new/${_id}`} className="btn btn-amarillo">
					<i className="fas fa-plus fa-xl" />
					Nuevo Pedido
				</Link>
                <button
                    type="button"
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => eliminarCliente(_id)}
                >
                    <i className="fas fa-times fa-xl"></i>
                            Eliminar Cliente
                </button>
            </div>
        </li>
  )
}
