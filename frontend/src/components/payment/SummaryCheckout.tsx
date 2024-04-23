import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { FormProps } from "../cart/CartSummaryForm";
import Button from "../common/Button";
import { summaryCheckout } from "../../functions/summaryCheckout";

const SummaryCheckout = ({ prevStep }: FormProps) => {
  const user = useSelector((state: RootState) => state.order.user);
  const shipping = useSelector((state: RootState) => state.order.shipping);

  const handleOrder = summaryCheckout();

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
