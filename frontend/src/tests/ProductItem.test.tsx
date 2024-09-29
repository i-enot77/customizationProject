import { screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";
import ProductItem from "@/features/product/components/ProductItem";
import { renderWithProviders } from "@/services/store";
import { MemoryRouter } from "react-router-dom";
import { useGetProductByIdQuery } from "@/services/productsApi";

// Mocking the API call for useGetProductByIdQuery
vi.mock("@/services/productsApi", () => ({
  useGetProductByIdQuery: vi.fn(),
}));

vi.mock("@/services/cartSlice", async () => {
  const actual = await import("@/services/cartSlice");
  return {
    ...actual,
    addToCart: vi.fn(() => ({
      type: "cart/addToCart",
      payload: {
        product: {
          _id: "123",
          name: "Custom Sofa",
          price: 2000,
        },
        baseMaterial: { _id: "1", name: "Fabric" },
        legsMaterial: { _id: "3", name: "Wood" },
        quantity: 1,
      },
    })),
  };
});

describe("ProductItem Component - Add to Cart", () => {
  const mockProductData = {
    product: {
      _id: "123",
      name: "Custom Sofa",
      price: 2000,
      description: "A customizable sofa.",
      category: "sofy",
      assignedBaseMtl: ["1", "2"],
      assignedLegsMtl: ["3"],
    },
    baseMtl: {
      _id: "1",
      name: "Fabric",
    },
    legsMtl: {
      _id: "3",
      name: "Wood",
    },
  };

  it("should dispatch addToCart when the Add to Cart button is clicked", async () => {
    (useGetProductByIdQuery as any).mockReturnValue({
      data: mockProductData,
      isLoading: false,
      isSuccess: true,
      refetch: vi.fn(),
    });

    renderWithProviders(
      <MemoryRouter>
        <ProductItem />
      </MemoryRouter>
    );

    const addToCartButton = await screen.findByTestId("add_btn");
    fireEvent.click(addToCartButton);

    const { addToCart } = await import("@/services/cartSlice");
    expect(addToCart).toHaveBeenCalledWith({
      product: mockProductData.product,
      baseMaterial: mockProductData.baseMtl,
      legsMaterial: mockProductData.legsMtl,
      quantity: 1,
    });
  });
});
