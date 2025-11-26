import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from "../../lib/axios";

const useFetchPost = (search, page) => {
    const { data = { data: [], last_page: 1 }, isLoading: loading, error } = useQuery({
        queryKey: ["posts", search, page],
        queryFn: async () => {
            const res = await axiosInstance.get(`/getAllPost?search=${search}&page=${page}`);
            return res.data;
        },
        staleTime: 1000 * 60 * 5, // 5 menit
    });

    return {
        loading,
        posts: data.data,
        totalPages: data.last_page,
        error
    };
};

export default useFetchPost;
