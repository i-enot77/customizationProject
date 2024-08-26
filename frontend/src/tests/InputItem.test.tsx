import { render, screen } from "@testing-library/react";
import InputItem from "@/components/InputItem";
import { expect, describe, it } from "vitest";

describe("Test InputItem", () => {
  it("Should render input element", () => {
    render(<InputItem />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  it("Should has Test value", () => {
    render(<InputItem value="Ala ma kota" type="text" />);

    const inputElement = screen.getByRole("textbox");

    expect(inputElement).toHaveAttribute("value", "Ala ma kota");
    expect(inputElement).toHaveAttribute("type", "text");
  });
});
