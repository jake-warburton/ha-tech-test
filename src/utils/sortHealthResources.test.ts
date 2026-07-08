import { describe, expect, it } from "vitest";
import { createMockHealthResource } from "../test/factories/createMockHealthResource";
import { sortHealthResources } from "./sortHealthResources";

describe("sortHealthResources", () => {
  it("sorts resources by newest upload date first", () => {
    const olderResource = createMockHealthResource({
      id: "001",
      date_uploaded: "2024-07-10",
    });
    const newerResource = createMockHealthResource({
      id: "002",
      date_uploaded: "2025-07-10",
    });

    expect(sortHealthResources([olderResource, newerResource], "newest"))
      .toStrictEqual([newerResource, olderResource]);
  });

  it("sorts resources by oldest upload date first", () => {
    const newerResource = createMockHealthResource({
      id: "001",
      date_uploaded: "2025-07-10",
    });
    const olderResource = createMockHealthResource({
      id: "002",
      date_uploaded: "2024-07-10",
    });

    expect(sortHealthResources([newerResource, olderResource], "oldest"))
      .toStrictEqual([olderResource, newerResource]);
  });

  it("sorts resources by category alphabetically", () => {
    const podcast = createMockHealthResource({
      id: "001",
      category: "Podcasts",
    });
    const article = createMockHealthResource({
      id: "002",
      category: "Articles",
    });
    const fitness = createMockHealthResource({
      id: "003",
      category: "Fitness",
    });

    expect(sortHealthResources([podcast, article, fitness], "category"))
      .toStrictEqual([article, fitness, podcast]);
  });

  it("does not mutate the original resources", () => {
    const olderResource = createMockHealthResource({
      id: "001",
      date_uploaded: "2024-07-10",
    });
    const newerResource = createMockHealthResource({
      id: "002",
      date_uploaded: "2025-07-10",
    });
    const resources = [olderResource, newerResource];

    sortHealthResources(resources, "newest");

    expect(resources).toStrictEqual([olderResource, newerResource]);
  });
});
