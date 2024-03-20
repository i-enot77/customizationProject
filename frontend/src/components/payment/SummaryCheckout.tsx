import { useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { v4 as uuidv4 } from "uuid";
import { RootState } from "../../services/store";
import { FormProps } from "../cart/CartSummaryForm";
import Button from "../common/Button";
import { Order, useSaveOrderMutation } from "../../services/orderApi";

const SummaryCheckout = ({ prevStep }: FormProps) => {
  const user = useSelector((state: RootState) => state.order.user);
  const products = useSelector((state: RootState) => state.cart.cart);
  const shipping = useSelector((state: RootState) => state.order.shipping);

  const [sendOrder] = useSaveOrderMutation();

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

  const makePayment = async (order: Order) => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_SECRET);
    try {
      const response = await fetch(
        "http://localhost:3500/create-checkout-session",
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

  const style = {
    header: `text-lg font-medium my-1`,
    btn: `flex justify-between px-10 py-5 text-xl font-medium lg:hidden`,
  };
  return (
    <>
      <div>
        <h2 className={style.header}>Podsumowanie:</h2>
        <div className="mb-4">
          <div>
            <div>
              <div className={style.header}>Kontakt</div>
              <div>{user.email}</div>
            </div>

            <div>
              <div className={style.header}>Adres dostawy</div>
              <div>{`${user.address} ${user.zipCode} ${user.city}`}</div>
            </div>

            <div>
              <div className={style.header}>Sposób dostawy</div>
              <div>{shipping.method}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-around">
        <Button
          className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
          onClick={prevStep}
        >
          Wróć
        </Button>
        <Button
          className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
          onClick={handleOrder}
        >
          Zapłać
        </Button>
      </div>
    </>
  );
};
export default SummaryCheckout;
