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
    <section aria-labelledby={headingId} className="space-y-4">
      <div className="flex items-end justify-between gap-4 border-b border-slate-200 pb-3">
        <h2 id={headingId} className="text-2xl font-semibold text-slate-950">
          {category}
        </h2>
        <p className="text-sm text-slate-500">
          {resources.length} {resources.length === 1 ? "resource" : "resources"}
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <li key={resource.id}>
            <ResourceCard resource={resource} />
          </li>
        ))}
      </ul>
    </section>
  );
};
