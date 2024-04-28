import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import { usePersistLogin } from "../hooks/usePersistLogin";
import { useLoginForm } from "../hooks/useLoginForm";
import InputItem from "../../../components/InputItem";

const LoginForm = () => {
  const persist = useSelector((state: RootState) => state.auth.persist);
  const errMsg = useSelector((state: RootState) => state.auth.errMsg);
  const [isVisible, setIsVisible] = useState(false);

  const setPersistValue = usePersistLogin(persist);

  const {
    emailValue,
    passwordValue,
    handleEmailInput,
    handlePwdInput,
    loginSubmit,
  } = useLoginForm();

  return (
    <div className="w-full">
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
            onChange={setPersistValue}
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
