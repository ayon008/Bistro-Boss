import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const PrivateRoute = ({ children }) => {
    const { user, loader } = useAuth();
    const location = useLocation();
    const pathName = location.pathname;

    if (loader) {
        return (
            <Loader></Loader>
        )
    }
    else if (user) {
        return (
            children
        )
    }
    return <Navigate to="/login" state={{ from: pathName }}></Navigate>

};

export default PrivateRoute;