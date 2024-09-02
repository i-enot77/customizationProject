import { phoneRegExp } from "@/features/user/schemaYup/userAccountSchemas";
import { DeliveryData } from "@/services/orderSlice";
import { object, string, ObjectSchema } from "yup";

export interface OrderSchema extends DeliveryData {
  email: string;
  firstName: string;
  lastName: string;
}

export const orderSchema: ObjectSchema<OrderSchema> = object({
  email: string().email("Invalid email").required("Email is required"),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
  country: string().required("Country is required"),
  address: string().required("Address is required"),
  zipCode: string().required("Zip Code is required"),
  city: string().required("City is required"),
  phone: string()
    .matches(phoneRegExp, "Invalid phone number")
    .required("Phone number is required"),
});
