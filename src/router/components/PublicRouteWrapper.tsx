// src/components/PublicRouteWrapper.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PublicRouteWrapper = () => {
    const { isLoggedIn } = useAuth();
    return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRouteWrapper;
