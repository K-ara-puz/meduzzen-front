import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: async (response) => {
      const res = await response.json();
      if (res.error) {
        // return new Error(res.error.message);
        return res.error;
      }
      return res;
    },
    // prepareHeaders: (headers, { getState }) => {
    //   headers.set(
    //     "authorization",
    //     `Bearer IXrUfI7BkgwSKcxxuP1MTOpKBEiD78gdnf4AJ5gQhpQrzVcS-HS1QGr9XpM=r15K6rMUzBMzLLidofsbu0P82eXP-2oR9iGAy4Pzd=o!f1ok1rY=PEH1t6AhKt1wm6hYTgo/hHf8t7YuMvmndX6TvqcBIl/i7fv3IYGUu80aXq=ltQWGgFW15oagfm8dDtM?/JDN!UFIHH2hrN77oGH=j-wQjo-uQVHkEBMTxcX-zNpMp?eLb1XA9B!Uy!Tc8N1w
    //   `
    //   );
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getMain: builder.query<GeneralResponse, void>({
      query: () => "",
    }),
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
      }),
    }),
  }),
});
export const {
  useGetMainQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
} = mainApi;
