import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useCalendarios } from '../hooks/useCalendarios';

export const CalendariosDashboard = () => {
    const {token, setToken} = useAuth();
    const navigate = useNavigate();
    const {data: user, isLoading: cargandoUser, isError} = useUserProfile();
    const {data: calendarios, isLoading: cargandoCalendarios} = useCalendarios();

    if(!token){
        navigate('/Login');
        return null;
    }

    if(cargandoUser){
        return <div>Cargando Usuario...</div>;
    }

    if(isError){
        setToken(null);
        navigate('/Login');
        return null;
    }

    return (
        <div>
            <h1>Calendarios creados</h1>

            {cargandoCalendarios ? (
                <p>Cargando los calendarios creados...</p>
            ):(
                <>
                    {calendarios?.length > 0 ? (
                        <ul>
                            {calendarios.map((cal:any) => (
                                <li key={cal.id}>
                                    <strong>{cal.nombre}</strong> - Creado el: {cal.fecha_creacion}
                                    <br />
                                    <button onClick={() => window.open(`/calendar/${cal.id_calendario}`,'_blank')}> Ver Calendario </button>
                                    <p>---------</p>
                                </li>
                            ))}
                        </ul>
                    ):(
                        <p>No hay calendarios disponibles</p>
                    )}
                </>
            )}

            <button onClick={()=> navigate('/Home')}>Volver al menu principal</button>
        </div> 
    );
};