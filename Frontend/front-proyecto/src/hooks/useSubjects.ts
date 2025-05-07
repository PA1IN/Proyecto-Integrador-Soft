import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';

export interface Subject{
    nrc: number;
    nombre: string;
    nivel: string;
}


export function useSubjects() {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res = await api.get('/api/v1/auth/asignatura');
            return res.data; // tiene que venir un array de asignaturas pa q funcione
        }
    });
}


export function useCrearSubjects() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (nuevaSubject:{nrc: number,nombre: string,nivel:string}) => {
            const respuesta = await api.post('/api/v1/auth/asigntatura',nuevaSubject); //sapear backend pa cambiar el endpoint
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['subjects']});
        },
    });
}


//metodos de post y get pa añadir y listar asignaturas de la base de datos fija