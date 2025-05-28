import {useMutation} from '@tanstack/react-query';
import api from '../api/axios';

interface Fechadata {
    dia: number;
    fecha: Date | null;
}

interface Confirmarcalendario {
    nombre: string;
    id_usuario: number;
    fecha_creacion: string;
    fechas: Fechadata[];
    calendario: {[key: string]: any[]};
}

export function useConfirmarCalendario() {
    return useMutation({
        mutationFn: async ({nombre, id_usuario, fecha_creacion, fechas, calendario}: Confirmarcalendario) => {

            const respuesta = await api.post('/calendario', {
                nombre,
                id_usuario,
                fecha_creacion,
            });

            const id_calendario = respuesta.data.id;


            for (const f of fechas) {
                if(f.fecha) {
                    await api.post('/columna', {
                        dia: f.dia,
                        fecha: f.fecha.toISOString().split('T')[0],
                        id_calendario,
                    });
                }
            }


            for (const [pruebas] of Object.values(calendario)) {
                for (const prueba of pruebas) {
                    const respuestaPrueba = await api.post('/prueba', {
                        nrc: prueba.nrc,
                        nombre: prueba.nombre,
                        nivel: prueba.nivel,
                        profesor: prueba.profesor,
                        horario: prueba.horario,
                        sala: prueba.sala,
                        dia: prueba.dia,
                        profesor_error: prueba.profesor_error,
                        asignatura: prueba.id,
                        eliminado: prueba.eliminado ?? false,
                        id_calendario
                    });
                }
            }
        },
    });
}