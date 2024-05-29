import axios from "axios";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useOrders from "../../Hooks/useOrders";
import { useState } from "react";
import Process from "./Process";

const FoodCard = ({ data }) => {
    const { image, recipe, name, category, price } = data;
    const { user } = useAuth();
    const { refetch } = useOrders();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname;
    const [process, setProcess] = useState(false);


    if (process) {
        return (
            <Process></Process>
        )
    }

    const handleCart = () => {
        setProcess(true)
        if (user && user.email) {
            axiosSecure.post('orders', { image, recipe, name, category, price, email: user?.email })
                .then(response => {
                    if (response.data.insertedId) {
                        setProcess(false)
                        Swal.fire({
                            title: 'Ordered Successful',
                            showClass: {
                                popup: 'animate__animated animate__fadeInDown'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                        });
                        refetch();
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            })
                // Came from the sweetAlert button
                .then((result) => {
                    if (result.isConfirmed) {
                        console.log('clicked');
                        navigate('/login', { state: { from: pathName } })
                    }
                })
        }
    }
    return (
        <div className="card card-compact bg-base-100 shadow-xl w-fit rounded-none h-96">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body bg-[#F3F3F3]">
                <h2 className="text-center text-2xl font-semibold">{name}</h2>
                <p className="text-center">{recipe}</p>
                <div className="card-actions justify-center">
                    <button className="btn border-b-4 border-[#BB8506] text-[#BB8506] bg-[#F3F3F3] hover:bg-[#1F2937] uppercase" onClick={handleCart}>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;