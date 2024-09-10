import { object, string, ref, ObjectSchema, boolean } from "yup";

export interface RegistrationSchema {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const registrationSchema: ObjectSchema<RegistrationSchema> = object({
  email: string()
    .email("Niepoprawny adres email")
    .required("Email jest wymagany"),
  password: string()
    .required("Hasło jest wymagane")
    .min(8, "Hasło musi zawierać co najmniej 8 znaków"),
  confirmPassword: string()
    .oneOf([ref("password")], "Hasła muszą się zgadzać")
    .required("Potwierdzenie hasła jest wymagane"),
  acceptTerms: boolean()
    .oneOf([true], "Musisz zaakceptować warunki korzystania z usługi")
    .required("Akceptacja warunków jest wymagana"),
});
