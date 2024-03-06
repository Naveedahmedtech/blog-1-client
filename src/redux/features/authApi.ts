import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../../baseUrl";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Directly export the generated hook
export const { useRegisterMutation, useLoginMutation } = authApi as any;
