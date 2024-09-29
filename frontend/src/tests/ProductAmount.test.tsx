import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductAmount from "@/features/product/components/ProductAmount";
import { renderWithProviders } from "@/services/store";

// Mock the useStorageCartUpdate hook since it's not necessary for testing this component.
vi.mock("../../../hooks/useStorageCartUpdate", () => ({
  useStorageCartUpdate: vi.fn(),
}));

describe("ProductAmount", () => {
  it("renders the component with the initial amount", () => {
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={() => {}} />
    );

    // Ensure that the amount is rendered correctly.
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onAmountChange with the incremented value when the plus button is clicked", async () => {
    const mockOnAmountChange = vi.fn();
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
    );

    // Find the increment button and click it.
    const incrementButton = screen.getByTestId("plus_btn");
    fireEvent.click(incrementButton);

    // Expect onAmountChange to be called with the incremented value (3).
    expect(mockOnAmountChange).toHaveBeenCalledWith(3);
  });

  it("calls onAmountChange with the decremented value when the minus button is clicked", async () => {
    const mockOnAmountChange = vi.fn();
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
    );

    // Find the decrement button and click it.
    const decrementButton = screen.getByTestId("minus_btn");
    fireEvent.click(decrementButton);

    // Expect onAmountChange to be called with the decremented value (1).
    expect(mockOnAmountChange).toHaveBeenCalledWith(1);
  });

  it("disables the minus button when the amount is 1", () => {
    renderWithProviders(
      <ProductAmount amountProp={1} onAmountChange={() => {}} />
    );

    // Find the decrement button.
    const decrementButton = screen.getByTestId("minus_btn");

    // Expect the decrement button to be disabled when the amount is 1.
    expect(decrementButton).toBeDisabled();
  });

  it("renders minus icon in grey when the amount is 1", () => {
    renderWithProviders(
      <ProductAmount amountProp={1} onAmountChange={() => {}} />
    );

    // Find the minus icon and check its style.
    const minusIcon = screen.getByTestId("img");
    expect(minusIcon).toHaveStyle({ color: "#808080" });
  });
});

// import { render, fireEvent, screen } from "@testing-library/react";
// import { describe, expect, it, vi } from "vitest";
// import ProductAmount from "@/features/product/components/ProductAmount";
// import { renderWithProviders } from "@/services/store";

// // Mock the useStorageCartUpdate hook since it's not necessary for testing this component.
// vi.mock("../../../hooks/useStorageCartUpdate", () => ({
//   useStorageCartUpdate: vi.fn(),
// }));

// describe("ProductAmount", () => {
//   it("renders the component with the initial amount", () => {
//     renderWithProviders(
//       <ProductAmount amountProp={2} onAmountChange={() => {}} />
//     );

//     // Ensure that the amount is renderWithProvidersed correctly.
//     expect(screen.getByText("2")).toBeInTheDocument();
//   });

//   it("calls onAmountChange with the incremented value when the plus button is clicked", () => {
//     const mockOnAmountChange = vi.fn();
//     renderWithProviders(
//       <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
//     );

//     // Find the increment button and click it.
//     const incrementButton = screen.findByTestId("plus_btn");
//     fireEvent.click(incrementButton);

//     // Expect onAmountChange to be called with the incremented value (3).
//     expect(mockOnAmountChange).toHaveBeenCalledWith(3);
//   });

//   it("calls onAmountChange with the decremented value when the minus button is clicked", () => {
//     const mockOnAmountChange = vi.fn();
//     renderWithProviders(
//       <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
//     );

//     // Find the decrement button and click it.
//     const decrementButton = screen.getByRole("button", { name: /minus/i });
//     fireEvent.click(decrementButton);

//     // Expect onAmountChange to be called with the decremented value (1).
//     expect(mockOnAmountChange).toHaveBeenCalledWith(1);
//   });

//   it("disables the minus button when the amount is 1", () => {
//     renderWithProviders(
//       <ProductAmount amountProp={1} onAmountChange={() => {}} />
//     );

//     // Find the decrement button.
//     const decrementButton = screen.getByRole("button", { name: /minus/i });

//     // Expect the decrement button to be disabled when the amount is 1.
//     expect(decrementButton).toBeDisabled();
//   });

//   it("renderWithProviderss minus icon in grey when amount is 1", () => {
//     renderWithProviders(
//       <ProductAmount amountProp={1} onAmountChange={() => {}} />
//     );

//     // Find the minus icon and check its style.
//     const minusIcon = screen.getByRole("img", { name: /minus/i });
//     expect(minusIcon).toHaveStyle({ color: "#808080" });
//   });
// });
