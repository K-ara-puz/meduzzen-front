import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { ITokens } from "../../interfaces/Tokens.interface";
import { ChangeUserAvatar } from "../../interfaces/ChangeUserAvatar.interface";
import { UserUpdateData } from "../../interfaces/UserUpdateData.interface";
import { toast } from "react-toastify";

export const authApi = createApi({
  reducerPath: "api/auth",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<GeneralResponse<UserUpdateData>, UserRegisterData>({
      query: (body) => ({
        url: "/auth/registration",
        method: "POST",
        body,
        responseHandler: async (response) => {
          const res = await response.json()
          if (res.hasOwnProperty('error')) {
            toast(res.error.message, { autoClose: 2000, type: "error" });
            return res
          }
          toast("user was registered", { autoClose: 2000, type: "success" });
          return res
        }
      }),
    }),
    loginUser: builder.mutation<GeneralResponse<UserUpdateData>, Partial<UserRegisterData>>({
      query: (body) => ({
        url: "/auth/login",
        method: "PUT",
        body,
        keepUnusedDataFor: 0,
      }),
    }),
    authMe: builder.query<GeneralResponse<UserUpdateData>, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        keepUnusedDataFor: 0,
        refetchOnFocus: true
      }),
      providesTags: ["User"],
    }),
    refreshTokens: builder.mutation<GeneralResponse<ITokens>, Partial<ITokens>>({
      query: (body) => ({
        url: "/auth/refreshToken",
        body,
        method: "POST",
      }),
      invalidatesTags: ['User']
    }),
    logoutUser: builder.mutation<GeneralResponse<UserUpdateData>, void>({
      query: () => {
        return {
          url: "/auth/logout",
          method: "PUT",
        };
      },
    }),
    changeUserAvatar: builder.mutation<GeneralResponse<object>, ChangeUserAvatar>({
      query: ({ userId, image }) => {
        const formD = new FormData();
        formD.append("file", image);
        return {
          url: `/users/changeAvatar/${userId}`,
          method: "POST",
          body: formD,
          responseHandler: async (response) => {
            const res = await response.json()
            if (res.hasOwnProperty('error')) {
              toast(res.error.message, { autoClose: 2000, type: "error" });
              return res
            }
            toast("user avatar changed", { autoClose: 2000, type: "success" });
            return res
          }
        };
      },
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<GeneralResponse<UserUpdateData>, unknown>({
      query: ({ body, userId }) => {
        return {
          url: `/users/${userId}`,
          method: "PUT",
          body,
          responseHandler: async (response) => {
            const res = await response.json()
            if (res.hasOwnProperty('error')) {
              toast(res.error.message, { autoClose: 2000, type: "error" });
              return res
            }
            toast("user info was updated", { autoClose: 2000, type: "success" });
            return res
          }
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteUserAccount: builder.mutation<GeneralResponse<UserUpdateData>, string>({
      query: (userId) => {
        return {
          url: `/users/${userId}`,
          method: "DELETE",
          responseHandler: async (response) => {
            const res = await response.json()
            if (res.hasOwnProperty('error')) {
              toast(res.error.message, { autoClose: 2000, type: "error" });
              return res
            }
            toast("user was deleted", { autoClose: 2000, type: "success" });
            return res
          }
        };
      },
      invalidatesTags: ["User"],
    }),
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyAuthMeQuery,
  useAuthMeQuery,
  useLogoutUserMutation,
  useUpdateUserMutation,
  useChangeUserAvatarMutation,
  useDeleteUserAccountMutation
} = authApi;
