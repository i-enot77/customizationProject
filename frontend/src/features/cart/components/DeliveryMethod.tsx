import { useSelector } from "react-redux";
import { ChangeEvent } from "react";
import { FormProps } from "../pages/CartSummaryForm";
import { useAppDispatch } from "../../../services/hooks";
import { RootState } from "../../../services/store";
import { setShipping } from "../../../services/orderSlice";
import { setCartSummary } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import InputItem from "../../../components/InputItem";

const style = {
  header: `text-lg font-medium my-1`,
};

const DeliveryMethod = ({ prevStep, nextStep }: FormProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.order.user);

  const toPrevStep = () => {
    if (prevStep) {
      prevStep();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setShipping({
        method: e.target.value,
        cost: e.target.dataset.cost ? parseFloat(e.target.dataset.cost) : 0,
      })
    );
  };

  const handleSubmit = () => {
    dispatch(setCartSummary(true));
    if (nextStep) {
      nextStep();
    }
  };

  return (
    <>
      <div className="px-4">
        <div>
          <div className="mb-2">
            <div className={style.header}>Kontakt</div>
            <div className="flex justify-between">
              <span>{user.email}</span>
              <Button onClick={toPrevStep}>Zmień</Button>
            </div>
          </div>

          <div>
            <div className={style.header}>Adres dostawy</div>
            <div className="flex justify-between">
              <span>{`${user.address}, ${user.zipCode}, ${user.city}`}</span>
              <Button onClick={toPrevStep}>Zmień</Button>
            </div>
          </div>
        </div>

        <form className="mt-10">
          <div id="delivery-group" className={style.header}>
            Metoda dostawy
          </div>
          <div role="group" aria-labelledby="delivery-group">
            <div className="flex justify-between items-center pb-2">
              <label>
                <InputItem
                  type="radio"
                  name="shipping"
                  value="Transport z wniesieniem"
                  data-cost="200"
                  onChange={handleChange}
                  className="mr-1.5 w-4 h-4"
                />
                Transport z wniesieniem i ustawieniem mebla
              </label>
              <span>200 zł</span>
            </div>
            <div className="flex justify-between items-center">
              <label>
                <InputItem
                  type="radio"
                  name="shipping"
                  value="Wysyłka paletowa"
                  data-cost="300"
                  onChange={handleChange}
                  className="mr-1.5 w-4 h-4"
                />
                Wysyłka paletowa
              </label>
              <span>300 zł</span>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-around">
        <div
          onClick={toPrevStep}
          className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
        >
          Powrót do informacji
        </div>
        <Button
          onClick={handleSubmit}
          className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
        >
          Przejdz do podsumowania
        </Button>
      </div>
    </>
  );
};

export default DeliveryMethod;
