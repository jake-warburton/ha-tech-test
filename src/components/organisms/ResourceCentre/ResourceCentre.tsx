import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import { ResourceTagFilters } from "../../molecules/ResourceTagFilters/ResourceTagFilters";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";
import { SelectedResourceDetails } from "../SelectedResourceDetails/SelectedResourceDetails";

type SortOrder = "newest" | "oldest";

export const ResourceCentre = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [selectedResource, setSelectedResource] =
    useState<HealthResource | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      const healthResources = await getHealthResources();

      setResources(healthResources);
    };

    void loadResources();
  }, []);

  const tags = Array.from(
    new Set(resources.flatMap((resource) => resource.tags)),
  );
  const filteredResources = selectedTag
    ? resources.filter((resource) => resource.tags.includes(selectedTag))
    : resources;
  const sortedResources = [...filteredResources].sort((first, second) => {
    const firstDate = new Date(first.date_uploaded).getTime();
    const secondDate = new Date(second.date_uploaded).getTime();

    return sortOrder === "newest"
      ? secondDate - firstDate
      : firstDate - secondDate;
  });
  const groupedResources = groupHealthResourcesByCategory(sortedResources);

  return (
    <div className="space-y-10">
      {selectedResource ? (
        <SelectedResourceDetails
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      ) : null}

      <ResourceTagFilters
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />

      <div className="max-w-48 space-y-2">
        <label
          htmlFor="resource-sort-order"
          className="block text-sm font-semibold text-slate-900"
        >
          Sort by date
        </label>
        <select
          id="resource-sort-order"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <ResourceCategorySection
          key={category}
          category={category}
          resources={categoryResources}
          onResourceSelect={setSelectedResource}
        />
      ))}
    </div>
  );
};
