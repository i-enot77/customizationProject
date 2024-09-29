import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MaterialMenu from "@/features/product/components/MaterialMenu";

// Mock the useGetAssignedMtlMutation hook
vi.mock("@/services/materialApi", () => ({
  useGetAssignedMtlMutation: vi.fn(() => [
    vi.fn(() => ({
      unwrap: () =>
        Promise.resolve([
          {
            _id: "1",
            name: "Fabric",
            mtlThumbnail: { small: "/small1.jpg", medium: "/medium1.jpg" },
          },
          {
            _id: "2",
            name: "Leather",
            mtlThumbnail: { small: "/small2.jpg", medium: "/medium2.jpg" },
          },
        ]),
    })),
  ]),
}));

describe("MaterialMenu Component", () => {
  it("should open the modal when 'Zmień' button is clicked and render material options", async () => {
    const handleChange = vi.fn();

    render(
      <MaterialMenu
        modelPart="Base"
        mtlName="Fabric"
        assignedMtl={["1", "2"]}
        isChecked="1"
        handleChange={handleChange}
      />
    );

    const changeButton = screen.getByText(/Zmień/i);
    expect(changeButton).toBeInTheDocument();

    fireEvent.click(changeButton);

    await waitFor(() => {
      expect(screen.getByLabelText("Fabric")).toBeInTheDocument();
      expect(screen.getByLabelText("Leather")).toBeInTheDocument();
    });

    // Simulate selecting a material
    fireEvent.click(screen.getByLabelText("Leather"));

    // Check if the correct callback is triggered when a material is selected
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        _id: "2",
        name: "Leather",
        mtlThumbnail: {
          small: "/small2.jpg",
          medium: "/medium2.jpg",
        },
      })
    );
  });

  it("should not show the modal when there are no assigned materials", () => {
    render(<MaterialMenu modelPart="Base" mtlName="Fabric" />);

    expect(screen.queryByText(/Zmień/i)).not.toBeInTheDocument();
  });
});
