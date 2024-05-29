import { useForm } from "react-hook-form";
import SectionTitles from "../SectionTitles/SectionTitles";
import { FaUtensils } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import Process from "../Foodcard/Process";

const AddItems = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const imageHostingToken = import.meta.env.VITE_IMGBB
    console.log(imageHostingToken);
    const imageHostingUrl = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostingToken}`;
    const axiosSecure = useAxiosSecure()
    const [process, setProcess] = useState(false);
    if (process) {
        return (
            <Process></Process>
        )
    }
    const onSubmit = async (data) => {
        setProcess(true)
        const formData = new FormData();
        console.log(data);
        formData.append('image', data.image[0]);
        fetch(imageHostingUrl, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imageUrl = imgResponse.data.display_url;
                    const menuItem = data;
                    menuItem.image = imageUrl;
                    axiosSecure.post('/menu', menuItem)
                        .then(response => {
                            console.log(response);
                            if (response.data.insertedId) {
                                setProcess(false)
                                Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: `${data.recipeName} is added to the menu.`,
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                reset();
                            }
                        })
                }
            })

    };

    return (
        <div className="w-full md:m-10 md:px-24 pb-10">
            <SectionTitles heading="add an item" subHeading="What's new?" ></SectionTitles>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col self-stretch px-5 my-auto max-md:max-w-full">
                <div className="flex flex-col md:px-14 md:py-14 p-10 mt-8 bg-base-200 max-md:px-5 max-md:max-w-full shadow-lg rounded-lg">
                    <label htmlFor="recipeName" className="text-xl font-semibold text-neutral-700 max-md:max-w-full">Recipe name*</label>
                    <div className="flex flex-col mt-4 bg-white rounded-lg border border-gray-200 max-md:max-w-full">
                        <input
                            id="recipeName"
                            {...register('recipeName', { required: 'Recipe name is required' })}
                            className="self-start text-xl w-full text-neutral-400 input input-bordered max-md:max-w-full"
                            placeholder="Recipe name"
                        />
                        {errors.recipeName && <span className="text-red-600">{errors.recipeName.message}</span>}
                    </div>
                    <div className="flex mt-7 max-w-full text-xl font-semibold text-neutral-700  gap-6 max-md:flex-wrap md:flex-row flex-col">
                        <div className="flex flex-col md:w-1/2 w-full mt-6">
                            <label htmlFor="category" className="flex-auto mb-6">Category*</label>
                            <div>
                                <select
                                    {...register('category', { required: 'Category is required' })}
                                    className="select select-bordered w-full mt-4 md:mt-0"
                                >
                                    <option value="">Select category</option>
                                    <option value="Salad">salad</option>
                                    <option value="Pizza">pizza</option>
                                    <option value="Soup">soup</option>
                                    <option value="Dessert">dessert</option>
                                    <option value="Drinks">drinks</option>
                                </select>
                                {errors.category && <span className="text-red-600">{errors.category.message}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col md:w-1/2 w-full mt-6">
                            <label htmlFor="price" className="flex-auto mb-6">Price*</label>
                            <div className="flex flex-col grow">
                                <input
                                    id="price"
                                    {...register('price', { required: 'Price is required' })}
                                    className="bg-white rounded-lg border border-gray-200 input input-bordered max-md:px-5 max-md:max-w-full"
                                    placeholder="Price"
                                />
                                {errors.price && <span className="text-red-600">{errors.price.message}</span>}
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex md:flex-row flex-col gap-5 mt-4 w-full text-xl text-neutral-400 max-md:flex-wrap max-md:max-w-full">
                    </div> */}
                    <label htmlFor="details" className="mt-7 text-xl font-semibold text-neutral-700 max-md:max-w-full">Recipe Details*</label>
                    <textarea
                        id="details"
                        {...register('details', { required: 'Recipe details are required' })}
                        className="textarea textarea-bordered px-8 pt-7 pb-40 mt-4 text-xl bg-white rounded-lg text-neutral-400 max-md:px-5 max-md:pb-10 max-md:max-w-full"
                        placeholder="Recipe Details"
                    ></textarea>
                    {errors.details && <span className="text-red-600">{errors.details.message}</span>}
                    <input type="file" {...register('image', { required: true })} className="file-input file-input-bordered w-full max-w-xs mt-6" />
                    <button
                        type="submit"
                        className="flex items-center gap-2.5 w-fit me-auto px-6 py-4 mt-6 font-bold text-white max-md:px-5 max-md:mt-10"
                        style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                    >
                        <span className="grow">Add Items</span>
                        <FaUtensils />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItems;