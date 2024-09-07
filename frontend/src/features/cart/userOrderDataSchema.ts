import { object, string, ObjectSchema } from "yup";
import { DeliveryData } from "@/services/orderSlice";

export interface UserOrderDataSchema extends DeliveryData {
  email: string;
}

export const userOrderDataSchema: ObjectSchema<UserOrderDataSchema> = object({
  email: string().email("Invalid email").required("Required"),
  firstName: string().required(),
  lastName: string().required(),
  phoneNumber: string().required(),
  address: string().required(),
  zipCode: string().nullable().required(),
  city: string().required(),
  country: string().required(),
});
