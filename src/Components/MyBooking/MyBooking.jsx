import SectionTitles from '../SectionTitles/SectionTitles';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import useBookings from '../../Hooks/useBookings';
import { useState } from 'react';
import Process from '../Foodcard/Process';

const MyBooking = () => {
    const { bookings, refetch } = useBookings();
    const axiosSecure = useAxiosSecure();
    const [process, setProcess] = useState(false);


    if (process) {
        return (
            <Process></Process>
        )
    }
    const handleDelete = id => {
        setProcess(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`bookings/${id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            setProcess(false)
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        refetch();
                    })

            }
        })

    }

    return (
        <div className='w-full'>
            <SectionTitles heading={'My bookings'} subHeading={'Excellent Ambience'}></SectionTitles>
            <div className="overflow-x-auto w-[80%] mx-auto my-10">
                <div className='flex justify-around items-center my-6'>
                    <h3 className='text-2xl Cinzel font-bold'>TOTAL BOOKINGS : {bookings.length}</h3>
                    <button className='btn bg-[#D1A054] font-semibold text-white'>PAY</button>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white' >
                            <th>#</th>
                            <th>TIME</th>
                            <th>DATE</th>
                            <th>NAME</th>
                            <th>GUEST</th>
                            <th>PHONE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings?.map((order, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            {order?.time}
                                        </td>
                                        <td>
                                            {order?.date}
                                        </td>
                                        <td>
                                            <h3>{order?.name}</h3>
                                        </td>
                                        <td>{order?.guest}</td>
                                        <td>{order?.phone}</td>
                                        <th>
                                            <button onClick={() => handleDelete(order?._id)} className="btn bg-red-600 text-white"><FaTrash /></button>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default MyBooking;