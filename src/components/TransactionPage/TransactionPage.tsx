import { useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import { useStrikeApi } from 'src/hooks/useStrikeApi';
import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Dropdown } from '../Dropdown/Dropdown';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';

export function TransactionPage() {
  const { getTransactions } = useTransactionApi();
  const [selectedData, setSelectedData] = useState([] as TransactionResponse);
  const [error, setError] = useState(null as string | null);
  // const statements = [
  //   'BTC-account-statement_2025-04-01_2025-05-01.csv',
  //   'currency-exchanges-report_2025-04-01_2025-05-01.csv',
  //   'receives-report_2025-03-01_2025-05-01.csv',
  // ];
  const { reports, statements } = useStrikeApi();
  // const originalStatements = reports?.map((report) => report.fileName) ?? [];
  const originalStatements = statements?.map((report) => report.fileName) ?? [];

  console.log('reports', reports);
  console.log('statements', statements);

  return (
    <div>
      <h2>Transaction Table</h2>
      <div>
        <Dropdown
          name="statements"
          label="Select Statement"
          styleType="block"
          options={[
            {
              key: '',
              value: '',
            },
            ...originalStatements.map((statement) => ({
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
