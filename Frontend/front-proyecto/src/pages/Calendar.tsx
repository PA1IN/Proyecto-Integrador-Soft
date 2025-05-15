import React, {useState} from 'react';
import {useSubjects} from '../hooks/useSubjects'
import '../styles/calendar.css'

const dias = ['Jueves 24/04','Viernes 25/04', 'Sabado 26/04', 'Lunes 28/04', 'Martes 29/04', 'Miercoles 30/04'];
const bloques = ['Mañana', 'Tarde'];
const horarios: {[key: string]: string[]} = {
    Mañana: ['08:10-09:20','09:55-11:20','11:40-13:10'],
    Tarde: ['14:30-16:00','16:15-17:45','18:00-19:30']
};

export const Calendar = () => {
    const {data: subjects} = useSubjects();
    const [calendario, setCalendario] = useState<{[key:string]:any[]}>({});
    const [dragnrc, setDragnrc] = useState<number | null>(null);

    const drag = (nrc:number) => {
        setDragnrc(nrc);
    };

    const drop = (e: React.DragEvent, celdaid: string) => {
        e.preventDefault();
        if (dragnrc === null || !subjects)
        {
            return;
        }

        const asignatura = subjects.find((subject:any) => subject.nrc === dragnrc);
        if (!asignatura)
        {
            return;
        }

        setCalendario((prev) => {
            const nuevo = { ...prev};
            if (!nuevo[celdaid])
            {
                nuevo[celdaid] = [];
            }

            if(nuevo[celdaid].some((a)=> a.nrc === asignatura.nrc))
            {
                return nuevo;
            }

            if(nuevo[celdaid].length >= 1) //cambiar pa poner pruebas q choquen
            {
                return nuevo;
            }

            nuevo[celdaid].push(asignatura);
            return nuevo;
        });

        setDragnrc(null);

    };

    const dragTermino = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const eliminar = (celdaid: string, nrc:number) => {
        setCalendario((prev) => {
            const nuevo = {...prev};
            nuevo[celdaid] = nuevo[celdaid].filter((a)=> a.nrc !== nrc);
            return nuevo;
        });
    };

   return (
    <div className="calendar-container">
      <h2 className="calendar-titulo">Calendario de pruebas</h2>

      <div className="calendar-layout">
        <div className="categorias">
          <h3>Asignaturas</h3>
          {[1, 2, 3, 4, 5].map((nivel) => (
            <div key={nivel}>
              <h4>{nivel}- semestre</h4>
              {subjects?.filter((s: any) => s.nivel === nivel).map((s: any) => (
                <div
                  key={s.nrc}
                  draggable
                  className="bloque-asignatura"
                  onDragStart={() => drag(s.nrc)}
                >
                  {s.nombre}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="calendar-grilla">
          <div className="fila fila-header">
            <div className="celda-hora"></div>
            {dias.map((dia) => (
              <div key={dia} className="celda-dia">{dia}</div>
            ))}
          </div>

          {bloques.map((bloque) => (
            <div key={bloque} className="fila">
              <div className="celda-hora">{bloque}</div>
              {dias.map((dia) => (
                <div key={`${dia}-${bloque}`} className="celda-multiple">
                  {(horarios[bloque] || []).map((horario, i) => {
                    const slot = i + 1;
                    const celdaid = `${dia}-${bloque}-slot${slot}`;
                    return (
                      <div
                        key={celdaid}
                        className="celda-droppable"
                        onDrop={(e) => drop(e, celdaid)}
                        onDragOver={dragTermino}
                      >
                        <div className="horario-slot">{horario}</div>
                        {calendario[celdaid]?.map((asig, idx) => (
                          <div key={idx} className="bloque-asignatura asignatura-agendada">
                            <div><strong>Sem.:</strong> {asig.nivel}</div>
                            <div><strong>Prof:</strong> {asig.profesor}</div>
                            <div><strong>Asig:</strong> {asig.nombre}</div>
                            <div><strong>Horario:</strong> {asig.horario}</div>
                            <div><strong>Sala:</strong> {asig.sala}</div>
                            <div><strong>Lab:</strong> {asig.lab}</div>
                            <button
                              className="eliminar-boton"
                              onClick={() => eliminar(celdaid, asig.nrc)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
   )
};