import { Dropdown } from '../Dropdown/Dropdown';

type ControlState = {
  currency: string;
  transactionType: string;
  status: string;
};
type TransactionTableControlsProps = {
  className?: string;
  state: ControlState;
  onChange?: (event: { name: keyof ControlState; value: string }) => void;
};
export function TransactionTableControls({
  className,
  state,
  onChange,
}: TransactionTableControlsProps) {
  const onDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    console.log('Dropdown changed:', name, value);
    if (onChange) {
      onChange({
        name: name as keyof ControlState,
        value,
      });
    }
  };
  return (
    <div className={className}>
      <Dropdown
        name="currency-dropdown"
        label="Currency"
        value={state.currency}
        options={[
          { key: '', value: '' },
          { key: 'BTC', value: 'btc' },
          { key: 'ETH', value: 'eth' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
      <Dropdown
        name="transaction-type-dropdown"
        label="Transaction Type"
        value={state.transactionType}
        options={[
          { key: '', value: '' },
          { key: 'Exchange', value: 'exchange' },
          { key: 'On-Chain', value: 'on-chain' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
      <Dropdown
        name="transaction-status-dropdown"
        label="Status"
        value={state.status}
        options={[
          { key: '', value: '' },
          { key: 'Completed', value: 'completed' },
          { key: 'Pending', value: 'pending' },
        ]}
        className="ml-4"
        onChange={onDropdownChange}
      />
    </div>
  );
}
