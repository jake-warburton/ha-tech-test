import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import {
  sortHealthResources,
  type HealthResourceSortOrder,
} from "../../../utils/sortHealthResources";
import { ResourceSortSelect } from "../../molecules/ResourceSortSelect/ResourceSortSelect";
import { ResourceTagFilters } from "../../molecules/ResourceTagFilters/ResourceTagFilters";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";
import { SelectedResourceDetails } from "../SelectedResourceDetails/SelectedResourceDetails";

export const ResourceCentre = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] =
    useState<HealthResourceSortOrder>("newest");
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
  const sortedResources = sortHealthResources(filteredResources, sortOrder);
  const groupedResources = groupHealthResourcesByCategory(sortedResources);
  const groupedResourceEntries = Object.entries(groupedResources);

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

      <ResourceSortSelect
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
      />

      {groupedResourceEntries.map(([category, categoryResources]) => (
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
