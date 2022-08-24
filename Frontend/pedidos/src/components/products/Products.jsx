import React, {useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productAxios from '../../config/axios';
import Product from './Product';
import Spinner from '../layout/Spinner';
import { AuthContext } from '../../context/AuthContext';

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [auth, setAuth ] = useContext( AuthContext );

  useEffect( () => {

      if(auth.token !== '') {
          const consultarAPI = async () => {
              try {
                  const productosConsulta = await productAxios.get('/products'
                  , {
                      headers: {
                          Authorization : `Bearer ${auth.token}`
                      }
                  }
                  );
                  setProducts(productosConsulta.data);
              } catch (error) {
                  if(error.response.status = 500) {
                      navigate('/login');
                  }
              }
          }

          consultarAPI();

      } else {
          navigate('/login');
      }
  }, [products]);

  if(!auth.auth) {
      navigate('/iniciar-sesion');
  }

  if(!products.length) return <Spinner />

  return (
    <>
    <h2>Productos</h2>

    <Link to={'/product/new'} className="btn btn-verde nvo-cliente"> 
        <i className="fas fa-plus-circle fa-2xl"></i>
        Nuevo Producto
    </Link>

    <ul className="listado-productos">
        {products.map(product => (
            <Product 
                key={product._id}
                product={product}
            />
        ))}
    </ul>
</>
  )
}
