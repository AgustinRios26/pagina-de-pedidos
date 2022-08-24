import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormSearchProduct from './FormSearchProduct';
import FormQuantityProduct from './FormQuantityProduct';
import Swal from 'sweetalert2';
import orderAxios from '../../config/axios';

export default function NewOrder() {
    
    const { id } = useParams();
    const navigate = useNavigate()
    const [customer, setCustomer] = useState({});
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const consultarAPI = async () => {
        const resultado = await orderAxios.get(`/customers/${id}`);
        setCustomer(resultado.data);
           
    }

        consultarAPI();
        actualizarTotal();

    }, [products]);

    const searchProduct = async e => {
        e.preventDefault();
        const resultadoBusqueda = await orderAxios.post(`/products/search/${search}`);

        if(resultadoBusqueda.data[0]) {

            let productoResultado = resultadoBusqueda.data[0];
            productoResultado.product = resultadoBusqueda.data[0]._id;
            productoResultado.amount = 0;
            setProducts([...products, productoResultado]);

        } else {
            Swal.fire({
                icon: 'error',
                title: 'No Resultados',
                text: 'No hay resultados'
            })
        }
    }

    const readSearchData = e => {
        setSearch(e.target.value);
    }

    const restarProductos = i => {
        const todosProductos = [...products];
        if(todosProductos[i].amount === 0) return;
        todosProductos[i].amount--;
        setProducts(todosProductos);
    }

    const aumentarProductos = i => {
       const todosProductos = [...products];
       todosProductos[i].amount++;
       setProducts(todosProductos);
    }

    const eliminarProductoPedido = id => {
        const todosProductos = products.filter(product => product.product !== id );
        setProducts(todosProductos)
    }

    const actualizarTotal = () => {
        if(products.length === 0) {
            setTotal(0);
            return;
        }
        let nuevoTotal = 0;
        products.map(product => nuevoTotal += (product.amount * product.price)  );
        setTotal(nuevoTotal);
    }

    const realizarPedido = async e => {
        e.preventDefault();

        const pedido = {
            "customer" : id, 
            "order" : products, 
            "total" : total
        }
        const resultado = await orderAxios.post(`/orders/new/${id}`, pedido);
        if(resultado.status === 200) {
            Swal.fire({
                icon: 'success',
                title: 'Correcto',
                text: resultado.data.message
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Hubo un Error',
                text: 'Vuelva a intentarlo'
            })
        }

        navigate('/order');

    }
  return (
    <>
    <h2>Nuevo Pedido</h2>

        <div className="ficha-cliente">
            <h3>Datos de Cliente</h3>
            <p>Nombre: {customer.name} {customer.surname}</p>
            <p>Teléfono: {customer.phone}</p>
        </div>

        <FormSearchProduct 
            searchProduct={searchProduct}
            readSearchData={readSearchData}
        />

        <ul className="resumen">
            {products.map((product, index) => (
                <FormQuantityProduct 
                    key={product.product}
                    product={product}
                    restarProductos={restarProductos}
                    aumentarProductos={aumentarProductos}
                    eliminarProductoPedido={eliminarProductoPedido}
                    index={index}
                />
            ))}

        </ul>

        
        <p className="total">Total a Pagar: <span>$ {total}</span> </p>


        { total > 0 ? (
            <form
                onSubmit={realizarPedido}
            >
                <input type="submit"
                      className="btn btn-verde btn-block"
                      value="Realizar Pedido" />
            </form>
        ) : null }
</>
  )
}
