import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateItems = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { name, category, recipe, price, _id } = useLoaderData();
    const axiosSecure = useAxiosSecure();

    const onSubmit = (data) => {
        axiosSecure.patch(`menu/${_id}`, data)
            .then(response => {
                console.log(response);
                if (response.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${data.recipeName} is updated to the menu.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // reset()
                }
            })
        console.log(data);
    };



    return (
        <div className="m-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col self-stretch px-5 my-auto max-md:mt-10 max-md:max-w-full">
                <div className="self-center text-4xl text-center text-neutral-900">UPDATE ITEM</div>
                <div className="flex flex-col px-14 py-14 mt-20 bg-base-200 max-md:px-5 max-md:mt-10 max-md:max-w-full shadow-lg rounded-lg">
                    <label htmlFor="recipeName" className="text-xl font-semibold text-neutral-700 max-md:max-w-full">Recipe name*</label>
                    <div className="flex flex-col mt-4 bg-white rounded-lg border border-gray-200 max-md:px-5 max-md:max-w-full">
                        <input
                            id="recipeName"
                            defaultValue={name}
                            {...register('recipeName', { required: 'Recipe name is required' })}
                            className="self-start text-xl w-full text-neutral-400 input input-bordered max-md:max-w-full"
                            placeholder="Recipe name"
                        />
                        {errors.recipeName && <span className="text-red-600">{errors.recipeName.message}</span>}
                    </div>
                    <div className="flex gap-5 mt-7 max-w-full text-xl font-semibold text-neutral-700 w-[587px] max-md:flex-wrap">
                        <label htmlFor="category" className="flex-auto">Category*</label>
                        <label htmlFor="price" className="flex-auto">Price*</label>
                    </div>
                    <div className="flex gap-5 mt-4 w-full text-xl text-neutral-400 max-md:flex-wrap max-md:max-w-full">
                        <select
                            {...register('category', { required: 'Category is required' })}
                            className="select select-bordered w-1/2"
                            defaultValue={category}
                        >
                            <option>Salad</option>
                            <option>Pizza</option>
                            <option>Soup</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                        {errors.category && <span className="text-red-600">{errors.category.message}</span>}
                        <input
                            id="price"
                            {...register('price', { required: 'Price is required' })}
                            className="grow bg-white rounded-lg border border-gray-200 input input-bordered max-md:px-5 max-md:max-w-full"
                            placeholder="Price"
                            defaultValue={price}
                        />
                        {errors.price && <span className="text-red-600">{errors.price.message}</span>}
                    </div>
                    <label htmlFor="details" className="mt-7 text-xl font-semibold text-neutral-700 max-md:max-w-full">Recipe Details*</label>
                    <textarea
                        id="details"
                        {...register('details', { required: 'Recipe details are required' })}
                        className="textarea textarea-bordered px-8 pt-7 pb-40 mt-4 text-xl bg-white rounded-lg text-neutral-400 max-md:px-5 max-md:pb-10 max-md:max-w-full"
                        defaultValue={recipe}
                        placeholder="Recipe Details"
                    ></textarea>
                    {errors.details && <span className="text-red-600">{errors.details.message}</span>}
                    <button
                        type="submit"
                        className="flex gap-2.5 self-center px-6 py-4 mt-6 font-bold text-white max-md:px-5 max-md:mt-10"
                        style={{ background: "linear-gradient(90deg, #835D23 0%, #B58130 100%)" }}
                    >
                        <span className="grow">Update Recipe Details</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateItems;