import { Field, Form, Formik } from "formik";
import { formStyle } from "@/assets/formStyle";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import { registrationSchema } from "../schemaYup/registrationSchema";
import { useCheckErrorType } from "@/hooks/useCheckErrorType";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const { registerSubmit, isSuccess, error } = useRegistrationForm();
  const errorMessage = useCheckErrorType(error, isSuccess);

  const style = {
    link: `text-[#5548a7] hover:underline hover:underline-offset-2 hover:decoration-2`,
  };
  return (
    <>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="w-full">
        <Formik
          initialValues={{
            email: "",
            password: "",
            confirmPassword: "",
            acceptTerms: false,
          }}
          validationSchema={registrationSchema}
          onSubmit={registerSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue }) => (
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
                  <div className={formStyle.error}>
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>

              <div className={`${formStyle.field} mt-4`}>
                <div className="flex items-start">
                  <Field
                    type="checkbox"
                    name="acceptTerms"
                    checked={values.acceptTerms}
                    onChange={() =>
                      setFieldValue("acceptTerms", !values.acceptTerms)
                    }
                    className="mr-2 w-6 h-6"
                  />
                  <label htmlFor="acceptTerms">
                    Akceptuję{" "}
                    <Link className={style.link} to="/terms-and-conditions">
                      Warunki korzystania z usługi
                    </Link>{" "}
                    oraz{" "}
                    <Link className={style.link} to="/privacy-policy">
                      Politykę prywatności
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && touched.acceptTerms && (
                  <div className={formStyle.error}>{errors.acceptTerms}</div>
                )}
              </div>

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
    </>
  );
};

export default RegistrationForm;
