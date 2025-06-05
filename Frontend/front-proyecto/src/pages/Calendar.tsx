import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useCargarColumnas } from '../hooks/useColumna';
import {useAsignaturasCreadas} from '../hooks/useAsignaturas';
import '../styles/calendar.css';
import { useProfesores } from '../hooks/useProfesores';
import { useSalas } from '../hooks/useSalas';
import { useUserProfile } from '../hooks/useUserProfile';
import { useConfirmarCalendario } from '../hooks/useConfirmarCalendario';
import { Pruebahorario, Resultadoerrores, useCalcularErrores } from '../hooks/useCalcularErrores';

const bloques = ['Mañana', 'Tarde'];
//const id_actual = 1;
export const Calendar = () => {
    const {data: user } = useUserProfile(); 
    const {data: columnas, isLoading: cargandoColumnas} = useCargarColumnas(0);
    //const actualizarColumna = useActualizarColumna();
    const confirmarCalendario = useConfirmarCalendario();
    const calcularErrores = useCalcularErrores();
    const {data: subjects} = useAsignaturasCreadas();
    const asignaturasFijas = subjects?.filter((a:any) => !a.creada);
    const asignaturasCreadas = subjects?.filter((a:any)=> a.creada);
    const {data: profesores} = useProfesores();
    const {data: salas} = useSalas();


    /*const [fechas, setFechas] =useState<{dia: number; fecha: Date | null}[]>([
      {dia: 1, fecha: null},
      {dia: 2, fecha: null},
      {dia: 3, fecha:null},
      {dia: 4, fecha: null},
      {dia: 5, fecha:null},
      {dia: 6, fecha: null},
      {dia: 7, fecha: null} //pal dia que quieran hacer las semanas de prueba con 7 dias
    ]);*/

    const [fechas, setFechas] = useState<{dia:number,fecha:Date| null}[]>(
      [...Array(7)].map((_,i)=>({dia: i + 1, fecha: null }))); 
    
    const [mostrarClmnaextra,setMostrarClmnextra ] = useState(false);
    const [calendario, setCalendario] = useState<{[key:string]:Pruebahorario[]}>({});
    const [dragid, setDragid] = useState<number | null>(null);
    const [formVisible, setFormvisible] = useState(false);
    const [datosForm,setDatosform] = useState<{celdaid:string, asignatura: any} | null>(null);
    const [nombreCalendario, setNombrecalendario] = useState("");
    const [profesorForm, setProfesorform] = useState<number | null>(null);
    const [salaForm, setSalaform] = useState<number | null>(null);
    const [horario, setHorario] = useState("");
    const [profesorAsig,setProfesorasig] = useState(true);
    const [semestreSeleccionado, setSemestreseleccionado] = useState(0);
    const [errores, setErrores] = useState<Resultadoerrores | null>(null);

    useEffect(() => {
      if(columnas) {
        const columnasCargadas = columnas.map((col) => ({
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
      /*actualizarColumna.mutate(
        {
          dia,
          fecha: fecha.toISOString().split("T")[0],
          id_calendario: 0,
        },
      );*/
    };

    const drag = (id:number) => {
        setDragid(id);
    };
    
    const drop = (e: React.DragEvent<HTMLDivElement>, celdaid: string) => {
        e.preventDefault();
        if (dragid === null || !subjects)
        {
            return;
        }

        const asignatura = subjects.find((subject:any) => subject.id_asignatura === dragid);
        console.log(subjects);
        if (!asignatura)
        {
            return;
        }

        setDatosform({celdaid, asignatura});
        setFormvisible(true);
        setDragid(null);
        setHorario("");
        setSalaform(null);
        setProfesorasig(true);
        setProfesorform(null);

    };
    
    const dragTermino = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };


    const guardarPrueba = () => {
      
      if (!datosForm) {
        return;
      }

      const prueba = {
        ...datosForm.asignatura,
        id_asignatura: datosForm.asignatura.id,
        profesor:profesorForm,
        sala: salaForm,
        horario,
        profesor_error: !profesorAsig,
        dia: parseInt(datosForm.celdaid.split('-')[0]),
        eliminado: false,
      };

      setCalendario((prev) => {
          const nuevo = { ...prev};
          if (!nuevo[datosForm.celdaid])
          {
              nuevo[datosForm.celdaid] = [];
          }

          if(nuevo[datosForm.celdaid].some((a)=> a.id_asignatura === prueba.id_asignatura))
          {
              
              return nuevo;
          }

          if(nuevo[datosForm.celdaid].length >= 1) //cambiar pa poner pruebas q choquen
          {
              return nuevo;
          }
          
          nuevo[datosForm.celdaid].push(prueba);
          
          
          
          localStorage.setItem("calendario", JSON.stringify(nuevo));

          const pruebas: Pruebahorario[] = Object.values(nuevo).flat();
          calcularErrores.mutate(pruebas, {
            onSuccess: (data) => {
              setErrores(data);
            }
          });

          //console.log(nuevo[datosForm.celdaid])
          //console.log(prueba.nrc, prueba.nombre);
          /*for(nuevo[datosForm.celdaid] of Object.values(calendario)) {
            
            console.log(prueba);
            
            
          }*/
          return nuevo;
      });

      
      //setDragnrc(null);

      //localStorage.setItem("calendario", JSON.stringify(calendario));
      setFormvisible(false);
      setDatosform(null);

    };

    

    const eliminar = (celdaid: string, id_asignatura:number) => {
        setCalendario((prev) => {
            const nuevo = {...prev};
            nuevo[celdaid] = nuevo[celdaid].filter((a)=> a.id_asignatura !== id_asignatura );
            return nuevo;
        });
    };

    const confirmar = () => {
      if(!user || !nombreCalendario.trim()) {
        return;
      }

      const fecha_creacion = new Date().toISOString().split('T')[0];
      confirmarCalendario.mutate({
        nombre: nombreCalendario,
        id_usuario: user.rut,
        fecha_creacion,
        fechas,
        calendario
      })
    }

    const calcular = () => {
      const pruebas: Pruebahorario[] = Object.values(calendario).flat();
      calcularErrores.mutate(pruebas, {
        onSuccess: (data) => {
          setErrores(data);
        }
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

    console.log(JSON.stringify(calendario,null,1));


    

   return (
    <div className="calendar-container">
      <h2 className="calendar-titulo">Calendario de pruebas</h2>
      
      <label>
        <input type="checkbox" checked={mostrarClmnaextra} onChange={()=> setMostrarClmnextra((prev)=> !prev)}/>
        Columna adicional (dia 7)
      </label>
      {true && (
        <div className="errores-box">
          <p><strong>Errores graves: </strong>{errores?.errores_graves}</p>
          <p><strong>Errores moderados: </strong>{errores?.errores_moderados}</p>
          <p><strong>Errores leves: </strong>{errores?.errores_leves}</p>
          <p><strong>Calidad: </strong>{errores?.calidad}</p>
        </div>
      )}
      

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
            <button onClick={()=> {
              setFormvisible(false);
              setDatosform(null);
              setProfesorform(null);
              setSalaform(null);
              setHorario("");
              setProfesorasig(true);
            }}>Cancelar</button>
          </div> 
        </div>
      )}

      
      <div className="calendar-layour">
          <div className="categorias">
          <h3>Asignaturas</h3>
          <label>Filtrar por semestre: </label>
          <select onChange={(e) => setSemestreseleccionado(Number(e.target.value))}>
          {[1,2,3,4,5,6,7,8].map((sem) => (
            <option key={sem} value={sem}>Semestre {sem}</option>
          ))}
          </select>
          {(asignaturasFijas || []).concat(asignaturasCreadas || []).filter((s:any) => semestreSeleccionado === 0 || s.nivel === semestreSeleccionado).map((s:any) => (
            <div key={s.id_asignatura} draggable className="bloque-asignatura" onDragStart={() => drag(s.id_asignatura)}>{s.nombre}</div>
          ))
          }
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
                              onClick={() => eliminar(celdaid, asig.id_asignatura)}
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

      

      <div className="confirmar-section">
          <input type = "text" placeholder="Nombre del calendario" value={nombreCalendario} onChange={(e)=> setNombrecalendario(e.target.value)} />
          <button onClick={calcular} className="confirmar-boton">Calcular errores</button>
          <button onClick={confirmar} className="confirmar-boton">Confirmar calendario</button>
      </div>
    </div>
   )
};