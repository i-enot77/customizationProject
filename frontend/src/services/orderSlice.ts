import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "./cartSlice";
import { FullName, UserAddressData } from "./userSlice";

export interface DeliveryData extends UserAddressData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface Shipping {
  shippingMethod: string;
  shippingCost: number;
}

export interface Order {
  _id?: string;
  userId: string | null; // For logged-in users
  email: string;
  // fullName: FullName;
  deliveryAddress: DeliveryData;
  products: CartState[];
  shipping: Shipping;
}

const initialState: Order = {
  _id: "",
  userId: null,
  email: "",
  deliveryAddress: {
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    zipCode: "",
    city: "",
    phoneNumber: "",
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
    setOrderDeliveryData(state, action: PayloadAction<DeliveryData>) {
      state.deliveryAddress = action.payload;
    },
    initOrderDeliveryData(state) {
      state.deliveryAddress = initialState.deliveryAddress;
    },
  },
});

export const {
  setShipping,
  setInitShipping,
  setOrderUserEmail,
  setOrderDeliveryData,
  initOrderDeliveryData,
} = orderSlice.actions;
export default orderSlice;
