import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from "../../lib/axios";

const useFetchStaff = (period, role) => {
    const { data = [], isLoading: loading, error } = useQuery({
        queryKey: ["staff", period, role],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getStaff?period=${period}&role=${role}`);
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 menit
    });

    return { loading, staff: data, error };
};

export default useFetchStaff;
