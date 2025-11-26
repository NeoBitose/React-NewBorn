import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchDetailPortfolio(slug) {
    const { data = {}, isLoading: loading, error } = useQuery({
        queryKey: ["portfolio", slug],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getDetailPortfolio/${slug}`)
            return res.data.data
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        dataDetailPortfolio: data,
        loadingDetailPortfolio: loading,
        error
    }
}
