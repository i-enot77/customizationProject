import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryData } from "./orderSlice";

export interface FullName {
  firstName: string;
  lastName: string;
}
export interface UserAddressData {
  address: string;
  zipCode: string;
  city: string;
  country: string;
}

interface InitState {
  userEmail: string;
  userPhone: string | null;
  fullName: FullName | null;
  userAddress: UserAddressData | null;
  userDeliveryAddress: DeliveryData | null;
}

const initialState: InitState = {
  userEmail: "",
  userPhone: null,
  fullName: null,
  userAddress: null,
  userDeliveryAddress: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
    setUserPhone(state, action: PayloadAction<string | null>) {
      state.userPhone = action.payload;
    },
    setFullName(state, action: PayloadAction<FullName | null>) {
      state.fullName = action.payload;
    },
    setUserAddress(state, action: PayloadAction<UserAddressData | null>) {
      state.userAddress = action.payload;
    },
    setUserDeliveryAddress(state, action: PayloadAction<DeliveryData | null>) {
      state.userDeliveryAddress = action.payload;
    },
  },
});

export const {
  setUserEmail,
  setUserPhone,
  setFullName,
  setUserAddress,
  setUserDeliveryAddress,
} = userSlice.actions;
export default userSlice;
