import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';


interface Forgotdata {
    correo: string;
}

interface Reemplazo {
    correo: string;
    password: string;
}

interface Forgotresponse{
    message: string                     //revisar back para modificar esta interfaz
}

interface respuestaCambiarPassword{
    message: string                     //revisar back para modificar esta interfaz
}

export function useForgotPassword(onSuccess: () => void,onFail: (error: string) => void) {
    return useMutation<Forgotresponse,AxiosError,Forgotdata>({
        mutationFn: async ({correo}:Forgotdata): Promise<Forgotresponse> => {
            const respuesta = await api.post('/api/v1/auth/forgotpassword',{correo});
            return respuesta.data;
        },
        onSuccess: () => {
            onSuccess();
        },
        onError:(error) => {
            const mensaje = (error.request?.data as {message:string})?.message || 'no se pudo identificar el problema';
            onFail(mensaje);
        }
    })
}

export function useRecibirVerificacion() {    
    return useQuery({
        queryKey: ['verificacion'],
        queryFn: async () => {
            const respuesta = await api.get('/api/v1/auth/forgotpassword');
            return respuesta.data;
        }
    });
}

export function useCambiarPassword() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({correo, password}:Reemplazo) => {
            await api.patch(`/api/v1/auth/forgotpassword`, {correo,password})
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['verificacion']});
        }                        
    });
}