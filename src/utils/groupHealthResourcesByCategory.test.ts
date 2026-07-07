import { describe, expect, it } from "vitest";
import { groupHealthResourcesByCategory } from "./groupHealthResourcesByCategory";
import type { HealthResource } from "../types/healthResource";

const createMockResource = (
  overrides: Partial<HealthResource> = {},
): HealthResource => {
  return {
    id: "001",
    category: "Podcasts",
    title: "Mindful Moments",
    thumbnail: "https://example.com/image.jpg",
    tags: ["wellbeing"],
    duration: 25,
    description: "Description",
    date_uploaded: "2025-07-10",
    ...overrides,
  };
};

const firstPodcast = createMockResource({
  id: "001",
  category: "Podcasts",
});
const firstFitness = createMockResource({ id: "002", category: "Fitness" });
const secondPodcast = createMockResource({
  id: "003",
  category: "Podcasts",
});
const firstMeditation = createMockResource({
  id: "004",
  category: "Meditation",
});
const secondFitness = createMockResource({
  id: "005",
  category: "Fitness",
});

describe("groupHealthResourcesByCategory", () => {
  it("returns an empty object when no resources are provided", () => {
    expect(groupHealthResourcesByCategory([])).toStrictEqual({});
  });

  it("does not create categories that have no resources", () => {
    expect(groupHealthResourcesByCategory([firstPodcast])).not.toHaveProperty(
      "Articles",
    );
  });

  it("groups resources by their category", () => {
    const podcast = createMockResource({ id: "001", category: "Podcasts" });
    const article = createMockResource({ id: "002", category: "Articles" });
    const secondPodcast = createMockResource({
      id: "003",
      category: "Podcasts",
    });

    expect(
      groupHealthResourcesByCategory([podcast, article, secondPodcast]),
    ).toStrictEqual({
      Articles: [article],
      Podcasts: [podcast, secondPodcast],
    });
  });

  it("keeps resources in their original order within each category", () => {
    expect(
      groupHealthResourcesByCategory([
        firstPodcast,
        firstMeditation,
        firstFitness,
        secondFitness,
        secondPodcast,
      ]),
    ).toStrictEqual({
      Fitness: [firstFitness, secondFitness],
      Meditation: [firstMeditation],
      Podcasts: [firstPodcast, secondPodcast],
    });
  });
});
