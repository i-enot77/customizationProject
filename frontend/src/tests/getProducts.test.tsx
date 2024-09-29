import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/services/store";
import {
  useGetItemsByCategoryQuery,
  useGetProductByIdQuery,
} from "@/services/productsApi";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const API_BASE_URL = "http://localhost:3500/api";

const server = setupServer(
  // Mock the GET request for fetching items by category
  http.get(`${API_BASE_URL}/sofy`, () => {
    const mockData = [
      {
        _id: "1",
        name: "Sofa1",
        price: 500,
        description: "A comfortable sofa",
        category: "sofy",
        modelPath: "model.glb",
        dimensions: {
          height: 90,
          width: 200,
          depth: 90,
          seatHeight: 40,
          armsrestHeight: 60,
          weight: 50,
          seats: 3,
        },
        baseMaterial: {
          _id: "1",
          name: "Leather",
          category: "base",
          ref: {
            map: "map.jpg",
            displacementMap: "displacement.jpg",
            normalMap: "normal.jpg",
            roughnessMap: "roughness.jpg",
          },
          mtlThumbnail: {
            small: "small.jpg",
            medium: "medium.jpg",
          },
        },
        legsMaterial: {
          _id: "2",
          name: "Metal",
          category: "legs",
          ref: {
            map: "map.jpg",
            displacementMap: "displacement.jpg",
            normalMap: "normal.jpg",
            roughnessMap: "roughness.jpg",
          },
          mtlThumbnail: {
            small: "small.jpg",
            medium: "medium.jpg",
          },
        },
        assignedBaseMtl: ["1"],
        assignedLegsMtl: ["2"],
        img: { small: "small.jpg", medium: "medium.jpg", large: "large.jpg" },
      },
    ];
    return HttpResponse.json(mockData);
  }),

  // Mock GET request for fetching a product by ID with query parameters
  http.get(`${API_BASE_URL}/sofy/:id`, ({ request, params }) => {
    const { id } = params;
    const url = new URL(request.url);
    const baseMtl = url.searchParams.get("base");
    const legsMtl = url.searchParams.get("legs");

    const mockProduct = {
      _id: id,
      name: "Sofa1",
      price: 500,
      description: "A comfortable sofa",
      category: "sofy",
      modelPath: "model.glb",
      dimensions: {
        height: 90,
        width: 200,
        depth: 90,
        seatHeight: 40,
        armsrestHeight: 60,
        weight: 50,
        seats: 3,
      },
      baseMaterial: { _id: baseMtl, name: "Leather", category: "base" },
      legsMaterial: legsMtl ? { _id: legsMtl, name: "Metal" } : undefined,
      assignedBaseMtl: ["mat1"],
      assignedLegsMtl: legsMtl ? ["mat2"] : undefined,
      img: { small: "", medium: "", large: "" },
    };

    return HttpResponse.json({
      product: mockProduct,
      baseMtl: { _id: baseMtl, name: "Leather", category: "base" },
      legsMtl: legsMtl ? { _id: legsMtl, name: "Metal" } : undefined,
    });
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

describe("productsApi", () => {
  it("should fetch items by category", async () => {
    const { result } = renderHook(() => useGetItemsByCategoryQuery("sofy"), {
      wrapper,
    });

    // Wait for success and validate response
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual([
      {
        _id: "1",
        name: "Sofa1",
        price: 500,
        description: "A comfortable sofa",
        category: "sofy",
        modelPath: "model.glb",
        dimensions: {
          height: 90,
          width: 200,
          depth: 90,
          seatHeight: 40,
          armsrestHeight: 60,
          weight: 50,
          seats: 3,
        },
        baseMaterial: {
          _id: "1",
          name: "Leather",
          category: "base",
          ref: {
            map: "map.jpg",
            displacementMap: "displacement.jpg",
            normalMap: "normal.jpg",
            roughnessMap: "roughness.jpg",
          },
          mtlThumbnail: {
            small: "small.jpg",
            medium: "medium.jpg",
          },
        },
        legsMaterial: {
          _id: "2",
          name: "Metal",
          category: "legs",
          ref: {
            map: "map.jpg",
            displacementMap: "displacement.jpg",
            normalMap: "normal.jpg",
            roughnessMap: "roughness.jpg",
          },
          mtlThumbnail: {
            small: "small.jpg",
            medium: "medium.jpg",
          },
        },
        assignedBaseMtl: ["1"],
        assignedLegsMtl: ["2"],
        img: { small: "small.jpg", medium: "medium.jpg", large: "large.jpg" },
      },
    ]);
  });

  it("should fetch product by ID with base and legs material", async () => {
    const { result } = renderHook(
      () =>
        useGetProductByIdQuery({
          category: "sofy",
          _id: "1",
          baseMtl: "1",
          legsMtl: "2",
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      product: {
        _id: "1",
        name: "Sofa1",
        price: 500,
        description: "A comfortable sofa",
        category: "sofy",
        modelPath: "model.glb",
        dimensions: {
          height: 90,
          width: 200,
          depth: 90,
          seatHeight: 40,
          armsrestHeight: 60,
          weight: 50,
          seats: 3,
        },
        baseMaterial: { _id: "1", name: "Leather", category: "base" },
        legsMaterial: { _id: "2", name: "Metal" },
        assignedBaseMtl: ["mat1"],
        assignedLegsMtl: ["mat2"],
        img: { small: "", medium: "", large: "" },
      },
      baseMtl: { _id: "1", name: "Leather", category: "base" },
      legsMtl: { _id: "2", name: "Metal" },
    });
  });
});
