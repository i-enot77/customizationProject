import Button from "@/components/Button";
import { RootState } from "@/services/store";
import { useSelector } from "react-redux";
import UserAddress from "../components/UserAddress";
import { underlinedBtn } from "../style";
import { useAppDispatch } from "@/services/hooks";
import {
  setEmailChange,
  setFullNameChange,
  setPhoneNumberChange,
  setUserAddressChange,
  setUserDeliveryAddressChange,
} from "@/services/userAccountSlice";
import ChangeUserData from "../components/ChangeUserData";
import { Toaster } from "@/components/ui/toaster";

function UserAccount() {
  const auth = useSelector((state: RootState) => state.auth.auth.userData);
  const userPhone = useSelector((state: RootState) => state.user.userPhone);
  const fullName = useSelector((state: RootState) => state.user.fullName);
  const userAddress = useSelector((state: RootState) => state.user.userAddress);
  const userDeliveryAddress = useSelector(
    (state: RootState) => state.user.userDeliveryAddress
  );

  const dispatch = useAppDispatch();

  const style = {
    sectionItem: `w-full bg-[#f1f0f3] flex-grow rounded p-6`,
    header: `text-md uppercase py-2`,
  };

  return (
    <>
      <section className="self-end w-full h-[90%] my-6 flex flex-col">
        <h2 className="text-2xl mb-4">Dane konta</h2>
        <div
          className={`${style.sectionItem} flex flex-col justify-between mb-4`}
        >
          <div>
            <div className={style.header}>imię i nazwisko</div>
            {fullName ? (
              <div>
                <div>{`${fullName?.firstName} ${fullName?.lastName}`}</div>
                <Button
                  className={underlinedBtn.btn}
                  onClick={() => dispatch(setFullNameChange(true))}
                >
                  Zmien
                </Button>
              </div>
            ) : (
              <Button
                className={underlinedBtn.btn}
                onClick={() => dispatch(setFullNameChange(true))}
              >
                Ustaw imię i nazwisko
              </Button>
            )}
          </div>

          <div>
            <div className={style.header}>email</div>
            <div>{auth?.email}</div>
            <Button
              className={underlinedBtn.btn}
              onClick={() => dispatch(setEmailChange(true))}
            >
              Zmien
            </Button>
          </div>

          <div>
            <div className={style.header}>telefon komórkowy</div>
            {userPhone ? (
              <div>
                <div>{userPhone}</div>
                <Button
                  className={underlinedBtn.btn}
                  onClick={() => dispatch(setPhoneNumberChange(true))}
                >
                  Zmien
                </Button>
              </div>
            ) : (
              <Button
                className={underlinedBtn.btn}
                onClick={() => dispatch(setPhoneNumberChange(true))}
              >
                Ustaw telefon
              </Button>
            )}
          </div>
        </div>

        <div className={`${style.sectionItem} grid grid-flow-row grid-cols-3 `}>
          <div className="">
            <div className={style.header}>twój adres</div>
            {userAddress ? (
              <>
                <UserAddress
                  address={userAddress.address}
                  zipCode={userAddress.zipCode}
                  city={userAddress.city}
                  country={userAddress.country}
                />
                <Button
                  onClick={() => dispatch(setUserAddressChange(true))}
                  className={underlinedBtn.btn}
                >
                  Zmien
                </Button>
              </>
            ) : (
              <Button
                onClick={() => dispatch(setUserAddressChange(true))}
                className={underlinedBtn.btn}
              >
                Ustaw adres
              </Button>
            )}
          </div>

          <div>
            <div className={style.header}>adres do wysyłki</div>
            {userDeliveryAddress ? (
              <div>
                <div>{`${userDeliveryAddress.firstName} ${userDeliveryAddress.lastName}`}</div>
                <UserAddress
                  address={userDeliveryAddress.address}
                  zipCode={userDeliveryAddress.zipCode}
                  city={userDeliveryAddress.city}
                  country={userDeliveryAddress.country}
                />
                <div>{userDeliveryAddress.phoneNumber}</div>
                <Button
                  onClick={() => dispatch(setUserDeliveryAddressChange(true))}
                  className={underlinedBtn.btn}
                >
                  Zmien
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => dispatch(setUserDeliveryAddressChange(true))}
                className={underlinedBtn.btn}
              >
                Ustaw adres
              </Button>
            )}
          </div>
        </div>
      </section>

      <ChangeUserData />

      <Toaster />
    </>
  );
}

export default UserAccount;
