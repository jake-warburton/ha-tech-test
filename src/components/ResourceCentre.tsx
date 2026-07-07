import { useEffect, useState } from "react";
import { getHealthResources } from "../services/healthResources";
import type { HealthResource } from "../types/healthResource";
import { groupHealthResourcesByCategory } from "../utils/groupHealthResourcesByCategory";

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
      {Object.entries(groupedResources).map(([category, categoryResources]) => {
        const headingId = `${category.toLowerCase()}-heading`;

        return (
          <section key={category} aria-labelledby={headingId}>
            <h2 id={headingId}>{category}</h2>
            <ul>
              {categoryResources.map((resource) => (
                <li key={resource.id}>{resource.title}</li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
};
