import { Field, Form, Formik, FormikHelpers } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../services/store";
import { userOrderDataSchema } from "../userOrderDataSchema";
import { formStyle } from "@/assets/formStyle";
import { setOrderDeliveryData, setOrderUserEmail } from "@/services/orderSlice";
import { OrderSchema } from "../schemaYup/orderFormSchema";
import { usePhoneNumber } from "@/features/user/hooks/usePhoneNumber";
import { useEffect } from "react";

const UserDataForm = ({ nextStep }: { nextStep?: () => void }) => {
  const userOrderEmail = useSelector((state: RootState) => state.order.email);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const userData = useSelector((state: RootState) => state.auth.auth.userData);
  const userDeliveryAddress = useSelector(
    (state: RootState) => state.user.userDeliveryAddress
  );
  const orderDeliveryAddress = useSelector(
    (state: RootState) => state.order.deliveryAddress
  );
  const dispatch = useDispatch();

  const { phone, country } = usePhoneNumber(orderDeliveryAddress?.phoneNumber);

  useEffect(() => {
    if (isAuthenticated && userData && userDeliveryAddress) {
      dispatch(setOrderUserEmail(userData.email));
      dispatch(setOrderDeliveryData(userDeliveryAddress));
    } else if (isAuthenticated && userData) {
      dispatch(setOrderUserEmail(userData.email));
    }
  }, [isAuthenticated, userDeliveryAddress]);

  const onSubmit = (
    values: OrderSchema,
    actions: FormikHelpers<OrderSchema>
  ) => {
    const { email, ...deliveryData } = values;
    dispatch(setOrderUserEmail(email));
    dispatch(setOrderDeliveryData(deliveryData));
    console.log(orderDeliveryAddress);
    actions.setSubmitting(false);
    if (nextStep) {
      nextStep();
    }
  };

  useEffect(() => {
    console.log(orderDeliveryAddress);
  }, [orderDeliveryAddress]);

  const initialValues: OrderSchema = {
    email: userOrderEmail || "",
    firstName: orderDeliveryAddress.firstName || "",
    lastName: orderDeliveryAddress.lastName || "",
    phoneNumber: phone,
    address: orderDeliveryAddress?.address || "",
    zipCode: orderDeliveryAddress?.zipCode || "",
    city: orderDeliveryAddress?.city || "",
    country: orderDeliveryAddress?.country || "",
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={userOrderDataSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="">
            <div className={formStyle.field}>
              <label htmlFor="email">Adres e-mail:</label>
              <Field
                id="email"
                type="email"
                name="email"
                className={formStyle.input}
              />
              {errors.email && touched.email ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div>
              <div className="text-end">
                {isAuthenticated &&
                  !userDeliveryAddress &&
                  "Twoje konto jescze nie zawiera danych do wysyłki"}
              </div>
              <div className={formStyle.field}>
                <label htmlFor="firstName">Imię:</label>
                <Field
                  id="firstName"
                  type="text"
                  name="firstName"
                  className={formStyle.input}
                />
                {errors.firstName && touched.firstName ? (
                  <div className={formStyle.error}>Pole jest wymagane</div>
                ) : null}
              </div>
              <div className={formStyle.field}>
                <label htmlFor="lastName">Nazwisko:</label>
                <Field
                  id="lastName"
                  type="text"
                  name="lastName"
                  className={formStyle.input}
                />
                {errors.lastName && touched.lastName ? (
                  <div className={formStyle.error}>Pole jest wymagane</div>
                ) : null}
              </div>
            </div>

            <h2 className={formStyle.header}>Adres dostawy:</h2>
            <div className={formStyle.field}>
              <label htmlFor="country">Kraj:</label>
              <Field
                id="country"
                type="text"
                name="country"
                className={formStyle.input}
              />
              {errors.country && touched.country ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="address">
                Adres (ulica, nr budynku i nr mieszkania):
              </label>
              <Field
                id="address"
                type="text"
                name="address"
                className={formStyle.input}
              />
              {errors.address && touched.address ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="zipCode">Kod pocztowy:</label>
              <Field
                id="zipCode"
                type="text"
                name="zipCode"
                className={formStyle.input}
              />
              {errors.zipCode && touched.zipCode ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="city">Miasto:</label>
              <Field
                id="city"
                type="text"
                name="city"
                className={formStyle.input}
              />
              {errors.city && touched.city ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="phoneNumber">Numer telefonu:</label>
              <PhoneInput
                id="phoneNumber"
                country={country}
                defaultCountry="PL"
                value={initialValues.phoneNumber}
                international
                onChange={(value) => setFieldValue("phoneNumber", value)}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className={formStyle.error}>{errors.phoneNumber}</div>
              )}
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white mx-auto mt-4"
              >
                przejdz do wysyłki
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserDataForm;
