import React, { useState, useContext } from 'react'
import authAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({})

    const [auth, setAuth] = useContext(AuthContext);

    const login = async e => {

        e.preventDefault();
        
        try{
            const response = await authAxios.post('/login', credentials);
            
            // Guardar token en localstorage
            const {token} = response.data;
            localStorage.setItem('token', token);
            setAuth({
                token,
                auth: true
            });
            Swal.fire('Bienvenido', 'Has iniciado sesión correctamente', 'success');

            navigate('/');

        }catch(error){
            if(error.response){
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: error.response.data.message   
               })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Hubo un error',
                    text: 'Ocurrió un error inesperado'  
                });

            }
        }
    }
    const readData = (e) => {

        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
         
    }

  return (
    <>
    <div className='login'>
        <h2>Iniciar Sesión</h2>

        <div className='contenedor-formulario'>
            <form
                onSubmit={login}
            >
                <div className='campo'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email para Iniciar Sesión'
                        required
                        onChange={readData}
                    />
                </div>

                <div className='campo'>
                    <label>Password</label>
                    <input
                        type='password'
                        name='password'
                        placeholder='Ingresa tu contraseña'
                        required
                        onChange={readData}
                    />
                </div>
                <input
                    type='submit'
                    value='Iniciar Sesión'
                    className='btn btn-verde btn-block'
                />
            </form>
        </div>
    </div> 
</>
  )
}
