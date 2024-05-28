import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const { data: menu = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['Menu'],
        queryFn: () =>
            axiosPublic.get(`menu`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { menu, isPending, isLoading, refetch }
};

export default useMenu;