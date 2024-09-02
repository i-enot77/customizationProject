import { Field, Form, Formik } from "formik";
import { useResetPwd } from "../hooks/useResetPwd";
import { resetPasswordSchema } from "../schemaYup/resetPassword";
import { formStyle } from "@/assets/formStyle";

const ResetPassword = () => {
  const { onSubmit } = useResetPwd();
  return (
    <div className="flex-grow w-1/3 flex flex-col justify-center">
      <h2 className="text-xl font-medium mb-3">Ustaw nowe hasło:</h2>

      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={resetPasswordSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="">
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
                Zapisz
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassword;
