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
          email: "",
          password: "",
          confirmPassword: "",
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
