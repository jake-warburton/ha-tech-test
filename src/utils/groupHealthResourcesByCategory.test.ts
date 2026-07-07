import { describe, expect, it } from "vitest";
import { groupHealthResourcesByCategory } from "./groupHealthResourcesByCategory";
import { createMockHealthResource } from "../test/factories/createMockHealthResource";

const firstPodcast = createMockHealthResource({
  id: "001",
  category: "Podcasts",
});
const firstFitness = createMockHealthResource({
  id: "002",
  category: "Fitness",
});
const secondPodcast = createMockHealthResource({
  id: "003",
  category: "Podcasts",
});
const firstMeditation = createMockHealthResource({
  id: "004",
  category: "Meditation",
});
const secondFitness = createMockHealthResource({
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
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
    });
    const article = createMockHealthResource({
      id: "002",
      category: "Articles",
    });
    const secondPodcast = createMockHealthResource({
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
