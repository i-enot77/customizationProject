import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import InputItem from "../common/InputItem";
import { setAuth, setErrMsg } from "../../services/authenticationSlice";
import { useRegisterUserMutation } from "../../services/authApi";
import Button from "../common/Button";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

const RegistrationForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();
  const errMsg = useAppSelector((state) => state.auth.errMsg);
  const [registerUser] = useRegisterUserMutation();
  const dispatch = useAppDispatch();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);
  const handlePwd = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);
  const toggleVisible = () => setIsVisible(!isVisible);

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
          navigate("/sended-email");
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(setErrMsg(error.data));
        console.log(errMsg);
      });
  };

  return (
    <div className="w-[80%]">
      <h1 className="text-3xl font-semibold mb-3 text-center">
        Zarejestruj się
      </h1>
      {errMsg && <div className="text-[#f45151] text-3xl">{errMsg}</div>}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5A5A5D] mb-1" htmlFor="email">
            Adres email:{" "}
          </label>
          <InputItem
            id="email"
            type="email"
            name="email"
            value={emailValue}
            onChange={handleEmail}
            placeholder={"adres email"}
            className="p-1.5 border border-gray-400 rounded-md focus:outline-none"
          />
        </div>

        <div className="flex flex-col my-2 relative">
          <label className="text-[#5A5A5D] mb-1" htmlFor="password">
            Hasło:{" "}
          </label>
          <InputItem
            id="password"
            type={isVisible ? "text" : "password"}
            name="password"
            value={passwordValue}
            onChange={handlePwd}
            className="p-1.5 border border-gray-400 rounded-md focus:outline-none"
          />
          <FontAwesomeIcon
            className="absolute bottom-[10px] right-[10px]"
            icon={isVisible ? faEyeSlash : faEye}
            style={{ color: "#000000" }}
            onClick={toggleVisible}
          />
        </div>

        <Button className="flex justify-center items-center py-2 w-full bg-cyan-400 rounded-md my-2">
          Zarejestruj się
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
