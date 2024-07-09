import { object, string, ObjectSchema } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  ContactFormArgs,
  useSendContactFormMutation,
} from "../services/contactFormApi";

const schema: ObjectSchema<ContactFormArgs> = object({
  firstName: string().required(),
  lastName: string().required(),
  userEmail: string().email("Invalid email").required("Required"),
  phoneNumber: string().required(),
  city: string().required(),
  message: string().default(""),
});

const style = {
  header: `text-lg font-medium my-1`,
  field: `flex flex-col mb-2 last:mb-0`,
  input: `focus:outline-none p-1.5 mb-4 last:mb-0 border-b-2 border-black`,
  error: `text-red-600 self-end text-sm pr-2`,
};

const initialValues = {
  firstName: "",
  lastName: "",
  userEmail: "",
  phoneNumber: "",
  city: "",
  message: "",
};

const ContactForm = () => {
  const [sendForm] = useSendContactFormMutation();

  const onSubmit = async (values: ContactFormArgs, actions: any) => {
    sendForm(values);
    console.log(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <>
      <h3 className="text-2xl font-medium mb-4">Napisz do nas</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {() => (
          <Form className="flex flex-col justify-center  w-full">
            <div className={style.field}>
              <Field
                id="firstName"
                type="text"
                name="firstName"
                placeholder="Imię"
                className={style.input}
              />
              <ErrorMessage name="firstName" component="div" />
            </div>

            <div className={style.field}>
              <Field
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Nazwisko"
                className={style.input}
              />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div className={style.field}>
              <Field
                id="userEmail"
                type="email"
                name="userEmail"
                placeholder="Adres e-mail"
                className={style.input}
              />
              <ErrorMessage name="userEmail" component="div" />
            </div>

            <div className={style.field}>
              <Field
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Numer telefonu"
                className={style.input}
              />
            </div>

            <div className={style.field}>
              <Field
                id="city"
                type="text"
                name="city"
                placeholder="Twoja lokalizacja"
                className={style.input}
              />
              <ErrorMessage name="city" component="div" />
            </div>

            <div className={style.field}>
              <Field
                as="textarea"
                id="message"
                name="message"
                placeholder="Wiadomość"
                className={style.input}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white mx-auto mt-6"
              >
                wyślij
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ContactForm;
