import { afterEach, describe, expect, it, vi } from "vitest";
import { getHealthResources } from "./healthResources";

describe("getHealthResources", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches health resources from the mock endpoint", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "001",
          category: "Podcasts",
          title: "Mindful Moments",
          thumbnail: "https://example.com/image.jpg",
          tags: ["wellbeing", "mindfulness", "relaxation"],
          duration: 25,
          description:
            "A calming podcast focused on mindfulness techniques for daily life.",
          date_uploaded: "2025-07-10",
        },
      ],
    } as Response);

    const resources = await getHealthResources();

    expect(fetch).toHaveBeenCalledWith("/data/mockData.json");
    expect(resources).toHaveLength(1);
    expect(resources[0]).toMatchObject({
      id: "001",
      category: "Podcasts",
      title: "Mindful Moments",
    });
  });

  it("throws an error when the request fails", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
    } as Response);

    await expect(getHealthResources()).rejects.toThrow(
      "Failed to fetch health resources",
    );
  });
});
