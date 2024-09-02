import { customizationApi } from "./api";
import { DeliveryData } from "./orderSlice";
import { FullName, UserAddressData } from "./userSlice";

interface EmailUpdate {
  userId: string;
  newEmail: string;
}

interface FullNameUpdate extends FullName {
  userId: string;
}

interface PhoneNumberUpdate {
  userId: string;
  phoneNumber: string;
}

interface UserAddressUpdate extends UserAddressData {
  userId: string;
}

interface UserDeliveryAddressUpdate {
  userId: string;
  deliveryData: DeliveryData;
}

export const userAccountApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    emailUpdate: build.query<string, EmailUpdate>({
      query: ({ userId, newEmail }) => ({
        url: "/change-email",
        method: "POST",
        body: { userId, newEmail },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    fullNameUpdate: build.query<FullName, FullNameUpdate>({
      query: ({ userId, firstName, lastName }) => ({
        url: "/change-full-name",
        method: "POST",
        body: { userId, firstName, lastName },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    phoneNumberUpdate: build.query<string, PhoneNumberUpdate>({
      query: ({ userId, phoneNumber }) => ({
        url: "/change-phone-number",
        method: "POST",
        body: { userId, phoneNumber },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    userAddresUpdate: build.query<UserAddressData, UserAddressUpdate>({
      query: ({ userId, address, zipCode, city, country }) => ({
        url: "/update-address",
        method: "POST",
        body: { userId, address, zipCode, city, country },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    userDeliveryAddresUpdate: build.query<
      DeliveryData,
      UserDeliveryAddressUpdate
    >({
      query: ({ userId, ...deliveryData }) => ({
        url: "/update-delivery-address",
        method: "POST",
        body: { userId, ...deliveryData },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLazyEmailUpdateQuery,
  useLazyFullNameUpdateQuery,
  useLazyPhoneNumberUpdateQuery,
  useLazyUserAddresUpdateQuery,
  useLazyUserDeliveryAddresUpdateQuery,
} = userAccountApi;
