import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserAccount {
  isLogin: boolean;
  emailChange: boolean;
  fullNameChange: boolean;
  phoneNumberChange: boolean;
  userAddressChange: boolean;
  userDeliveryAddressChange: boolean;
}

const initialState: UserAccount = {
  isLogin: false,
  emailChange: false,
  fullNameChange: false,
  phoneNumberChange: false,
  userAddressChange: false,
  userDeliveryAddressChange: false,
};

const userAccountSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setIslogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    toggleLogin(state) {
      state.isLogin = !state.isLogin;
    },

    setEmailChange(state, action: PayloadAction<boolean>) {
      state.emailChange = action.payload;
    },
    setFullNameChange(state, action: PayloadAction<boolean>) {
      state.fullNameChange = action.payload;
    },
    setPhoneNumberChange(state, action: PayloadAction<boolean>) {
      state.phoneNumberChange = action.payload;
    },
    setUserAddressChange(state, action: PayloadAction<boolean>) {
      state.userAddressChange = action.payload;
    },
    setUserDeliveryAddressChange(state, action: PayloadAction<boolean>) {
      state.userDeliveryAddressChange = action.payload;
    },
  },
});

export const {
  setIslogin,
  toggleLogin,
  setEmailChange,
  setFullNameChange,
  setPhoneNumberChange,
  setUserAddressChange,
  setUserDeliveryAddressChange,
} = userAccountSlice.actions;
export default userAccountSlice;
