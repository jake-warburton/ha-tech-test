type TagProps = {
  label: string;
};

export const Tag = ({ label }: TagProps) => {
  return <span>{label}</span>;
};
