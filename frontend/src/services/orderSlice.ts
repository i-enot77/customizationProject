import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./cartSlice";
import { FullName } from "./userSlice";

export interface DeliveryData {
  country: string;
  address: string;
  zipCode: string;
  city: string;
  phone: string;
}

export interface Shipping {
  shippingMethod: string;
  shippingCost: number;
}

export interface Order {
  _id?: string;
  userId: string | null; // For logged-in users
  email: string;
  fullName: FullName;
  deliveryData: DeliveryData;
  products: CartState[];
  shipping: Shipping;
}

const initialState: Order = {
  _id: "",
  userId: null,
  email: "",
  fullName: {
    firstName: "",
    lastName: "",
  },
  deliveryData: {
    country: "",
    address: "",
    zipCode: "",
    city: "",
    phone: "",
  },
  products: [],
  shipping: {
    shippingMethod: "",
    shippingCost: 0,
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setShipping(state, action: PayloadAction<Shipping>) {
      state.shipping = action.payload;
    },
    setInitShipping(state) {
      state.shipping = initialState.shipping;
    },
    setOrderUserEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
  },
});

export const { setShipping, setInitShipping, setOrderUserEmail } =
  orderSlice.actions;
export default orderSlice;
