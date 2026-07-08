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
    const details = screen.getByRole("dialog", { name: "Mindful Moments" });

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
      screen.queryByRole("dialog", { name: "Mindful Moments" }),
    ).not.toBeInTheDocument();
  });

  it("closes the selected resource details modal when Escape is pressed", async () => {
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
    await user.keyboard("{Escape}");

    // Assert
    expect(
      screen.queryByRole("dialog", { name: "Mindful Moments" }),
    ).not.toBeInTheDocument();
  });

  it("closes the selected resource details modal when the backdrop is clicked", async () => {
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
    await user.click(screen.getByTestId("resource-details-backdrop"));

    // Assert
    expect(
      screen.queryByRole("dialog", { name: "Mindful Moments" }),
    ).not.toBeInTheDocument();
  });

  it("filters resources when a tag filter is selected", async () => {
    // Arrange
    const user = userEvent.setup();
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
      tags: ["wellbeing", "mindfulness"],
    });
    const article = createMockHealthResource({
      id: "002",
      category: "Articles",
      title: "The Science of Sleep",
      tags: ["sleep", "science"],
    });

    mockGetHealthResources.mockResolvedValueOnce([podcast, article]);

    // Act
    render(<ResourceCentre />);
    await screen.findByText("Mindful Moments");
    await user.click(await screen.findByRole("button", { name: "sleep" }));

    // Assert
    expect(screen.getByText("The Science of Sleep")).toBeInTheDocument();
    expect(screen.queryByText("Mindful Moments")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "sleep" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("sorts resources by oldest upload date first", async () => {
    // Arrange
    const user = userEvent.setup();
    const newerPodcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
      title: "Newer Podcast",
      date_uploaded: "2025-07-10",
    });
    const olderPodcast = createMockHealthResource({
      id: "002",
      category: "Podcasts",
      title: "Older Podcast",
      date_uploaded: "2024-07-10",
    });

    mockGetHealthResources.mockResolvedValueOnce([newerPodcast, olderPodcast]);

    // Act
    render(<ResourceCentre />);
    await user.selectOptions(
      await screen.findByRole("combobox", { name: "Sort by date" }),
      "oldest",
    );

    // Assert
    const podcastsSection = screen.getByRole("region", { name: "Podcasts" });
    const resourceHeadings = within(podcastsSection).getAllByRole("heading", {
      level: 3,
    });

    expect(resourceHeadings.map((heading) => heading.textContent)).toEqual([
      "Older Podcast",
      "Newer Podcast",
    ]);
  });
});
