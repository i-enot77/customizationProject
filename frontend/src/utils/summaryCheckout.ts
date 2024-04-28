import { v4 as uuidv4 } from "uuid";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Order, useSaveOrderMutation } from "../services/orderApi";

export const summaryCheckout = () => {
  const user = useSelector((state: RootState) => state.order.user);
  const products = useSelector((state: RootState) => state.cart.cart);
  const shipping = useSelector((state: RootState) => state.order.shipping);

  const [sendOrder] = useSaveOrderMutation();

  // LOCAL -> localhost:3500
  // DEV -> dev.domain.com
  // TEST -> test.domain.com
  // PROD -> domain.com

  const makePayment = async (order: Order) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);

    try {
      const response = await fetch(
        import.meta.env.VITE_URL + "/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );
      const session = await response.json();

      const result = stripe?.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOrder = async () => {
    try {
      await sendOrder({
        id: uuidv4(),
        customer: user,
        products,
        shipping,
      });
      await makePayment({
        id: uuidv4(),
        customer: user,
        products,
        shipping,
      });
    } catch (error) {
      console.log("Error handling order:", error);
    }
  };

  return handleOrder;
};
