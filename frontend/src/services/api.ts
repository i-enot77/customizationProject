import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/",
  }),
  endpoints: () => ({}),
});
