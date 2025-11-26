import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchMission() {
  const { data = [], isLoading: loading, error } = useQuery({
    queryKey: ["mission"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getMission`);
      return res.data.data
    },
    staleTime: 1000 * 60 * 10, // 10 menit
  });

  return {
    dataMission: data,
    loadingMission: loading,
    error
  }
}
