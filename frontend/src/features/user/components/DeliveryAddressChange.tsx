import { Field, Form, Formik, FormikHelpers } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { formStyle } from "@/assets/formStyle";
import { userDeliveryAddressSchema } from "../schemaYup/userAccountSchemas";
import { useLazyUserDeliveryAddresUpdateQuery } from "@/services/userAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useAppDispatch } from "@/services/hooks";
import { setUserDeliveryAddressChange } from "@/services/userAccountSlice";
import { setUserDeliveryAddress } from "@/services/userSlice";
import { usePhoneNumber } from "../hooks/usePhoneNumber";
import { DeliveryData } from "@/services/orderSlice";
import { useToast } from "@/hooks/use-toast";

function UserDeliveryAddressChange() {
  const user = useSelector((state: RootState) => state.auth.auth.userData);
  const userDeliveryAddress = useSelector(
    (state: RootState) => state.user.userDeliveryAddress
  );
  const [userDeliveryAddressUpdate] = useLazyUserDeliveryAddresUpdateQuery();
  const dispatch = useAppDispatch();

  const { phone, country } = usePhoneNumber(userDeliveryAddress?.phoneNumber);
  const { toast } = useToast();

  const onSubmit = (
    values: DeliveryData,
    actions: FormikHelpers<DeliveryData>
  ) => {
    try {
      if (user) {
        userDeliveryAddressUpdate({
          userId: user._id,
          deliveryData: values,
        })
          .unwrap()
          .then((data) => {
            dispatch(setUserDeliveryAddress(data));
            dispatch(setUserDeliveryAddressChange(false));
            toast({
              title: "Update Successful",
              description: "Your delivery data has been updated successfully.",
            });
          });
      }
    } catch (error) {
      console.error("Email update failed", error);
      toast({
        title: "Error",
        description: "Failed to update delivery data",
      });
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    firstName: userDeliveryAddress?.firstName || "",
    lastName: userDeliveryAddress?.lastName || "",
    country: userDeliveryAddress?.country || "",
    address: userDeliveryAddress?.address || "",
    zipCode: userDeliveryAddress?.zipCode || "",
    city: userDeliveryAddress?.city || "",
    phoneNumber: phone,
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2>Ustaw adres dostawy</h2>
        <Button onClick={() => dispatch(setUserDeliveryAddressChange(false))}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={userDeliveryAddressSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue }) => (
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

            <div className={formStyle.field}>
              <label htmlFor="country">Kraj:</label>
              <Field
                id="country"
                type="text"
                name="country"
                className={formStyle.input}
              />
              {errors.country && touched.country ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="address">
                Adres (ulica, nr budynku i nr mieszkania):
              </label>
              <Field
                id="address"
                type="text"
                name="address"
                className={formStyle.input}
              />
              {errors.address && touched.address ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="zipCode">Kod pocztowy:</label>
              <Field
                id="zipCode"
                type="text"
                name="zipCode"
                className={formStyle.input}
              />
              {errors.zipCode && touched.zipCode ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

            <div className={formStyle.field}>
              <label htmlFor="city">Miasto:</label>
              <Field
                id="city"
                type="text"
                name="city"
                className={formStyle.input}
              />
              {errors.city && touched.city ? (
                <div className={formStyle.error}>Pole jest wymagane</div>
              ) : null}
            </div>

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

export default UserDeliveryAddressChange;
