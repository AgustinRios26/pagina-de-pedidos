import React from 'react'

export default function FormQuantityProduct(props) {
    const {product, restarProductos, aumentarProductos, eliminarProductoPedido,  index } = props;
   

  return (
    <li>
    <div className="texto-producto">
        <p className="nombre">{product.name}</p>
        <p className="precio">$ {product.price}</p>
    </div>
    <div className="acciones">
        <div className="contenedor-cantidad">
            <i 
                className="fas fa-minus fa-xl"
                onClick={() => restarProductos(index) }
            ></i>

            <p>{product.amount}</p>

            <i 
                className="fas fa-plus fa-xl"
                onClick={() => aumentarProductos(index) }
            ></i>
        </div>
        <button 
            type="button" 
            className="btn btn-rojo"
            onClick={() => eliminarProductoPedido(product._id)}
        >
            <i className="fas fa-minus-circle fa-2xl"></i>
                Eliminar Producto
        </button>
    </div>
</li>
  )
}
