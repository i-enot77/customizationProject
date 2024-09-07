import { useAppDispatch } from "@/services/hooks";
import { STORAGE_KEY } from "./useStorageCartUpdate";
import { setCart } from "@/services/cartSlice";
import { useEffect } from "react";

// Retrieve and validate cart from local storage
export const useCartFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedCart = localStorage.getItem(STORAGE_KEY);
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      if (parsedCart.expDate > Date.now()) {
        dispatch(setCart(parsedCart.cart));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
};
