import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';


interface Forgotdata {
    correo: string;
}

interface Forgotresponse{
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