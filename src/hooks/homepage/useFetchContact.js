import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export function useFetchContact() {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await axiosInstance.get('/getContact')
            return res.data.data
        },
        staleTime: 1000 * 60 * 10, // 10 menit
    })

    return {
        dataContact: data,
        loading,
        error
    }
}
