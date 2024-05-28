import { useNavigate } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import FoodItems from "../FoodItems/FoodItems";

const MenuItems = ({ btnName, url, link,item }) => {
    const { data } = useFetch(url);
    const navigate = useNavigate();
    console.log(data);
    console.log(item);
    return (
        <div className="my-20">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                {
                    data?.slice(0, 6).map(d => <FoodItems key={d?._id} data={d}></FoodItems>)
                }
            </div>
            <div className="text-center">
                <button onClick={() => navigate(link)} className="btn btn-outline border-0 border-b-4 mt-8 uppercase">{btnName}</button>
            </div>
        </div>
    );
};

export default MenuItems;