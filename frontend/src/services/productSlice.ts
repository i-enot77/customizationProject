import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Sofa, Armchair, Chair, Table, Lamp } from "./productsApi";

export interface CartState {
  id: string;
  category: string;
  name: string;
  price: number;
  amount: number;
  // baseMaterial: string;
  // legsMaterial: string;
}

interface ProductState {
  category: string;
  productItem: Sofa | Armchair | Chair | Table | Lamp | null;
}

const initialState: ProductState = {
  category: "",
  productItem: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setProductItem(
      state,
      action: PayloadAction<Sofa | Armchair | Chair | Table | Lamp | null>
    ) {
      state.productItem = action.payload;
    },
  },
});

export const { setCategory, setProductItem } = productSlice.actions;
export default productSlice;
