import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';


interface Forgotdata {
    email: string;
}

interface Reemplazo {
    email: string;
    newPassword: string;
}

interface Forgotresponse {
    message: string;
}

interface respuestaCambiarPassword {
    message: string;
}

interface VerificacionResponse {
    email: string;
}

export function useForgotPassword(onSuccess: () => void,onFail: (error: string) => void) {
    const clienteQuery = useQueryClient();
    return useMutation<Forgotresponse,AxiosError,Forgotdata>({
        mutationFn: async ({email}:Forgotdata): Promise<Forgotresponse> => {
            const respuesta = await api.patch('/auth/enviarCorreo',{email});
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
    const verifyToken = useMutation<VerificacionResponse, AxiosError, string>({
        mutationFn: async (token: string) => {
            const respuesta = await api.get(`user/user/${token}`);
            return respuesta.data;
        }
    });
    
    return {
        mutate: verifyToken.mutate,
        isPending: verifyToken.isPending,
        error: verifyToken.error,
        data: verifyToken.data
    };
}

export function useCambiarPassword() {
    const mutation = useMutation<respuestaCambiarPassword, AxiosError, Reemplazo>({
        mutationFn: async ({ email, newPassword }: Reemplazo) => {
            const respuesta = await api.patch(`/auth/recuperarContrasena`, { email, newPassword });
            return respuesta.data;
        }
    });
    
    return {
        mutate: mutation.mutate,
        isPending: mutation.isPending, 
        error: mutation.error,
        data: mutation.data
    };
}