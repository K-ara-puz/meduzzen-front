import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { UserRegisterData } from "../../interfaces/RegisterData.interface";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: async (response) => {
      const res = await response.json()
      if (res.error) {
        return new Error(res.error.message);
      }
      return res;
    }
  }),
  endpoints: (builder) => ({
    getMain: builder.query<GeneralResponse, void>({
      query: () => '',
    }),
    registerUser: builder.mutation<GeneralResponse, UserRegisterData>({
      query: (body) => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      })
    }),
  })
});

export const { useGetMainQuery, useRegisterUserMutation } = mainApi;