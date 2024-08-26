import { customizationApi } from "./api";

export interface ContactFormArgs {
  firstName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  city: string;
  message: string;
}

export const contactFormApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    sendContactForm: build.mutation<string, ContactFormArgs>({
      query: ({
        firstName,
        lastName,
        userEmail,
        phoneNumber,
        city,
        message,
      }) => ({
        url: "/submit-form",
        method: "POST",
        body: { firstName, lastName, userEmail, phoneNumber, city, message },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSendContactFormMutation } = contactFormApi;
