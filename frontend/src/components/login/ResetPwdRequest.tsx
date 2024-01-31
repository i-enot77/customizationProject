import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useResetPwdRequestMutation } from "../../services/api";
import InputItem from "../common/InputItem";

const ResetPwdRequest = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetPwdRequest] = useResetPwdRequestMutation();
  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleRequestReset = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetPwdRequest({
      username: email,
    })
      .unwrap()
      .then((response) => {
        if (response) {
          console.log(response);
          setEmail("");
          setMessage("");
          navigate("/sended-email");
        }
      })
      .catch((error) => {
        console.log(error);
        setMessage("Resetowania hasła nie powiodło się");
      });
  };
  // try {
  //   const response: string = await resetPwdRequest({
  //     username: email,
  //   }).unwrap();
  //   const parsedResponse = JSON.parse(response);
  //   if (parsedResponse.data) {
  //     setEmail("");
  //     setMessage("");
  //     navigate("/sended-email");
  //   }
  // } catch (error) {
  //   setMessage("Resetowania hasła nie powiodło się");
  // }

  return (
    <div>
      <h2>Nie pamiętasz hasła?</h2>
      <p>
        Wystarczy, że podasz swój e-mail, a my pomożemy Ci ustawić nowe hasło.
      </p>
      <form onSubmit={handleRequestReset}>
        <InputItem
          id="reset"
          type="email"
          value={email}
          onChange={handleEmail}
          placeholder={"e-mail adres"}
          className=""
        />
        <InputItem className="" type="submit" value="Dalej" />
      </form>

      <p>{message}</p>
    </div>
  );
};

export default ResetPwdRequest;
