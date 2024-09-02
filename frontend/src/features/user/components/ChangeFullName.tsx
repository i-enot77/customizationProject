import { Field, Form, Formik, FormikHelpers } from "formik";
import { formStyle } from "@/assets/formStyle";
import { changeFullNameSchema } from "../schemaYup/userAccountSchemas";
import { useLazyFullNameUpdateQuery } from "@/services/userAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useAppDispatch } from "@/services/hooks";
import { setFullNameChange } from "@/services/userAccountSlice";
import { setFullName } from "@/services/userSlice";

function ChangeFullName() {
  const [fullNameUpdate] = useLazyFullNameUpdateQuery();
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const user = useSelector((state: RootState) => state.auth.auth.userData);

  const dispatch = useAppDispatch();

  const onSubmit = (
    values: { firstName: string; lastName: string },
    actions: FormikHelpers<{ firstName: string; lastName: string }>
  ) => {
    try {
      if (user) {
        fullNameUpdate({
          userId: user._id,
          firstName: values.firstName,
          lastName: values.lastName,
        })
          .unwrap()
          .then((data) => {
            dispatch(setFullName(data));
            dispatch(setFullNameChange(false));
          });
      }
    } catch (error) {
      console.error("Email update failed", error);
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    firstName: fullName?.firstName || "",
    lastName: fullName?.lastName || "",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-medium text-lg">Ustaw imię i nazwisko</h2>
        <Button onClick={() => dispatch(setFullNameChange(false))}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={changeFullNameSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="">
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

            <button
              type="submit"
              className="bg-[#2A254B] rounded px-8 py-2 uppercase font-medium text-white mx-auto my-8"
            >
              Zapisz
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ChangeFullName;
