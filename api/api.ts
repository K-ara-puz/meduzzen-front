import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/todos/1" }),
  endpoints: (builder) => ({
    getMain: builder.query({
      query: () => ''
    })
  })
});

export const { useGetMainQuery } = mainApi;