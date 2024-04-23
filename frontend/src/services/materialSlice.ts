import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Material {
  id: string;
  name: string;
  ref: {
    map: string;
    displacementMap: string;
    normalMap: string;
    roughnessMap: string;
    aoMap?: string;
    metalnessMap?: string;
  };
}

export interface MaterialState {
  baseMaterial: Material[];
  legsMaterial: Material[];
}

const initialState: MaterialState = {
  baseMaterial: [],
  legsMaterial: [],
};

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {
    baseMaterialsArr(state, action: PayloadAction<Material[]>) {
      state.baseMaterial = action.payload;
    },
    legsMaterialsArr(state, action: PayloadAction<Material[]>) {
      state.baseMaterial = action.payload;
    },
  },
});

export const {} = materialSlice.actions;
export default materialSlice;
