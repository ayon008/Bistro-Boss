import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../Pages/Home/Home';
import OurMenu from '../Pages/OurMenu/OurMenu';
import OurShop from '../Pages/OurShop/OurShop';
import Contact from '../Pages/ContactUs/Contact';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/SignUp/SingUp';
import PrivateRoute from './PrivateRoute';
import DashBoard from '../Layout/DashBoard';
import MyCart from '../Components/MyCart/MyCart';
import UserHome from '../Components/USER_HOME/UserHome';
import Reservation from '../Components/Reservation/Reservation';
import AddReview from '../Components/AddReview/AddReview';
import MyBooking from '../Components/MyBooking/MyBooking';
import AddItems from '../Components/AddItems/AddItems';
import ManageItems from '../Components/ManageItems/ManageItems';
import UpdateItems from '../Components/UpdateItem/UpdateItem';
import AdminRoute from './AdminRoute';
import AllUsers from '../Components/AllUser/AllUsers';
import ManageBooking from '../Components/ManageBooking/ManageBooking';
import Error from '../Components/ErrorElement/Error';
import PayMent from '../Components/PayMent/PayMent';
import PaymentHistory from '../Components/PayMent/PaymentHistory';
import AdminHome from '../Components/AdminHome/AdminHome';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <Error />,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/menu',
                element: <OurMenu></OurMenu>
            },
            {
                path: '/shop',
                element: <OurShop></OurShop>
            },
            {
                path: '/order/:category',
                element: <OurShop></OurShop>
            },
            {
                path: '/contactus',
                element: <PrivateRoute><Contact></Contact></PrivateRoute>
            },
        ]
    },
    {
        path: '/login',
        element: <Login></Login>
    },
    {
        path: '/signup',
        element: <SignUp></SignUp>
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: 'home',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <MyCart></MyCart>
            },
            {
                path: 'reservation',
                element: <Reservation></Reservation>
            },
            {
                path: 'addReview',
                element: <AddReview></AddReview>
            },
            {
                path: 'payment',
                element: <PayMent></PayMent>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'myBooking',
                element: <MyBooking></MyBooking>
            },
            {
                path: 'manageItems',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
            },
            {
                path: 'addItems',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>
            },
            {
                path: 'updateItems/:id',
                element: <AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-three-liart.vercel.app/menu/${params.id}`)
            },
            {
                path: 'allUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'manageBookings',
                element: <AdminRoute><ManageBooking></ManageBooking></AdminRoute>
            },
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
        ]
    }
]);

export default router;