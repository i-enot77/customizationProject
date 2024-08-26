import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sofa, Armchair, Chair, Lamp, Table } from "./productsApi";

export interface CartState {
  product: Sofa | Armchair | Chair | Table | Lamp;
  baseMaterial: {
    _id: string;
    name: string;
  };
  legsMaterial: {
    _id: string;
    name: string;
  } | null;
  quantity: number;
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
    setCart(state, action: PayloadAction<CartState[]>) {
      state.cart = action.payload;
    },
    addToCart(state, action: PayloadAction<CartState>) {
      const { product, baseMaterial, legsMaterial, quantity } = action.payload;

      const existingItem = state.cart.find(
        (cartItem) => cartItem.product._id === product._id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push({
          product: product,
          baseMaterial: baseMaterial,
          legsMaterial: legsMaterial ? legsMaterial : null,
          quantity: quantity,
        });
      }
    },
    updateCartItemQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const cartItemIndex = state.cart.findIndex(
        (item) => item.product._id === id
      );
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex].quantity = quantity;
      }
    },
    deleteCartItem(state, action: PayloadAction<string>) {
      const itemIdToDelete = action.payload;
      state.cart = state.cart.filter(
        (item) => item.product._id !== itemIdToDelete
      );
    },
    clearCart(state) {
      state.cart = [];
      state.totalPrice = null;
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
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },
  },
});

export const {
  setCart,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
  toggleShowCart,
  setShowCart,
  setCartSummary,
  calculateTotalPrice,
} = cartSlice.actions;
export default cartSlice;
