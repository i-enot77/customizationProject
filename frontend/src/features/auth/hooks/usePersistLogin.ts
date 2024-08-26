import { clearUserData, setAuth } from "@/services/authenticationSlice";
import { useAppDispatch } from "@/services/hooks";
import { useLazyRefreshTokenQuery } from "@/services/refreshTokenApi";
import { useEffect } from "react";
import { getPersistFromLocalStorage } from "../utils/persistFromLocalStorage";
import { setDeliveryData, setFullName } from "@/services/userSlice";

const useAuthRefresh = () => {
  const dispatch = useAppDispatch();
  const persist = getPersistFromLocalStorage();
  const [triggerRefreshToken, { data, isSuccess, isError, error }] =
    useLazyRefreshTokenQuery();

  useEffect(() => {
    if (persist) {
      triggerRefreshToken();
    }
  }, [triggerRefreshToken, persist]);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(
        setAuth({
          userData: data.userData,
          isAuthenticated: true,
        })
      );
      dispatch(setFullName(data.fullName));
      dispatch(setDeliveryData(data.deliveryData));
    } else if (isError) {
      console.error("Error during token refresh:", error);
      dispatch(clearUserData());
    }
  }, [dispatch, isSuccess, data, isError, error]);
};

export default useAuthRefresh;
