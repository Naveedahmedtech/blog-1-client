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
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    "getAllPosts",
    "getAllCategories",
    "getAllPostsByCategories",
    "getPostById",
    "getAllTags",
    "addPost",
    "getAllPostsByAuthor",
    "updatePost",
    "deletePost",
    "getAllTrendingPosts",
  ],
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: ({
        page = 1,
        limit = 5,
        sort = "created_at",
        sortOrder = -1,
        categoryId,
      }: any) => {
        console.log(page);
        let url = `/posts/get-all?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}`;
        if (categoryId) {
          url += `&categoryId=${categoryId}`;
        }
        return { url, method: "Get" };
      },
      providesTags: ["getAllPosts"],
    }),

    getAllTrendingPosts: builder.query<Post[], void | Record<string, unknown>>({
      query: ({ page, limit }: any) => ({
        url: `/posts/get-trending?page=${page}&limit=${limit}`,
        method: "Get",
      }),
      providesTags: ["getAllTrendingPosts"],
    }),
    getAllCategories: builder.query<CategoryP, void | Record<string, unknown>>({
      query: () => ({
        url: "/categories/get-all",
        method: "Get",
      }),
      providesTags: ["getAllCategories"],
    }),
    getAllTags: builder.query<CategoryP, void | Record<string, unknown>>({
      query: () => ({
        url: "/tags/get-all",
        method: "Get",
      }),
      providesTags: ["getAllTags"],
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
    getAllPostsByAuthor: builder.query({
      query: ({ author_id, page, limit, sort, sortOrder, categoryId }) => ({
        url: `/posts/get-by-author/${author_id}?page=${page}&limit=${limit}&sort=${sort}&sortOrder=${sortOrder}&categoryId=${categoryId}`,
        method: "Get",
      }),
      providesTags: ["getAllPostsByAuthor"],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: `/posts/add`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["getAllPosts", "getAllPostsByAuthor", "getPostById"],
    }),
    updatePost: builder.mutation({
      query: (body) => ({
        url: `/posts/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["getAllPosts", "getAllPostsByAuthor"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deletePost"],
    }),
  }),
}); ;

export const {
  useGetAllPostsQuery,
  useGetAllCategoriesQuery,
  useGetAllPostsByCategoriesQuery,
  useGetPostByIdQuery,
  useGetAllTagsQuery,
  useAddPostMutation,
  useGetAllPostsByAuthorQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetAllTrendingPostsQuery
} = postsApi;
