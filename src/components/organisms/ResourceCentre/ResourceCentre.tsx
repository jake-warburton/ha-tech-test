import { useEffect, useState } from "react";
import { getHealthResources } from "../../../services/healthResources";
import type { HealthResource } from "../../../types/healthResource";
import { groupHealthResourcesByCategory } from "../../../utils/groupHealthResourcesByCategory";
import { ResourceCategorySection } from "../ResourceCategorySection/ResourceCategorySection";

export const ResourceCentre = () => {
  const [resources, setResources] = useState<HealthResource[]>([]);

  useEffect(() => {
    const loadResources = async () => {
      const healthResources = await getHealthResources();

      setResources(healthResources);
    };

    void loadResources();
  }, []);

  const groupedResources = groupHealthResourcesByCategory(resources);

  return (
    <main>
      {Object.entries(groupedResources).map(([category, categoryResources]) => (
        <ResourceCategorySection
          key={category}
          category={category}
          resources={categoryResources}
        />
      ))}
    </main>
  );
};
