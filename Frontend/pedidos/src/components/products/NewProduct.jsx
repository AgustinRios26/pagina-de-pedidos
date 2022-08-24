import React, {useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

export default function NewProduct() {
      const navigate = useNavigate()
      const [product, setProduct] = useState({
        name: '',
        price: ''
    });
    const [file, setFile] = useState('');
    const agregarProducto = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await clienteAxios.post('/products', formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            if(res.status === 200) {
                Swal.fire(
                    'Agregado Correctamente',
                    res.data.message,
                    'success'
                )
            }

            navigate('/products');

        } catch (error) {
            Swal.fire({
                icon:'error',
                title: 'Hubo un error',
                text: 'Vuelva a intentarlo'
            })
        }
    }

    const leerInformacionProducto = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const leerArchivo = e => {
        setFile( e.target.files[0] );
    }


  return (
    <>
    <h2>Nuevo Producto</h2>

    <form
        onSubmit={agregarProducto}
    >
        <legend>Llena todos los campos</legend>

        <div className="campo">
            <label>Nombre:</label>
            <input 
                type="text" 
                placeholder="Nombre Producto" 
                name="name"
                onChange={leerInformacionProducto}
            />
        </div>

        <div className="campo">
            <label>Precio:</label>
            <input 
                type="number" 
                name="price" 
                min="0.00" 
                step="1" 
                placeholder="Precio"
                onChange={leerInformacionProducto}
            />
        </div>

        <div className="campo">
            <label>Imagen:</label>
            <input 
                type="file"  
                name="image"
                onChange={leerArchivo}
            />
        </div>

        <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
    </form>
</>
  )
}
