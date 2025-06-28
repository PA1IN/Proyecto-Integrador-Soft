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
                        {asignaturasCreadas.filter((ac: any) => !carrera || ac.id_carrera === Number(carrera)).map((ac: any) => (
                            <li key = {ac.id_asignatura}>
                                <p>NRC: {ac.nrc} - Nombre de asignatura: {ac.nombre} </p>
                                <p>Carrera: {carreras?.find((c:Carrera) => c.id === ac.id_carrera)?.nombre} - Nivel/Número de Semestre: </p> {ac.nivel}
                                <button onClick={() => eliminarAsignatura.mutate({id: ac.id})}>Eliminar asignatura</button>
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No creaste ninguna asignatura.</p>)
                }
            </>
            )}        
            <button onClick={()=> navigate('/Home')}>Volver al menú principal</button>
        </div>
  );
};