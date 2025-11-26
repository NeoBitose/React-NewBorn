import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export function useFetchAllPortfolio(search, page) {
    const { data = { data: [], last_page: 1 }, isLoading: loading, error } = useQuery({
        queryKey: ["portfolio", search, page],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getAllPortfolio?search=${search}&page=${page}`);
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 menit
    });

    return {
        loading,
        portfolio: data.data,
        totalPages: data.last_page,
        error
    };
}

