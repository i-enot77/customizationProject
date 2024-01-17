import { useState } from "react";
import LoginForm from "../login/LoginForm";
import RegistrationForm from "../login/RegistrationForm";
import Button from "../common/Button";

function Account() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-[1112px] h-screen p-4 flex flex-col justify-center items-center">
      <h5 className="text-lg font-semibold mb-16">Moje konto</h5>
      <div className="w-full flex justify-between">
        <div className="w-[50%]">
          {isLogin ? <LoginForm /> : <RegistrationForm />}
        </div>
        <div className="w-[50%] flex flex-col items-center">
          <h1 className="text-3xl font-semibold mb-8">
            {isLogin ? "Rejestracja" : "Logowanie"}
          </h1>
          <Button
            btnClass="font-semibold bg-[#D9D9D9] rounded w-[60%] p-2 text-center"
            handleClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Account;
