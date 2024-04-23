import { useState } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../login/RegistrationForm";
import Button from "../common/Button";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);
  return (
    <div className="w-[90%] md:w-[70%]  p-4 flex flex-col content-center mx-auto overflow-hidden">
      <h5 className="text-lg font-semibold mb-16 mt-24 text-center">
        Moje konto
      </h5>
      <div className="w-full lg:flex lg:justify-between">
        <div className="w-full mb-12 lg:mb-0">
          {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-8">
            {isLogin ? "Rejestracja" : "Logowanie"}
          </h1>
          <Button
            className="font-semibold bg-[#D9D9D9] rounded w-[60%] p-2 text-center"
            onClick={toggleLogin}
          >
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
