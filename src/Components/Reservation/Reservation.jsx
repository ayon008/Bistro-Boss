import { FaClipboard } from "react-icons/fa";
import SectionTitles from "../SectionTitles/SectionTitles";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const validationSchema = Yup.object().shape({
    date: Yup.string().required('Date is required'),
    time: Yup.string().required('Time is required'),
    guest: Yup.string().required('Guest is required'),
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
});

const Reservation = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        const reservation = { ...data, userEmail: user?.email }
        axiosSecure.post('bookings', reservation)
            .then(response => {
                if (response.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Booked Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    reset();
                }
            })
    };

    return (
        <div className="w-full">
            <SectionTitles heading={'Book a table'} subHeading={'Reservation'}></SectionTitles>
            <form className="self-stretch mt-16 p-10 max-w-full md:max-w-3xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex md:flex-nowrap flex-wrap gap-5">
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="date" className="text-xl font-semibold text-neutral-700">Date*</label>
                        <div className="flex justify-between mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-400">
                            <input type="date" id="date" placeholder="mm/dd/yyyy" className="w-full px-6 py-4" aria-label="Date" {...register('date')} />
                        </div>
                        {errors.date && <p className="text-red-600">{errors.date.message}</p>}
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="time" className="text-xl font-semibold text-neutral-700">Time*</label>
                        <div className="flex justify-between mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-400">
                            <input type="time" id="time" className="w-full px-6 py-4" aria-label="Time" {...register('time')} />
                        </div>
                        {errors.time && <p className="text-red-600">{errors.time.message}</p>}
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="guest" className="text-xl font-semibold text-neutral-700">Guest*</label>
                        <div className="mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-500">
                            <select id="guest" className="w-full p-4" {...register('guest')}>
                                <option value="" disabled selected>1 Person</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        {errors.guest && <p className="text-red-600">{errors.guest.message}</p>}
                    </div>
                </div>
                <div className="flex md:flex-nowrap flex-wrap gap-5 mt-7">
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="name" className="text-xl font-semibold text-neutral-700">Name*</label>
                        <div className="mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-400">
                            <input type="text" id="name" className="w-full px-6 py-4" placeholder="Your Name" aria-label="Name" {...register('name')} />
                        </div>
                        {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="phone" className="text-xl font-semibold text-neutral-700">Phone*</label>
                        <div className="mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-400">
                            <input type="text" id="phone" className="w-full px-6 py-4" placeholder="Phone Number" aria-label="Phone" {...register('phone')} />
                        </div>
                        {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}
                    </div>
                    <div className="flex flex-col w-full md:w-1/3">
                        <label htmlFor="email" className="text-xl font-semibold text-neutral-700">Email*</label>
                        <div className="mt-5 text-base bg-white rounded-lg border border-gray-200 text-neutral-400">
                            <input type="email" className="w-full px-6 py-4" id="email" placeholder="Email" aria-label="Email" {...register('email')} />
                        </div>
                        {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                    </div>
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2.5 px-6 py-4 mt-10 w-full md:w-auto mx-auto font-bold text-white"
                    style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                >
                    <span className="grow text-center">Book a Table</span>
                    <FaClipboard />
                </button>
            </form>
        </div>
    );
};

export default Reservation;