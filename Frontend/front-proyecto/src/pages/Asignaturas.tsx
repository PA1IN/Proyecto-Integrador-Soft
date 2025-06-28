import React, { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { Carrera, useAsignaturas, useAsignaturasCreadas, useCrearAsignatura, useEliminarAsignatura, useCarreras } from '../hooks/useAsignaturas';
import '../styles/Asignaturas.css';

export const Asignaturas = () => {
    const { token, setToken } = useAuth();
    const { data: user, isLoading: cargauser, isError } = useUserProfile();
    const navigate = useNavigate();
    const { data: asignaturas, isLoading: cargaAsignaturas } = useAsignaturas();
    const { data: carreras, isLoading: cargaCarreras } = useCarreras();
    const [carrera, setCarrera] = useState('');
    const { data: asignaturasCreadas, isLoading: cargaAsignaturasCreadas } = useAsignaturasCreadas();
    const eliminarAsignatura = useEliminarAsignatura();
    const crearAsignatura = useCrearAsignatura();

    const [codigoNrc, setNrc] = useState('');
    const [niv, setNivel] = useState('');
    const [name, setNombre] = useState('');

    if (!token) {
        navigate('/Login');
        return null;
    }

    if (cargauser || cargaCarreras) {
        return (
            <div className="asignaturas-container">
                <div className="asignaturas-content">
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
        crearAsignatura.mutate({ nrc: codigoNrc, nivel: Number(niv), nombre: name, creado: true, id_carrera: Number(carrera) });
        setNombre('');
        setNivel('');
        setNrc('');
        setCarrera('');
    };

    return (
        <div className="asignaturas-container">
            <div className="asignaturas-content">
                <h1 className="asignaturas-title">Menú de Asignaturas</h1>
                <button className="back-button" onClick={() => navigate('/Home')}>
                    Volver al menú principal
                </button>

                <h3 className="form-title">Agregar Asignatura:</h3>
                <form className="asignatura-form" onSubmit={crear}>
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Nombre de la asignatura"
                        value={name}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="number"
                        placeholder="Número de semestre (ej: 4)"
                        value={niv}
                        onChange={(e) => setNivel(e.target.value)}
                        required
                    />
                    <input
                        className="form-input"
                        type="text"
                        placeholder="NRC de la asignatura"
                        value={codigoNrc}
                        onChange={(e) => setNrc(e.target.value)}
                        required
                    />
                    <select
                        className="form-select"
                        value={carrera}
                        onChange={(e) => setCarrera(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una carrera</option>
                        {carreras?.map((carreraItem: any) => (
                            <option key={carreraItem.id} value={carreraItem.id}>
                                {carreraItem.nombre}
                            </option>
                        ))}
                    </select>
                    <button className="submit-button" type="submit" disabled={!carrera}>
                        Agregar asignatura
                    </button>
                </form>

                {cargaAsignaturasCreadas ? (
                    <p className="loading-message">Cargando tus asignaturas...</p>
                ) : (
                    <>
                        <h2 className="asignaturas-list-title">Tus asignaturas agregadas:</h2>
                        {asignaturasCreadas?.length > 0 ? (
                            <ul className="asignaturas-list">
                                {asignaturasCreadas.map((ac: any) => (
                                    <li className="asignatura-item" key={ac.id_asignatura}>
                                        <div className="asignatura-info">
                                            <p><strong>NRC:</strong> {ac.nrc}</p>
                                            <p><strong>Nombre:</strong> {ac.nombre}</p>
                                            <p><strong>Carrera:</strong> {carreras?.find((c: Carrera) => c.id === ac.id_carrera)?.nombre}</p>
                                            <p><strong>Semestre:</strong> {ac.nivel}</p>
                                        </div>
                                        <button
                                            className="delete-button"
                                            onClick={() => eliminarAsignatura.mutate({ id: ac.id_asignatura })}
                                        >
                                            Eliminar asignatura
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="no-asignaturas">No creaste ninguna asignatura.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};