import React, {SyntheticEvent,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUserProfile } from '../hooks/useUserProfile';
import { useProfesores, useCrearProfesor, useEliminarProfe, useProfesoresCreados } from '../hooks/useProfesores';

export const Profesores = () => 
{
    
    const {token, setToken} = useAuth();
    const {data: user, isLoading: cargauser, isError} = useUserProfile();
    const navigate = useNavigate();
    const {data: profesores,isLoading: cargaProfes} = useProfesores();
    const {data: profesoresCreados,isLoading: cargaProfesCreados} = useProfesoresCreados();
    const eliminarProfe = useEliminarProfe();
    const crearProfesor = useCrearProfesor();
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
        crearProfesor.mutate({nombre: name,  creado: true});
        setNombre('');
    };
    
    return (
        <div>
            <h1>Menú de profesores</h1>
            <button onClick={()=> navigate('/Home')}>Volver al menú principal</button>
            <h3>Agregar profesor: </h3>
            <form onSubmit={crear}>
                <input type = "text" placeholder="Ingrese el nombre del profesor." value={name} onChange={(e)=> setNombre(e.target.value)} required />
                <button type="submit">Agregar</button>
            </form>

            {cargaProfesCreados ? (<p>Cargando profesores...</p>)
            : (
            <>
                <h2>Tus profesores agregados: </h2>
                {profesoresCreados?.length > 0 ? (
                    <ul>
                        {profesoresCreados.map((profe: any) => (
                            <li key = {profe.id}>
                                {profe.nombre}
                                <button onClick={() => eliminarProfe.mutate(profe.id)}>Eliminar profesor del sistema</button>
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No hay profesores</p>)
                }
            </>
            )}

            {cargaProfes ? (<p>Cargando profesores...</p>)
            : (
            <>
                <h2>Profesores en el sistema: </h2>
                {profesores?.length > 0 ? (
                    <ul>
                        {profesores.map((p: any) => (
                            <li key = {p.id}>
                                {p.nombre}
                                <p>-------</p>
                            </li>
                        ))}
                    </ul>
                ) : (<p>No hay profesores</p>)
                }
            </>
            )}

        </div>
  );
};