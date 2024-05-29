import { useForm } from 'react-hook-form';
import Cover from '../../Components/Cover/Cover';
import SectionTitles from '../../Components/SectionTitles/SectionTitles';
import image from '../../assets/contact/banner.jpg'
import { FaClock, FaLocationPin, FaPhone, FaTelegram } from 'react-icons/fa6';
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import Process from '../../Components/Foodcard/Process';

const Contact = () => {
    const [captchaToken, setToken] = useState(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const axiosPublic = useAxiosPublic()
    const [process, setProcess] = useState(false);


    if (process) {
        return (
            <Process></Process>
        )
    }

    const onSubmit = (data) => {
        setProcess(true)
        console.log(data);
        if (!captchaToken) {
            alert('Please complete the reCAPTCHA');
            return;
        }
        axiosPublic.post('contactus', { ...data, captchaToken })
            .then(response => {
                console.log('clicked');
                if (response.data.result.insertedId) {
                    setProcess(false)
                    console.log(response.data.result.insertedId);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Sent",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                reset();
            })
    }


    function onChange(value) {
        console.log("Captcha value:", value);
        setToken(value);
    }

    return (
        <div className='max-w-screen-xl mx-auto'>
            <Cover img={image} title={'Contact Us'}></Cover>
            <div className="lg:px-0 px-6">
                <SectionTitles subHeading={"Visit Us"} heading={"Our Location"}></SectionTitles>
                <div className="my-20 grid md:grid-cols-3 grid-cols-1 gap-6">
                    <div className='border border-[#F3F3F3] pb-6'>
                        <div className='bg-[#D1A054] p-6'>
                            <FaPhone color='white' className='mx-auto' size={'1.5rem'} ></FaPhone>
                        </div>
                        <div className='bg-[#F3F3F3] mx-6 text-center p-10'>
                            <h3 className='text-3xl'>Phone</h3>
                            <p className='text-sm mt-4'>+8801726108060</p>
                        </div>
                    </div>
                    <div className='border border-[#F3F3F3] pb-6'>
                        <div className='bg-[#D1A054] p-6'>
                            <FaLocationPin color='white' className='mx-auto' size={'1.5rem'} ></FaLocationPin>
                        </div>
                        <div className='bg-[#F3F3F3] mx-6 text-center p-10'>
                            <h3 className='text-3xl'>Address</h3>
                            <p className='text-sm mt-4'>Bangladesh</p>
                        </div>
                    </div>
                    <div className='border border-[#F3F3F3] pb-6'>
                        <div className='bg-[#D1A054] p-6'>
                            <FaClock color='white' className='mx-auto' size={'1.5rem'} ></FaClock>
                        </div>
                        <div className='bg-[#F3F3F3] mx-6 text-center p-10'>
                            <h3 className='text-3xl'>Working Hours</h3>
                            <p className='text-sm mt-4'>24/7</p>
                        </div>
                    </div>
                </div>
                <SectionTitles subHeading={"Send us Message"} heading={"Contact Us"}></SectionTitles>
                <div className='md:px-24'>
                    <form
                        className="flex flex-col px-5 md:px-20 py-16 mt-10 md:mt-11 w-full text-xl font-semibold bg-zinc-100 max-w-[1320px] text-neutral-700"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-wrap md:flex-nowrap gap-5 justify-between mt-3">
                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="nameInput" className="mb-2">Name</label>
                                <input
                                    className="grow justify-center items-start px-9 py-4 bg-white rounded-lg border border-gray-200 border-solid text-neutral-700"
                                    type="text"
                                    id="nameInput"
                                    placeholder="Enter your name"
                                    aria-label="Enter your name"
                                    {...register('name', { required: 'Name is required' })}
                                />
                                {errors.name && <span className="text-red-600">{errors.name.message}</span>}
                            </div>

                            <div className="flex flex-col w-full md:w-1/2">
                                <label htmlFor="emailInput" className="mb-2">Email</label>
                                <input
                                    className="grow justify-center items-start px-9 py-4 bg-white rounded-lg border border-gray-200 border-solid text-neutral-700"
                                    type="email"
                                    id="emailInput"
                                    placeholder="Enter your email"
                                    aria-label="Enter your email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                            </div>
                        </div>

                        <div className="flex flex-col mt-7">
                            <label htmlFor="phoneInput" className="mb-2">Phone</label>
                            <input
                                className="justify-center items-start px-9 py-4 text-base bg-white rounded-lg border border-gray-200 border-solid text-neutral-700"
                                type="tel"
                                id="phoneInput"
                                placeholder="Enter your phone number"
                                aria-label="Enter your phone number"
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^\d{11}$/,
                                        message: 'Invalid phone number',
                                    },
                                })}
                            />
                            {errors.phone && <span className="text-red-600">{errors.phone.message}</span>}
                        </div>

                        <div className="flex flex-col mt-7">
                            <label htmlFor="messageInput" className="mb-2">Message</label>
                            <textarea
                                className="items-start px-9 pt-8 pb-32 text-base bg-white rounded-lg border border-gray-200 border-solid text-neutral-700"
                                id="messageInput"
                                placeholder="Write your message here"
                                aria-label="Write your message here"
                                {...register('message', { required: 'Message is required' })}
                            ></textarea>
                            {errors.message && <span className="text-red-600">{errors.message.message}</span>}
                        </div>

                        <div className="mt-6">
                            <ReCAPTCHA
                                sitekey={import.meta.env.VITE_SITE_KEY}
                                onChange={onChange}
                            />
                        </div>

                        <button
                            type="submit"
                            className="flex gap-2.5 self-center px-6 py-4 mt-6 md:mt-10 font-bold text-white" style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                        >
                            <span className="grow">Send Message</span>
                            <FaTelegram size={'2rem'} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;