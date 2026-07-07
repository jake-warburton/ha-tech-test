import type { HealthResource } from "../types/healthResource";

export async function getHealthResources(): Promise<HealthResource[]> {
  const response = await fetch("/data/mockData.json");

  if (!response.ok) {
    throw new Error("Failed to fetch health resources");
  }

  return response.json();
}
