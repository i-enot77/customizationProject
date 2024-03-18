import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sofa, Armchair, Chair, Lamp, Table } from "./productsApi";

export interface CartState {
  id: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  // baseMaterial: string;
  // legsMaterial: string;
}

interface Cart {
  totalPrice: number | null;
  cart: CartState[];
  showCart: boolean;
  cartSummary: boolean;
}

const initialState: Cart = {
  totalPrice: null,
  cart: [],
  showCart: false,
  cartSummary: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        productItem: Sofa | Armchair | Chair | Table | Lamp;
        amount: number;
      }>
    ) {
      const { productItem, amount } = action.payload;

      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === productItem._id
      );
      if (existingItem) {
        existingItem.quantity += amount;
      } else {
        state.cart.push({
          id: productItem._id,
          category: productItem.category,
          name: productItem.name,
          price: productItem.price,
          quantity: amount,
        });
      }
    },
    updateCartItemAmount(
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) {
      const { id, amount } = action.payload;
      const cartItemIndex = state.cart.findIndex((item) => item.id === id);
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex].quantity = amount;
      }
    },
    deleteCartItem(state, action: PayloadAction<string>) {
      const itemIdToDelete = action.payload;
      state.cart = state.cart.filter((item) => item.id !== itemIdToDelete);
    },
    toggleShowCart(state) {
      state.showCart = !state.showCart;
    },
    setShowCart(state, action: PayloadAction<boolean>) {
      state.showCart = action.payload;
    },
    setCartSummary(state, action: PayloadAction<boolean>) {
      state.cartSummary = action.payload;
    },
    calculateTotalPrice(state) {
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const {
  addToCart,
  updateCartItemAmount,
  deleteCartItem,
  toggleShowCart,
  setShowCart,
  setCartSummary,
  calculateTotalPrice,
} = cartSlice.actions;
export default cartSlice;
