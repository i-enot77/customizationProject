import { useLogoutMutation } from "@/services/authApi";
import { clearUserData } from "@/services/authenticationSlice";
import { useAppDispatch } from "@/services/hooks";

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      logout({})
        .unwrap()
        .then(() => {
          dispatch(clearUserData());
        });
      // navigate('/login');
      console.log("logout");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return { handleLogout };
};
