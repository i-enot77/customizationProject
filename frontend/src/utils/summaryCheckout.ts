import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Order, setInitShipping } from "@/services/orderSlice";
import { clearCart } from "@/services/cartSlice"; // Import the clearCart action
import {
  setDeliveryData,
  setFullName,
  setUserEmail,
} from "@/services/userSlice";

export const summaryCheckout = () => {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const userId = useSelector(
    (state: RootState) => state.auth.auth.userData?._id
  );
  const email = useSelector((state: RootState) => state.user.userEmail);
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const deliveryData = useSelector(
    (state: RootState) => state.user.userDeliveryData
  );
  const products = useSelector((state: RootState) => state.cart.cart);
  const shipping = useSelector((state: RootState) => state.order.shipping);
  const dispatch = useDispatch();

  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);

    // Set default values for ts
    const defaultFullName = { firstName: "Default", lastName: "User" };
    const defaultDeliveryData = {
      country: "Default Country",
      address: "Default Address",
      zipCode: "00000",
      city: "Default City",
      phone: "0000000000",
    };

    const orderData: Order = {
      userId: userId || null,
      email,
      fullName: fullName || defaultFullName,
      deliveryData: deliveryData || defaultDeliveryData,
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

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        console.error("Stripe Error:", result.error.message);
      } else {
        // Clear cart after a successful checkout session
        dispatch(clearCart());
        dispatch(setInitShipping());

        // Clear user data after successful checkout session if user not logged in
        if (!isLogged) {
          dispatch(setUserEmail(""));
          dispatch(setFullName(null));
          dispatch(setDeliveryData(null));
        }
      }
    } catch (error) {
      console.log("Payment Error:", error);
    }
  };

  return makePayment;
};
