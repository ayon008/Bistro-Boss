import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loader } = useAuth();
    const { data: admin, isPending } = useQuery({
        queryKey: ['Admin'],
        enabled: !loader,
        queryFn: () =>
            axiosSecure.get(`user/admin/${user.email}`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return { admin, isPending }
};

export default useAdmin;