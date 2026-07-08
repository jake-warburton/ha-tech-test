import type { HealthResource } from "../../../types/healthResource";
import { Tag } from "../../atoms/Tag/Tag";

type SelectedResourceDetailsProps = {
  resource: HealthResource;
  onClose: () => void;
};

export const SelectedResourceDetails = ({
  resource,
  onClose,
}: SelectedResourceDetailsProps) => {
  const titleId = `selected-resource-${resource.id}-title`;
  const descriptionId = `selected-resource-${resource.id}-description`;

  return (
    <div
      className="fixed inset-0 z-50 min-h-dvh overflow-y-auto bg-slate-950/50 px-4 py-6"
      data-testid="resource-details-backdrop"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center">
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className="max-h-full w-full max-w-2xl overflow-y-auto rounded-lg border border-slate-200 bg-white p-8 shadow-xl sm:p-10"
          onClick={(event) => {
            event.stopPropagation();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              onClose();
            }
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <h2 id={titleId} className="text-3xl font-semibold text-slate-950">
              {resource.title}
            </h2>
            <button
              type="button"
              className="-mt-1 cursor-pointer text-3xl leading-none text-slate-400 transition hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:ring-offset-4"
              onClick={onClose}
              aria-label="Close details"
              autoFocus
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <img
            src={resource.thumbnail}
            alt={`${resource.title} thumbnail`}
            className="mt-8 aspect-video w-full rounded-md object-cover"
          />
          <p
            id={descriptionId}
            className="mt-6 text-base leading-7 text-slate-600"
          >
            {resource.description}
          </p>
          <dl className="mt-8 grid gap-6 border-t border-slate-200 pt-6 text-sm text-slate-600 sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-slate-950">Resource ID</dt>
              <dd>{resource.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Date uploaded</dt>
              <dd>{resource.date_uploaded}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Category</dt>
              <dd>{resource.category}</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-950">Time</dt>
              <dd>{resource.duration} min</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-slate-950">Tags</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <Tag key={tag} label={tag} />
                ))}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
};
