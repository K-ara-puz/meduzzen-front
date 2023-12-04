import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { GetUsersProps } from "../../interfaces/GetUsersProps";

export const usersApi = createApi({
  reducerPath: "api/users",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<GeneralResponse, GetUsersProps>({
      query: ({limit, page}) => ({
        url: `/users?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi;
