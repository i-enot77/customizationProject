import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Material {
  _id: string;
  name: string;
  category: string;
  ref: {
    map: string;
    displacementMap: string;
    normalMap: string;
    roughnessMap: string;
    aoMap?: string;
    metalnessMap?: string;
  };
}

export interface MaterialMenuData {
  modelPart: string;
  material: Material;
}

export interface MaterialState {
  baseMaterial: Material | null;
  legsMaterial?: Material | null;
  materialMenuData: MaterialMenuData[];
}

const initialState: MaterialState = {
  baseMaterial: null,
  legsMaterial: null,
  materialMenuData: [],
};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    setBaseMaterial(state, action: PayloadAction<Material>) {
      state.baseMaterial = action.payload;
    },
    setLegsMaterial(state, action: PayloadAction<Material>) {
      state.baseMaterial = action.payload;
    },
  },
});

export const {} = materialSlice.actions;
export default materialSlice;
