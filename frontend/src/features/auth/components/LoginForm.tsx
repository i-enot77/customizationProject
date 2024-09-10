import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import { useLoginForm } from "../hooks/useLoginForm";
import { loginSchema } from "../schemaYup/loginSchema";
import { formStyle } from "@/assets/formStyle";
import { useCheckErrorType } from "@/hooks/useCheckErrorType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useState } from "react";

const LoginForm = ({ isCart }: { isCart: boolean }) => {
  const { loginSubmit, isSuccess, error } = useLoginForm(isCart);
  const errorMessage = useCheckErrorType(error, isSuccess);

  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      <div className="w-full">
        <Formik
          initialValues={{ email: "", password: "", persist: false }}
          validationSchema={loginSchema}
          onSubmit={loginSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="">
              <div className={formStyle.field}>
                <label className={formStyle.label} htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  className={formStyle.input}
                />
                {errors.email && touched.email ? (
                  <div className={formStyle.error}>{errors.email}</div>
                ) : null}
              </div>

              <div className={formStyle.field}>
                <label className={formStyle.label} htmlFor="password">
                  Hasło:
                </label>

                <div className="relative">
                  <Field
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className={`${formStyle.input} w-full`}
                  />

                  <Button
                    type="button"
                    className="absolute right-2 top-2.5 z-10"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      style={{ color: "#3d3d3d" }}
                    />
                  </Button>
                </div>
                {errors.password && touched.password ? (
                  <div className={formStyle.error}>{errors.password}</div>
                ) : null}
              </div>

              <div className="flex justify-between my-6">
                <div className="flex justify-center items-center">
                  <Field
                    type="checkbox"
                    name="persist"
                    checked={values.persist}
                    onChange={() => setFieldValue("persist", !values.persist)}
                    className={formStyle.checkbox}
                  />
                  <label
                    htmlFor="persist"
                    className={`${formStyle.label} ml-1.5`}
                  >
                    Pozostań zalogowany
                  </label>
                </div>
                <Link className="text-sm" to={"/request-reset"}>
                  Przypomnij hasło
                </Link>
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="bg-[#2A254B] rounded px-8 py-2 uppercase font-medium text-white mx-auto my-8"
                >
                  Zaloguj się
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;
