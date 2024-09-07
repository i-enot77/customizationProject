import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/authApi";
import { useAppDispatch } from "../../../services/hooks";
import { setAuth, setPersist } from "../../../services/authenticationSlice";
import { FormikHelpers } from "formik";
import {
  setUserDeliveryAddress,
  setFullName,
  setUserPhone,
  setUserAddress,
} from "@/services/userSlice";

export const useLoginForm = (isCart: boolean) => {
  const [loginUser, { isSuccess, error }] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginSubmit = async (
    values: { email: string; password: string; persist: boolean },
    actions: FormikHelpers<{
      email: string;
      password: string;
      persist: boolean;
    }>
  ) => {
    try {
      loginUser({
        userEmail: values.email,
        pwd: values.password,
        persist: values.persist,
      })
        .unwrap()
        .then((response) => {
          dispatch(
            setAuth({
              userData: response.userData,
              isAuthenticated: true,
            })
          );
          dispatch(setFullName(response.fullName));
          dispatch(setUserPhone(response.userPhone));
          dispatch(setUserAddress(response.userAddress));
          dispatch(setUserDeliveryAddress(response.deliveryAddress));
          actions.resetForm();

          dispatch(setPersist(values.persist));
          !isCart && navigate(-1);
        });
    } catch (error) {
      console.error("Login failed", error);
      actions.setSubmitting(false);
    }
  };

  return { loginSubmit, isSuccess, error };
};
