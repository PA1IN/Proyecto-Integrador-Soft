import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query';
import api from '../api/axios';



export interface ColumnaResponse
{
    columnas: {id_columna: number; dia: number; fecha_inicio: string | null}[];

}



/*export function useCrearcolumna(onSuccess: () => void, onFail:(error:string)=>void){ 
    const clienteQuery = useQueryClient();
    return useMutation<CrearColumnaResponse,AxiosError,ColumnaData>({
        mutationFn: async ({dia,fecha,id_calendario}:ColumnaData): Promise<CrearColumnaResponse>  => {
            const respuesta = await api.post('api/v1/columna',{dia,fecha,id_calendario});
            return respuesta.data
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['columna']});
            onSuccess();
        },
        onError:(error) => {
            const mensaje = (error.response?.data as {message?: string})?.message || 'no se pudo identificar el error...';
            onFail(mensaje);
        }                           
    });
}*/

/*
export function useActualizarColumna(){   //en base al día y al id del calendario se modifica la fecha.
    const clienteQuery = useQueryClient();
    return useMutation({
        mutationFn: async (data: {dia: number, fecha: string, id_calendario: number}) => {
            await api.patch('api/v1/columna',{dia: data.dia, fecha: data.fecha ,id_calendario: data.id_calendario})
        },
        onSuccess: () => {
            clienteQuery.invalidateQueries({queryKey:['columna']});
        }                        
    });

}
*/

export function useCargarColumnas(id: number | undefined) {   //Carga las columnas del calendario (en base al id del calendario) en una lista para asignar sus datos en la matriz.
    return useQuery<ColumnaResponse>({
        queryKey: ['columnas', id],
        queryFn: async () => {
            const respuesta = await api.get(`/columnas/calendario/${id}`);
            console.log(respuesta.data.columnas);
            return respuesta.data[0];
        },
        enabled: id !== undefined && id !== null,
        gcTime: 1000 * 60 * 30,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}