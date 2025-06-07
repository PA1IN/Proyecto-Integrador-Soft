import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';

export interface Pruebahorario {
    id_asignatura: number;
    id_profesor: number;//id del profe
    profesor: string; 
    id_sala: number;//id de la sala
    sala: string; 
    horario: string;
    nivel: number;
    nombre: string;
    profesor_error:boolean;
    dia: number;
    eliminado:boolean;
    celdaid: string;
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
            const respuesta = await api.patch('/calendario/analizar-errores', {pruebas});
            return respuesta.data;
        },
    });
}