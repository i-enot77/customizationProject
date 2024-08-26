import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../services/store";
import { setShipping } from "../../../services/orderSlice";
import { setCartSummary } from "../../../services/cartSlice";
import Button from "../../../components/Button";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { shippingSchema } from "../schemaYup/shippingSchema";

const style = {
  header: `text-lg font-medium my-1`,
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
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const deliveryData = useSelector(
    (state: RootState) => state.order.deliveryData
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
    if (nextStep) {
      nextStep();
    }
    // actions.resetForm();
  };

  const initialValues = {
    shippingMethod: shipping.shippingMethod || "",
    shippingCost: shipping.shippingCost || 0,
  };

  return (
    <>
      <div className="px-4">
        <div>
          <div className="mb-2">
            <div className={style.header}>Kontakt</div>
            <div className="flex justify-between">
              <span>{email}</span>
              <Button onClick={toPrevStep}>Zmień</Button>
            </div>
          </div>

          <div>
            <div className={style.header}>Dane odbiorcy:</div>
            <div className="flex justify-between">
              <div>
                {fullName && `${fullName.firstName} ${fullName.lastName}`}
              </div>
              <div>{`${deliveryData.address}, ${deliveryData.zipCode}, ${deliveryData.city}`}</div>
              <Button onClick={toPrevStep}>Zmień</Button>
            </div>
          </div>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={shippingSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="mt-10">
              <h2 id="delivery-group" className={style.header}>
                Metoda dostawy
              </h2>
              <div role="group" aria-labelledby="delivery-group">
                <label>
                  <Field
                    type="radio"
                    name="shippingMethod"
                    value="Transport z wniesieniem"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("shippingMethod", e.target.value);
                      setFieldValue("shippingCost", 200);
                    }}
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
                  />
                  Wysyłka paletowa - 300 zł
                </label>
              </div>
              {touched.shippingMethod && errors.shippingMethod && (
                <div>{errors.shippingMethod}</div>
              )}

              <div className="flex justify-around">
                <Button
                  type="button"
                  onClick={toPrevStep}
                  className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white"
                >
                  Powrót do informacji
                </Button>
                <button type="submit">Przejdz do podsumowania</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default DeliveryMethod;
