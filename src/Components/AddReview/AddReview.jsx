import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import SectionTitles from '../SectionTitles/SectionTitles';
import Rating from 'react-rating';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddReview = () => {
    const [rating, setRating] = useState(0);
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const onSubmit = (data) => {
        const review = { ...data, rating, userEmail: user?.email };
        axiosSecure.post('reviews', review)
            .then(response => {
                console.log(response);
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
        console.log(review);
    };

    return (
        <div className='w-full'>
            <SectionTitles heading={'Sharing is Caring'} subHeading={'Give a review'}></SectionTitles>
            <div className='w-full md:p-20 p-6'>
                <div className='w-full bg-base-300 md:p-20 p-6'>
                    <form className="flex flex-col max-w-full w-[840px]" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="self-center text-center text-3xl font-medium text-neutral-900">Rate US!</h2>
                        <div className='w-fit mx-auto mt-4'>
                            <Rating
                                stop={5}
                                emptySymbol={<FaStar color="white" size={50} />}
                                fullSymbol={<FaStar color="#ffc107" size={50} />}
                                onChange={(rate) => setRating(rate)}
                                initialRating={rating}
                                required
                            />
                        </div>
                        <label htmlFor="mostLikedRecipe" className="font-bold mt-20 max-md:mt-10 max-md:max-w-full">Which recipe you liked most?</label>
                        <input
                            id="mostLikedRecipe"
                            className="justify-center items-start px-8 py-7 mt-4 text-base bg-white rounded-lg text-neutral-400 max-md:px-5 max-md:max-w-full"
                            type="text"
                            placeholder="Recipe you liked most"
                            aria-label="Recipe you liked most"
                            {...register('mostLikedRecipe', { required: 'This field is required' })}
                        />
                        {errors.mostLikedRecipe && <p className="text-red-600">{errors.mostLikedRecipe.message}</p>}

                        <label htmlFor="suggestion" className="font-bold mt-7 max-md:max-w-full">Do you have any suggestion for us?</label>
                        <input
                            id="suggestion"
                            className="justify-center items-start px-8 py-7 mt-4 text-base whitespace-nowrap bg-white rounded-lg text-neutral-400 max-md:px-5 max-md:max-w-full"
                            type="text"
                            placeholder="Suggestion"
                            aria-label="Suggestion"
                            {...register('suggestion')}
                        />

                        <label htmlFor="reviewDetail" className="font-bold mt-7 max-md:max-w-full">Kindly express your care in a short way.</label>
                        <textarea
                            id="reviewDetail"
                            className="items-start px-8 pt-8 pb-32 mt-4 text-base bg-white rounded-lg text-neutral-400 max-md:px-5 max-md:pb-10 max-md:max-w-full"
                            placeholder="Review in detail"
                            aria-label="Review in detail"
                            {...register('reviewDetail', { required: 'This field is required' })}
                        ></textarea>
                        {errors.reviewDetail && <p className="text-red-600">{errors.reviewDetail.message}</p>}

                        <button
                            type="submit"
                            className="flex gap-2.5 self-center px-6 py-4 mt-8 font-bold text-white max-md:px-5 max-md:mt-10"
                            style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                        >
                            <span className="grow">Send A Review</span>
                            <FaMessage size={'2rem'} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddReview;