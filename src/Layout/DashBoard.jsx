import { FaBars, FaCalendar, FaClipboardList, FaCommentDots, FaHome, FaList, FaShoppingBag, FaShoppingCart, FaWallet } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const DashBoard = () => {
    const { admin, isPending } = useAdmin();
    const isAdmin = admin?.admin;
    if (isPending) {
        return <div>Loading</div>
    }
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center w-full">
                {/* Page content here */}
                <div className="flex items-center bg-[#BB8506] w-full lg:hidden">
                    <label htmlFor="my-drawer-2" className="bg-[#BB8506] p-5 text-left drawer-button lg:hidden"><FaList /></label>
                    <h3 className="text-2xl Cinzel font-bold text-white">Bistro Boss</h3>
                </div>
                <Outlet></Outlet>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content">
                    {/* Sidebar content here */}
                    {
                        isAdmin ?
                            <>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/home" ><FaHome className="mb-1" size={'1.2rem'} /> ADMIN HOME</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/addItems" ><FaCalendar className="mb-1" size={'1.2rem'} /> ADD ITEMS</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/manageItems" ><FaWallet className="mb-1" size={'1.2rem'} /> MANAGE ITEMS</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/manageBookings" ><FaShoppingCart className="mb-1" size={'1.2rem'} /> MANAGE BOOKINGS</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/allUsers" ><FaCommentDots className="mb-1" size={'1.2rem'} /> ALL USERS</NavLink>
                                </li>
                            </>
                            :
                            <>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/home" ><FaHome className="mb-1" size={'1.2rem'} /> USER HOME</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/reservation" ><FaCalendar className="mb-1" size={'1.2rem'} /> RESERVATION</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/paymentHistory" ><FaWallet className="mb-1" size={'1.2rem'} /> PAYMENT HISTORY</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/cart" ><FaShoppingCart className="mb-1" size={'1.2rem'} /> MY CART</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/addReview" ><FaCommentDots className="mb-1" size={'1.2rem'} /> ADD REVIEW</NavLink>
                                </li>
                                <li>
                                    <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/dashboard/myBooking" ><FaCommentDots className="mb-1" size={'1.2rem'} /> MY BOOKING</NavLink>
                                </li>
                            </>
                    }
                    {/*  */}
                    <hr className="text-white my-10" />
                    {/*  */}
                    <li>
                        <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/" ><FaHome className="mb-1" size={'1.2rem'} /> HOME</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/menu" ><FaBars className="mb-1" size={'1.2rem'} /> MENU</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/shop" ><FaShoppingBag className="mb-1" size={'1.2rem'} /> SHOP</NavLink>
                    </li>
                    <li>
                        <NavLink className={({ isActive }) => !isActive ? 'text-black Cinzel font-bold' : 'text-white Cinzel font-bold'} to="/contactus" ><FaClipboardList className="mb-1" size={'1.2rem'} /> CONTACT</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashBoard;