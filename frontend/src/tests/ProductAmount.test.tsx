import { fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ProductAmount from "@/features/product/components/ProductAmount";
import { renderWithProviders } from "@/services/store";

vi.mock("../../../hooks/useStorageCartUpdate", () => ({
  useStorageCartUpdate: vi.fn(),
}));

describe("ProductAmount", () => {
  it("renders the component with the initial amount", () => {
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={() => {}} />
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("calls onAmountChange with the incremented value when the plus button is clicked", async () => {
    const mockOnAmountChange = vi.fn();
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
    );

    const incrementButton = screen.getByTestId("plus_btn");
    fireEvent.click(incrementButton);

    expect(mockOnAmountChange).toHaveBeenCalledWith(3);
  });

  it("calls onAmountChange with the decremented value when the minus button is clicked", async () => {
    const mockOnAmountChange = vi.fn();
    renderWithProviders(
      <ProductAmount amountProp={2} onAmountChange={mockOnAmountChange} />
    );

    const decrementButton = screen.getByTestId("minus_btn");
    fireEvent.click(decrementButton);

    expect(mockOnAmountChange).toHaveBeenCalledWith(1);
  });

  it("disables the minus button when the amount is 1", () => {
    renderWithProviders(
      <ProductAmount amountProp={1} onAmountChange={() => {}} />
    );

    const decrementButton = screen.getByTestId("minus_btn");

    expect(decrementButton).toBeDisabled();
  });

  it("renders minus icon in grey when the amount is 1", () => {
    renderWithProviders(
      <ProductAmount amountProp={1} onAmountChange={() => {}} />
    );

    const minusIcon = screen.getByTestId("img");
    expect(minusIcon).toHaveStyle({ color: "#808080" });
  });
});
