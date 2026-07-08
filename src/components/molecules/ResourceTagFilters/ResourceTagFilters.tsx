type ResourceTagFiltersProps = {
  tags: string[];
  selectedTag: string | null;
  onTagSelect: (tag: string | null) => void;
};

const getFilterButtonClassName = (isSelected: boolean) =>
  `cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 ${
    isSelected
      ? "bg-teal-700 text-white ring-teal-700"
      : "bg-white text-slate-700 ring-slate-300 hover:bg-slate-50"
  }`;

export const ResourceTagFilters = ({
  tags,
  selectedTag,
  onTagSelect,
}: ResourceTagFiltersProps) => {
  return (
    <section aria-labelledby="resource-filters-heading" className="space-y-3">
      <p
        id="resource-filters-heading"
        className="text-sm font-semibold text-slate-900"
      >
        Filter by tag
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={selectedTag === null}
          onClick={() => onTagSelect(null)}
          className={getFilterButtonClassName(selectedTag === null)}
        >
          All
        </button>

        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={selectedTag === tag}
            onClick={() => onTagSelect(tag)}
            className={getFilterButtonClassName(selectedTag === tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};
