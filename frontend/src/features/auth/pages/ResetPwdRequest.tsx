import { Field, Form, Formik, FormikHelpers } from "formik";
import { useNavigate } from "react-router-dom";
import { useResetPwdRequestMutation } from "../../../services/authApi";
import { emailSchema } from "@/features/user/schemaYup/userAccountSchemas";
import { formStyle } from "@/assets/formStyle";

const ResetPwdRequest = () => {
  const [resetPwdRequest] = useResetPwdRequestMutation();
  const navigate = useNavigate();

  const onSubmit = (
    values: { email: string },
    actions: FormikHelpers<{
      email: string;
    }>
  ) => {
    resetPwdRequest({
      email: values.email,
    })
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(response);
          actions.resetForm();
          navigate("/sended-email");
        }
      })
      .catch((error) => {
        console.error("Email sending failed", error);
        actions.setSubmitting(false);
      });
  };
  return (
    <div className="flex-grow self-center flex flex-col justify-center">
      <h2 className="text-2xl">Nie pamiętasz hasła?</h2>
      <h2 className="text-lg py-2">
        Wystarczy, że podasz swój e-mail, a my pomożemy Ci ustawić nowe hasło.
      </h2>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={emailSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[#2A254B] rounded px-8 py-2 uppercase font-medium text-white my-8"
              >
                Wyslij
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPwdRequest;
