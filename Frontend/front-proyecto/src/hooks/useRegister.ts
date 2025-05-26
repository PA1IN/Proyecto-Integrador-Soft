import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';
import { AxiosError } from 'axios';

interface Registerdata
{
    nombre: string;
    correo: string;
    rut: string;
    password: string;
}

interface Registerresponse
{
    message: string;
}

export function useRegister(onSuccess: () => void, onFail:(error:string)=>void) {
    return useMutation<Registerresponse,AxiosError,Registerdata>({
        mutationFn: async ({nombre, correo, rut, password}:Registerdata): Promise<Registerresponse> => {
            const respuesta = await api.post('/auth/register',{nombre, correo, rut, password});
            return respuesta.data;
        },
        onSuccess: () => {
            onSuccess();
        },
        onError:(error) => {
            const mensaje = (error.response?.data as {message?: string})?.message || 'no se pudo identificar el error xd';
            onFail(mensaje);
        }
    })
}
