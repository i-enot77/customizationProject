import { useState } from "react";
import { Transition, Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import Cart from "../components/Cart";
import CheckoutForm from "../components/CheckoutForm";
import DeliveryMethod from "../components/DeliveryMethod";
import SummaryCheckout from "../components/SummaryCheckout";

export interface FormProps {
  nextStep?: () => void;
  prevStep?: () => void;
}

const CartSummaryForm = () => {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  const style = {
    btn: `w-full flex justify-between px-6 py-5 text-xl font-medium lg:hidden`,
  };
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between bg-stone-300 w-full h-full px-4 overflow-hidden">
      <div className="w-full lg:hidden">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className={style.btn}>
                <div>
                  <span>Podsumowanie</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    style={{ color: "#000000" }}
                    className={`ml-1.5 transition-transform  ${
                      open
                        ? "rotate-180 duration-500"
                        : "transform-none duration-500"
                    }`}
                  />
                </div>
                <span>{totalPrice} zł</span>
              </Disclosure.Button>

              <Transition
                show={open}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel>
                  <Cart />
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      <div className="hidden lg:block lg:flex-initial lg:w-[49%] ">
        <Cart />
      </div>

      <div className="h-full w-full py-6 flex flex-col justify-between lg:w-[49%]">
        {step === 1 && <CheckoutForm nextStep={nextStep} />}
        {step === 2 && (
          <DeliveryMethod prevStep={prevStep} nextStep={nextStep} />
        )}
        {step === 3 && <SummaryCheckout prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default CartSummaryForm;
