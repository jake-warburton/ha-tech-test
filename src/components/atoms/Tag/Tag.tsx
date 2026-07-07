type TagProps = {
  label: string;
};

export const Tag = ({ label }: TagProps) => {
  return (
    <span className="inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-200">
      {label}
    </span>
  );
};
