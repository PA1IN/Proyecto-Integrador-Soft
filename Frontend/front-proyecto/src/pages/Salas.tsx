import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useSalas, useCrearSala, useEliminarSala, useSalasCreadas } from '../hooks/useSalas';
import '../styles/Salas.css';

export const Salas = () => {
    const { token, setToken } = useAuth();
    const { data: user, isLoading: cargauser, isError } = useUserProfile();
    const navigate = useNavigate();
    const { data: salas, isLoading: cargaSalas } = useSalas();
    const { data: salasCreadas, isLoading: cargaSalasCreadas } = useSalasCreadas();
    const eliminarSala = useEliminarSala();
    const crearSala = useCrearSala();
    const [name, setNombre] = useState('');

    if (!token) {
        navigate('/Login');
        return null;
    }

    if (cargauser || cargaSalas) {
        return (
            <div className="salas-container">
                <div className="salas-content">
                    <div className="loading-message">Cargando...</div>
                </div>
            </div>
        );
    }

    if (isError) {
        setToken(null);
        navigate('/Login');
        return null;
    }

    const crear = (e: SyntheticEvent) => {
        e.preventDefault();
        crearSala.mutate({ nombre: name });
        setNombre('');
    };

    return (
        <div className="salas-container">
            <div className="salas-content">
                <h1 className="salas-title">Menú de Salas</h1>
                <button className="back-button" onClick={() => navigate('/Home')}>
                    Volver al menú principal
                </button>

                <h3 className="form-title">Agregar sala:</h3>
                <form className="sala-form" onSubmit={crear}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Número de la sala (ej: 29)"
                        value={name}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <button className="submit-button" type="submit">
                        Agregar sala
                    </button>
                </form>

                {cargaSalasCreadas ? (
                    <p className="loading-message">Cargando salas...</p>
                ) : (
                    <>
                        <h2 className="salas-list-title">Tus salas agregadas:</h2>
                        {salasCreadas?.length > 0 ? (
                            <ul className="salas-list">
                                {salasCreadas.map((sala: any) => (
                                    <li className="sala-item" key={sala.id_sala}>
                                        <span className="sala-info">Sala {sala.nombre}</span>
                                        <button
                                            className="delete-button"
                                            onClick={() => eliminarSala.mutate(sala.id_sala)}
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-salas">No hay salas creadas por ti</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};