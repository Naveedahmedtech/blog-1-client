// src/routes.js
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PrivateRouteWrapper from './components/PrivateRouteWrapper';
import PublicRouteWrapper from './components/PublicRouteWrapper';
import { Header } from '../layout';
import { Login } from '../pages/auth';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PrivateRouteWrapper />}>
                <Route path="/" element={<Header />} />
            </Route>
            <Route element={<PublicRouteWrapper />}>
                <Route path="/login" element={<Login />} />
                {/* Add more public routes here */}
            </Route>
        </>
    )
);
