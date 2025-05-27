import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';

interface Subject{
    nrc: number;
    nivel: string;
    nombre: string;
}


/*export function useSubjects() {
    return useQuery({
        queryKey: ['subjects'],
        queryFn: async () => {
            const res = await api.get('/asignatura');
            return res.data; // tiene que venir un array de asignaturas pa q funcione
        }
    });
}*/



export function useCrearSubjects() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nrc,nivel,nombre}:Subject) => {
            const respuesta = await api.post('asignatura',{nrc,nivel,nombre}); //sapear backend pa cambiar el endpoint
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['subjects']});
        },
    });
}


//metodos de post y get pa añadir y listar asignaturas de la base de datos fija