import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../services/authApi";
import { useAppDispatch } from "../../../services/hooks";
import { setAuth } from "../../../services/authenticationSlice";
import { RegistrationSchema } from "../schemaYup/registrationSchema";
import { FormikHelpers } from "formik";

export const useRegistrationForm = () => {
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registerSubmit = async (
    values: RegistrationSchema,
    actions: FormikHelpers<RegistrationSchema>
  ) => {
    try {
      const { confirmPassword, ...userData } = values;
      const response = await registerUser(userData).unwrap();
      console.log(response);
      dispatch(
        setAuth({
          userData: response.userData,
          isAuthenticated: true,
        })
      );
      actions.resetForm(); // Reset form fields after successful registration
      // navigate("/");
    } catch (error) {
      console.error("Registration failed", error);
      actions.setSubmitting(false);
    }
  };

  return { registerSubmit };
};
