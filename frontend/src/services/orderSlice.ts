import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  phone: string;
}

export interface Shipping {
  method: string;
  cost: number;
}

export interface OrderState {
  user: User;
  shipping: Shipping;
}

const initialState: OrderState = {
  user: {
    email: "",
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
  },
  shipping: {
    method: "",
    cost: 0,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<User>) {
      state.user = { ...state.user, ...action.payload };
    },
    setShipping(state, action: PayloadAction<Shipping>) {
      state.shipping = action.payload;
    },
  },
});

export const { setUserData, setShipping } = orderSlice.actions;
export default orderSlice;
