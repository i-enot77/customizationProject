import { object, string, ObjectSchema } from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useSendContactFormMutation } from "../../services/contactFormApi";
import { ContactFormArgs } from "../../services/contactFormApi";

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

const ContactForm = () => {
  const [sendForm] = useSendContactFormMutation();

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const result = await sendForm({
  //       ...state,
  //     }).unwrap();
  //     const parsedResult = JSON.parse(result);
  //     if (parsedResult.data) {
  //       dispatch({ type: "resetForm" });
  //     }
  //   } catch (error) {
  //     console.log("Brak odpowiedzi od serwera");
  //   }
  // };
  return (
    <>
      <h3 className="text-2xl mb-3 text-center">Napisz do nas</h3>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userEmail: "",
          phoneNumber: "",
          city: "",
          message: "",
        }}
        validationSchema={schema}
        onSubmit={(values: ContactFormArgs, actions) => {
          sendForm(values);
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {() => (
          <Form className="flex flex-col w-[90%]">
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
                className="bg-[#2A254B] rounded px-8 py-2  uppercase font-medium text-white mx-auto mt-4"
              >
                wyślij
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {/* 
      <form className="flex flex-col w-[90%]" onSubmit={handleSubmit}>
        {contactFormData.map((item, index) => (
          <InputItem
            key={index}
            id={item.inputId}
            type="text"
            value={state[item.inputId as keyof ContactFormState]}
            onChange={handleChange}
            placeholder={item.placeholder}
            className={style.inputClassName}
          />
        ))}

        <textarea
          name="message"
          id="message"
          placeholder="Wiadomość"
          value={state.message}
          onChange={handleChange}
          maxLength={100}
          className={`resize-none ${style.inputClassName}`}
        ></textarea>
        <Button className="bg-[#2A254B] px-12 py-2 text-sm uppercase text-white rounded-md m-auto mt-3">
          wyślij
        </Button>
      </form> */}
    </>
  );
};

export default ContactForm;
