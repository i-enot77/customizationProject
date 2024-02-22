import { customizationApi } from "./api";

export interface ProductWithDimensions<T> {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  modelPath: string;
  dimensions: T;
  baseMaterial: [];
  legsMaterial?: [];
}

export interface SofaDimensions {
  height: number;
  width: number;
  depth: number;
  seatHeight: number;
  armsrestHeight: number;
  weight: number;
  seats: number;
}

export interface ArmchairDimensions {
  height: number;
  width: number;
  depth: number;
  seatHeight: number;
  armsrestHeight: number;
  weight: number;
}

export interface ChairDimensions {
  height: number;
  width: number;
  depth: number;
  seatHeight: number;
  armsrestHeight: number;
}

export interface TableDimensions {
  height: number;
  width: number;
  length: number;
  legHeight: number;
  countertopThickness: number;
  seats: number;
  weight: number;
}

export interface LampDimensions {
  height: number;
  diameter: number;
  cableLength: number;
  weight: number;
}

// Define interfaces for specific product types
export interface Sofa extends ProductWithDimensions<SofaDimensions> {}
export interface Armchair extends ProductWithDimensions<ArmchairDimensions> {}
export interface Chair extends ProductWithDimensions<ChairDimensions> {}
export interface Table extends ProductWithDimensions<TableDimensions> {}
export interface Lamp extends ProductWithDimensions<LampDimensions> {}

export const productsApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    getSofaItems: build.mutation<Sofa[], void>({
      query: () => ({
        url: "api/sofa",
        method: "GET",
      }),
    }),
    getArmchairItems: build.mutation<Armchair[], void>({
      query: () => ({
        url: "api/armchair",
        method: "GET",
      }),
    }),
    getChairItems: build.mutation<Chair[], void>({
      query: () => ({
        url: "api/chair",
        method: "GET",
      }),
    }),
    getTableItems: build.mutation<Table[], void>({
      query: () => ({
        url: "api/table",
        method: "GET",
      }),
    }),
    getLampItems: build.mutation<Lamp[], void>({
      query: () => ({
        url: "api/lamp",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSofaItemsMutation,
  useGetArmchairItemsMutation,
  useGetChairItemsMutation,
  useGetTableItemsMutation,
  useGetLampItemsMutation,
} = productsApi;
