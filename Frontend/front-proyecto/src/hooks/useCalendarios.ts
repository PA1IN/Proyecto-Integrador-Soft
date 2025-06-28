import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';

export interface Calendario {
    id_calendario: number;
    nombre: string;
    fecha_creacion: string;
    id_usuario: string;
}


export function useCalendarios(){
    return useQuery({
        queryKey:['calendarios'],
        queryFn: async () => {
            const respuesta = await api.get('/calendario');
            return respuesta.data.reverse();
        }
    });
}