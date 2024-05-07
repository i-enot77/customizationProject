import { customizationApi } from "./api";
import { Material } from "./materialSlice";

export const materialApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    getAssignedMtl: build.mutation<Material[], string[]>({
      query: (materialIds) => ({
        url: "api/materials",
        method: "POST",
        body: materialIds,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetAssignedMtlMutation } = materialApi;
