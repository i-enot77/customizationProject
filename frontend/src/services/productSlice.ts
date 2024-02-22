import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sofa, Armchair, Chair, Table, Lamp } from "./productsApi";

export interface CartState {
  id: string;
  name: string;
  price: number;
  amount: number;
  // baseMaterial: string;
  // legsMaterial: string;
}

interface ProductState {
  category: string | null;
  productItem: Sofa | Armchair | Chair | Table | Lamp | null;
  totalPrice: number | null;
  cart: CartState[];
  showCart: boolean;
  sofaArr?: Sofa[] | null;
  armchairArr?: Armchair[] | null;
  chairArr?: Chair[] | null;
  tableArr?: Table[] | null;
  lampArr?: Lamp[] | null;
}

const initialState: ProductState = {
  category: null,
  productItem: null,
  totalPrice: null,
  cart: [],
  showCart: false,
  sofaArr: null,
  armchairArr: null,
  chairArr: null,
  tableArr: null,
  lampArr: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string | null>) {
      state.category = action.payload;
    },
    setProductItem(
      state,
      action: PayloadAction<Sofa | Armchair | Chair | Table | Lamp | null>
    ) {
      state.productItem = action.payload;
    },
    addToCart(state, action: PayloadAction<number>) {
      const { productItem } = state;
      if (productItem) {
        // Checking if the item already exists in the cart
        const existingItem = state.cart.find(
          (item) => item.id === productItem._id
        );
        if (existingItem) {
          existingItem.amount += action.payload;
        } else {
          state.cart.push({
            id: productItem._id,
            name: productItem.name,
            price: productItem.price,
            amount: action.payload,
          });
        }
      }
    },
    updateCartItemAmount(
      state,
      action: PayloadAction<{ id: string; amount: number }>
    ) {
      const { id, amount } = action.payload;
      const cartItemIndex = state.cart.findIndex((item) => item.id === id);
      if (cartItemIndex !== -1) {
        state.cart[cartItemIndex].amount = amount;
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
    calculateTotalPrice(state) {
      state.totalPrice = state.cart.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
    },

    setSofaArr(state, action: PayloadAction<Sofa[]>) {
      state.sofaArr = action.payload;
    },
    setArmchairArr(state, action: PayloadAction<Armchair[]>) {
      state.armchairArr = action.payload;
    },
    setChairArr(state, action: PayloadAction<Chair[]>) {
      state.chairArr = action.payload;
    },
    setTableArr(state, action: PayloadAction<Table[]>) {
      state.tableArr = action.payload;
    },
    setLampArr(state, action: PayloadAction<Lamp[]>) {
      state.lampArr = action.payload;
    },
  },
});

export const {
  setCategory,
  setProductItem,
  addToCart,
  updateCartItemAmount,
  deleteCartItem,
  toggleShowCart,
  setShowCart,
  calculateTotalPrice,
  setSofaArr,
  setArmchairArr,
  setChairArr,
  setTableArr,
  setLampArr,
} = productSlice.actions;
export default productSlice;
