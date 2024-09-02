import { useLogoutMutation } from "@/services/authApi";
import { clearUserData } from "@/services/authenticationSlice";
import { useAppDispatch } from "@/services/hooks";
import { initOrderDeliveryData } from "@/services/orderSlice";
import {
  setFullName,
  setUserAddress,
  setUserDeliveryAddress,
  setUserPhone,
} from "@/services/userSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      logout({})
        .unwrap()
        .then(() => {
          dispatch(clearUserData());
          dispatch(setFullName(null));
          dispatch(setUserPhone(null));
          dispatch(setUserAddress(null));
          dispatch(setUserDeliveryAddress(null));
          dispatch(initOrderDeliveryData());
        });
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return { handleLogout };
};
