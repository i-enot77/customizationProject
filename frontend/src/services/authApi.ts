import { customizationApi } from "./api";

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

export const authApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<string, RegisterUserArgs>({
      query: ({ user, pwd }) => ({
        url: "register",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
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
        credentials: "include",
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
        credentials: "include",
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
        credentials: "include",
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshMutation,
  useResetPwdRequestMutation,
  useResetPasswordMutation,
  useSendContactFormMutation,
} = authApi;
