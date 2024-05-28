import { FaShoppingCart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useOrders from "../../Hooks/useOrders";

const UserHome = () => {
    const { user } = useAuth();
    const { orderItems } = useOrders();
    return (
        <div className="w-full p-6">
            <h3 className="Cinzel font-semibold text-3xl mb-6">Hi! Welcome Back</h3>
            <div className="w-full flex md:flex-row flex-col">
                <div className="md:w-1/2 w-full bg-[#FFEDD5] border-r-4 border-[#D1A054]">
                    <div className="text-center p-20">
                        <h3 className="text-3xl font-bold Cinzel">{user?.displayName}</h3>
                        <p className="text-sm">{user?.email}</p>
                    </div>
                </div>
                <div className="md:w-1/2 w-full bg-[#FEF9C3]">
                    <div className="p-20 md:text-left text-center">
                        <h3 className="text-3xl font-bold Cinzel">Your Activities</h3>
                        <ul className="mt-4">
                            <li className="flex items-center Cinzel text-blue-500 gap-2">
                                <FaShoppingCart /> <span>Orders: {orderItems.length}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserHome;