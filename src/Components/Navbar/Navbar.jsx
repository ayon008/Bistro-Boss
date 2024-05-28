import { NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { FaShoppingCart } from "react-icons/fa";
import useOrders from "../../Hooks/useOrders";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { orderItems } = useOrders();

    const handleLogOut = () => {
        logOut()
            .then(result => {
                Swal.fire({
                    title: 'Log Out Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            })
    }

    const navItems = <>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to="/" >HOME</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to="/contactus"  >CONTACT US</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to='/dashboard/home'>DASHBOARD</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to="/menu">OUR MENU</NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to='/shop'><span>OUR SHOP</span><span></span></NavLink>
        </li>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'text-yellow-300 ps-0 pe-6 relative' : 'text-white ps-0 pe-6 relative'} to='/dashboard/cart'>
                <FaShoppingCart size={'1.5rem'} color="white" />
                {
                    user && <div className="badge absolute -top-2 right-0">+{orderItems?.length}</div>
                }
            </NavLink>
        </li>
        {
            user ?
                <>
                    <li className="uppercase text-white" >
                        <button onClick={() => handleLogOut()} className="lg:mt-2 p-0 text-xs">SIGN OUT</button>
                    </li >
                </>
                :
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'text-yellow-300' : 'text-white'} to='/login'><span>LOGIN</span><span></span></NavLink>
                </li>
        }
    </>
    return (

        <div className="navbar xl:px-6 lg:px-4 fixed top-0 left-0 z-30 right-0 max-w-screen-xl mx-auto" style={{ backgroundColor: "rgba(21, 21, 21, 0.50)" }}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52 font-bold text-xs">
                        {navItems}
                    </ul>
                </div>
                <a className="">
                    <div className="text-white">
                        <h3 className="Cinzel uppercase text-2xl font-bold">BISTRO BOSS</h3>
                        <p className="Cinzel uppercase letter-space">Restaurant</p>
                    </div>
                </a>
            </div>
            <div className="navbar-end hidden lg:flex w-3/4">
                <ul className="menu menu-horizontal px-1 font-bold text-xs">
                    {navItems}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;