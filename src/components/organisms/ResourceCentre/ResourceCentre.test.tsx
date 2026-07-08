import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { getHealthResources } from "../../../services/healthResources";
import { createMockHealthResource } from "../../../test/factories/createMockHealthResource";
import { ResourceCentre } from "./ResourceCentre";

vi.mock("../../../services/healthResources", () => ({
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

  it("displays all resource details when a resource is selected", async () => {
    // Arrange
    const user = userEvent.setup();
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
      description:
        "A calming podcast focused on mindfulness techniques for daily life.",
      date_uploaded: "2025-07-10",
    });

    mockGetHealthResources.mockResolvedValueOnce([podcast]);

    // Act
    render(<ResourceCentre />);
    await user.click(
      await screen.findByRole("button", { name: "View Mindful Moments" }),
    );

    // Assert
    const details = screen.getByRole("dialog", {
      name: "Selected resource details",
    });

    expect(
      within(details).getByRole("heading", { name: "Mindful Moments" }),
    ).toBeInTheDocument();
    expect(
      within(details).getByText(
        "A calming podcast focused on mindfulness techniques for daily life.",
      ),
    ).toBeInTheDocument();
    expect(within(details).getByText("2025-07-10")).toBeInTheDocument();
  });

  it("closes the selected resource details modal", async () => {
    // Arrange
    const user = userEvent.setup();
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
    });

    mockGetHealthResources.mockResolvedValueOnce([podcast]);

    // Act
    render(<ResourceCentre />);
    await user.click(
      await screen.findByRole("button", { name: "View Mindful Moments" }),
    );
    await user.click(screen.getByRole("button", { name: "Close details" }));

    // Assert
    expect(
      screen.queryByRole("dialog", { name: "Selected resource details" }),
    ).not.toBeInTheDocument();
  });
});
