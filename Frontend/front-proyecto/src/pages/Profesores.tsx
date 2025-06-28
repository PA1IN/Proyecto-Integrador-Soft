import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useProfesores, useCrearProfesor, useEliminarProfe, useProfesoresCreados } from '../hooks/useProfesores';
import '../styles/Profesores.css';

export const Profesores = () => {
    const { token, setToken } = useAuth();
    const { data: user, isLoading: cargauser, isError } = useUserProfile();
    const navigate = useNavigate();
    const { data: profesores, isLoading: cargaProfes } = useProfesores();
    const { data: profesoresCreados, isLoading: cargaProfesCreados } = useProfesoresCreados();
    const eliminarProfe = useEliminarProfe();
    const crearProfesor = useCrearProfesor();
    const [name, setNombre] = useState('');

    if (!token) {
        navigate('/Login');
        return null;
    }

    if (cargauser || cargaProfes) {
        return (
            <div className="profesores-container">
                <div className="profesores-content">
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
        crearProfesor.mutate({ nombre: name, creado: true });
        setNombre('');
    };

    return (
        <div className="profesores-container">
            <div className="profesores-content">
                <h1 className="profesores-title">Menú de Profesores</h1>
                <button className="back-button" onClick={() => navigate('/Home')}>
                    Volver al menú principal
                </button>

                <h3 className="form-title">Agregar profesor:</h3>
                <form className="profesor-form" onSubmit={crear}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Nombre del profesor"
                        value={name}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <button className="submit-button" type="submit">
                        Agregar profesor
                    </button>
                </form>

                {cargaProfesCreados ? (
                    <p className="loading-message">Cargando profesores...</p>
                ) : (
                    <>
                        <h2 className="profesores-list-title">Tus profesores agregados:</h2>
                        {profesoresCreados?.length > 0 ? (
                            <ul className="profesores-list">
                                {profesoresCreados.map((profe: any) => (
                                    <li className="profesor-item" key={profe.id_profesor}>
                                        <span className="profesor-info">{profe.nombre}</span>
                                        <button
                                            className="delete-button"
                                            onClick={() => eliminarProfe.mutate(profe.id_profesor)}
                                        >
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-profesores">No hay profesores registrados</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};