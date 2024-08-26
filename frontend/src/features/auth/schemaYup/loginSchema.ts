import { object, string, ObjectSchema } from "yup";

interface LoginSchema {
  email: string;
  password: string;
}

export const loginSchema: ObjectSchema<LoginSchema> = object({
  email: string().email("Invalid email").required("Required"),
  password: string().required("Required"),
});
