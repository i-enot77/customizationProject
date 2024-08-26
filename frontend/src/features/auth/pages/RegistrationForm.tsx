import { Field, Form, Formik } from "formik";
import { formStyle } from "@/assets/formStyle";
import { useRegistrationForm } from "../hooks/useRegistrationForm"; // Create this custom hook similar to useLoginForm
import { registrationSchema } from "../schemaYup/registrationSchema";

const RegistrationForm = () => {
  const { registerSubmit } = useRegistrationForm();

  return (
    <div className="w-full">
      <Formik
        initialValues={{
          // username: "",
          email: "",
          password: "",
          confirmPassword: "",
          // country: "",
          // firstName: "",
          // lastName: "",
          // address: "",
          // zipCode: "",
          // city: "",
          // phone: "",
        }}
        validationSchema={registrationSchema}
        onSubmit={registerSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="">
            <div className={formStyle.field}>
              <label htmlFor="email">Adres e-mail:</label>
              <Field
                id="email"
                name="email"
                type="email"
                className={formStyle.input}
              />
              {errors.email && touched.email ? (
                <div className={formStyle.error}>{errors.email}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="password">Hasło:</label>
              <Field
                id="password"
                name="password"
                type="password"
                className={formStyle.input}
              />
              {errors.password && touched.password ? (
                <div className={formStyle.error}>{errors.password}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="confirmPassword">Potwierdź hasło:</label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className={formStyle.input}
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className={formStyle.error}>{errors.confirmPassword}</div>
              ) : null}
            </div>

            {/* <div className={formStyle.field}>
              <label htmlFor="firstName">Imię:</label>
              <Field
                id="firstName"
                name="firstName"
                className={formStyle.input}
              />
              {errors.firstName && touched.firstName ? (
                <div className={formStyle.error}>{errors.firstName}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="lastName">Nazwisko:</label>
              <Field
                id="lastName"
                name="lastName"
                className={formStyle.input}
              />
              {errors.lastName && touched.lastName ? (
                <div className={formStyle.error}>{errors.lastName}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="country">Kraj:</label>
              <Field id="country" name="country" className={formStyle.input} />
              {errors.country && touched.country ? (
                <div className={formStyle.error}>{errors.country}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="address">Adres (mieszkanie):</label>
              <Field id="address" name="address" className={formStyle.input} />
              {errors.address && touched.address ? (
                <div className={formStyle.error}>{errors.address}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="zipCode">Kod pocztowy:</label>
              <Field id="zipCode" name="zipCode" className={formStyle.input} />
              {errors.zipCode && touched.zipCode ? (
                <div className={formStyle.error}>{errors.zipCode}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="city">Miasto:</label>
              <Field id="city" name="city" className={formStyle.input} />
              {errors.city && touched.city ? (
                <div className={formStyle.error}>{errors.city}</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="phone">Numer telefonu:</label>
              <Field id="phone" name="phone" className={formStyle.input} />
              {errors.phone && touched.phone ? (
                <div className={formStyle.error}>{errors.phone}</div>
              ) : null}
            </div> */}

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#2A254B] rounded px-8 py-2 uppercase font-medium text-white mx-auto mt-4"
              >
                Zarejestruj się
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
