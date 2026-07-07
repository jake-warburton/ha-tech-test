import type { HealthResource } from "../types/healthResource";

export type GroupedHealthResources = Record<string, HealthResource[]>;

export function groupHealthResourcesByCategory(
  resources: HealthResource[],
): GroupedHealthResources {
  return resources.reduce<GroupedHealthResources>((groups, resource) => {
    const category = resource.category;

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(resource);

    return groups;
  }, {});
}
