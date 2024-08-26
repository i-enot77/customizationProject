import { RegistrationSchema } from "@/features/auth/schemaYup/registrationSchema";
import { customizationApi } from "./api";
import { FullName } from "./userSlice";
import { DeliveryData } from "./orderSlice";

type RegisterUserRequest = Omit<RegistrationSchema, "confirmPassword">;
export interface AuthData {
  _id: string;
  email: string;
}

interface RegisterUserResponse {
  message: string;
  userData: {
    _id: string;
    email: string;
  };
}

interface LoginUserArgs {
  userEmail: string;
  pwd: string;
  persist: boolean;
}

export interface LoggedUser {
  userData: AuthData;
  fullName: FullName | null;
  deliveryData: DeliveryData | null;
}

interface ResetPwdRequestArgs {
  username: string;
}

interface ResetPasswordArgs {
  token: string;
  newPassword: string;
}

// interface ContactFormArgs {
//   userName: string;
//   lastName: string;
//   userEmail: string;
//   phoneNumber: string;
//   address: string;
//   message: string;
// }

export const authApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<RegisterUserResponse, RegisterUserRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    loginUser: build.mutation<LoggedUser, LoginUserArgs>({
      query: ({ userEmail, pwd, persist }) => ({
        url: "/auth",
        method: "POST",
        body: { userEmail, pwd, persist }, // Pass the persist flag to the backend
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPwdRequest: build.mutation<string, ResetPwdRequestArgs>({
      query: ({ username }) => ({
        url: "/reset-email",
        method: "POST",
        body: { username },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPassword: build.mutation<string, ResetPasswordArgs>({
      query: ({ token, newPassword }) => ({
        url: "/reset-password",
        method: "POST",
        body: { token, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useResetPwdRequestMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  // useSendContactFormMutation,
} = authApi;
// sendContactForm: build.mutation<string, ContactFormArgs>({
//   query: ({
//     userName,
//     lastName,
//     userEmail,
//     phoneNumber,
//     address,
//     message,
//   }) => ({
//     url: "submit-form",
//     method: "POST",
//     body: { userName, lastName, userEmail, phoneNumber, address, message },
//     headers: {
//       "Content-Type": "application/json",
//     },
//   }),
// }),
