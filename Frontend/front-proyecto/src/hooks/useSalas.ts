import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';

interface SalaData
{
    nombre: string;
}

interface CrearResponse
{
    message : string;
}

export function useSalas() {    //pa listar las salas.
    return useQuery({
        queryKey: ['salas'],
        queryFn: async () => {
            const respuesta = await api.get('api/v1/sala');
            return respuesta.data;
        }
    });
}

export function useCrearSala(onSuccess: () => void, onFail:(error:string)=>void){ 
    const clienteQuery = useQueryClient();
    return useMutation<CrearResponse,AxiosError,SalaData>({
        mutationFn: async ({nombre}:SalaData): Promise<CrearResponse>  => {
            const respuesta = await api.post('api/v1/sala',{nombre});
            return respuesta.data
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['sala']});
            onSuccess();
        },
        onError:(error) => {
            const mensaje = (error.response?.data as {message?: string})?.message || 'no se pudo identificar el error...';
            onFail(mensaje);
        }                           
    });
}

export function useEliminarSala(){   //pa "eliminar" una sala
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.patch(`api/v1/sala/${id}`)
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['sala']});
        }                        
    });

}