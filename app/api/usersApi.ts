import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { GetUsersProps } from "../../interfaces/GetUsersProps";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";

export const usersApi = createApi({
  reducerPath: "api/users",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<GeneralResponse<UserUpdateData[]>, GetUsersProps>({
      query: ({limit, page}) => ({
        url: `/users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
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
