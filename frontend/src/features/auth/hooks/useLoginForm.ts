import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/authApi";
import { useAppDispatch } from "../../../services/hooks";
import { setAuth, setPersist } from "../../../services/authenticationSlice";
import { FormikHelpers } from "formik";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import {
  setDeliveryData,
  setFullName,
  setUserEmail,
} from "@/services/userSlice";

export const useLoginForm = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state: RootState) => state.auth.auth);

  const loginSubmit = async (
    values: { email: string; password: string; persist: boolean },
    actions: FormikHelpers<{
      email: string;
      password: string;
      persist: boolean;
    }>
  ) => {
    try {
      const response = await loginUser({
        userEmail: values.email,
        pwd: values.password,
        persist: values.persist,
      }).unwrap();

      console.log(response);

      dispatch(
        setAuth({
          userData: response.userData,
          isAuthenticated: true,
        })
      );
      dispatch(setUserEmail(response.userData._id));
      dispatch(setFullName(response.fullName));
      dispatch(setDeliveryData(response.deliveryData));
      actions.resetForm();

      dispatch(setPersist(values.persist));
      console.log(auth, "login");
      // navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      actions.setSubmitting(false);
    }
  };

  return { loginSubmit };
};
