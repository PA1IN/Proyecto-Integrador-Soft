import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';

interface Subject{
    nrc: number;
    nombre: string;
    nivel: string;
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

export function useSubjects() {
  return {
    data: [
      {
        nrc: 101,
        nombre: 'Álgebra Lineal',
        nivel: 1,
        profesor: 'Prof. Daniel perez',
        horario: '08:10-09:20',
        sala: 'A101',
        lab: 'N/A'
      },
      {
        nrc: 102,
        nombre: 'Programación I',
        nivel: 1,
        profesor: 'Ing. Boris rubio',
        horario: '09:55-13:10',
        sala: 'B204',
        lab: 'Lab C'
      },
      {
        nrc: 201,
        nombre: 'Física I',
        nivel: 2,
        profesor: 'Prof. Vicente ruiz',
        horario: '09:55-11:20',
        sala: 'C301',
        lab: 'Lab F'
      },
      {
        nrc: 301,
        nombre: 'Bases de Datos',
        nivel: 3,
        profesor: 'Ing. Americo pucio',
        horario: '08:10-20:00',
        sala: 'online',
        lab: '-'
      },
      {
        nrc: 302,
        nombre: 'Redes de Computadores',
        nivel: 3,
        profesor: 'Ing. Carlos Ramírez',
        horario: '16:15-17:45',
        sala: 'D112',
        lab: 'Lab Net'
      }
    ]
  };
}



export function useCrearSubjects() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nrc,nombre,nivel}:Subject) => {
            const respuesta = await api.post('asignatura',{nrc,nombre,nivel}); //sapear backend pa cambiar el endpoint
            return respuesta.data;
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['subjects']});
        },
    });
}


//metodos de post y get pa añadir y listar asignaturas de la base de datos fija