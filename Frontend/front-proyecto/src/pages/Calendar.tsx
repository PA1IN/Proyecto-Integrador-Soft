import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useActualizarColumna, useCargarColumnas } from '../hooks/useColumna';
import {useAsignaturas} from '../hooks/useCalendar'
import '../styles/calendar.css'
import { useProfesores } from '../hooks/useProfesores';
import { useSalas } from '../hooks/useSalas';

/*const dias = ['Jueves 24/04','Viernes 25/04', 'Sabado 26/04', 'Lunes 28/04', 'Martes 29/04', 'Miercoles 30/04']; // moldeable */
const bloques = ['Mañana', 'Tarde'];
/*const horarios: {[key: string]: string[]} = {
    Mañana: ['','',''],
    Tarde: ['','','']
};*/

const id_actual = 1; //pa dsp usar el id del calendario q este global

export const Calendar = () => {
    const {data: columnas, isLoading: cargandoColumnas} = useCargarColumnas(id_actual);
    const actualizarColumna = useActualizarColumna();
    const {data: subjects} = useAsignaturas();
    const {data: profesores} = useProfesores();
    const {data: salas} = useSalas();


    const [fechas, setFechas] =useState<{dia: number; fecha: Date | null}[]>([
      {dia: 1, fecha: null},
      {dia: 2, fecha: null},
      {dia: 3, fecha:null},
      {dia: 4, fecha: null},
      {dia: 5, fecha:null},
      {dia: 6, fecha: null},
      {dia: 7, fecha: null} //pal dia que quieran hacer las semanas de prueba con 7 dias
    ]);
    
    const [mostrarClmnaextra,setMostrarClmnextra ] = useState(false);
    const [calendario, setCalendario] = useState<{[key:string]:any[]}>({});
    const [dragnrc, setDragnrc] = useState<number | null>(null);
    const [formVisible, setFormvisible] = useState(false);
    const [datosForm,setDatosform] = useState<{nrc: number, celdaid: string, asignatura: any} | null>(null);

    const [profesorForm, setProfesorform] = useState<number | null>(null);
    const [salaForm, setSalaform] = useState<number | null>(null);
    const [horario, setHorario] = useState("");
    const [profesorAsig,setProfesorasig] = useState(true);

    useEffect(() => {
      if(columnas) {
        const columnasCargadas = columnas.map((col: {dia: number; fecha: string}) => ({
          dia: col.dia,
          fecha: new Date(col.fecha),
        }));
        setFechas((prev) => 
          prev.map((fechaActual) => columnasCargadas.find((c) => c.dia === fechaActual.dia)|| fechaActual)
        );
      }
    }, [columnas]);

    const cambiofechas = (fecha: Date, dia:number) => {
      const fechasnuevas = fechas.map((f) => {
        return f.dia === dia ? {...f, fecha} : f
        }
      );
      setFechas(fechasnuevas);
      actualizarColumna.mutate(
        {
          dia,
          fecha: fecha.toISOString().split("T")[0],
          id_calendario: id_actual,
        },
      );
    };

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

        setDatosform({nrc: dragnrc, celdaid, asignatura});
        setFormvisible(true);
        setDragnrc(null);

    };    


    const guardarPrueba = () => {
      
      if (!datosForm) {
        return;
      }

      const prueba = {
        ...datosForm.asignatura,
        profesor:profesorForm,
        sala: salaForm,
        profesor_error: !profesorAsig,
      };

      setCalendario((prev) => {
          const nuevo = { ...prev};
          if (!nuevo[datosForm.celdaid])
          {
              nuevo[datosForm.celdaid] = [];
          }

          if(nuevo[datosForm.celdaid].some((a)=> a.nrc === prueba.nrc))
          {
              return nuevo;
          }

          if(nuevo[datosForm.celdaid].length >= 1) //cambiar pa poner pruebas q choquen
          {
              return nuevo;
          }

          nuevo[datosForm.celdaid].push(prueba);
          return nuevo;
      });

      //setDragnrc(null);

      localStorage.setItem("calendario", JSON.stringify(calendario));
      setFormvisible(false);
      setDatosform(null);

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

    const fechasvisibles = fechas.filter((f) => {
        if(mostrarClmnaextra){
          return true;
        }
        else {
          if(f.dia <= 6) {
            return true;
          }else {
            return false;
          }
        }
      }
    );

    if (cargandoColumnas) {
      return <div> Cargando fechas... </div>
    }


   return (
    <div className="calendar-container">
      <h2 className="calendar-titulo">Calendario de pruebas</h2>
      
      <label>
        <input type="checkbox" checked={mostrarClmnaextra} onChange={()=> setMostrarClmnextra((prev)=> !prev)}/>
        Columna adicional (dia 7)
      </label>

      {formVisible && datosForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Datos de la prueba</h3>
            <select onChange={(e) => setProfesorform(Number(e.target.value))}>
              <option>Seleccione un docente para la evaluacion</option>
              {profesores?.map((p:any) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>

            <select onChange={(e)=> setSalaform(Number(e.target.value))}>
              <option>Seleccione una sala para la evaluacion</option>
              {salas?.map((s:any) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>

            <input type="text" placeholder="horario (09:00 - 10:30)" onChange={(e)=>setHorario(e.target.value)}/>
            <label>
              <input type="checkbox" checked={profesorAsig} onChange={()=>setProfesorasig(!profesorAsig)}/>
              ¿El docente es el mismo de la asignatura? 
            </label>

            
            <button onClick={guardarPrueba}>Guardar</button>
            <button onClick={()=> setFormvisible(false)}>Cancelar</button>
          </div> 
        </div>
      )}

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
            {fechasvisibles.map((f)=> (
              <div key = {f.dia} className="celda-dia">
                <DatePicker selected={f.fecha} onChange={(fechanueva) => cambiofechas(fechanueva as Date,f.dia)} dateFormat="EEEE dd/MM" placeholderText="seleccionar fecha"/>
              </div>
            ))}
          </div>

          {bloques.map((bloque) => (
            <React.Fragment key={bloque}>
              {[...Array(6)].map((_, i) => (
                <div key={`${bloque}-fila-${i}`} className="fila">
                  <div className="celda-hora">{i === 0 ? bloque : ''}</div>
                  {fechasvisibles.map((f) => {
                    const slot = i + 1;
                    const celdaid = `${f.dia}-${bloque}-slot${slot}`;
                    return (
                      <div
                        key={celdaid}
                        className="celda-droppable"
                        onDrop={(e) => drop(e, celdaid)}
                        onDragOver={dragTermino}
                      >
                        {calendario[celdaid]?.map((asig, idx) => (
                          <div key={idx} className="bloque-asignatura asignatura-agendada">
                            <div><strong>Sem.:</strong> {asig.nivel}</div>
                            <div><strong>Prof:</strong> {asig.profesor}</div>
                            <div><strong>Asig:</strong> {asig.nombre}</div>
                            <div><strong>Horario:</strong> {asig.horario}</div>
                            <div><strong>Sala:</strong> {asig.sala}</div>
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
            </React.Fragment>
          ))}

        </div>
      </div>
    </div>
   )
};