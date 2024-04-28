import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import InputItem from "../../../components/InputItem";
import Button from "../../../components/Button";

const RegistrationForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisible = () => setIsVisible(!isVisible);
  const errMsg = useSelector((state: RootState) => state.auth.errMsg);

  const { emailValue, passwordValue, handleEmail, handlePwd, handleSubmit } =
    useRegistrationForm();
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
