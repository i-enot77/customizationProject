import { useState } from "react";
import LoginForm from "../features/auth/pages/LoginForm";
import RegistrationForm from "../features/auth/pages/RegistrationForm";
import Button from "../components/Button";

const Account = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleLogin = () => setIsLogin(!isLogin);
  return (
    <div className="self-center flex-grow w-[90%] md:w-[70%]  p-4 flex flex-col justify-center items-center ">
      <h5 className="text-lg font-semibold text-center mb-2">Moje konto</h5>
      <div className="w-full lg:flex lg:justify-between">
        <div className="w-full h-full overflow-y-auto mb-12 lg:mb-0">
          <h1 className="text-lg font-semibold mb-8 text-center">
            {isLogin ? "Logowanie" : "Rejestracja"}
          </h1>
          {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-lg font-semibold mb-8">
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
