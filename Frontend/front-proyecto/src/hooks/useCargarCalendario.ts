import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export function useCargarCalendario(id_calendario: number | undefined) { 
    return useQuery({
        queryKey:["calendario", id_calendario],
        queryFn: async () => {
            const respuesta = await api.get(`/calendario/${id_calendario}`);
            return respuesta.data;
        },
        enabled: id_calendario !== undefined && id_calendario !== null,
        gcTime: 1000 * 60 * 30,
        staleTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}