import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeliveryData } from "./orderSlice";

export interface FullName {
  firstName: string;
  lastName: string;
}

interface InitState {
  userEmail: string;
  fullName: FullName | null;
  userDeliveryData: DeliveryData | null;
}

const initialState: InitState = {
  userEmail: "",
  fullName: null,
  userDeliveryData: {
    country: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
    setFullName(state, action: PayloadAction<FullName | null>) {
      state.fullName = action.payload;
    },
    setDeliveryData(state, action: PayloadAction<DeliveryData | null>) {
      state.userDeliveryData = action.payload;
    },
    initUserDeliveryData(state) {
      state.userDeliveryData = initialState.userDeliveryData;
    },
  },
});

export const {
  setUserEmail,
  setFullName,
  setDeliveryData,
  initUserDeliveryData,
} = userSlice.actions;
export default userSlice;
