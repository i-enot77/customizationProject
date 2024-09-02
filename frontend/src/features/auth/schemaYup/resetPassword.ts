import { object, string, ref, ObjectSchema } from "yup";

export interface ResetPassword {
  password: string;
  confirmPassword: string;
}

export const resetPasswordSchema: ObjectSchema<ResetPassword> = object({
  password: string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: string()
    .oneOf([ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
