import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";
import { SelectedResourceDetails } from "../SelectedResourceDetails/SelectedResourceDetails";

export const ResourceCentre = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
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
  const groupedResources = groupHealthResourcesByCategory(filteredResources);

  return (
    <div className="space-y-10">
      {selectedResource ? (
        <SelectedResourceDetails
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      ) : null}

      <section aria-labelledby="resource-filters-heading" className="space-y-3">
        <h2
          id="resource-filters-heading"
          className="text-sm font-semibold text-slate-900"
        >
          Filter by tag
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={selectedTag === null}
            onClick={() => setSelectedTag(null)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
              selectedTag === null
                ? "bg-teal-700 text-white ring-teal-700"
                : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50"
            }`}
          >
            All
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-2 ${
                selectedTag === tag
                  ? "bg-teal-700 text-white ring-teal-700"
                  : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

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
