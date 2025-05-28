import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';

export interface Pruebahorario {
    id_asignatura: number;
    profesor: number; //id del profe
    sala: number; //id de la sala
    horario: string;
    nivel: number;
    nombre: string;
    profesor_error:boolean;
    dia: number;
    eliminado:boolean
}

export interface Resultadoerrores {
    errores_graves: number;
    errores_moderados: number;
    errores_leves:number;
    calidad:number;
}

export function useCalcularErrores() {
    return useMutation<Resultadoerrores,Error,Pruebahorario[]>({
        mutationFn: async (pruebas: Pruebahorario[]) => {
            const respuesta = await api.post('/calendario/errores', {pruebas});
            return respuesta.data;
        },
    });
}