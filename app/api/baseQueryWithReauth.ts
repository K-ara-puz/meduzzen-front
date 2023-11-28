import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { RootState, store } from "../../store/store";
import { authApi } from "./authApi";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  prepareHeaders: async (headers, { getState }) => {
    const tokenFromLS = localStorage.getItem('accessToken');
    const tokenFromRedux = (getState() as RootState).auth.tokens.accessToken
    if (tokenFromRedux) {
      headers.set('Authorization', `Bearer ${tokenFromRedux}`);
      return headers;
    }
    if (tokenFromLS != 'undefined') {
      return headers.set('Authorization', `Bearer ${JSON.parse(tokenFromLS)}`);
    }
    headers.set('Authorization', `Bearer null`);
    return headers;
  },
  responseHandler: async (response) => {
    const res = await response.json();
    if (res.error) {
      return new Error(res.error.message);
    }
    return res;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (
      (result.error && result.error.status == 401) ||
      (result.error && result.error.status == 403)
    ) {
      try {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refreshToken`, {token})
        const newAccessToken = res.data['detail'].accessToken;
        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));
        result = await baseQuery(args, api, extraOptions);
      } catch (error) {
        throw Error('You are not authorized')
      }
    }
    return result;
  };