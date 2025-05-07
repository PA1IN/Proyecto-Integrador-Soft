import React,{SyntheticEvent, useState} from 'react'; //hooks pa usarlo en combinacion con useCalendar (hooks pa las asignaturas a modificar)
import { useSubjects } from '../hooks/useSubjects';
//importar useCalendar cuando el calendario esté hecho 

export const Calendar = () => {
    const { data: subjects, isLoading: cargaCalendar, isError } = useSubjects();

    if (isError) return <p>Error al obtener asignaturas.</p>;//modificar lógica después

    return (
        <div>
            <h2>Asignaturas</h2>
            {cargaCalendar? (
                <p>Cargando asignaturas...</p>
            ):(
            <>
                <h3>Asignaturas definidas</h3>
                {subjects?.length > 0 ? (
                    <ul>
                        {subjects?.map((asignatura:any) => (
                            <li key = {asignatura.nrc}>
                                <p><strong>Nombre: </strong>{asignatura.nombre}</p> - <p><strong>Nivel: </strong>{asignatura.nivel}</p>
                            </li>
                        ))}
                    </ul>
                ):(<p>Aun no hay asignaturas definidas</p>)
                }
            </>   
            )}   
        </div>
    );
};


/*{subjects?.map((asignatura) => (
    <div key={asignatura.nrc}>
        <p><strong>Nombre:</strong> {asignatura.nombre}</p>
        <p><strong>Nivel:</strong> {asignatura.nivel}</p>
        <hr />
    </div>
))}*/