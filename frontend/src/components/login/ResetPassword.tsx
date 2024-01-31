import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputItem from "../common/InputItem";
import { useResetPasswordMutation } from "../../services/api";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handlePwdInput = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (token) {
      resetPassword({
        token,
        newPassword,
      })
        .unwrap()
        .then((response) => {
          if (response) {
            setNewPassword("");
            setMessage("");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          setMessage("Resetowania hasła nie powiodło się");
        });
    }
  };
  return (
    <div>
      <h2>Ustaw nowe hasło</h2>
      <form onSubmit={handleResetPassword}>
        <InputItem
          id="resetPwd"
          type="password"
          value={newPassword}
          onChange={handlePwdInput}
          placeholder="nowe hasło"
        />
        <InputItem className="" type="submit" value="Zapisz" />
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;
