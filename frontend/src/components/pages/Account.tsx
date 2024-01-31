import { useState } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../login/RegistrationForm";
import Button from "../common/Button";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);

  const showLogin = isLogin ? <LoginForm /> : <RegistrationForm />;
  const showHeader = isLogin ? "Zarejestruj się" : "Zaloguj się";

  return (
    <div className="w-[1112px] h-screen p-4 flex flex-col justify-center items-center">
      <h5 className="text-lg font-semibold mb-16">Moje konto</h5>
      <div className="w-full flex justify-between">
        <div className="w-[50%]">{showLogin}</div>
        <div className="w-[50%] flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-8">
            {isLogin ? "Rejestracja" : "Logowanie"}
          </h1>
          <Button
            className="font-semibold bg-[#D9D9D9] rounded w-[60%] p-2 text-center"
            onClick={toggleLogin}
          >
            {showHeader}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
