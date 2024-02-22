import { useReducer, ChangeEvent, FormEvent } from "react";
import InputItem from "./InputItem";
import Button from "./Button";
import { useSendContactFormMutation } from "../../services/authApi";

interface ContactFormState {
  userName: string;
  lastName: string;
  userEmail: string;
  phoneNumber: string;
  address: string;
  message: string;
}

type ContactFormAction =
  | { type: "updateField"; field: string; value: string }
  | { type: "resetForm" };

function reducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case "updateField": {
      return {
        ...state,
        [action.field]: action.value,
      };
    }
    case "resetForm": {
      return initialState;
    }
    default:
      throw new Error("Unknown action type");
  }
}

const initialState: ContactFormState = {
  userName: "",
  lastName: "",
  userEmail: "",
  phoneNumber: "",
  address: "",
  message: "",
};

function ContactForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [sendForm] = useSendContactFormMutation();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch({ type: "updateField", field: name, value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await sendForm({
        ...state,
      }).unwrap();
      const parsedResult = JSON.parse(result);
      if (parsedResult.data) {
        dispatch({ type: "resetForm" });
      }
    } catch (error) {
      console.log("Brak odpowiedzi od serwera");
    }
  };

  const style = {
    inputClassName: `focus:outline-none p-1.5 mb-4 last:mb-0 border-b-2 border-black`,
  };

  const contactFormData = [
    { inputId: "userName", placeholder: "Imię" },
    { inputId: "lastName", placeholder: "Nazwisko" },
    { inputId: "userEmail", placeholder: "Adres email" },
    { inputId: "phoneNumber", placeholder: "Telefon" },
    { inputId: "address", placeholder: "Twoja lokalizacja" },
  ];
  return (
    <>
      <h3 className="text-2xl mb-3 text-center">Napisz do nas</h3>
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
      </form>
    </>
  );
}

export default ContactForm;
