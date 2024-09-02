import { useSelector } from "react-redux";
import ChangeEmail from "./ChangeEmail";
import Modal from "./Modal";
import { RootState } from "@/services/store";
import { useAppDispatch } from "@/services/hooks";
import {
  setEmailChange,
  setFullNameChange,
  setPhoneNumberChange,
  setUserAddressChange,
  setUserDeliveryAddressChange,
} from "@/services/userAccountSlice";
import ChangeFullName from "./ChangeFullName";
import PhoneNumberChange from "./PhoneNumberChange";
import UserAddressChange from "./UserAddressChange";
import UserDeliveryAddressChange from "./DeliveryAddressChange";

function ChangeUserData() {
  const {
    emailChange,
    fullNameChange,
    phoneNumberChange,
    userAddressChange,
    userDeliveryAddressChange,
  } = useSelector((state: RootState) => state.userAccount);

  const dispatch = useAppDispatch();
  return (
    <>
      <Modal
        isOpen={emailChange}
        onClick={() => dispatch(setEmailChange(false))}
      >
        <ChangeEmail />
      </Modal>

      <Modal
        isOpen={fullNameChange}
        onClick={() => dispatch(setFullNameChange(false))}
      >
        <ChangeFullName />
      </Modal>

      <Modal
        isOpen={phoneNumberChange}
        onClick={() => dispatch(setPhoneNumberChange(false))}
      >
        <PhoneNumberChange />
      </Modal>

      <Modal
        isOpen={userAddressChange}
        onClick={() => dispatch(setUserAddressChange(false))}
      >
        <UserAddressChange />
      </Modal>

      <Modal
        isOpen={userDeliveryAddressChange}
        onClick={() => dispatch(setUserDeliveryAddressChange(false))}
      >
        <UserDeliveryAddressChange />
      </Modal>
    </>
  );
}

export default ChangeUserData;
