import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";

export const STORAGE_KEY = "cart";
export const EXPIRATION_TIME = 86400000; // 1 day in milliseconds

export const useStorageCartUpdate = () => {
  const cartArr = useSelector((state: RootState) => state.cart.cart);

  useEffect(() => {
    if (cartArr.length === 0) {
      // Clear cart from local storage when the cart is empty
      localStorage.removeItem(STORAGE_KEY);
      return;
    }

    // Retrieve existing cart from local storage
    const existingCart = localStorage.getItem(STORAGE_KEY);
    let expDate = Date.now() + EXPIRATION_TIME;

    if (existingCart) {
      const parsedCart = JSON.parse(existingCart);
      // Use existing expiration date if it's still valid
      if (parsedCart.expDate && parsedCart.expDate > Date.now()) {
        expDate = parsedCart.expDate;
      }
    }

    const cartItem = {
      cart: cartArr,
      expDate: expDate,
    };

    const saveCartToLocalStorage = () => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItem));
      } catch (error) {
        console.error("Error saving cart to local storage", error);
      }
    };

    saveCartToLocalStorage();
  }, [cartArr]);
};
