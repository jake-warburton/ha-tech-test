import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";

export const ResourceCentre = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);
  const [selectedResource, setSelectedResource] =
    useState<HealthResource | null>(null);

  useEffect(() => {
    const loadResources = async () => {
      const healthResources = await getHealthResources();

      setResources(healthResources);
    };

    void loadResources();
  }, []);

  const groupedResources = groupHealthResourcesByCategory(resources);

  return (
    <div className="space-y-10">
      {selectedResource ? (
        <section
          aria-label="Selected resource details"
          className="rounded-lg border border-teal-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase text-teal-700">
            Selected resource
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">
            {selectedResource.title}
          </h2>
          <p className="mt-3 text-slate-600">{selectedResource.description}</p>
          <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-950">Date uploaded</dt>
              <dd>{selectedResource.date_uploaded}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Category</dt>
              <dd>{selectedResource.category}</dd>
            </div>
          </dl>
        </section>
      ) : null}

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
