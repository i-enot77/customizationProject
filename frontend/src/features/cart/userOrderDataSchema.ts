import { object, string, ObjectSchema } from "yup";
import { UserOrderData } from "@/services/userSlice";

export type UserOrderDataSchema = Omit<UserOrderData, "_id">;

export const userOrderDataSchema: ObjectSchema<UserOrderDataSchema> = object({
  email: string().email("Invalid email").required("Required"),
  country: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  address: string().required(),
  zipCode: string().nullable().required(),
  city: string().required(),
  phone: string().required(),
});
