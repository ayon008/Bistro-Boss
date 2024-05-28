import { Link } from 'react-router-dom';
import useMenu from '../../Hooks/useMenu';
import SectionTitles from '../SectionTitles/SectionTitles';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageItems = () => {
    const { menu, refetch } = useMenu();
    const axiosSecure = useAxiosSecure();
    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`menu/${item._id}`);
                // console.log(res.data);
                if (res.data.deletedCount > 0) {
                    // refetch to update the ui
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }


            }
        });
    }
    return (
        <div className='w-full'>
            <SectionTitles heading="Manage All Items" subHeading="Hurry up"></SectionTitles>
            <div className='w-full md:px-20 px-6 pb-10'>
                <div className="overflow-x-auto bg-base-300 rounded-xl">
                    <div className='md:p-10 p-6'>
                        <h3 className="text-3xl Cinzel uppercase my-5">Total Items : {menu.length}</h3>
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        #
                                    </th>
                                    <th>Image</th>
                                    <th>Item Name</th>
                                    <th>Price</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    menu.map((item, index) => <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td className="text-right">${item.price}</td>
                                        <td>
                                            <Link to={`/dashboard/updateItems/${item._id}`}>
                                                <button
                                                    className="btn btn-ghost btn-lg bg-orange-500">
                                                    <FaEdit className="text-white 
                                        "></FaEdit>
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteItem(item)}
                                                className="btn btn-ghost btn-lg">
                                                <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                            </button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>


                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;