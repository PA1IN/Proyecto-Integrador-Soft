import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';


export function useAsignaturas(){
    return useQuery({
        queryKey:['asignaturas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignaturas');  //sapear el back pa añadir el endpoint de las asignaturas modificadas
            return respuesta.data;
        }
    })
}

export function useCrearAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (nuevaAsignatura:{nrc: number, nombre: string, nivel: string}) => {
            const respuesta = await api.post('/asignaturas',nuevaAsignatura);
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturas']});
        },
    });
}

export function useEliminarAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (nivel: string) => {
            await api.delete(`/asignaturas/${nivel}`); //sapear el endpoint del dono pa las asignaturas modificables
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturas']});
        },
    });
}

//metodos post,get y delete para las asignaturas que se van a modificar