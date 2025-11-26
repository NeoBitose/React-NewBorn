import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "../../lib/axios"

export function useFetchGalleryPost(slug) {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["posts", slug, "gallery"],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getGalleryPost/${slug}`)
            return res.data.data
        },
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 menit
    })

    return {
        dataGalleryPost: data,
        loadingGalleryPost: loading,
        error
    }
}
