import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../baseUrl";

// Define a TypeScript interface for the expected response structure
interface Post {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
  tags?: string[];
  categoryId: string;
}

interface Categories {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface CategoryP {
  data: Categories[];
}

export const postsApi = createApi({
  reducerPath: "postsApi", // Ensures the API has a unique key in the Redux store
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    "getAllPosts",
    "getAllCategories",
    "getAllPostsByCategories",
    "getPostById",
  ], // Use a more generic tag if you plan to expand endpoint types
  endpoints: (builder) => ({
    getAllPosts: builder.query<Post[], void | Record<string, unknown>>({
      query: () => ({
        url: "/posts/get-all",
        method: "Get",
      }),
      providesTags: ["getAllPosts"],
    }),
    getAllCategories: builder.query<CategoryP, void | Record<string, unknown>>({
      query: () => ({
        url: "/categories/get-all",
        method: "Get",
      }),
      providesTags: ["getAllCategories"],
    }),
    getPostById: builder.query({
      query: ({ post_id }) => ({
        url: `/posts/get/${post_id}`,
        method: "Get",
      }),
      providesTags: ["getPostById"],
    }),
    getAllPostsByCategories: builder.query({
      query: ({ category_id }) => ({
        url: `/posts/get-by-category/${category_id}`,
        method: "Get",
      }),
      providesTags: ["getAllPostsByCategories"],
    }),
  }),
});

export const { useGetAllPostsQuery, useGetAllCategoriesQuery, useGetAllPostsByCategoriesQuery, useGetPostByIdQuery } = postsApi;
