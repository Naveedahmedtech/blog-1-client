// Import Navigate and Outlet from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom';
// Import useAuth hook to check authentication status
import { useAuth } from '../../hooks/useAuth';

const PublicRouteWrapper = () => {
    // Destructure isLoggedIn from useAuth to check if the user is logged in
    const { userData } = useAuth();

    // If the user is logged in, redirect to the home page
    // Otherwise, render the Outlet which will render the component associated with the route
    return !userData ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRouteWrapper;
