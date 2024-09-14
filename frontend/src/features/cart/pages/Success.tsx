import { STORAGE_KEY } from "@/hooks/useStorageCartUpdate";
import { clearCart } from "@/services/cartSlice";
import { useAppDispatch } from "@/services/hooks";
import {
  initOrderDeliveryData,
  setInitShipping,
  setOrderUserEmail,
} from "@/services/orderSlice";
import { RootState } from "@/services/store";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Success() {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Clear cart after a successful checkout session
    dispatch(clearCart());
    localStorage.removeItem(STORAGE_KEY);
    dispatch(setInitShipping());
    // Clear user data after successful checkout session if user not logged in
    if (!isLogged) {
      dispatch(setOrderUserEmail(""));
      dispatch(initOrderDeliveryData());
    }
  }, []);

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <FontAwesomeIcon
        icon={faCircleCheck}
        size="2xl"
        style={{ color: "#0b982f" }}
      />
      <h2 className="text-2xl font-medium py-5">Płatność zrealizowana!</h2>
      <Link
        to="/"
        className="text-lg text-white bg-[#5548a7] py-2 px-4 rounded"
      >
        Wróć do sklepu
      </Link>
    </div>
  );
}

export default Success;
