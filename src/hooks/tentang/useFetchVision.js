import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchVision() {
  const { data = [], isLoading: loading, error } = useQuery({
    queryKey: ["vision"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/getVision`);
      return res.data.data
    },
    staleTime: 1000 * 60 * 10,
  });

  return {
    dataVision: data,
    loadingVision: loading,
    error
  }
}
