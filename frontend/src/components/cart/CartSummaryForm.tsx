import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import Cart from "./Cart";
import DeliveryMethod from "./DeliveryMethod";
import SummaryCheckout from "../payment/SummaryCheckout";

export interface FormProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

const CartSummaryForm = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="w-[70%] grid grid-rows-1 grid-cols-2">
      <Cart />
      {step === 1 && <CheckoutForm nextStep={nextStep} />}
      {step === 2 && <DeliveryMethod prevStep={prevStep} nextStep={nextStep} />}
      {step === 3 && <SummaryCheckout prevStep={prevStep} />}
    </div>
  );
};

export default CartSummaryForm;
