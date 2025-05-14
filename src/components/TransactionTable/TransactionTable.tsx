import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Table } from '../Table/Table';

export function TransactionTable() {
  const { state } = useTransactionApi();
  return (
    <div>
      <h2>Transaction Table</h2>
      <Table data={state.transactions} />
    </div>
  );
}
