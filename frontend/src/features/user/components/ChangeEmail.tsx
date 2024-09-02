import { Field, Form, Formik, FormikHelpers } from "formik";
import { formStyle } from "@/assets/formStyle";
import { emailSchema } from "../schemaYup/userAccountSchemas";
import { useLazyEmailUpdateQuery } from "@/services/userAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useAppDispatch } from "@/services/hooks";
import { setEmailChange } from "@/services/userAccountSlice";

function ChangeEmail() {
  const [emailUpdate, { isSuccess }] = useLazyEmailUpdateQuery();
  const user = useSelector((state: RootState) => state.auth.auth.userData);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onSubmit = (
    values: { email: string },
    actions: FormikHelpers<{
      email: string;
    }>
  ) => {
    try {
      if (user) {
        emailUpdate({
          userId: user._id,
          newEmail: values.email,
        }).unwrap();
      }
    } catch (error) {
      console.error("Email update failed", error);
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setEmailChange(false));
      navigate("/account");
    }
  }, [isSuccess, navigate]);

  const initialValues = {
    email: user?.email || "",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2>Zmień email</h2>
        <Button onClick={() => dispatch(setEmailChange(false))}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
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

            <button
              type="submit"
              className="bg-[#2A254B] rounded px-8 py-2 uppercase font-medium text-white mx-auto my-8"
            >
              Zmień
            </button>
          </Form>
        )}
      </Formik>

      <div className="font-medium text-lg">
        Ze względów bezpieczeństwa, poprosimy Cię o ponowne zalogowanie
      </div>
    </div>
  );
}

export default ChangeEmail;
