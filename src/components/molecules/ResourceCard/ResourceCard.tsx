import type { HealthResource } from "../../../types/healthResource";

type ResourceCardProps = {
  resource: HealthResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const visibleTags = resource.tags.slice(0, 3);

  return (
    <article>
      <img src={resource.thumbnail} alt={`${resource.title} thumbnail`} />
      <h3>{resource.title}</h3>
      <ul>
        {visibleTags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <p>{resource.duration} min</p>
    </article>
  );
};
