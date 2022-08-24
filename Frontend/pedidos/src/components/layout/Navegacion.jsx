import React from 'react'
import { Link } from 'react-router-dom';

export default function Navegacion() {
  return (
    <aside className="sidebar col-3">
    <h2>Administración</h2>

    <nav className="navegacion">
        <Link to={"/"} className="clientes">Clientes</Link>
        <Link to={"/products"} className="productos">Productos</Link>
        <Link to={"/order"} className="pedidos">Pedidos</Link>
    </nav>
</aside>
  )
}
