import FoodCard from '../Foodcard/FoodCard';
import { useState } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const TabContent = ({ category }) => {
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([]);
    axiosPublic.get(`menu${category}`)
        .then(response => {
            setData(response.data);
        })

    return (
        <div className='grid md:grid-cols-3 grid-cols-1 gap-6 md:px-24 px-6'>
            {
                data?.map(d => {
                    return (
                        <FoodCard key={d?._id} data={d}></FoodCard>
                    )
                })
            }
        </div>
    )
};

export default TabContent;