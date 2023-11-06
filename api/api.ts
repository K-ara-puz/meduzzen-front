import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { generalResponse } from "../interfaces/generalResponse.interface";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }),
  endpoints: (builder) => ({
    getMain: builder.query<generalResponse, void>({
      query: () => '',
      transformResponse: (response: generalResponse) => {
        return response
      },
    })
  })
});

export const { useGetMainQuery } = mainApi;