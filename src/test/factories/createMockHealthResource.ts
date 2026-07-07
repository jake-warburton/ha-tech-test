import type { HealthResource } from "../../types/healthResource";

export const createMockHealthResource = (
  overrides: Partial<HealthResource> = {},
): HealthResource => ({
  id: "001",
  category: "Podcasts",
  title: "Mindful Moments",
  thumbnail: "https://example.com/image.jpg",
  tags: ["wellbeing"],
  duration: 25,
  description: "Description",
  date_uploaded: "2025-07-10",
  ...overrides,
});
