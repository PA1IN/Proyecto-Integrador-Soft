import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';



export function useAsignaturas() {
  return {
    data: [
      {
        nrc: 101,
        nombre: 'Álgebra Lineal',
        nivel: 1,
        profesor: 'Prof. Daniel perez',
        horario: '08:10-09:20',
        sala: 'A101'
      },
      {
        nrc: 102,
        nombre: 'Programación I',
        nivel: 1,
        profesor: 'Ing. Boris rubio',
        horario: '09:55-13:10',
        sala: 'B204'
      },
      {
        nrc: 201,
        nombre: 'Física I',
        nivel: 2,
        profesor: 'Prof. Vicente ruiz',
        horario: '09:55-11:20',
        sala: 'C301'
      },
      {
        nrc: 301,
        nombre: 'Bases de Datos',
        nivel: 3,
        profesor: 'Ing. Americo pucio',
        horario: '08:10-20:00',
        sala: 'online'
      },
      {
        nrc: 302,
        nombre: 'Redes de Computadores',
        nivel: 3,
        profesor: 'Ing. Carlos Ramírez',
        horario: '16:15-17:45',
        sala: 'D112'
      }
    ]
  };
}


/*export function useAsignaturas(){
    return useQuery({
        queryKey:['asignaturas'],
        queryFn: async () => {
            const respuesta = await api.get('/asignaturas');  //sapear el back pa añadir el endpoint de las asignaturas modificadas
            return respuesta.data;
        }
    })
}*/

export function useCrearAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (nuevaAsignatura:{nrc: number, nombre: string, nivel: string}) => {
            const respuesta = await api.post('/asignaturas',nuevaAsignatura);
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturas']});
        },
    });
}

export function useEliminarAsignatura() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (nivel: string) => {
            await api.delete(`/asignaturas/${nivel}`); //sapear el endpoint del dono pa las asignaturas modificables
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['asignaturas']});
        },
    });
}

//metodos post,get y delete para las asignaturas que se van a modificar
interface Diacalendario {
    dia: number;
    fecha: string;
}


export function useDias() {
    return useQuery<Diacalendario[]>({
        queryKey:['dias'],
        queryFn: async () => {
            const respuesta = await api.get('/columna');
            return respuesta.data; //poner el endpoint q deje el dono pa la tabla de columna pa que el json sea un array de objetos de esa tabla{{dia: number, fecha:date}}
        }
    })
}


export function useActualizarDias() {
    const clienteQuery = useQueryClient();

    return useMutation({
        mutationFn: async (dias: {dia: number; fecha: string}[]) => {
            await api.post('/columna', dias); // cambiar el endpoint pal q tenga el dono
        },
        onSuccess:() => {
            clienteQuery.invalidateQueries({queryKey: ['dias']});
        }
    });
}