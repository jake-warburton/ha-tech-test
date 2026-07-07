import type { HealthResource } from "../../../types/healthResource";
import { Tag } from "../../atoms/Tag/Tag";

const MAX_VISIBLE_TAGS = 3;

type ResourceCardProps = {
  resource: HealthResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const visibleTags = resource.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-teal-300 hover:shadow-md">
      <img
        src={resource.thumbnail}
        alt={`${resource.title} thumbnail`}
        className="aspect-video w-full object-cover"
        loading="lazy"
      />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-950">
            {resource.title}
          </h3>
          <p className="text-sm font-medium text-teal-700">
            {resource.duration} min
          </p>
        </div>
        <ul className="flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <li key={tag}>
              <Tag label={tag} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
