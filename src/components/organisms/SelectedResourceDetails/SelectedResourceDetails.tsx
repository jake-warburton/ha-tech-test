import type { HealthResource } from "../../../types/healthResource";

type SelectedResourceDetailsProps = {
  resource: HealthResource;
};

export const SelectedResourceDetails = ({
  resource,
}: SelectedResourceDetailsProps) => {
  return (
    <section
      aria-label="Selected resource details"
      className="rounded-lg border border-teal-200 bg-white p-5 shadow-sm"
    >
      <p className="text-sm font-semibold uppercase text-teal-700">
        Selected resource
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-slate-950">
        {resource.title}
      </h2>
      <p className="mt-3 text-slate-600">{resource.description}</p>
      <dl className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-slate-950">Date uploaded</dt>
          <dd>{resource.date_uploaded}</dd>
        </div>
        <div>
          <dt className="font-semibold text-slate-950">Category</dt>
          <dd>{resource.category}</dd>
        </div>
      </dl>
    </section>
  );
};
