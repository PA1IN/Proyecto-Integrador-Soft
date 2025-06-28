import React, {SyntheticEvent,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { Carrera, useAsignaturas, useAsignaturasCreadas, useCrearAsignatura, useEliminarAsignatura, useCarreras} from '../hooks/useAsignaturas';


export const Asignaturas = () => 
{
    
    const {token, setToken} = useAuth();
    const {data: user, isLoading: cargauser, isError} = useUserProfile();
    const navigate = useNavigate();
    const {data: asignaturas,isLoading: cargaAsignaturas} = useAsignaturas();
    const {data: carreras,isLoading: cargaCarreras} = useCarreras();
    const [carrera, setCarrera] = useState('');
    const {data: asignaturasCreadas,isLoading: cargaAsignaturasCreadas} = useAsignaturasCreadas();
    const eliminarAsignatura = useEliminarAsignatura();
    const crearAsignatura = useCrearAsignatura();

    const [codigoNrc, setNrc] = useState('');
    const [niv, setNivel] = useState('');
    const [name, setNombre] = useState('');

    if(!token)
    {
        navigate('/Login');
        return null;
    }

    if(cargauser)
    {
        return <div> Cargando... </div>;
    }
    
    if(isError)
    {
        setToken(null);
        navigate('/Login');
        return null;
    }
      
    const crear = (e:SyntheticEvent) => {
        e.preventDefault();
        crearAsignatura.mutate({nrc: codigoNrc, nivel: Number(niv) ,nombre: name, creado: true, id_carrera: Number(carrera)});
        setNombre('');
        setNivel('');
        setNrc('');
        setCarrera('');
    };
    
    return (
        <div>
            <h1>Menú de Asignaturas</h1>

            <h3>Agregar Asignatura: </h3>
            <form onSubmit={crear}>
                <input type = "text" placeholder="Ingrese el nombre de la asignatura." value={name} onChange={(e)=> setNombre(e.target.value)} required />
                <input type = "number" placeholder="Ingrese el número del semestre (o nivel) al que pertenece la asignatura (ej: 4)." value={niv} onChange={(e)=> setNivel(e.target.value)} required />
                <input type = "text" placeholder="Ingrese el NRC de la asignatura." value={codigoNrc} onChange={(e)=> setNrc(e.target.value)} required />
                <select 
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
                <button type="submit" disabled={!carrera}>Agregar</button>
            </form>

            {cargaAsignaturasCreadas ? (<p>Cargando tus asignaturas...</p>)
            : (
            <>
                <h2>Tus asignaturas agregadas: </h2>
                {asignaturasCreadas?.length > 0 ? (
                    <ul>
                        {asignaturasCreadas.filter((a:any)=> a.eliminado === false).map((ac: any) => (
                            <li key = {ac.id_asignatura}>
                                <p>NRC: </p> {ac.nrc}
                                <p>Nombre de asignatura: </p> {ac.nombre}
                                <p>Nivel/Número de Semestre: </p> {ac.nivel}
                                <p>Carrera: </p>{carreras?.find((c:Carrera) => c.id === ac.id_carrera)?.nombre}
                                <button onClick={() => eliminarAsignatura.mutate({id: ac.id_asignatura})}>Eliminar asignatura</button>
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No creaste ninguna asignatura.</p>)
                }
            </>
            )}

            {cargaAsignaturas ? (<p>Cargando las asignaturas...</p>)
            : (
            <>
                <h2>Asignaturas en el sistema: </h2>
                {asignaturas?.length > 0 ? (
                    <ul>
                        {asignaturas.filter((a: any) => a.creado !== true).map((a: any) => (
                            <li key = {a.id}>
                                <p>NRC: </p> {a.nrc}
                                <p>Nombre de asignatura: </p> {a.nombre}
                                <p>Nivel/Número de Semestre: </p> {a.nivel}
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No hay asignaturas.</p>)
                }
            </>
            )}
        
            <button onClick={()=> navigate('/Home')}>Volver al menú principal</button>
        </div>
  );
};