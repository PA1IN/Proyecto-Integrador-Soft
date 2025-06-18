import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';


interface AsignaturaCreadaData
{
    nrc: string;
    nivel: number;
    nombre: string;
    creado: boolean;
    id_carrera: number;
}

export function useAsignaturas(){
    return useQuery({
        queryKey:['asignaturas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignatura');  
            return respuesta.data;
        }
    });
}

export function useCarreras(){
    return useQuery({
        queryKey:['carreras'],
        queryFn: async () => {
            const respuesta = await api.get('/carrera');  
            return respuesta.data;
        }
    });
}

export function useAsignaturasCreadas(){
    return useQuery({
        queryKey:['asignaturasCreadas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignatura/creada');  
            return respuesta.data;
        }
    });
}

export function useCrearAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nrc, nivel, nombre, creado, id_carrera}: AsignaturaCreadaData) => {
            const respuesta = await api.post('/asignatura',{nrc,nivel,nombre, creado, id_carrera});
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturasCreadas']});
            clienteQuery.invalidateQueries({queryKey:['carreras']});
        },
    });
}

export function useEliminarAsignatura(){   //pa "eliminar" una asignatura creada
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.patch(`/asignatura/${id}`)
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturaCreadas']});
            clienteQuery.invalidateQueries({queryKey:['carreras']});
        }                        
    });

}
