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
  category: string | null;
  productItem: Sofa | Armchair | Chair | Table | Lamp | null;
  sofaArr?: Sofa[] | null;
  armchairArr?: Armchair[] | null;
  chairArr?: Chair[] | null;
  tableArr?: Table[] | null;
  lampArr?: Lamp[] | null;
}

const initialState: ProductState = {
  category: null,
  productItem: null,
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
  setSofaArr,
  setArmchairArr,
  setChairArr,
  setTableArr,
  setLampArr,
} = productSlice.actions;
export default productSlice;
