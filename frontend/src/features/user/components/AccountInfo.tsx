import Button from "@/components/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { RootState } from "@/services/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { underlinedBtn } from "../style";

function AccountInfo() {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const { handleLogout } = useLogout();
  return (
    <div className="flex flex-col px-12">
      {/* <Link to="/user-account" className="">
        moje konto
      </Link> */}
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
