import { customizationApi } from "./api";
import { DeliveryData } from "./orderSlice";

export const orderApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    getDeliveryData: build.query<DeliveryData | string, string>({
      query: (_id) => ({
        url: `/user/${_id}/address`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetDeliveryDataQuery } = orderApi;
