import { customizationApi } from "./api";
import { CartState } from "./cartSlice";
import { Shipping, User } from "./orderSlice";

export interface Order {
  id: string;
  customer: User;
  products: CartState[];
  shipping: Shipping;
}

export const orderApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    saveOrder: build.mutation<string, Order>({
      query: ({ id, customer, products, shipping }) => ({
        url: "api/save-order",
        method: "POST",
        body: {
          id,
          customer,
          products,
          shipping,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSaveOrderMutation } = orderApi;
