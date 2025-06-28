import React, {useEffect, useMemo, useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useCargarColumnas } from '../hooks/useColumna';
import {useAsignaturas} from '../hooks/useAsignaturas';
import '../styles/calendar.css';
import { useProfesores } from '../hooks/useProfesores';
import { useSalas } from '../hooks/useSalas';
import { useUserProfile } from '../hooks/useUserProfile';
import { useConfirmarCalendario } from '../hooks/useConfirmarCalendario';
import { Pruebahorario, Resultadoerrores, useCalcularErrores } from '../hooks/useCalcularErrores';
import { useCargarCalendario } from '../hooks/useCargarCalendario';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { parse } from 'path';

const bloques = ['Mañana', 'Tarde'];

const bloquePrueba = (horario: string) => {
  const hora = parseInt(horario.split(":")[0]);
  return hora < 13 ? "Mañana" : "Tarde";
};

const slotPrueba = (horario: string) => {
  const hora = parseInt(horario.split(":")[0]);
  if(hora < 9) return 1;
  if(hora < 11) return 2;
  if(hora < 13) return 3;
  if(hora < 15) return 4;
  if(hora < 17) return 5;
  return 6;
}


export const Calendar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const id_actual = id ? parseInt(id) : 0
    const [idCalendarioLocal, setIdCalendarioLocal] = useState<number | null>(null);
    const evitarCargabackend = id_actual === 0 && idCalendarioLocal === null;
    const {data: user } = useUserProfile(); 
    const {data: columnas, isLoading: cargandoColumnas} = useCargarColumnas(evitarCargabackend ? undefined : (idCalendarioLocal ?? id_actual ));
    const {data: calendarioData } = useCargarCalendario(evitarCargabackend ? undefined : (idCalendarioLocal ?? id_actual ));
    //const actualizarColumna = useActualizarColumna();
    const confirmarCalendario = useConfirmarCalendario();
    const calcularErrores = useCalcularErrores();
    const {data: subjects} = useAsignaturas();
    const asignaturasFijas = subjects?.filter((a:any) => !a.creada);
    const asignaturasCreadas = subjects?.filter((a:any)=> a.creada);
    const {data: profesores} = useProfesores();
    const {data: salas} = useSalas();
    const location = useLocation();
    const nuevoCalendario = location.state?.nuevoCalendario ?? false;


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
    const [profesorForm, setProfesorform] = useState<number[]>([]);
    const [salaForm, setSalaform] = useState<number[]>([]);
    const [horario, setHorario] = useState("");
    const [profesorAsig,setProfesorasig] = useState(true);
    const [semestreSeleccionado, setSemestreseleccionado] = useState(0);
    const [errores, setErrores] = useState<{
      errores_graves: number;
      errores_moderados: number;
      errores_leves: number;
      calidad: number;
    }>({
      errores_graves: 0,
      errores_moderados: 0,
      errores_leves: 0,
      calidad: 0
    });
    const [detalles, setDetalles] = useState<any[]>([]);
    const [dragPruebaHorario,setDragPruebaHorario] = useState<any | null>(null);
    const [celdaOrigen,setCeldaOrigen] = useState<string | null>(null);
    const [rollbackPrueba, setRollBackPrueba] = useState<any | null>(null);
    const [rollbackCelda, setRollBackCelda] = useState<string | null>(null);
    const [calendarioCargadoLocalStorage, setIdCalendarioLocalStorage] = useState(false);
    const columnasEnviadas = fechas.map(f => ({
      dia: f.dia,
      fecha: f.fecha ? f.fecha.toISOString() : null
    }));



    /*useEffect(()=> {
      if(cargaId && parseInt(cargaId) === id_actual)
      {
        localStorage.removeItem("carga_calendario_id");
      }
    }, [id_actual]);*/


    /*useEffect(() => {
      if(calendarioData && calendarioData.pruebas && calendarioData.columnas) {
        const calendarioBack : { [key: string]: Pruebahorario[]} = {};

        for (const prueba of calendarioData.pruebas) {
          const columna = calendarioData.columnas.find((col: any) => col.id_columna === prueba.id_columna);
          if (!columna) {
            continue;
          }

          const celdaid = prueba.celdaid;

          if(!celdaid)
          {
            console.warn("prueba sin celdaid: ", prueba)
            continue;
          }

          if(!calendarioBack[celdaid]){
            calendarioBack[celdaid] = [];
          }

          calendarioBack[celdaid].push({
            ...prueba,
            id_profesor: prueba.id_profesor,
            id_sala: prueba.id_sala,
            profesor: prueba.profesor,
            sala: prueba.sala,
            celdaid,
            horario: prueba.horario,
            nivel: prueba.nivel,
            nombre: prueba.nombre,
            profesor_error: prueba.profesor_error,
            dia: prueba.dia,
            eliminado: prueba.eliminado
          });

          console.log("Insertando prueba en celda:", celdaid, {
          ...prueba,
          profesor: profesores?.find((p:any) => p.id_profesor === prueba.id_profesor)?.nombre ?? '',
          sala: salas?.find((s:any) => s.id_sala === prueba.id_sala)?.nombre ?? '',
        });
        }

        


        setCalendario(calendarioBack);
        if(id_actual !== 0)
        {
          localStorage.setItem("carga_calendario_id", id_actual.toString());
          localStorage.setItem(`calendario_${id_actual}`, JSON.stringify(calendarioBack));
        }

        setNombrecalendario(calendarioData.nombre ?? '');
      }
    },[calendarioData]);*/

    useEffect(() => {
      if (!calendarioData || !calendarioData.pruebas || !calendarioData.columnas) {
        return;
      }

      if (!profesores || !salas) {
        return;
      }

      const calendarioBack : { [key: string]: Pruebahorario[]} = {};

      for (const prueba of calendarioData.pruebas) {
        const celdaid = prueba.celdaid;

        if (!celdaid) {
          console.warn("prueba sin celdaid: ", prueba);
          continue;
        }

        if (!calendarioBack[celdaid]) {
          calendarioBack[celdaid] = [];
        }

        console.log("insertando prueba en celda:", celdaid, {
          ...prueba,
          profesor: profesores?.find((p:any) => p.id_profesor === prueba.id_profesor)?.nombre ?? '',
          sala: salas?.find((s:any) => s.id_sala === prueba.id_sala)?.nombre ?? '',
        });

        calendarioBack[celdaid].push({
          ...prueba,
          id_profesores: Array.isArray(prueba.id_profesores) ? prueba.id_profesores : [],
          id_salas: Array.isArray(prueba.id_salas) ? prueba.id_salas : [],
          profesores: Array.isArray(prueba.profesores) ? prueba.profesores: [],
          salas: Array.isArray(prueba.salas) ? prueba.salas : [],
          celdaid,
          horario: prueba.horario,
          nivel: prueba.nivel,
          nombre: prueba.asignatura,
          profesor_error: prueba.profesor_error,
          dia: prueba.dia,
          eliminado: prueba.eliminado
        });
      }

      setCalendario(calendarioBack);

      if(id_actual !== 0) {
        localStorage.setItem("carga_calendario_id", id_actual.toString());
        localStorage.setItem(`calendario_${id_actual}`, JSON.stringify(calendarioBack));
      }

      setNombrecalendario(calendarioData.nombre ?? '');

    }, [calendarioData, profesores, salas, id_actual]);


    useEffect(() => {
        if(!profesores || !salas)
          {
            return;
          }

        if(Object.keys(calendario).length === 0)
          {
            return;
          }
      
        const pruebas = Object.entries(calendario).flatMap(([celdaid, pruebasCelda]) =>
          pruebasCelda.map(prueba => ({
            id_asignatura: prueba.id_asignatura,
            asignatura: prueba.nombre,
            id_profesores: prueba.id_profesores,
            profesores: prueba.profesores,
            id_salas: prueba.id_salas,
            salas: prueba.salas,
            horario: prueba.horario,
            nivel: prueba.nivel,
            nombre: prueba.nombre,
            profesor_error: prueba.profesor_error,
            dia: prueba.dia,
            eliminado: prueba.eliminado,
            celdaid
          }))
        );

        
        calcularErrores.mutate(pruebas, {
          onSuccess: (data) => {
            setErrores({
              errores_graves: data.errores_graves.errores ?? 0,
              errores_moderados: data.errores_moderados.errores ?? 0,
              errores_leves: data.errores_leves.errores ?? 0,
              calidad: data.calidad ?? 0
            });

            setDetalles([
              ...(data.errores_graves.detalles ?? []),
              ...(data.errores_moderados.detalles ?? []),
              ...(data.errores_leves.detalles ?? [])
            ])
          }
        });

      }, [calendario]);


    useEffect(() => {
      console.log('columnas del backend', columnas);

      if(columnas) {
        const columnasCargadas = columnas?.columnas.map((col) => ({   // pa cargar el "dia"(id de la columna) cuando cambian las columnas
          dia: col.dia,
          fecha: col.fecha? new Date(col.fecha) : null,
        }));
        setFechas((prev) => 
          prev.map((fechaActual) => columnasCargadas.find((c) => c.dia === fechaActual.dia)|| fechaActual)
        );
      }
    }, [columnas]);

    useEffect(() => {
      const cargaId = localStorage.getItem("carga_calendario_id");

      if(nuevoCalendario && !calendarioCargadoLocalStorage)
      {
        setCalendario({});
        setFechas([...Array(7)].map((_,i)=>({dia: i+1, fecha: null})));
        setNombrecalendario('');
        setErrores({
          errores_graves: 0,
          errores_moderados: 0,
          errores_leves: 0,
          calidad: 0
        });
        setDetalles([]);
        localStorage.removeItem("calendario");
        localStorage.removeItem("carga_calendario_id");
        setIdCalendarioLocalStorage(true);
        return;
      }

      if(id_actual && calendarioData && calendarioData.pruebas && calendarioData.columnas)
      {
        return;
      }

      if(calendarioCargadoLocalStorage) {
        return;
      }


      if(!id_actual && !cargaId)
      {
        return;
      }

      if(!id_actual && !nuevoCalendario && !calendarioCargadoLocalStorage )
      {
        const calendarioGuardado = localStorage.getItem("calendario"); // pa no perder los datos del calendario cuando se recargue la pag
        if(calendarioGuardado) {
          const calendariocargado = JSON.parse(calendarioGuardado)
          setCalendario(calendariocargado);
          setIdCalendarioLocalStorage(true);

          const pruebas = Object.entries(calendariocargado).flatMap(([celdaid, pruebasCelda]) => {
            const pruebasArray = pruebasCelda as Pruebahorario[]

            return pruebasArray.map((prueba) => ({
              id_asignatura: prueba.id_asignatura,
              id_profesores: prueba.id_profesores,
              id_salas: prueba.id_salas,
              profesores: prueba.profesores,
              salas: prueba.salas,
              horario: prueba.horario,
              nivel: prueba.nivel,
              nombre: prueba.nombre,
              profesor_error: prueba.profesor_error,
              dia: prueba.dia,
              eliminado: prueba.eliminado,
              celdaid
            }));
          });

          calcularErrores.mutate(pruebas, {
            onSuccess: (data) => {
              setErrores({
                errores_graves: data.errores_graves.errores ?? 0,
                errores_moderados: data.errores_moderados.errores ?? 0,
                errores_leves: data.errores_leves.errores ?? 0,
                calidad: data.calidad ?? 0
              });
              setDetalles([
                ...data.errores_graves.detalles ?? [],
                ...data.errores_moderados.detalles ?? [],
                ...data.errores_leves.detalles ?? []
              ]);


            }
        });

        }
      }
    },[calendarioData,calcularErrores, calendarioCargadoLocalStorage]);

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

    const dragAsignaturaAgendada = (asignatura: any, celdaid: string) => {
      setDragPruebaHorario(asignatura);
      setCeldaOrigen(celdaid);
    }
    
    const drop = (e: React.DragEvent<HTMLDivElement>, celdaid: string) => {
        e.preventDefault();
        if(dragPruebaHorario && celdaOrigen)
        {
          if(celdaid === celdaOrigen)
          {
            setDragPruebaHorario(null);
            setCeldaOrigen(null);
            return;
          }

          setRollBackPrueba(dragPruebaHorario);
          setRollBackCelda(celdaOrigen);

          setCalendario((prev) => {
            const nuevo = { ...prev };
            nuevo[celdaOrigen] = nuevo[celdaOrigen].filter((a)=> a.id_asignatura !== dragPruebaHorario.id_asignatura);
            return nuevo;
          });

          setDatosform({ celdaid, asignatura: dragPruebaHorario});
          setProfesorform(dragPruebaHorario.id_profesores ?? []);
          setFormvisible(true);
          setDragPruebaHorario(null);
          setCeldaOrigen(null);
          setHorario(dragPruebaHorario.horario ?? "");
          setSalaform(dragPruebaHorario.id_salas ?? []);
          setProfesorasig(!dragPruebaHorario.profesor_error);
          return;
        }


        if (dragid === null || !subjects)
        {
            return;
        }

        const asignatura = subjects.find((subject:any) => subject.id_asignatura === dragid);
        //console.log(subjects);
        if (!asignatura)
        {
            return;
        }

        setDatosform({celdaid, asignatura});
        setFormvisible(true);
        setDragid(null);
        setHorario("");
        setSalaform([]);
        setProfesorasig(true);
        setProfesorform([]);

    };
    
    const dragTermino = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    

    const guardarPrueba = () => {
      const diaColumn = (celdaid:string) => parseInt(celdaid.split('-')[0]);
      
      if (!datosForm) {
        return;
      }

      const prueba = {
        id_asignatura: Number(datosForm.asignatura.id_asignatura),
        id_profesores: profesorForm,
        nombre: String(datosForm.asignatura.nombre),
        nivel: Number(datosForm.asignatura.nivel),
        profesores: Array.from(new Set(profesorForm.map(id => profesores?.find((p:any) => p.id_profesor === id)?.nombre ?? ''))),
        id_salas: salaForm,
        salas: Array.from(new Set(salaForm.map(id => salas?.find((s:any) => s.id_sala === id)?.nombre ?? ''))),
        horario,
        profesor_error: !profesorAsig,
        dia: diaColumn(datosForm.celdaid),
        eliminado: false,
        celdaid: datosForm.celdaid
      };

      //console.log(prueba);

      setCalendario((prev) => {
          const nuevo = { ...prev};
          if (!nuevo[datosForm.celdaid])
          {
              nuevo[datosForm.celdaid] = [];
          }

          const indicePrueba = nuevo[datosForm.celdaid].findIndex((a)=> a.id_asignatura === prueba.id_asignatura);
          if(indicePrueba !== -1)
          {
            nuevo[datosForm.celdaid][indicePrueba] = prueba;
          } else {

            if(nuevo[datosForm.celdaid].length >= 1) //cambiar pa poner pruebas q choquen
            {
                return nuevo;
            }
            nuevo[datosForm.celdaid].push(prueba);
          }
          

          /*const pruebas: Pruebahorario[] = Object.values(nuevo).flat();
          calcularErrores.mutate(pruebas, {
            onSuccess: (data) => {
              setErrores(data);
            }
          });*/

          //console.log(nuevo[datosForm.celdaid])
          //console.log(prueba.nrc, prueba.nombre);
          /*for(nuevo[datosForm.celdaid] of Object.values(calendario)) {
            
            console.log(prueba); 
          }*/

          console.log(" estado actual del calendario");
          Object.entries(nuevo).forEach(([celdaid, pruebasCelda]) => {
              console.log(`Celda: ${celdaid}`);
              pruebasCelda.forEach((prueba, idx) => {
                  console.log(`  Prueba #${idx + 1}:`, {
                      id_asignatura: prueba.id_asignatura,
                      id_profesor: prueba.id_profesores,
                      nombre: prueba.nombre,
                      nivel: prueba.nivel,
                      profesor: prueba.profesores,
                      id_sala: prueba.id_salas,
                      sala: prueba.salas,
                      horario: prueba.horario,
                      profesor_error: prueba.profesor_error,
                      dia: prueba.dia,
                      eliminado: prueba.eliminado
                  });
              });
          });
          console.log("...");

          if(!id_actual)
          {
            localStorage.setItem("calendario", JSON.stringify(nuevo));
          }

          return nuevo;
      });
      
      //setDragnrc(null);

      //localStorage.setItem("calendario", JSON.stringify(calendario));
      setRollBackPrueba(dragPruebaHorario);
      setRollBackCelda(celdaOrigen);
      setFormvisible(false);
      setDatosform(null);

    };

    

    const eliminar = (celdaid: string, id_asignatura:number) => {
        setCalendario((prev) => {
            const nuevo = {...prev};
            nuevo[celdaid] = nuevo[celdaid].filter((a)=> a.id_asignatura !== id_asignatura );

           /* const pruebas = Object.entries(nuevo).flatMap(([celdaid, pruebasCelda]) => 
              pruebasCelda.map(prueba => ({
                id_asignatura: prueba.id_asignatura,
                id_profesor: prueba.id_profesor,
                profesor: prueba.profesor,
                id_sala: prueba.id_sala,
                sala: prueba.sala,
                horario:prueba.horario,
                nivel: prueba.nivel,
                nombre: prueba.nombre,
                profesor_error: prueba.profesor_error,
                dia: prueba.dia,
                eliminado: prueba.eliminado,
                celdaid
              }))
            );*/
            
            /*calcularErrores.mutate(pruebas, {
              onSuccess: (data) => {
                setErrores(data);
              }
            });*/

            localStorage.setItem("calendario", JSON.stringify(nuevo));

            return nuevo;
        });
    };

    const confirmar = () => {
      if(!user || !nombreCalendario.trim()) {
        return;
      }
      console.log("columnas actuales:", columnas);

      const idColumn = (celdaid: string) => {
        const diaCelda = parseInt(celdaid.split("-")[0]);
        if(columnas?.columnas)
        {
          const columnaError = columnas?.columnas ?? [];
          const columna = columnaError.find(col => col.dia === diaCelda);
          return columna ? columna.id_columna : null;
        } else {
          const columnalocal = columnasEnviadas.find(c => c.dia === diaCelda);
          if(columnalocal)
          {
            return diaCelda;
          }
          return null;
        }
        
      }

      const fecha_creacion = new Date().toISOString().split('T')[0];
      console.log(calendario);
      const pruebas = Object.entries(calendario).flatMap(([celdaid, pruebasCelda]) => 
        pruebasCelda.map(prueba => {
          console.log(prueba.nombre);
          const idColumna = idColumn(celdaid);
          if(idColumna === null)
          {
            console.log(`no hay columna para la celda ${celdaid}`);
            return null;
          }
          return {
            id_asignatura: prueba.id_asignatura,
            id_columna: idColumna,
            profesores: prueba.profesores,
            salas: prueba.salas,
            horario: prueba.horario,
            id_profesores: prueba.id_profesores,
            id_salas: prueba.id_salas,
            dia: prueba.dia,
            profesor_error: prueba.profesor_error,
            eliminado: prueba.eliminado ?? false,
            celdaid
          };
        })).filter((p): p is NonNullable<typeof p> => p !== null); //vola negra pa que ts no lo tome nulo y de error al compilar
      
      console.log("Pruebas a enviar:", pruebas);
      confirmarCalendario.mutate({
        nombre: nombreCalendario,
        id_usuario: user.rut,
        fecha_creacion,
        pruebas,
        columnas: columnasEnviadas
      }, {
        onSuccess:(data)=> {
          window.open(`/Calendar/${data.id}`,'_blank');

          if(data?.id)
          {
            
            
            setCalendario({});
            setNombrecalendario('');
            setFechas([...Array(7)].map((_,i)=>({dia: i + 1, fecha: null})));
            setErrores({
              errores_graves: 0,
              errores_moderados: 0,
              errores_leves: 0,
              calidad: 0,
            });
            setDetalles([]);

            localStorage.removeItem("calendario");
            localStorage.removeItem("carga_calendario_id");
            setIdCalendarioLocalStorage(false);
            setIdCalendarioLocal(null);
            setCalendario({});
            
            setTimeout(()=>{
              navigate('/Calendar', {state:{ nuevoCalendario: true}});
              
            }, 100);

            
            
          }
        }
      });
    }

    /*const calcular = () => {
      const pruebas: Pruebahorario[] = Object.values(calendario).flat();
      calcularErrores.mutate(pruebas, {
        onSuccess: (data) => {
          setErrores(data);
        }
      });
    };*/

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

    /*if(!id_actual && !calendarioCargadoLocalStorage){
      return <div>Calendario no encontrado</div>;
    }*/

    if (cargandoColumnas && (columnas??[]).length === 0) {
      return <div> Cargando fechas... </div>
    }

    //console.log(JSON.stringify(calendario,null,1));


    

   return (
    <div className="calendar-container">
      <h2 className="calendar-titulo">Calendario de pruebas</h2>
      <label>
        <input type="checkbox" checked={mostrarClmnaextra} onChange={()=> setMostrarClmnextra((prev)=> !prev)}/>
        Columna adicional (dia 7) 
      </label>
<<<<<<< Updated upstream
      {true && (
        <div className="errores-box">
          <p><strong>Errores graves: </strong>{errores?.errores_graves}</p>
          <p><strong>Errores moderados: </strong>{errores?.errores_moderados}</p>
          <p><strong>Errores leves: </strong>{errores?.errores_leves}</p>
          <p><strong>Calidad: </strong>{errores?.calidad}</p>
        </div>
      )}
=======
      <button onClick={()=> navigate('/Home')}>Volver al menú</button>
>>>>>>> Stashed changes
      

      {formVisible && datosForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Datos de la prueba</h3>
            <select multiple value={profesorForm.map(String)} onChange={(e) =>{
              const opcionesProfesor = Array.from(e.target.options).filter(opcion => opcion.selected).map(opcion => Number(opcion.value));
              setProfesorform(opcionesProfesor);
            }}>
              <option key="default" value="">Seleccione uno o mas docentes para la evaluacion</option>
              {profesores?.map((p:any) => (
                <option key={p.id_profesor} value={p.id_profesor}>{p.nombre}</option>
              ))}
            </select>

            <select multiple value={salaForm.map(String)} onChange={(e)=> {
              const opcionesSala = Array.from(e.target.options).filter(opcion => opcion.selected).map(opcion => Number(opcion.value));
              setSalaform(opcionesSala);
            }}>
              <option disabled value="">Seleccione una o mas salas para la evaluacion</option>
              {salas?.filter((s:any) => s.id_sala !== undefined).map((s:any) => (
                <option key={s.id_sala} value={s.id_sala}>{s.nombre}</option>
              ))}
            </select>

            <input type="text" placeholder="horario (09:00 - 10:30)" value={horario} onChange={(e)=>setHorario(e.target.value)}/>
            <label>
              <input type="checkbox" checked={profesorAsig} onChange={()=>setProfesorasig(!profesorAsig)}/>
              ¿El docente es el mismo de la asignatura? 
            </label>

            
            <button onClick={guardarPrueba}>Guardar</button>
            <button onClick={()=> {


              if(rollbackPrueba && rollbackCelda)
              {
                setCalendario((prev)=>{
                  const nuevo = { ...prev };
                  if(!nuevo[rollbackCelda])
                  {
                    nuevo[rollbackCelda] = [];
                  }

                  const pruebaExistente = nuevo[rollbackCelda].some((a)=> a.id_asignatura === rollbackPrueba.id_asignatura);

                  if(!pruebaExistente)
                  {
                    nuevo[rollbackCelda].push(rollbackPrueba);
                  }
                  return nuevo;
                });
              }
              setFormvisible(false);
              setDatosform(null);
              setProfesorform([]);
              setSalaform([]);
              setHorario("");
              setProfesorasig(true);
              setRollBackPrueba(null);
              setRollBackCelda(null);
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
                          <div key={idx} className="bloque-asignatura asignatura-agendada" draggable onDragStart={() => dragAsignaturaAgendada(asig,celdaid)}>
                            <div><strong>Sem.:</strong> {asig.nivel}</div>
                            <div><strong>Prof:</strong> {Array.isArray(asig.profesores) ? asig.profesores.join(", "): asig.profesores}</div>
                            <div><strong>Asig:</strong> {asig.nombre}</div>
                            <div><strong>Horario:</strong> {asig.horario}</div>
                            <div><strong>Sala:</strong> {Array.isArray(asig.salas) ? asig.salas.join(", "): asig.salas}</div>
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

      <p>Guardar con nombre <strong>(obligatorio):</strong> </p>
      <div className="confirmar-section">
          <input type = "text" placeholder="Nombre del calendario" value={nombreCalendario} onChange={(e)=> setNombrecalendario(e.target.value)} />
          <button onClick={confirmar} className="confirmar-boton">Confirmar calendario</button>
      </div>
    </div>
   )
};