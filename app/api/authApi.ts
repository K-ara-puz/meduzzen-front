import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { ITokens } from "../../interfaces/Tokens.interface";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
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
      providesTags: ["User"],
    }),
    refreshTokens: builder.mutation<GeneralResponse, Partial<ITokens>>({
      query: (body) => ({
        url: "/auth/refreshToken",
        body,
        method: "POST",
      }),
    }),
    logoutUser: builder.mutation<GeneralResponse, void>({
      query: () => {
        return {
          url: "/auth/logout",
          method: "PUT",
        };
      },
    }),
    changeUserAvatar: builder.mutation<GeneralResponse, any>({
      query: ({ userId, image }) => {
        const formD = new FormData();
        formD.append("file", image);
        return {
          url: `/users/changeAvatar/${userId}`,
          method: "POST",
          body: formD,
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<GeneralResponse, any>({
      query: ({ body, userId }) => {
        return {
          url: `/users/${userId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    getFile: builder.query<GeneralResponse, any>({
      query: () => {
        return {
          url: `/users/getFile`,
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyAuthMeQuery,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useLazyGetFileQuery,
  useChangeUserAvatarMutation,
} = authApi;
