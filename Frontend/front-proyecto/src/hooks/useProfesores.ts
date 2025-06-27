import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';

interface ProfesorData
{
    nombre: string;
    creado: boolean;
}



export function useProfesores() {    //pa listar los profesores que no estén eliminados.
    return useQuery({
        queryKey: ['profesores'],
        queryFn: async () => {
            const respuesta = await api.get('/profesor');
            return respuesta.data;
        }
    });
}

export function useProfesoresGenerales(){
    return useQuery({
        queryKey:['profesoresGenerales'],
        queryFn: async () => {
            const respuesta = await api.get('/profesor/todos');
            return respuesta.data;
        }
    });
}

export function useProfesoresCreados() {    //pa listar los profesores que no estén eliminados.
    return useQuery({
        queryKey: ['profesoresCreados'],
        queryFn: async () => {
            const respuesta = await api.get('/profesor/creado');
            return respuesta.data;
        }
    });
}

export function useCrearProfesor(){ 
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nombre}:ProfesorData)  => {
            const respuesta = await api.post('/profesor',{nombre});
            return respuesta.data
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['profesoresCreados']});
            clienteQuery.invalidateQueries({queryKey:['profesores']});
        }                          
    });
}

export function useEliminarProfe(){   //pa "eliminar" un profesor
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.patch(`/profesor/${id}`)
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['profesoresCreados']});
        }                        
    });

}

