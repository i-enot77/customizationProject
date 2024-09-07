import { Field, Form, Formik, FormikHelpers } from "formik";
import { formStyle } from "@/assets/formStyle";
import { changeUserAddressSchema } from "../schemaYup/userAccountSchemas";
import { useLazyUserAddresUpdateQuery } from "@/services/userAccountApi";
import { useSelector } from "react-redux";
import { RootState } from "@/services/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/Button";
import { useAppDispatch } from "@/services/hooks";
import { setUserAddressChange } from "@/services/userAccountSlice";
import { setUserAddress } from "@/services/userSlice";
import { useToast } from "@/hooks/use-toast";

function UserAddressChange() {
  const user = useSelector((state: RootState) => state.auth.auth.userData);
  const [userAddressUpdate] = useLazyUserAddresUpdateQuery();
  const userAddress = useSelector((state: RootState) => state.user.userAddress);

  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const onSubmit = (
    values: { address: string; zipCode: string; city: string; country: string },
    actions: FormikHelpers<{
      address: string;
      zipCode: string;
      city: string;
      country: string;
    }>
  ) => {
    try {
      if (user) {
        userAddressUpdate({
          userId: user._id,
          address: values.address,
          zipCode: values.zipCode,
          city: values.city,
          country: values.country,
        })
          .unwrap()
          .then((data) => {
            dispatch(setUserAddress(data));
            dispatch(setUserAddressChange(false));
            toast({
              title: "Update Successful",
              description: "Your address has been updated successfully.",
            });
          });
      }
    } catch (error) {
      console.error("Email update failed", error);
      toast({
        title: "Error",
        description: "Failed to update address",
      });
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    address: userAddress?.address || "",
    zipCode: userAddress?.zipCode || "",
    city: userAddress?.city || "",
    country: userAddress?.country || "",
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2>Ustaw adres</h2>
        <Button onClick={() => dispatch(setUserAddressChange(false))}>
          <FontAwesomeIcon
            icon={faXmark}
            size="xl"
            style={{ color: "#000000" }}
          />
        </Button>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={changeUserAddressSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form className="">
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

export default UserAddressChange;
