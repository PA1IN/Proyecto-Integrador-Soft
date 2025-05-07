import React,{SyntheticEvent, useState} from 'react';
import { useSubjects } from '../hooks/useSubjects';
//importar useCalendar cuando el calendario esté hecho 

export const Calendar = () => {
    const { data: subjects, isLoading: cargaCalendar, isError } = useSubjects();

    if (cargaCalendar) return <p>Cargando asignaturas...</p>;
    if (isError) return <p>Error al obtener asignaturas.</p>;//modificar lógica después

    return (
        <div>
            <h2>Asignaturas</h2>
            {subjects?.map((asignatura) => (
                <div key={asignatura.nrc}>
                    <p><strong>Nombre:</strong> {asignatura.nombre}</p>
                    <p><strong>Nivel:</strong> {asignatura.nivel}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}