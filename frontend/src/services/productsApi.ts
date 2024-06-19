import { Material } from "./materialSlice";
import { customizationApi } from "./api";

export interface ProductWithDimensions<T> {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  modelPath: string;
  dimensions: T;
  baseMaterial: string;
  legsMaterial?: string;
  assignedBaseMtl: string[];
  assignedLegsMtl?: string[];
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

export interface ProductById {
  product: Sofa | Armchair | Chair | Table | Lamp;
  baseMtl: Material;
  legsMtl?: Material;
}

export const productsApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    getItemsByCategory: build.query<
      Sofa[] | Armchair[] | Chair[] | Table[] | Lamp[],
      string
    >({
      query: (category) => ({
        url: `api/${category}`,
        method: "GET",
      }),
    }),

    getProductById: build.query<
      ProductById,
      {
        category: string;
        _id: string;
        baseMaterial: string;
        legsMaterial?: string;
      }
    >({
      query: ({ category, _id, baseMaterial, legsMaterial }) => ({
        url: `api/${category}/${_id}/${baseMaterial}/${legsMaterial}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetItemsByCategoryQuery, useGetProductByIdQuery } =
  productsApi;
