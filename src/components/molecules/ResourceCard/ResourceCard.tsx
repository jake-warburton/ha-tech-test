import type { HealthResource } from "../../../types/healthResource";
import { Tag } from "../../atoms/Tag/Tag";

const MAX_VISIBLE_TAGS = 3;

type ResourceCardProps = {
  resource: HealthResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  const visibleTags = resource.tags.slice(0, MAX_VISIBLE_TAGS);

  return (
    <article>
      <img src={resource.thumbnail} alt={`${resource.title} thumbnail`} />
      <h3>{resource.title}</h3>
      <ul>
        {visibleTags.map((tag) => (
          <li key={tag}>
            <Tag label={tag} />
          </li>
        ))}
      </ul>
      <p>{resource.duration} min</p>
    </article>
  );
};
