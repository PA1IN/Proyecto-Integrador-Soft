import React,{SyntheticEvent, useState} from 'react'; //hooks pa usarlo en combinacion con useCalendar (hooks pa las asignaturas a modificar)
import { useSubjects } from '../hooks/useSubjects';
import '../styles/calendar.css'
//importar useCalendar cuando el calendario esté hecho 

export const Calendar = () => {
    const { data: subjects, isLoading: cargaCalendar, isError } = useSubjects();

    if (isError) return <p>Error al obtener asignaturas.</p>;//modificar lógica después

    return (
        <div className="calendar-container">
            <h2 className="calendar-titulo">Asignaturas</h2>
            {cargaCalendar ? (
                <p>Cargando asignaturas...</p>
            ) : (
                <>
                <h3>Asignaturas definidas</h3>
                {subjects?.length > 0 ? (
                    <table className="asignatura-lista">
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Nivel (semestre)</th>
                        <th>Horario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects?.map((asignatura: any) => (
                        <tr key={asignatura.nrc}>
                            <td>{asignatura.nombre}</td>
                            <td>{asignatura.nivel}</td>
                            <td>{asignatura.Horario}</td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                ) : (
                    <p>Aún no hay asignaturas definidas</p>
                )}
                </>
        )}
        </div>     

        /*<div>
            <h2>Asignaturas</h2>
            {cargaCalendar? (
                <p>Cargando asignaturas...</p>
            ):(
            <>
                <h3>Asignaturas definidas</h3>
                {subjects?.length > 0 ? (
                    <ul>
                        {subjects?.map((asignatura:any) => (
                            <li key = {asignatura.nrc} className= "asignatura-item">
                                <span><strong>Nombre: </strong>{asignatura.nombre}</span>
                                <span><strong>Nivel: </strong>{asignatura.nivel}</span>
                                <span><strong>Horario: </strong>{asignatura.Horario}</span>
                            </li>
                        ))}
                    </ul>
                ):(<p>Aun no hay asignaturas definidas</p>)
                }
            </>   
            )}   
        </div>*/
    );
};

