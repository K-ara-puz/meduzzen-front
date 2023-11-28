import { createApi } from "@reduxjs/toolkit/query/react";
import { GeneralResponse } from "../../interfaces/generalResponse.interface";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const mainApi = createApi({
  reducerPath: "api/main",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getMain: builder.query<GeneralResponse, void>({
      query: () => "",
    }),
  }),
});
export const { useGetMainQuery, useLazyGetMainQuery } = mainApi;
