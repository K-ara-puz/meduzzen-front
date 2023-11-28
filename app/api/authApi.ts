import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { ITokens } from "../../interfaces/Tokens.interface";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    registerUser: builder.mutation<GeneralResponse, UserRegisterData>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
      }),
    }),
    loginUser: builder.mutation<GeneralResponse, Partial<UserRegisterData>>({
      query: (body) => ({
        url: "/auth/login",
        method: "PUT",
        body,
        keepUnusedDataFor: 0,
      }),
    }),
    authMe: builder.query<GeneralResponse, unknown>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
    }),
    refreshTokens: builder.mutation<GeneralResponse, Partial<ITokens>>({
      query: (body) => ({
        url: "/auth/refreshToken",
        body,
        method: "POST"
      }),
    }),
    logoutUser: builder.mutation<GeneralResponse, void>({
      query: () => {
        return {
        url: "/auth/logout",
        method: "PUT",
      }},
    })
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyAuthMeQuery,
  useLogoutUserMutation
} = authApi;
