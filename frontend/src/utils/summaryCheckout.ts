import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/store";
import {
  Order,
  initOrderDeliveryData,
  setInitShipping,
  setOrderUserEmail,
} from "@/services/orderSlice";
import { clearCart } from "@/services/cartSlice";
import { STORAGE_KEY } from "@/hooks/useStorageCartUpdate";

export const summaryCheckout = () => {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const userId = useSelector(
    (state: RootState) => state.auth.auth.userData?._id
  );
  const email = useSelector((state: RootState) => state.order.email);
  const deliveryAddress = useSelector(
    (state: RootState) => state.order.deliveryAddress
  );
  const products = useSelector((state: RootState) => state.cart.cart);
  const shipping = useSelector((state: RootState) => state.order.shipping);
  const dispatch = useDispatch();

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);

    const orderData: Order = {
      userId: userId || null,
      email,
      deliveryAddress,
      products,
      shipping,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_URL}/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        }
      );

      const session = await response.json();
      console.log("Checkout Session Response:", session);

      // Clear cart after a successful checkout session
      dispatch(clearCart());
      localStorage.removeItem(STORAGE_KEY);
      dispatch(setInitShipping());
      // Clear user data after successful checkout session if user not logged in
      if (!isLogged) {
        dispatch(setOrderUserEmail(""));
        dispatch(initOrderDeliveryData());
      }

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
    }
  };

  return makePayment;
};
