import {useQuery} from '@tanstack/react-query';
import api from '../api/axios';

export interface Subject{
    nrc: number;
    nombre: string;
    nivel: string;
}


export function useSubjects() {
    return useQuery<Subject[]>({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res = await api.get('/api/v1/auth/asignatura');
            return res.data; // tiene que venir un array de asignaturas pa q funcione
        }
    });
}