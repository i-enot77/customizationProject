import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../services/hooks";
import { setAuth, setErrMsg } from "../services/authenticationSlice";
import { useRegisterUserMutation } from "../services/authApi";

export const useRegistrationForm = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation();
  const dispatch = useAppDispatch();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);
  const handlePwd = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registerUser({
      user: emailValue,
      pwd: passwordValue,
    })
      .unwrap()
      .then((response) => {
        if (response) {
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

  return { emailValue, passwordValue, handleEmail, handlePwd, handleSubmit };
};
