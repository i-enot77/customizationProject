import { object, string, ObjectSchema } from "yup";
import { Field, Form, Formik } from "formik";
import { User, setUserData } from "../../services/orderSlice";
import { useAppDispatch } from "../../services/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import Button from "../common/Button";
import { FormProps } from "./CartSummaryForm";

const style = {
  header: `text-lg font-medium my-1`,
  field: `flex flex-col mb-2 last:mb-0`,
  label: ``,
  input: `px-2 py-1 rounded border border-stone-400 mt-1`,
  error: `text-red-600 self-end text-sm pr-2`,
};
// const phoneRegExp = /^\+[0-9]{11}$/;

const schema: ObjectSchema<User> = object({
  email: string().email("Invalid email").required("Required"),
  country: string().required(),
  firstName: string().required(),
  lastName: string().required(),
  address: string().required(),
  zipCode: string().nullable().required(),
  city: string().required(),
  phone: string().required(),
});

const CheckoutForm = ({ nextStep }: FormProps) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.order.user);
  return (
    <div className="bg-stone-300 w-full px-8 py-4">
      <div className="mb-3">
        <h2 className={style.header}>Zaloguj się na koncie:</h2>
        <Button className="">Zaloguj się</Button>
      </div>

      <h2 className={style.header}>lub zaplać jako gość:</h2>

      <Formik
        initialValues={{
          email: "",
          country: "",
          firstName: "",
          lastName: "",
          address: "",
          zipCode: "",
          city: "",
          phone: "",
        }}
        validationSchema={schema}
        onSubmit={(values: User, actions) => {
          dispatch(setUserData(values));
          console.log(user);
          actions.setSubmitting(false);
          if (nextStep) {
            nextStep();
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="">
            <div className={style.field}>
              <label htmlFor="email">Adres e-mail:</label>
              <Field
                id="email"
                type="email"
                name="email"
                className={style.input}
              />
              {errors.email && touched.email ? (
                <div className={style.error}>Pole jest wymagane</div>
              ) : null}
            </div>
            <h2 className={style.header}>Adres dostawy</h2>
            <div className={style.field}>
              <label htmlFor="country">Kraj:</label>
              <Field
                id="country"
                type="text"
                name="country"
                className={style.input}
              />
              {errors.country && touched.country ? (
                <div className={style.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className="flex justify-between">
              <div className={style.field}>
                <label htmlFor="firstName">Imię:</label>
                <Field
                  id="firstName"
                  type="text"
                  name="firstName"
                  className={style.input}
                />
                {errors.firstName && touched.firstName ? (
                  <div className={style.error}>Pole jest wymagane</div>
                ) : null}
              </div>

              <div className={style.field}>
                <label htmlFor="lastName">Nazwisko:</label>
                <Field
                  id="lastName"
                  type="text"
                  name="lastName"
                  className={style.input}
                />
                {errors.lastName && touched.lastName ? (
                  <div className={style.error}>Pole jest wymagane</div>
                ) : null}
              </div>
            </div>

            <div className={style.field}>
              <label htmlFor="address">Adres (mieszkanie):</label>
              <Field
                id="address"
                type="text"
                name="address"
                className={style.input}
              />
              {errors.address && touched.address ? (
                <div className={style.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={style.field}>
              <label htmlFor="zipCode">Kod pocztowy:</label>
              <Field
                id="zipCode"
                type="text"
                name="zipCode"
                className={style.input}
              />
              {errors.zipCode && touched.zipCode ? (
                <div className={style.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={style.field}>
              <label htmlFor="city">Miasto:</label>
              <Field
                id="city"
                type="text"
                name="city"
                className={style.input}
              />
              {errors.city && touched.city ? (
                <div className={style.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={style.field}>
              <label htmlFor="phone">Numer telefonu:</label>
              <Field
                id="phone"
                type="tel"
                name="phone"
                className={style.input}
              />
              {errors.phone && touched.phone ? (
                <div className={style.error}>Pole jest wymagane</div>
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
    </div>
  );
};

export default CheckoutForm;
