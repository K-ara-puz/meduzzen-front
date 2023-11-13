import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";

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
    })
  })
});

export const { useGetMainQuery } = mainApi;