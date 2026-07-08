import type { HealthResource } from "../types/healthResource";

export type HealthResourceSortOrder = "newest" | "oldest" | "category";

const getUploadTime = (resource: HealthResource) =>
  new Date(resource.date_uploaded).getTime();

export const sortHealthResources = (
  resources: HealthResource[],
  sortOrder: HealthResourceSortOrder,
) => {
  return [...resources].sort((first, second) => {
    if (sortOrder === "category") {
      return first.category.localeCompare(second.category);
    }

    const firstDate = getUploadTime(first);
    const secondDate = getUploadTime(second);

    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });
};
