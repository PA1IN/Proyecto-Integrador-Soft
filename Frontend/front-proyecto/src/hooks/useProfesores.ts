import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';

interface ProfesorData
{
    nombre: string;
}

interface CrearResponse
{
    message : string;
}

export function useProfesores() {    //pa listar los profesores.
    return useQuery({
        queryKey: ['profesores'],
        queryFn: async () => {
            const respuesta = await api.get('api/v1/profesor');
            return respuesta.data;
        }
    });
}

export function useCrearBoleta (onSuccess: () => void, onFail:(error:string)=>void){ 
    const clienteQuery = useQueryClient();
    return useMutation<CrearResponse,AxiosError,ProfesorData>({
        mutationFn: async ({nombre}:ProfesorData): Promise<CrearResponse>  => {
            const respuesta = await api.post('api/v1/profesor',{nombre});
            return respuesta.data
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['profesor']});
            onSuccess();
        },
        onError:(error) => {
            const mensaje = (error.response?.data as {message?: string})?.message || 'no se pudo identificar el error...';
            onFail(mensaje);
        }                           
    });
}

export function useEliminarProfe(){   //pa "eliminar" un profesor
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.patch(`api/v1/profesor/${id}`)
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['profesor']});
        }                        
    });

}

