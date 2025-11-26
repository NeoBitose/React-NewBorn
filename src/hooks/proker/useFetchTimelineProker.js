import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchTimelineProker(slug) {
  const { data = [], isLoading: loading, error } = useQuery({
    queryKey: ["proker", slug, "timeline"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getTimelineProker/${slug}`)
      return res.data.data
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // 5 menit
  })

  return {
    dataTimelineProker: data,
    loadingTimelineProker: loading,
    error
  }
}
