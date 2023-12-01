import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: "api/users",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.mutation<GeneralResponse, UserRegisterData>({
      query: (body) => ({
        url: "/",
        method: "GET",
        body,
      }),
    }),
  }),
});
export const { useGetUsersMutation } = userApi;
