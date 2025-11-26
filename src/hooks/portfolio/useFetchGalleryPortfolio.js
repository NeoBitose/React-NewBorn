import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export function useFetchGalleryPortfolio(slug) {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["portfolio", slug, "gallery"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getGalleryPortfolio/${slug}`)
            return res.data.data
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        dataGalleryPortfolio: data,
        loadingGalleryPortfolio: loading,
        error
    }
}
