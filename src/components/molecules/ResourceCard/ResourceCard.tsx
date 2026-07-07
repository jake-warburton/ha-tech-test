import type { HealthResource } from "../../../types/healthResource";

type ResourceCardProps = {
  resource: HealthResource;
};

export const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <article>
      <h3>{resource.title}</h3>
    </article>
  );
};
