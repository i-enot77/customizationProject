import { Form, Formik, FormikHelpers } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { useAppDispatch } from "@/services/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { changePhoneNumberSchema } from "../schemaYup/userAccountSchemas";
import { useLazyPhoneNumberUpdateQuery } from "@/services/userAccountApi";
import { setPhoneNumberChange } from "@/services/userAccountSlice";
import { formStyle } from "@/assets/formStyle";
import { usePhoneNumber } from "../hooks/usePhoneNumber";
import { setUserPhone } from "@/services/userSlice";
import { useToast } from "@/hooks/use-toast";

function PhoneNumberChange() {
  const [phoneUpdate] = useLazyPhoneNumberUpdateQuery();
  const user = useSelector((state: RootState) => state.auth.auth.userData);
  const userPhone = useSelector((state: RootState) => state.user.userPhone);
  const dispatch = useAppDispatch();

  const { phone, country } = usePhoneNumber(userPhone);
  const { toast } = useToast();

  const onSubmit = (
    values: { phoneNumber: string },
    actions: FormikHelpers<{ phoneNumber: string }>
  ) => {
    try {
      if (user) {
        phoneUpdate({
          userId: user._id,
          phoneNumber: values.phoneNumber,
        })
          .unwrap()
          .then((data) => {
            dispatch(setUserPhone(data));
            dispatch(setPhoneNumberChange(false));
            toast({
              title: "Update Successful",
              description: "Your phone number has been updated successfully.",
            });
          });
      }
    } catch (error) {
      console.error("Update failed", error);
      toast({
        title: "Error",
        description: "Failed to update phone number",
      });
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    phoneNumber: phone,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2>Ustaw numer telefonu</h2>
        <Button onClick={() => dispatch(setPhoneNumberChange(false))}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={changePhoneNumberSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="">
            <div className={formStyle.field}>
              <label htmlFor="phoneNumber">Numer telefonu:</label>
              <PhoneInput
                id="phoneNumber"
                country={country}
                defaultCountry="PL"
                value={initialValues.phoneNumber}
                international
                onChange={(value) => setFieldValue("phoneNumber", value)}
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className={formStyle.error}>{errors.phoneNumber}</div>
              )}
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

export default PhoneNumberChange;
