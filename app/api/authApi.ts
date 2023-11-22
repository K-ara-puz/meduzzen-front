import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";
import axios from "axios";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // const idToken = (getState() as RootWebState).auth.idToken;
    const token = localStorage.getItem('accessToken');
    if (token !== 'undefined') {
      headers.set('Authorization', `Bearer ${JSON.parse(token)}`);
      return headers;
    }
    headers.set('Authorization', `Bearer null`);
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // Refresh Session
    }
    return result;
  };

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
      invalidatesTags: ['User']
    }),
    loginUser: builder.mutation<GeneralResponse, Partial<UserRegisterData>>({
      query: (body) => ({
        url: "/auth/login",
        method: "PUT",
        body,
      }),
      invalidatesTags: ['User']
    }),
    authMe:  builder.query<unknown, unknown>({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const r = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${JSON.parse(arg['token'])}`
          }
        });
        return {data: r.data.detail}
      },
      providesTags: ['User']
    })
  }),
});
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useAuthMeQuery,
} = authApi;
