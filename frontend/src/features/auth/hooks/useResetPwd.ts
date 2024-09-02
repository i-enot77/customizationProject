import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../../services/authApi";
import { ResetPassword } from "../schemaYup/resetPassword";
import { FormikHelpers } from "formik";

export const useResetPwd = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPassword] = useResetPasswordMutation();

  const onSubmit = (
    values: ResetPassword,
    actions: FormikHelpers<ResetPassword>
  ) => {
    try {
      if (!token) return;

      resetPassword({
        token,
        newPassword: values.password,
      })
        .unwrap()
        .then(() => {
          navigate("/account");
          actions.resetForm();
        });
    } catch (error) {
      console.error("Password changing failed", error);
      actions.setSubmitting(false);
    }
  };

  return { onSubmit };
};
