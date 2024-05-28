import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loader } = useAuth();
    const { isPending, error, data: orderItems = [], refetch } = useQuery({
        queryKey: ['Orders'],
        enabled: !loader,
        queryFn: () =>
            axiosSecure.get(`orders?email=${user.email}`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { isPending, error, orderItems, refetch }
};

export default useOrders;