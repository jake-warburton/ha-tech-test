import { describe, expect, it } from "vitest";
import { createMockHealthResource } from "../test/factories/createMockHealthResource";
import { filterHealthResources } from "./filterHealthResources";

describe("filterHealthResources", () => {
  it("returns all resources when no tag is selected", () => {
    const podcast = createMockHealthResource({
      id: "001",
      tags: ["wellbeing"],
    });
    const article = createMockHealthResource({
      id: "002",
      tags: ["sleep"],
    });

    expect(
      filterHealthResources([podcast, article], { selectedTag: null }),
    ).toStrictEqual([podcast, article]);
  });

  it("returns resources with the selected tag", () => {
    const podcast = createMockHealthResource({
      id: "001",
      tags: ["wellbeing", "mindfulness"],
    });
    const article = createMockHealthResource({
      id: "002",
      tags: ["sleep", "science"],
    });
    const meditation = createMockHealthResource({
      id: "003",
      tags: ["sleep", "relaxation"],
    });

    expect(
      filterHealthResources([podcast, article, meditation], {
        selectedTag: "sleep",
      }),
    ).toStrictEqual([article, meditation]);
  });

  it("keeps resources in their original order", () => {
    const firstResource = createMockHealthResource({
      id: "001",
      tags: ["sleep"],
    });
    const secondResource = createMockHealthResource({
      id: "002",
      tags: ["sleep"],
    });

    expect(
      filterHealthResources([firstResource, secondResource], {
        selectedTag: "sleep",
      }),
    ).toStrictEqual([firstResource, secondResource]);
  });
});
