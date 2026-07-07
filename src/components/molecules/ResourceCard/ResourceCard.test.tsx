import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMockHealthResource } from "../../../test/factories/createMockHealthResource";
import { ResourceCard } from "./ResourceCard";

describe("ResourceCard", () => {
  it("renders a resource summary card", () => {
    // Arrange
    const resource = createMockHealthResource({
      title: "Mindful Moments",
      thumbnail: "https://example.com/mindful-moments.jpg",
      tags: ["wellbeing", "mindfulness", "relaxation", "extra"],
      duration: 25,
    });

    // Act
    render(<ResourceCard resource={resource} />);

    // Assert
    expect(
      screen.getByRole("heading", { name: "Mindful Moments" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Mindful Moments thumbnail" }),
    ).toHaveAttribute("src", "https://example.com/mindful-moments.jpg");
    expect(screen.getByText("wellbeing")).toBeInTheDocument();
    expect(screen.getByText("mindfulness")).toBeInTheDocument();
    expect(screen.getByText("relaxation")).toBeInTheDocument();
    expect(screen.queryByText("extra")).not.toBeInTheDocument();
    expect(screen.getByText("25 min")).toBeInTheDocument();
  });
});
