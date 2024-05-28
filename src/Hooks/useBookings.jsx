import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loader } = useAuth();
    const { isPending, error, data: bookings = [], refetch } = useQuery({
        queryKey: ['Booking'],
        enabled: !loader,
        queryFn: () =>
            axiosSecure.get(`bookings?email=${user.email}`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { isPending, error, bookings, refetch }
};

export default useBookings;