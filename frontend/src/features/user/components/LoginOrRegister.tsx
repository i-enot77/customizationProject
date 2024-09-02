import Button from "@/components/Button";
import { useAppDispatch } from "@/services/hooks";
import { setIslogin } from "@/services/userAccountSlice";
import { useNavigate } from "react-router-dom";
import { underlinedBtn } from "../style";

function LoginOrRegister() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(setIslogin(true));
    navigate("/account");
  };

  const handleRegister = () => {
    dispatch(setIslogin(false));
    navigate("/account");
  };
  return (
    <div className="">
      <h2 className="text-xl font-medium">Witamy!</h2>
      <Button className={underlinedBtn.btn} onClick={handleLogin}>
        Zaloguj się
      </Button>
      <div>Nie masz jeszcze konta?</div>
      <Button className={underlinedBtn.btn} onClick={handleRegister}>
        Zarejestruj się
      </Button>
    </div>
  );
}

export default LoginOrRegister;
