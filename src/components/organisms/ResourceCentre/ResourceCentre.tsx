import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";
import { SelectedResourceDetails } from "../SelectedResourceDetails/SelectedResourceDetails";

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
        <SelectedResourceDetails resource={selectedResource} />
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
