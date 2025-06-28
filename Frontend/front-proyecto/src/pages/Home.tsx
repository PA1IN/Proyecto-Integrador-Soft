import React from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

export const Home = () => {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();
    const { data: user, isLoading: cargauser, isError } = useUserProfile();
    
    if (!token) {
        navigate('/Login');
        return null;
    }
    
    const logout = () => {
        setToken(null);
        sessionStorage.removeItem('token');
        navigate('/Login');
    }

    if (cargauser) {
        return (
            <div className="home-container">
                <div className="home-content">
                    <div className="loading-message">Cargando...</div>
                </div>
            </div>
        );
    }
    
    if (isError) {
        setToken(null);
        navigate('/login');
        return null;
    }

    return (
        <div className="home-container">
            <div className="home-content">
                <h2 className="home-title">Bienvenido/a {user?.name}</h2>
                
                <div className="menu-buttons">
                    <button className="menu-button" onClick={() => navigate('/Calendar')}>
                        Armar calendario
                    </button>
                    <button className="menu-button" onClick={() => navigate('/Asignaturas')}>
                        Administrar Asignaturas
                    </button>
                    <button className="menu-button" onClick={() => navigate('/Profesores')}>
                        Administrar Profesores
                    </button>
                    <button className="menu-button" onClick={() => navigate('/Salas')}>
                        Administrar Salas
                    </button>
                    <button className="menu-button" onClick={() => navigate('/CalendariosDashboard')}>
                        Administrar calendarios
                    </button>
                </div>
                
                <button className="logout-button" onClick={logout}>
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default Home;