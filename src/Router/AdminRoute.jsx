import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import Loader from '../Components/Loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, loader } = useAuth();
    const location = useLocation();
    const { admin, isPending } = useAdmin();
    const pathName = location.pathname;

    if (loader || isPending) {
        return (
            <Loader></Loader>
        )
    }
    else if (user && admin) {
        return (
            children
        )
    }
    return <Navigate to="/login" state={{ from: pathName }}></Navigate>
};

export default AdminRoute;