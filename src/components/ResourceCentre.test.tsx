import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceCentre } from "./ResourceCentre";
import { getHealthResources } from "../services/healthResources";
import { createMockHealthResource } from "../test/factories/createMockHealthResource";

vi.mock("../services/healthResources", () => ({
  getHealthResources: vi.fn(),
}));

const mockGetHealthResources = vi.mocked(getHealthResources);

describe("ResourceCentre", () => {
  it("renders resources grouped by category", async () => {
    // Arrange
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
    });
    const article = createMockHealthResource({
      id: "002",
      category: "Articles",
      title: "The Science of Sleep",
    });

    mockGetHealthResources.mockResolvedValueOnce([podcast, article]);

    // Act
    render(<ResourceCentre />);

    // Assert
    const podcastsSection = await screen.findByRole("region", {
      name: "Podcasts",
    });
    const articlesSection = await screen.findByRole("region", {
      name: "Articles",
    });

    expect(
      within(podcastsSection).getByRole("heading", { name: "Podcasts" }),
    ).toBeInTheDocument();
    expect(
      within(podcastsSection).getByText("Mindful Moments"),
    ).toBeInTheDocument();
    expect(
      within(articlesSection).getByRole("heading", { name: "Articles" }),
    ).toBeInTheDocument();
    expect(
      within(articlesSection).getByText("The Science of Sleep"),
    ).toBeInTheDocument();
  });
});
