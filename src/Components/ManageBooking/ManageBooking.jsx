import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitles from "../SectionTitles/SectionTitles";

const ManageBooking = () => {
    const axiosSecure = useAxiosSecure();
    const { data } = useQuery({
        queryKey: ['Bookings'],
        queryFn: () =>
            axiosSecure.get(`allBookings`)
                .then(response => {
                    console.log(response.data);
                    return response.data;
                })
    })
    return (
        <div className="w-full md:px-24 px-6">
            <SectionTitles heading="Manage All bookings" subHeading="at a glance"></SectionTitles>
            <div className="overflow-x-auto rounded-xl bg-base-300 md:px-20 md:pb-10 pb-6">
                <div className='md:p-10 p-6'>
                    <h3 className="text-3xl Cinzel uppercase my-5">Total Items : {data?.length}</h3>
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>User Email</th>
                                <th>Phone Number</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Person</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.map((item, index) => <tr key={item._id}>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.email}
                                    </td>
                                    <td>
                                        {item.phone}
                                    </td>
                                    <td className="text-right">{item.date}</td>
                                    <td>
                                        {item.time}
                                    </td>
                                    <td>
                                        {item.guest}
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBooking;