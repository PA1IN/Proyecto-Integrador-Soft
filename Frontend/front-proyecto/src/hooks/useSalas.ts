import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';

interface SalaData
{
    nombre: string;
}


export function useSalas() {    //pa listar las salas.
    return useQuery({
        queryKey: ['salas'],
        queryFn: async () => {
            const respuesta = await api.get('/sala');
            return respuesta.data;
        }
    });
}

export function useSalasCreadas() {    //pa listar las salas creadas.
    return useQuery({
        queryKey: ['salasCreadas'],
        queryFn: async () => {
            const respuesta = await api.get('/sala/creada');
            return respuesta.data;
        }
    });
}

export function useCrearSala(){ 
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nombre}:SalaData)  => {
            const respuesta = await api.post('/sala',{nombre});
            return respuesta.data
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['salasCreadas']});
        }                          
    });
}

export function useEliminarSala(){   //pa "eliminar" una sala
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.patch(`/sala/${id}`)
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['salasCreadas']});
        }                        
    });

}