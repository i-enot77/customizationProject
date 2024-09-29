// import { screen, fireEvent } from "@testing-library/react";
// import { expect, describe, it, vi } from "vitest";
// import ProductItem from "@/features/product/components/ProductItem";
// import { renderWithProviders } from "@/services/store";
// import { MemoryRouter } from "react-router-dom";
// import { useGetProductByIdQuery } from "@/services/productsApi";

// // Mocking the API call for useGetProductByIdQuery
// vi.mock("@/services/productsApi", () => ({
//   useGetProductByIdQuery: vi.fn(),
// }));

// // Mock cartSlice and ensure addToCart returns a valid action
// vi.mock("@/services/cartSlice", async (importOriginal) => {
//   const actual = await importOriginal();
//   return {
//     ...actual,
//     addToCart: vi.fn(() => ({
//       type: "cart/addToCart",
//       payload: {
//         product: {
//           _id: "123",
//           name: "Custom Sofa",
//           price: 2000,
//         },
//         baseMaterial: { _id: "1", name: "Fabric" },
//         legsMaterial: { _id: "3", name: "Wood" },
//         quantity: 1,
//       },
//     })), // Mocking addToCart action
//   };
// });

// describe("ProductItem Component - Add to Cart", () => {
//   const mockProductData = {
//     product: {
//       _id: "123",
//       name: "Custom Sofa",
//       price: 2000,
//       description: "A customizable sofa.",
//       category: "sofy",
//       assignedBaseMtl: ["1", "2"],
//       assignedLegsMtl: ["3"],
//     },
//     baseMtl: {
//       _id: "1",
//       name: "Fabric",
//     },
//     legsMtl: {
//       _id: "3",
//       name: "Wood",
//     },
//   };

//   it("should dispatch addToCart when the Add to Cart button is clicked", async () => {
//     // Mock the API response
//     (useGetProductByIdQuery as any).mockReturnValue({
//       data: mockProductData,
//       isLoading: false,
//       isSuccess: true,
//       refetch: vi.fn(),
//     });

//     renderWithProviders(
//       <MemoryRouter>
//         <ProductItem />
//       </MemoryRouter>
//     );

//     // Simulate clicking the "Add to Cart" button
//     const addToCartButton = await screen.findByTestId("add_btn");
//     fireEvent.click(addToCartButton);

//     // Expect that the addToCart action is dispatched with correct data
//     const { addToCart } = await import("@/services/cartSlice");
//     expect(addToCart).toHaveBeenCalledWith({
//       product: mockProductData.product,
//       baseMaterial: mockProductData.baseMtl,
//       legsMaterial: mockProductData.legsMtl,
//       quantity: 1, // Default selected amount
//     });
//   });
// });
