import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';

export function TransactionPage() {
  const { response } = useTransactionApi();

  return (
    <div>
      <h2>Transaction Table</h2>
      {response.error && <div>Error: Failed to load Transactions</div>}
      <TransactionsTable data={response.transactions} />
    </div>
  );
}
