import { useAppDispatch } from "@/services/hooks";
import { STORAGE_KEY } from "./useStorageCartUpdate";
import { setCart } from "@/services/cartSlice";
import { useEffect } from "react";

// Retrieve and validate cart from local storage
export const useCartFromLocalStorage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        dispatch(setCart(parsedCart));
        if (parsedCart.expDate > Date.now()) {
          dispatch(setCart(parsedCart.cart));
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error retrieving cart from local storage", error);
    }
  }, []);
};
