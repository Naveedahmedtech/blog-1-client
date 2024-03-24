// src/routes.js
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import PrivateRouteWrapper from './components/PrivateRouteWrapper';
import PublicRouteWrapper from './components/PublicRouteWrapper';
import { Header } from '../layout';
import { Login, Register } from '../pages/auth';
import { AddBlog, AllBlogs, Category, Home, MyBlogs, Posts, Profile, UpdateBlogs } from '../pages';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<PrivateRouteWrapper />}>
                <Route path="/" element={<Header />} >
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/category/:category_id" element={<Category />} />
                    <Route path="/posts/:post_id" element={<Posts />} />
                    <Route path="/add-blogs" element={<AddBlog />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/update-blogs/:id" element={<UpdateBlogs />} />
                    <Route path="/all-blogs" element={<AllBlogs />} />
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
