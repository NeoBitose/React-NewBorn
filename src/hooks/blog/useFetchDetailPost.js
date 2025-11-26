import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchDetailPost(slug) {
    const { data = {}, isLoading: loading, error } = useQuery({
        queryKey: ["posts", slug],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getDetailPost/${slug}`)
            return res.data.data
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        dataDetailPost: data,
        loadingDetailPost: loading,
        error
    }
}
