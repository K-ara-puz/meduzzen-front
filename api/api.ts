import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3331" }),
  endpoints: (builder) => ({
    getMain: builder.query({
      query: () => ''
    })
  })
});

export const { useGetMainQuery } = mainApi;