type DropdownProps = {
  name: string;
  label: string;
  value?: string;
  options: {
    key: string;
    value: string;
  }[];
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function Dropdown({
  name,
  label,
  value,
  options,
  className,
  onChange,
}: DropdownProps) {
  return (
    <div className={className}>
      <label>
        <span>{label} </span>
        <select name={name} id={name} value={value} onChange={onChange}>
          <option value=""></option>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.key}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
