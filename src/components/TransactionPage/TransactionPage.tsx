import { useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Dropdown } from '../Dropdown/Dropdown';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';

export function TransactionPage() {
  const { getTransactions } = useTransactionApi();
  const [selectedData, setSelectedData] = useState([] as TransactionResponse);
  const [error, setError] = useState(null as string | null);
  const statements = [
    'BTC-account-statement_2025-04-01_2025-05-01.csv',
    'currency-exchanges-report_2025-04-01_2025-05-01.csv',
    'receives-report_2025-03-01_2025-05-01.csv',
  ];

  return (
    <div>
      <h2>Transaction Table</h2>
      <div>
        <Dropdown
          name="statements"
          label="Select Statement"
          options={[
            {
              key: '',
              value: '',
            },
            ...statements.map((statement) => ({
              key: statement,
              value: statement,
            })),
          ]}
          onChange={(event) => {
            const fileName = event.target.value;
            getTransactions(fileName).then((transactions) => {
              if (transactions.error) {
                setError(transactions.error);
              } else {
                setError(null);
                setSelectedData(transactions.data);
              }
            });
          }}
        />
      </div>
      {error && <div>Error: Failed to load Transactions</div>}
      <TransactionsTable data={selectedData} />
    </div>
  );
}
