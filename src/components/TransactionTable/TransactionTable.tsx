import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Table } from '../Table/Table';

export function TransactionTable() {
  const { response } = useTransactionApi();

  return (
    <div>
      <h2>Transaction Table</h2>
      {response.error && <div>Error: Failed to load Transactions</div>}
      <Table data={response.transactions} />
    </div>
  );
}
