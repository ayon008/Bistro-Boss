import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user, loader } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        enabled: !loader,
        queryFn: async () => {
            const res = await axiosSecure.get(`payments?email=${user.email}`)
            return res.data;
        }
    })

    return (
        <div className="w-full md:px-24 px-6">
            <div className="overflow-x-auto mx-auto my-10">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white' >
                            <th>#</th>
                            <th>EMAIL</th>
                            <th>PRICE</th>
                            <th className="uppercase">transactionId</th>
                            <th className="uppercase">date</th>
                            <th className="uppercase">status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments?.map((order, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            {order?.email}
                                        </td>
                                        <td>
                                            {order?.price}
                                        </td>
                                        <td>
                                            <h3>{order?.transactionId}</h3>
                                        </td>
                                        <td>{order?.date}</td>
                                        <td>{order?.status}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;