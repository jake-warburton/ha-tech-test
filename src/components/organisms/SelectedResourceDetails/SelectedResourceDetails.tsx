import type { HealthResource } from "../../../types/healthResource";

type SelectedResourceDetailsProps = {
  resource: HealthResource;
};

export const SelectedResourceDetails = ({
  resource,
}: SelectedResourceDetailsProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Selected resource details"
        className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg border border-teal-200 bg-white p-5 shadow-xl"
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
    </div>
  );
};
