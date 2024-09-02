import { useSelector } from "react-redux";
import { RootState } from "../../../services/store";
import { summaryCheckout } from "../../../utils/summaryCheckout";
import Button from "../../../components/Button";

const SummaryCheckout = ({ prevStep }: { prevStep?: () => void }) => {
  const userEmail = useSelector((state: RootState) => state.order.email);
  const deliveryData = useSelector(
    (state: RootState) => state.order.deliveryData
  );
  const shipping = useSelector((state: RootState) => state.order.shipping);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const makePayment = summaryCheckout();

  const style = {
    header: `text-lg font-medium mt-2`,
    btn: `flex justify-between px-10 py-5 text-xl font-medium lg:hidden`,
  };
  return (
    <>
      <div>
        <h2 className={style.header}>Podsumowanie:</h2>
        <div className="py-4">
          <div>
            {userEmail && (
              <>
                <div>
                  <h2 className={style.header}>Dane odbiorcy:</h2>
                  <div>{userEmail}</div>
                  <div>{deliveryData.firstName}</div>
                  <div>{deliveryData.lastName}</div>
                </div>
                {deliveryData && (
                  <div>
                    <h2 className={style.header}>Adres dostawy</h2>
                    <div>{`${deliveryData.address} ${deliveryData.zipCode} ${deliveryData.city}`}</div>
                  </div>
                )}
              </>
            )}
            <div>
              <h2 className={style.header}>Sposób dostawy</h2>
              <div>{shipping.shippingMethod}</div>
            </div>
          </div>

          <div className="py-2 mt-4">
            <h2 className={style.header}>
              Wartość zamówienia: {totalPrice} zł
            </h2>
            <h2 className={style.header}>
              Koszt dostawy: {shipping.shippingCost} zł
            </h2>
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
          onClick={makePayment}
        >
          Zapłać
        </Button>
      </div>
    </>
  );
};
export default SummaryCheckout;
