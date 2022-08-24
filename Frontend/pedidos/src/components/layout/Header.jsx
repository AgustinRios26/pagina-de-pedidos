import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'

export default function Header() {
  const navigate = useNavigate();
    const [auth, setAuth] = useContext(AuthContext);

    const logout = () => {
        setAuth({
            token: '',
            auth: false,
        });
        localStorage.setItem('token', '');
        navigate('/login');
    }

  return (
    <header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
                <h1>Administrador de Clientes</h1>
                {auth.auth ? (
                            <button 
                                className='btn btn-rojo' 
                                type='button'
                                onClick={logout}
                            >
                                <i className='far fa-times-circle fa-2xl '></i>
                                Cerrar Sesion
                            </button>


                        ) : null}
            </div>
        </div>
    </header>
  )
}
