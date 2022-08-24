import React, {useState, useEffect, Fragment} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import Spinner from '../layout/Spinner';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [ product, setProduct ] = useState({
        name: '',
        price: '',
        image : ''
    });

    const [file, setFile] = useState('');

    useEffect(() => {
        const consultarAPI = async () => {
        const productoConsulta = await clienteAxios.get(`/products/${id}`);
        setProduct(productoConsulta.data);
        }

        consultarAPI();
    }, [])

    const editarProducto = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', file);

        try {
            const res = await clienteAxios.put(`/products/${id}`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            } );

            if(res.status === 200) {
                Swal.fire(
                    'Editado Correctamente',
                    res.data.mensaje,
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

    // extraer los valores del state
    const { name, price, image } = product;

    if(!name) return <Spinner />
    
  return (
    <Fragment>
            <h2>Editar Producto</h2>

            <form
                onSubmit={editarProducto}
            >
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        placeholder="Nombre Producto" 
                        name="name"
                        onChange={leerInformacionProducto}
                        defaultValue={name}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input 
                        type="number" 
                        name="price" 
                        min="0.00" 
                        step="0.01" 
                        placeholder="Precio"
                        onChange={leerInformacionProducto}
                        defaultValue={price}
                    />
                </div>

                <div className="campo">
                    <label>Imagen:</label>
                    { image ? (
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${image}`} alt="imagen" width="300" />
                    ) : null }
                    <input 
                        type="file"  
                        name="imagen"
                        onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" className="btn btn-azul" value="Editar Producto" />
                </div>
            </form>
        </Fragment>
  )
}
