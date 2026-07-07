import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";

vi.mock("./components/organisms/ResourceCentre/ResourceCentre", () => ({
  ResourceCentre: () => <section aria-label="Grouped resources" />,
}));

describe("App", () => {
  it("renders the resource centre shell", () => {
    // Arrange

    // Act
    render(<App />);

    // Assert
    expect(
      screen.getByRole("heading", { name: "Resource Centre" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Grouped resources" }),
    ).toBeInTheDocument();
  });
});
