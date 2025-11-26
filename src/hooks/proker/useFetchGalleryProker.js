import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchGalleryProker(slug) {
  const { data = [], isLoading: loading, error } = useQuery({
    queryKey: ["proker", slug, "gallery"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getGalleryProker/${slug}`)
      return res.data.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 menit
  })

  return {
    dataGalleryProker: data,
    loadingGalleryProker: loading,
    error
  }
}
