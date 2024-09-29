import { screen, fireEvent } from "@testing-library/react";
import ContactForm from "@/components/ContactForm";
import { expect, describe, it } from "vitest";
import { renderWithProviders } from "@/services/store";

describe("Test ContactForm", () => {
  it("Should render form element", () => {
    renderWithProviders(<ContactForm />);

    const contactFormElement = screen.getByRole("form");
    expect(contactFormElement).toBeInTheDocument();
  });

  it("Should render validations errors", async () => {
    renderWithProviders(<ContactForm />);

    const submitBtn = await screen.findByTestId("submit_btn");
    fireEvent.click(submitBtn);

    const validationErrors = await screen.findAllByTestId("validation");

    expect(validationErrors.length).toBe(4);
  });
});
