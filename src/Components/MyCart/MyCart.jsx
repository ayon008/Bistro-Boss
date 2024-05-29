import SectionTitles from '../SectionTitles/SectionTitles';
import useOrders from '../../Hooks/useOrders';
import { FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Process from '../Foodcard/Process';

const MyCart = () => {
    const { orderItems, refetch } = useOrders();
    const axiosSecure = useAxiosSecure();
    const totalPrice = orderItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    console.log(totalPrice);
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
                axiosSecure.delete(`order/${id}`)
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
    const navigate = useNavigate();
    console.log(orderItems);
    return (
        <div className='w-full'>
            <SectionTitles heading={'WANNA ADD MORE?'} subHeading={'My Cart'}></SectionTitles>
            <div className="overflow-x-auto w-[80%] mx-auto my-10">
                <div className='flex justify-around items-center my-6'>
                    <h3 className='text-2xl Cinzel font-bold'>TOTAL ORDERS : {orderItems.length}</h3>
                    <h3 className='text-2xl Cinzel font-bold'>TOTAL PRICE : ${totalPrice?.toFixed(2)}</h3>
                    <button onClick={() => navigate('/dashboard/payment')} className='btn bg-[#D1A054] font-semibold text-white'>PAY</button>
                </div>
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='bg-[#D1A054] text-white' >
                            <th>#</th>
                            <th>ITEM IMAGE</th>
                            <th>ITEM NAME</th>
                            <th>PRICE</th>
                            <th>ACTION</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderItems?.map((order, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={order?.image} />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <h3>{order?.name}</h3>
                                        </td>
                                        <td>${order?.price}</td>
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
    );
};

export default MyCart;