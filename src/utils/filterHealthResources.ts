import type { HealthResource } from "../types/healthResource";

type HealthResourceFilters = {
  selectedTag: string | null;
};

export const filterHealthResources = (
  resources: HealthResource[],
  { selectedTag }: HealthResourceFilters,
) => {
  if (!selectedTag) {
    return resources;
  }

  return resources.filter((resource) => resource.tags.includes(selectedTag));
};
