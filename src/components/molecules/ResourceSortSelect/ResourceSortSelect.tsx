export type SortOrder = "newest" | "oldest";

type ResourceSortSelectProps = {
  sortOrder: SortOrder;
  onSortOrderChange: (sortOrder: SortOrder) => void;
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
        Sort by date
      </label>
      <select
        id="resource-sort-order"
        value={sortOrder}
        onChange={(event) =>
          onSortOrderChange(event.target.value as SortOrder)
        }
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
};
