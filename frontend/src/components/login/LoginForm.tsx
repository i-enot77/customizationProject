import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputItem from "../common/InputItem";
import { useLoginUserMutation } from "../../services/api";
import {
  setAuth,
  setErrMsg,
  setPersist,
} from "../../services/authenticationSlice";
import { useAppDispatch, useAppSelector } from "../../services/hooks";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const persist = useAppSelector((state) => state.auth.persist);
  const errMsg = useAppSelector((state) => state.auth.errMsg);
  const auth = useAppSelector((state) => state.auth.auth);

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const togglePersist = () => {
    dispatch(setPersist(!persist));
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmailValue(e.target.value);

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPasswordValue(e.target.value);

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

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
          console.log(auth);
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
      <h1 className="text-3xl font-semibold mb-3 text-center">Logowanie</h1>
      {errMsg && <div className="text-[#f45151] text-3xl">{errMsg}</div>}

      <form onSubmit={loginSubmit}>
        <div className="flex flex-col">
          <label className="text-[#5A5A5D] mb-1" htmlFor="email">
            Nazwa użytkownika lub adres e-mail
          </label>
          <InputItem
            id="email"
            type="email"
            name="email"
            value={emailValue}
            onChange={handleEmailInput}
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
            onChange={handlePwdInput}
            className="p-1.5 border border-gray-400 rounded-md focus:outline-none"
          />
          <FontAwesomeIcon
            className="absolute bottom-[10px] right-[10px]"
            icon={isVisible ? faEyeSlash : faEye}
            style={{ color: "#000000" }}
            onClick={() => setIsVisible(!isVisible)}
          />
        </div>

        <InputItem
          className="flex justify-center items-center py-2 w-full bg-cyan-400 rounded-md mt-6 mb-3"
          type="submit"
          value="Zaloguj"
        />
      </form>
      <div className="flex justify-between items-center">
        <div className="flex justify-start items-center">
          <InputItem
            id="persist"
            type="checkbox"
            name="persist"
            onChange={togglePersist}
            className="mr-1 w-[15px] h-[15px]"
            checked={persist}
          />
          <label className="text-sm" htmlFor="persist">
            Zapamiętaj mnie
          </label>
        </div>
        <Link className="text-sm" to={"/request-reset"}>
          Przypomnij hasło
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
