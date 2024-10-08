import LoginForm from "../features/auth/components/LoginForm";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { useAppDispatch } from "@/services/hooks";
import { toggleLogin } from "@/services/userAccountSlice";

const Account = () => {
  const isLogin = useSelector((state: RootState) => state.userAccount.isLogin);
  const dispatch = useAppDispatch();

  const handleToggle = () => {
    dispatch(toggleLogin());
  };
  return (
    <div className="self-center flex-grow w-[90%] md:w-[70%]  p-4 flex flex-col justify-center items-center ">
      <h5 className="text-lg font-semibold text-center mb-2">Moje konto</h5>
      <div className="w-full lg:flex lg:justify-between">
        <div className="w-full h-full overflow-y-auto mb-12 lg:mb-0">
          <h1 className="text-lg font-semibold mb-8 text-center">
            {isLogin ? "Logowanie" : "Rejestracja"}
          </h1>
          {isLogin ? <LoginForm isCart={false} /> : <RegistrationForm />}
        </div>
        <div className="w-full flex flex-col items-center">
          <h1 className="text-lg font-semibold mb-8">
            {isLogin ? "Rejestracja" : "Logowanie"}
          </h1>
          <Button
            className="font-semibold bg-[#D9D9D9] rounded w-[60%] p-2 text-center"
            onClick={handleToggle}
          >
            {isLogin ? "Zarejestruj się" : "Zaloguj się"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Account;
