import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchAllProker(search) {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["proker", search],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getAllProker?search=${search}`);
            return res.data;
        },
        retry: 1,
        staleTime: 1000 * 60 * 5, // 5 menit
    });

    return {
        loading,
        proker: data,
        error
    }
}
