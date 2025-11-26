import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export function useFetchActiveProker() {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["proker", "active"],
        queryFn: async () => {
            const res = await axiosInstance.get('/getProkerActive')
            return res.data.data
        },
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        dataActiveProker: data,
        loading,
        error
    }
}
