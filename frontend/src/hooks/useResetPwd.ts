import { ChangeEvent, FormEvent, useState } from "react";
import { useResetPasswordMutation } from "../services/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../services/hooks";
import { setErrMsg } from "../services/authenticationSlice";

export const useResetPwd = () => {
  const [newPassword, setNewPassword] = useState("");

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) return;

    resetPassword({
      token,
      newPassword,
    })
      .unwrap()
      .then((response) => {
        if (response) {
          setNewPassword("");
          dispatch(setErrMsg(""));
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrMsg("Resetowania hasła nie powiodło się"));
      });
  };

  return { newPassword, handlePwdInput, handleResetPassword };
};
