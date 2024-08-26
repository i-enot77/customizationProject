import { object, string, ref, ObjectSchema } from "yup";

export interface RegistrationSchema {
  email: string;
  password: string;
  confirmPassword: string;
}

export const registrationSchema: ObjectSchema<RegistrationSchema> = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

// export interface RegistrationSchema extends Address {
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export type UserRegisterData = Omit<RegistrationSchema, "confirmPassword">;

// export const registrationSchema: ObjectSchema<RegistrationSchema> = object({
//   username: string()
//     .min(3, "Username must be at least 3 characters")
//     .required("Username is required"),
//   email: string().email("Invalid email").required("Email is required"),
//   password: string()
//     .min(8, "Password must be at least 8 characters")
//     .required("Password is required"),
//   confirmPassword: string()
//     .oneOf([ref("password")], "Passwords must match")
//     .required("Confirm Password is required"),
//   firstName: string().required("First Name is required"),
//   lastName: string().required("Last Name is required"),
//   country: string().required("Country is required"),
//   address: string().required("Address is required"),
//   zipCode: string().required("Zip Code is required"),
//   city: string().required("City is required"),
//   phone: string().required("Phone is required"),
// });
