import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../interfaces/GeneralResponse.interface";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: (response) => {
      return response.json()
    }
  }),
  endpoints: (builder) => ({
    getMain: builder.query<GeneralResponse, void>({
      query: () => '',
    })
  })
});

export const { useGetMainQuery } = mainApi;