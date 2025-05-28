import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import {useNavigate} from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export const Home = () => {
    const {token, setToken} = useAuth();
    const navigate = useNavigate();
    const { data: user, isLoading: cargauser, isError} = useUserProfile();
    

    if(!token)
    {
        navigate('/Login');
        return null;
    }
    
    const logout = () => {
        setToken(null);
        sessionStorage.removeItem('token');
        navigate('/Login');
    }


    if(cargauser)
    {
        return <div> Cargando... </div>;
    }
    
    if(isError)
    {
        setToken(null);
        navigate('/login');
        return null;
    }

    return (
    <div> 
        <h2> Bienvenido: {user?.name}, tu correo es: {user?.correo} </h2>
        <button onClick={()=> navigate('/Calendar')}>Armar calendario</button>
        <button onClick={()=> navigate('/Asignaturas')}>Administrar Asignaturas en el sistema</button>
        <button onClick={()=> navigate('/Profesores')}>Administrar Profesores en el sistema</button>
        <button onClick={()=> navigate('/Salas')}>Administrar Salas en el sistema</button>

        <button onClick={logout}>Cerrar la sesion</button>
    </div>
    );
    
};

export default Home;