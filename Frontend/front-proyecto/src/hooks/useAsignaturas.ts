import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';


interface AsignaturaCreadaData
{
    nrc: string;
    nivel: number;
    nombre: string;
    creado: boolean;
    id_carrera: number;
}

export interface Carrera {
    id: number;
    nombre: string;
}

export function useAsignaturas(){
    return useQuery({
        queryKey:['asignaturas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignatura');  
            return respuesta.data;
        }
    });
}

export function useAsignaturasPorCarrera(idCarrera?: number) {
    return useQuery({
        queryKey: ['asignaturas', idCarrera],
        queryFn: async() => {
            const respuesta = await api.get(`/asignatura/carrera/${idCarrera}`);
            return respuesta.data
        },
        enabled: !!idCarrera,
        retry: false,
    })
}

export function useAsignaturasCreadasPorCarrera(idCarrera?: number) {
    return useQuery({
        queryKey: ['asignaturasCreadas', idCarrera],
        queryFn: async() => {
            const respuesta = await api.get(`/asignatura/carrera/${idCarrera}`);
            return respuesta.data
        },
        enabled: !!idCarrera
    })
}


export function useCarreras(){
    return useQuery({
        queryKey:['carreras'],
        queryFn: async () => {
            const respuesta = await api.get('/carrera');  
            return respuesta.data;
        }
    });
}



export function useAsignaturasCreadas(){
    return useQuery({
        queryKey:['asignaturasCreadas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignatura/creadas');  
            return respuesta.data;
        }
    });
}

export function useCrearAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nrc, nivel, nombre, creado, id_carrera}: AsignaturaCreadaData) => {
            const respuesta = await api.post('/asignatura',{nrc,nivel,nombre, creado, id_carrera});
            return respuesta.data;
        },
        onSuccess: (_data) => {
            clienteQuery.invalidateQueries({queryKey:['asignaturasCreadas']});
            clienteQuery.invalidateQueries({queryKey:['carreras']});
        },
    });
}

export function useEliminarAsignatura(){   //pa "eliminar" una asignatura creada
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({id}:{id: number}) => {
            await api.patch(`/asignatura/eliminar/${id}`)
        },
        onSuccess: (_data) => {
            clienteQuery.invalidateQueries({queryKey:['asignaturasCreadas']});
            clienteQuery.invalidateQueries({queryKey:['carreras']});
        }                        
    });

}
