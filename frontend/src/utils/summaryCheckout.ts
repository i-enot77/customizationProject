import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Order } from "@/services/orderSlice";

export const summaryCheckout = () => {
  const userId = useSelector(
    (state: RootState) => state.auth.auth.userData?._id
  );
  const email = useSelector((state: RootState) => state.order.email);
  const deliveryAddress = useSelector(
    (state: RootState) => state.order.deliveryAddress
  );
  const products = useSelector((state: RootState) => state.cart.cart);
  const shipping = useSelector((state: RootState) => state.order.shipping);

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

      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error("Stripe Error:", error);
    }
  };

  return makePayment;
};
