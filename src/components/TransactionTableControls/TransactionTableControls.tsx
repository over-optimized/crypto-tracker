import { Dropdown } from '../Dropdown/Dropdown';

type ControlState = {
  currency: string;
  transactionType: string;
  status: string;
};
type TransactionTableControlsProps = {
  className?: string;
  state: ControlState;
  onChange?: (event: { name: string; value: string }) => void;
};
export function TransactionTableControls({
  className,
  state,
  onChange,
}: TransactionTableControlsProps) {
  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      const label = event.target.options[event.target.selectedIndex].text;
      onChange({
        name: event.target.name,
        value: label,
      });
    }
  };
  return (
    <div className={className}>
      <Dropdown
        name="currencyDropdown"
        label="Currency"
        value={state.currency}
        options={[
          { key: '', value: '' },
          { key: 'BTC', value: 'BTC' },
          { key: 'ETH', value: 'ETH' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
      <Dropdown
        name="transactionTypeDropdown"
        label="Transaction Type"
        value={state.transactionType}
        options={[
          { key: '', value: '' },
          { key: 'Exchange', value: 'Exchange' },
          { key: 'On-Chain', value: 'On-Chain' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
      <Dropdown
        name="transactionStatusDropdown"
        label="Status"
        value={state.status}
        options={[
          { key: '', value: '' },
          { key: 'Completed', value: 'Completed' },
          { key: 'Pending', value: 'Pending' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
    </div>
  );
}
