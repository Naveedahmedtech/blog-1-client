// src/routes.js
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PrivateRouteWrapper from './components/PrivateRouteWrapper';
import PublicRouteWrapper from './components/PublicRouteWrapper';
import { Header } from '../layout';
import { Login, Register } from '../pages/auth';
import { AddPost, Category, Home, MyBlogs, Posts } from '../pages';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PrivateRouteWrapper />}>
                <Route path="/" element={<Header />} >
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/category/:category_id" element={<Category />} />
                    <Route path="/posts/:post_id" element={<Posts />} />
                    <Route path="/add-blogs" element={<AddPost />} />
                    <Route path="/my-blogs" element={<MyBlogs />} />
                </Route>
            </Route>
            <Route element={<PublicRouteWrapper />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
        </>
    )
);
