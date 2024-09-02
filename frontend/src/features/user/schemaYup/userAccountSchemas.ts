import { DeliveryData } from "@/services/orderSlice";
import { FullName, UserAddressData } from "@/services/userSlice";
import { object, string, ObjectSchema } from "yup";

interface ChangeLogin {
  email: string;
}

// Phone number validation using regex pattern
export const phoneRegExp = /^(\+)?([ 0-9]){10,16}$/;

export const emailSchema: ObjectSchema<ChangeLogin> = object({
  email: string().email("Invalid email").required("Required"),
});

export const changeFullNameSchema: ObjectSchema<FullName> = object({
  firstName: string().required("Required"),
  lastName: string().required("Required"),
});

export const changePhoneNumberSchema: ObjectSchema<{ phoneNumber: string }> =
  object({
    phoneNumber: string()
      .matches(phoneRegExp, "Invalid phone number")
      .required("Phone number is required"),
  });

export const changeUserAddressSchema: ObjectSchema<UserAddressData> = object({
  country: string().required("Country is required"),
  address: string().required("Address is required"),
  zipCode: string().required("Zip Code is required"),
  city: string().required("City is required"),
});

export const userDeliveryAddressSchema: ObjectSchema<DeliveryData> = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  country: string().required("Country is required"),
  address: string().required("Address is required"),
  zipCode: string().required("Zip Code is required"),
  city: string().required("City is required"),
  phoneNumber: string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required"),
});
