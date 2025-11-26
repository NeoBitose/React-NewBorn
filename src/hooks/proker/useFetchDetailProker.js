import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchDetailProker(slug) {
  const { data = {}, isLoading: loading, error } = useQuery({
    queryKey: ["proker", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getDetailProker/${slug}`)
      return res.data.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 menit
  })

  return {
    dataDetailProker: data,
    loadingDetailProker: loading,
    error
  }
}
