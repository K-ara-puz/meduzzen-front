import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../interfaces/GeneralResponse.interface";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    responseHandler: async (response) => {
      try {
        return await response.json();
      } catch (err) {
        if (err instanceof Error) {
          return new Error(err.message);
        }
        return new Error('Unexpected error');
      }
    }
  }),
  endpoints: (builder) => ({
    getMain: builder.query<GeneralResponse, void>({
      query: () => '',
    })
  })
});

export const { useGetMainQuery } = mainApi;