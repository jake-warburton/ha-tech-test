import type { HealthResourceSortOrder } from "../../../utils/sortHealthResources";

type ResourceSortSelectProps = {
  sortOrder: HealthResourceSortOrder;
  onSortOrderChange: (sortOrder: HealthResourceSortOrder) => void;
};

export const ResourceSortSelect = ({
  sortOrder,
  onSortOrderChange,
}: ResourceSortSelectProps) => {
  return (
    <div className="max-w-48 space-y-2">
      <label
        htmlFor="resource-sort-order"
        className="block text-sm font-semibold text-slate-900"
      >
        Sort resources
      </label>
      <select
        id="resource-sort-order"
        value={sortOrder}
        onChange={(event) =>
          onSortOrderChange(event.target.value as HealthResourceSortOrder)
        }
        className="w-full cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus-visible:border-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
        <option value="category">Category A-Z</option>
      </select>
    </div>
  );
};
