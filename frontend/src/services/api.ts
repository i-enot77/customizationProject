import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface RegisterUserArgs {
  user: string;
  pwd: string;
}

interface LoginUserArgs {
  user: string;
  pwd: string;
}

interface ResetPwdRequestArgs {
  username: string;
}

interface ResetPasswordArgs {
  token: string;
  newPassword: string;
}

interface ContactFormArgs {
  userName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  message: string;
}

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/",
    credentials: "include",
  }),
  tagTypes: ["Products"],
  endpoints: (build) => ({
    registerUser: build.mutation<string, RegisterUserArgs>({
      query: ({ user, pwd }) => ({
        url: "register",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: build.mutation<string, LoginUserArgs>({
      query: ({ user, pwd }) => ({
        url: "auth",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    refresh: build.mutation<string, void>({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
    }),
    resetPwdRequest: build.mutation<string, ResetPwdRequestArgs>({
      query: ({ username }) => ({
        url: "reset-email",
        method: "POST",
        body: { username },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPassword: build.mutation<string, ResetPasswordArgs>({
      query: ({ token, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { token, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    sendContactForm: build.mutation<string, ContactFormArgs>({
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

    getProducts: build.query({
      query: () => "products",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: string }) => ({
                type: "Products",
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
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
  useGetProductsQuery,
} = customizationApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const customizationApi = createApi({
//   reducerPath: "customizationApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
//   endpoints: (build) => ({
//     registerUser: build.mutation({
//       query: ({ user, pwd }) => ({
//         url: "register",
//         method: "POST",
//         body: { user, pwd },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//       options: { withCredentials: true },
//     }),
//     loginUser: build.mutation({
//       query: ({ user, pwd }) => ({
//         url: "auth",
//         method: "POST",
//         body: { user, pwd },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//       options: { withCredentials: true },
//     }),
//     refresh: build.mutation({
//       query: () => ({
//         url: "refresh",
//         method: "GET",
//       }),
//       options: { withCredentials: true },
//     }),
//     resetPwdRequest: build.mutation({
//       query: ({ username }) => ({
//         url: "reset-email",
//         method: "POST",
//         body: { username },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//     resetPassword: build.mutation({
//       query: ({ token, newPassword }) => ({
//         url: "reset-password",
//         method: "POST",
//         body: { token, newPassword },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),

//     sendContactForm: build.mutation({
//       query: ({
//         userName,
//         lastName,
//         userEmail,
//         phoneNumber,
//         address,
//         message,
//       }) => ({
//         url: "submit-form",
//         method: "POST",
//         body: { userName, lastName, userEmail, phoneNumber, address, message },
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//   }),
// });

// export const {
//   useRegisterUserMutation,
//   useLoginUserMutation,
//   useRefreshMutation,
//   useResetPwdRequestMutation,
//   useResetPasswordMutation,
//   useSendContactFormMutation,
// } = customizationApi;
