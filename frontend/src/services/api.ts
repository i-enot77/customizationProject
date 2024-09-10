import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_URL,
  credentials: "include", //cookies are included with every request
});

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
