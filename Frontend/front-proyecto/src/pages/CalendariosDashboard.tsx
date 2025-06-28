import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useCalendarios } from '../hooks/useCalendarios';
import '../styles/CalendariosDashboard.css';

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
        return (
            <div className="calendarios-container">
                <div className="calendarios-content">
                    <div className="loading-message">Cargando Usuario...</div>
                </div>
            </div>
        );
    }

    if(isError){
        setToken(null);
        navigate('/Login');
        return null;
    }

    const handleViewCalendar = (calendarioId: string) => {
        localStorage.setItem("carga_calendario_id", calendarioId);
        window.open(`/Calendar/${calendarioId}`, '_blank');
    };

    return (
        <div className="calendarios-container">
            <div className="calendarios-content">
                <h1 className="calendarios-title">Calendarios creados</h1>
                <button 
                    className="back-button" 
                    onClick={() => navigate('/Home')}
                >
                    Volver al menú principal
                </button>

                {cargandoCalendarios ? (
                    <p className="loading-message">Cargando los calendarios creados...</p>
                ):(
                    <>
                        {calendarios?.length > 0 ? (
                            <ul className="calendarios-list">
                                {calendarios.map((cal:any) => (
                                    <li className="calendario-item" key={cal.id}>
                                        <div className="calendario-header">
                                            <span className="calendario-name">{cal.nombre}</span>
                                            <span className="calendario-date">Creado el: {cal.fecha_creacion.split('T')[0]}</span>
                                        </div>
                                        <button 
                                            className="view-button"
                                            onClick={() => handleViewCalendar(cal.id)}
                                        >
                                            Ver Calendario
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ):(
                            <p className="no-calendarios">No hay calendarios disponibles</p>
                        )}
                    </>
                )}
            </div>
        </div> 
    );
};