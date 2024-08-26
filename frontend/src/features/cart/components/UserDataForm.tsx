import { Field, Form, Formik, FormikHelpers } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../services/store";
import { userOrderDataSchema } from "../userOrderDataSchema";
import { formStyle } from "@/assets/formStyle";
import { setOrderUserEmail } from "@/services/orderSlice";
import { OrderSchema } from "../schemaYup/orderFormSchema";
import { setFullName, setDeliveryData } from "@/services/userSlice";

const UserDataForm = ({ nextStep }: { nextStep?: () => void }) => {
  const isLogged = useSelector(
    (state: RootState) => state.auth.auth.isAuthenticated
  );
  const userEmail = useSelector(
    (state: RootState) => state.auth.auth.userData?.email
  );
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const deliveryAddress = useSelector(
    (state: RootState) => state.user.userDeliveryData
  );
  const dispatch = useDispatch();

  const onSubmit = (
    values: OrderSchema,
    actions: FormikHelpers<OrderSchema>
  ) => {
    console.log(values);
    const { email, firstName, lastName, ...deliveryData } = values;
    dispatch(setOrderUserEmail(email));
    dispatch(setFullName({ firstName, lastName }));
    console.log(fullName);
    dispatch(setDeliveryData(deliveryData));
    actions.setSubmitting(false);
    if (nextStep) {
      nextStep();
    }
  };

  const initialValues: OrderSchema = {
    email: userEmail || "",
    firstName: fullName?.firstName || "",
    lastName: fullName?.lastName || "",
    country: deliveryAddress?.country || "",
    address: deliveryAddress?.address || "",
    zipCode: deliveryAddress?.zipCode || "",
    city: deliveryAddress?.city || "",
    phone: deliveryAddress?.phone || "",
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={userOrderDataSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
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
                {isLogged &&
                  !fullName &&
                  "Twoje konto jescze nie zawiera danych użytkownika"}
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
              <label htmlFor="phone">Numer telefonu:</label>
              <Field
                id="phone"
                type="tel"
                name="phone"
                className={formStyle.input}
              />
              {errors.phone && touched.phone ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
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
    </>
  );
};

export default UserDataForm;
