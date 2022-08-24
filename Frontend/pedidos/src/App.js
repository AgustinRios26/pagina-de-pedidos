import React, {Fragment, useContext} from 'react';
import { Routes ,Route } from 'react-router-dom';

import Header from './components/layout/Header'
import Navegacion from './components/layout/Navegacion'

import Clients from './components/clients/Customers';
import NewCustomer from './components/clients/NewCustomer';
import UpdateCustomer from './components/clients/UpdateCustomer';

import Products from './components/products/Products';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';

import Orders from './components/orders/Orders';
import NewOrder from './components/orders/NewOrder';

import Login from './components/auth/Login';

import {AuthContext, AuthProvider} from './context/AuthContext'

function App() {

  const [auth, setAuth] =useContext(AuthContext)

  return(   
      <Fragment>
        <AuthProvider value={[auth, setAuth]}>
        <Header/>
        <div className="grid contenedor contenido-principal">
      
            <Navegacion/> 
         
            <main className="caja-contenido col-9">
            
           
            <Routes>
              <Route path="/" element={<Clients/>} />
              <Route path="/customer/new" element={<NewCustomer/>} />
              <Route path="/customer/edit/:id" element={<UpdateCustomer/>} />
              <Route path="/products" element={<Products/>} />
              <Route path="/product/new" element={<NewProduct/>} />
              <Route path="/product/edit/:id" element={<EditProduct/>} />
              <Route path="/order" element={<Orders/>} />
              <Route path="/order/new/:id" element={<NewOrder/>} />
              <Route path="/login" element={<Login/>} />
            </Routes>
            </main>
       </div>
       </AuthProvider>
      </Fragment>
    
  );
}

export default App;
