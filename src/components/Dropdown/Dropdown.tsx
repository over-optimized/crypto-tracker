type DropdownProps = {
  name: string;
  label: string;
  value?: string;
  styleType?: 'inline' | 'block';
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
  styleType = 'inline',
  className,
  onChange,
}: DropdownProps) {
  return (
    <div className={className}>
      <label>
        <span className={styleType === 'inline' ? 'd-inline' : 'd-block'}>
          {label}{' '}
        </span>
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          data-testid={name}
        >
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
