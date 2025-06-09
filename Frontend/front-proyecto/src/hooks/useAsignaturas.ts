import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';


interface AsignaturaCreadaData
{
    nrc: string;
    nivel: number;
    nombre: string;
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

export function useAsignaturasCreadas(){
    return useQuery({
        queryKey:['asignaturasCreadas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignatura');  
            return respuesta.data;
        }
    });
}

export function useCrearAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nrc, nivel, nombre}: AsignaturaCreadaData) => {
            const respuesta = await api.post('/asignatura',{nrc,nivel,nombre});
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturasCreadas']});
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
        }                        
    });

}
