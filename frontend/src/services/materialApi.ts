import { customizationApi } from "./api";
import { Material } from "./materialSlice";

interface MaterialsArr {
  materialIds: string;
}

export const materialApi = customizationApi.injectEndpoints({
  endpoints: (build) => ({
    getAssignedMtl: build.mutation<Material[], MaterialsArr>({
      query: ({ materialIds }) => ({
        url: "api/textures",
        method: "POST",
        body: { materialIds },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetAssignedMtlMutation } = materialApi;
