import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Table } from '../Table/Table';

export function TransactionTable() {
  const { state } = useTransactionApi();
  return (
    <div>
      <Table data={state.transactions} />
    </div>
  );
}
