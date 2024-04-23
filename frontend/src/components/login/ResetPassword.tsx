import InputItem from "../common/InputItem";
import { useSelector } from "react-redux";
import { RootState } from "../../services/store";
import { useResetPwd } from "../../hooks/useResetPwd";

const ResetPassword = () => {
  const errMsg = useSelector((state: RootState) => state.auth.errMsg);

  const { newPassword, handlePwdInput, handleResetPassword } = useResetPwd();
  return (
    <div>
      <h2>Ustaw nowe hasło</h2>
      {errMsg && <div className="text-[#f45151] text-3xl">{errMsg}</div>}
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
    </div>
  );
};

export default ResetPassword;
