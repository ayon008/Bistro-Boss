import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loader } = useAuth();
    const location = useLocation();
    const pathName = location.pathname;

    if (loader) {
        return (
            <div className="h-screen w-full bg-red-400">

            </div>
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