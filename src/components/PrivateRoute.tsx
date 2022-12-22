import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/User';
import { useContext } from 'react';

export default function PrivateRoute() {
    const {user} = useContext(UserContext);
    if (!user) return <Navigate to="/login" />;
    return <Outlet />;
}