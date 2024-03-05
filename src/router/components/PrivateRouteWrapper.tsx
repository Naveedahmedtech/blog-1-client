import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRouteWrapper = () => {
    const { userData } = useAuth();
    // console.log(isLoggedIn)
    return userData ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRouteWrapper;
