import { useReducer } from "react";
import InputItem from "./InputItem";
import Button from "./Button";
import { useSendContactFormMutation } from "../../services/api";

function reducer(state, action) {
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
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

const initialState = {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "updateField", field: name, value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendForm({
      variables: {
        userName: state.userName,
        lastName: state.lastName,
        userEmail: state.userEmail,
        phoneNumber: state.phoneNumber,
        address: state.address,
        message: state.message,
      },
    });
    if (result.data) {
      dispatch({ type: "resetForm" });
      console.log(result.data);
    } else if (result.error) {
      console.log("Brak odpowiedzi od serwera");
    }
  };

  const style = {
    inputClassName: `focus:outline-none p-1.5 mb-4 last:mb-0 border-b-2 border-black`,
  };
  return (
    <>
      <h3 className="text-2xl mb-3">Napisz do nas</h3>
      <form className="flex flex-col w-[90%]" onSubmit={handleSubmit}>
        <InputItem
          inputId="userName"
          type="text"
          value={state.userName}
          handleChange={handleChange}
          placeholder="Imię"
          inputClassName={style.inputClassName}
        />
        <InputItem
          inputId="lastName"
          type="text"
          value={state.lastName}
          handleChange={handleChange}
          placeholder="Nazwisko"
          inputClassName={style.inputClassName}
        />
        <InputItem
          inputId="userEmail"
          type="text"
          value={state.userEmail}
          handleChange={handleChange}
          placeholder="Adres email"
          inputClassName={style.inputClassName}
        />
        <InputItem
          inputId="phoneNumber"
          type="text"
          value={state.phoneNumber}
          handleChange={handleChange}
          placeholder="Telefon"
          inputClassName={style.inputClassName}
        />
        <InputItem
          inputId="address"
          type="text"
          value={state.address}
          handleChange={handleChange}
          placeholder="Twoja lokalizacja"
          inputClassName={style.inputClassName}
        />

        <textarea
          name="message"
          id="message"
          placeholder="Wiadomość"
          value={state.message}
          onChange={handleChange}
          maxLength={100}
          className={`resize-none ${style.inputClassName}`}
        ></textarea>
        <Button btnClass="bg-[#2A254B] px-12 py-2 text-sm uppercase text-white rounded-md m-auto mt-3">
          wyślij
        </Button>
      </form>
    </>
  );
}

export default ContactForm;
