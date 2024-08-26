import { useState } from "react";
import {
  Transition,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import Cart from "../components/Cart";
import DeliveryMethod from "../components/DeliveryMethod";
import SummaryCheckout from "../components/SummaryCheckout";
import UserCheckout from "../components/UserCheckout";

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
    <div className="flex flex-col lg:flex-row lg:justify-between bg-white w-full h-full ml-4 pr-4 py-4 overflow-hidden">
      <div className="w-full lg:hidden">
        <Disclosure>
          {({ open }) => (
            <>
              <DisclosureButton className={style.btn}>
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
              </DisclosureButton>

              <Transition
                show={open}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <DisclosurePanel>
                  <Cart />
                </DisclosurePanel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>

      <div className="hidden lg:block lg:flex-initial lg:w-[49%] ">
        <Cart />
      </div>

      <div className="h-full w-[90%] md:w-[80%] p-2 flex flex-col justify-around mx-auto lg:w-[49%]">
        {step === 1 && <UserCheckout nextStep={nextStep} />}
        {step === 2 && (
          <DeliveryMethod prevStep={prevStep} nextStep={nextStep} />
        )}
        {step === 3 && <SummaryCheckout prevStep={prevStep} />}
      </div>
    </div>
  );
};

export default CartSummaryForm;
