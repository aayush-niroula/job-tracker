import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const APPLICATION_TAG = "Application" as const;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: [APPLICATION_TAG],
  endpoints: () => ({}),
});