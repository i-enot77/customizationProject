import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../services/store";
import { setShipping } from "../../../services/orderSlice";
import { setCartSummary } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { shippingSchema } from "../schemaYup/shippingSchema";

const style = {
  header: `text-lg font-medium my-1`,
  btn: `bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white`,
};

const DeliveryMethod = ({
  prevStep,
  nextStep,
}: {
  prevStep?: () => void;
  nextStep?: () => void;
}) => {
  const dispatch = useDispatch();
  const email = useSelector((state: RootState) => state.order.email);
  const deliveryData = useSelector(
    (state: RootState) => state.order.deliveryAddress
  );
  const shipping = useSelector((state: RootState) => state.order.shipping);

  const toPrevStep = () => {
    if (prevStep) {
      prevStep();
    }
  };

  const handleSubmit = async (
    values: { shippingMethod: string; shippingCost: number },
    actions: FormikHelpers<{
      shippingMethod: string;
      shippingCost: number;
    }>
  ) => {
    dispatch(setShipping(values));
    dispatch(setCartSummary(true));
    actions.setSubmitting(false);
    if (nextStep) {
      nextStep();
    }
  };

  const initialValues = {
    shippingMethod: shipping.shippingMethod || "",
    shippingCost: shipping.shippingCost || 0,
  };

  return (
    <div className="flex-grow flex flex-col">
      <div>
        <div className="mb-2">
          <div className="flex justify-between">
            <h2 className={style.header}>Kontakt</h2>
            <Button onClick={toPrevStep}>Zmień</Button>
          </div>
          <div>{email}</div>
        </div>

        <div>
          <div className="flex justify-between">
            <div className={style.header}>Dane odbiorcy:</div>
            <Button onClick={toPrevStep}>Zmień</Button>
          </div>
          <div>{`${deliveryData.firstName} ${deliveryData.lastName}`}</div>
          <div>{deliveryData.address}</div>
          <div>
            {deliveryData.zipCode},{deliveryData.city}
          </div>
        </div>

        <h2 id="delivery-group" className={`${style.header} mt-10 mb-3`}>
          Metoda dostawy
        </h2>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={shippingSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, errors, touched }) => (
          <Form className="flex-grow flex flex-col justify-between">
            <div
              role="group"
              aria-labelledby="delivery-group"
              className="flex flex-col"
            >
              <label>
                <Field
                  type="radio"
                  name="shippingMethod"
                  value="Transport z wniesieniem"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("shippingMethod", e.target.value);
                    setFieldValue("shippingCost", 200);
                  }}
                  className="mr-2"
                />
                Transport z wniesieniem i ustawieniem mebla - 200 zł
              </label>

              <label>
                <Field
                  type="radio"
                  name="shippingMethod"
                  value="Wysyłka paletowa"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("shippingMethod", e.target.value);
                    setFieldValue("shippingCost", 300);
                  }}
                  className="mr-2"
                />
                Wysyłka paletowa - 300 zł
              </label>
            </div>
            {touched.shippingMethod && errors.shippingMethod && (
              <div>{errors.shippingMethod}</div>
            )}

            <div className="flex flex-wrap justify-between">
              <Button type="button" onClick={toPrevStep} className={style.btn}>
                Wróć
              </Button>
              <button type="submit" className={style.btn}>
                Przejdz do podsumowania
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DeliveryMethod;
