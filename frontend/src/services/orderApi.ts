import { customizationApi } from "./api";

export const orderApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    // getDeliveryData: build.query<DeliveryData | string, string>({
    //   query: (_id) => ({
    //     url: `/user/${_id}/address`,
    //     method: "GET",
    //   }),
    // }),
  }),
});

export const {} = orderApi;
