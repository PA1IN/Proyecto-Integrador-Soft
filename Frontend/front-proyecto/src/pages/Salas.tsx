import React, {SyntheticEvent,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useSalas,useCrearSala,useEliminarSala, useSalasCreadas } from '../hooks/useSalas';

export const Salas = () => 
{
    
    const {token, setToken} = useAuth();
    const {data: user, isLoading: cargauser, isError} = useUserProfile();
    const navigate = useNavigate();
    const {data: salas,isLoading: cargaSalas} = useSalas();
    const {data: salasCreadas,isLoading: cargaSalasCreadas} = useSalasCreadas();
    const eliminarSala = useEliminarSala();
    const crearSala = useCrearSala();
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
        crearSala.mutate({nombre: name});
        setNombre('');
    };
    
    return (
        <div>
            <h1>Menú de Salas</h1>
            <button onClick={()=> navigate('/Home')}>Volver al menú principal</button>
            <h3>Agregar sala: </h3>
            <form onSubmit={crear}>
                <input type = "text" placeholder="Ingrese número de la sala (ej: 29)." value={name} onChange={(e)=> setNombre(e.target.value)} required />
                <button type="submit">Agregar</button>
            </form>

            {cargaSalasCreadas ? (<p>Cargando salas...</p>)
            : (
            <>
                <h2>Tus salas agregadas: </h2>
                {salasCreadas?.length > 0 ? (
                    <ul>
                        {salasCreadas.map((sala: any) => (
<<<<<<< Updated upstream
                            <li key = {sala.id}>
                                {sala.nombre}
                                <button onClick={() => eliminarSala.mutate(sala.id)}>Eliminar sala del sistema</button>
=======
                            <li key = {sala.id_sala}>
                                {sala.nombre}<p> </p>
                                <button onClick={() => eliminarSala.mutate(sala.id_sala)}>Eliminar</button>
>>>>>>> Stashed changes
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No hay salas creadas por ti.</p>)
                }
            </>
            )}

            {cargaSalas ? (<p>Cargando salas...</p>)
            : (
            <>
                <h2>Salas en el sistema: </h2>
                {salas?.length > 0 ? (
                    <ul>
                        {salas.map((s: any) => (
                            <li key = {s.id}>
                                {s.nombre}
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No hay salas en el sistema.</p>)
                }
            </>
            )}
        </div>
  );
};