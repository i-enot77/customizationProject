import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/authApi";
import { useAppDispatch } from "../../../services/hooks";
import { setAuth, setErrMsg } from "../../../services/authenticationSlice";

export const useLoginForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  const [loginUser] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const loginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser({
      user: emailValue,
      pwd: passwordValue,
    })
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(response);

          dispatch(
            setAuth({ user: emailValue, accessToken: response.accessToken })
          );

          setEmailValue("");
          setPasswordValue("");

          dispatch(setErrMsg(null));

          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrMsg(error.data));
      });
  };
  return {
    emailValue,
    passwordValue,
    handleEmailInput,
    handlePwdInput,
    loginSubmit,
  };
};
