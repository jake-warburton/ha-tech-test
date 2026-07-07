import type { HealthResource } from "../../../types/healthResource";
import { ResourceCard } from "../../molecules/ResourceCard/ResourceCard";

type ResourceCategorySectionProps = {
  category: string;
  resources: HealthResource[];
};

export const ResourceCategorySection = ({
  category,
  resources,
}: ResourceCategorySectionProps) => {
  const headingId = `${category.toLowerCase()}-heading`;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>{category}</h2>
      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
};
