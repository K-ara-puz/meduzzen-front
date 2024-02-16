import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";
import { PaginatedItems } from "../../interfaces/PaginatedItems.interface";

export const usersApi = createApi({
  reducerPath: "api/users",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<GeneralResponse<PaginatedItems<UserUpdateData[]>>, GetUsersProps>({
      query: ({limit, page}) => ({
        url: `/users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 0
    }),
    getUserById: builder.query<GeneralResponse<UserUpdateData>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUsersQuery, useLazyGetUsersQuery, useGetUserByIdQuery } = usersApi;
