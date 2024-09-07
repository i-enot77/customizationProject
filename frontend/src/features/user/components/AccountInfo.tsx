import Button from "@/components/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { underlinedBtn } from "../style";

function AccountInfo() {
  const navigate = useNavigate();

  const { handleLogout } = useLogout();
  return (
    <div className="flex flex-col px-12">
      <Button
        className={`${underlinedBtn.btn} mb-2`}
        onClick={() => navigate("/user-account")}
      >
        Moje konto
      </Button>

      <Button className={underlinedBtn.btn} onClick={handleLogout}>
        Wyloguj się
      </Button>
    </div>
  );
}

export default AccountInfo;
