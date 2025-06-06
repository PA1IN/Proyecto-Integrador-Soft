import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useCargarCalendario(id_calendario: number) { 
    return useQuery({
        queryKey:["calendario", id_calendario],
        queryFn: async () => {
            const respuesta = await api.get(`/calendario/${id_calendario}`);
            return respuesta.data;
        }
    });
}