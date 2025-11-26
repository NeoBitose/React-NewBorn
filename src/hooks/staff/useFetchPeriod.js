import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchPeriod() {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["period"],
        queryFn: async () => {
            const res = await axiosInstance.get('/getAllPeriod')
            return res.data.data
        },
        staleTime: 1000 * 60 * 10, // 10 menit
    })

    return {
        data,
        loading,
        error
    }
}
