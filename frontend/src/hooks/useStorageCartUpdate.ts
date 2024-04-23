import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";

export const useStorageCartUpdate = () => {
  const cartArr = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartArr));
  }, [cartArr]);
};
