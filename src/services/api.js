import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ user, pwd }) => ({
        url: "register",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      options: { withCredentials: true },
    }),
    loginUser: build.mutation({
      query: ({ user, pwd }) => ({
        url: "auth",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      options: { withCredentials: true },
    }),
    refresh: build.mutation({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
      options: { withCredentials: true },
    }),
    resetPwdRequest: build.mutation({
      query: ({ username }) => ({
        url: "reset-email",
        method: "POST",
        body: { username },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPassword: build.mutation({
      query: ({ token, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { token, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    sendContactForm: build.mutation({
      query: ({
        userName,
        lastName,
        userEmail,
        phoneNumber,
        address,
        message,
      }) => ({
        url: "submit-form",
        method: "POST",
        body: { userName, lastName, userEmail, phoneNumber, address, message },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshMutation,
  useResetPwdRequestMutation,
  useResetPasswordMutation,
  useSendContactFormMutation,
} = customizationApi;
