import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';

export interface Pruebahorario {
    id_asignatura: number;
    id_profesores: number[];//id del profe
    profesores?: string[]; 
    id_salas: number[];//id de la sala
    salas?: string[]; 
    horario: string;
    nivel: number;
    nombre: string;
    profesor_error:boolean;
    dia: number;
    eliminado:boolean;
    celdaid: string;
}

export interface errorDetalle {
    id_asignatura: number;
    celdaid: string;
    tipo: string;
    mensaje: string;
}

export interface CategoriaError {
    errores: number;
    detalles: errorDetalle[];
}

export interface Resultadoerrores {
    errores_graves: CategoriaError;
    errores_moderados: CategoriaError;
    errores_leves: CategoriaError;
    calidad: number;
    detalles: errorDetalle[];
}




export function useCalcularErrores() {
    return useMutation<Resultadoerrores,Error,Pruebahorario[]>({
        mutationFn: async (pruebas: Pruebahorario[]) => {
            const respuesta = await api.patch('/calendario/analizar-errores', {pruebas});
            return respuesta.data;
        },
    });
}