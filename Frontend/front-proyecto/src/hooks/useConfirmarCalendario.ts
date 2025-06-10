import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';

/*interface Fechadata {
    dia: number;
    fecha: Date | null;
}*/

interface Confirmarcalendario {
    nombre: string;
    id_usuario: number;
    fecha_creacion: string;
    pruebas: {id_asignatura: number; id_columna: number; horario: string; id_profesor: number; id_sala: number; profesor_error: boolean; eliminado: boolean}[];
    columnas: {dia: number; fecha: string | null}[];
   //columnas: [dia: number, fecha: string | ''][];

}

export function useConfirmarCalendario() {
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async ({nombre, id_usuario, fecha_creacion, pruebas, columnas}: Confirmarcalendario) => {

            const respuesta = await api.post('/calendario', {
                nombre,
                id_usuario,
                fecha_creacion,
            });
            
            const id_calendario = respuesta.data;
            console.log(id_calendario);

            /*for(const columna of columnas){
                await api.post('/columnas', {
                    id_calendario,
                    dia: columna.dia,
                    fecha: columna.fecha
                });
            }*/

            
            await api.post('/columnas', {
                calendarioId: id_calendario,
                columnas
            });
            
            console.log(pruebas);
            
            /*for (const prueba of pruebas) {
                await api.post('/evaluacion', {
                    id_asignatura: prueba.id_asignatura,
                    id_columna: prueba.id_columna,
                    horario: prueba.horario,
                    id_profesor: prueba.id_profesor,
                    id_sala: prueba.id_sala,
                    profesor_error: prueba.profesor_error,
                    eliminado: prueba.eliminado ?? false,
                    id_calendario
                });
            }*/
          
            await api.post('/evaluacion', {
                calendarioId: id_calendario,
                pruebas
            });
            
            console.log(respuesta.data)
            return {id: id_calendario};
            
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['calendarios']});
        }
    });
}