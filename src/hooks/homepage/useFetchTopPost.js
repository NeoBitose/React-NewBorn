import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchTopPost() {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["posts", "top"],
        queryFn: async () => {
            const res = await axiosInstance.get('/getTopPost')
            return res.data.data
        },
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        data,
        loading,
        error
    }
}
