import { object, string, ObjectSchema } from "yup";
import { User } from "../../services/orderSlice";

export const schema: ObjectSchema<User> = object({
  email: string().email("Invalid email").required("Required"),
  country: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  address: string().required(),
  zipCode: string().nullable().required(),
  city: string().required(),
  phone: string().required(),
});
