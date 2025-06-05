import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { statementApi } from 'src/apis/statementApi';
import { strikeApi } from 'src/apis/strikeApi';
import { TransactionResponse } from 'src/apis/transactionApi';
import { Dropdown } from '../Dropdown/Dropdown';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';

export function TransactionPage() {
  // const { getTransactions } = useTransactionApi();
  const [selectedData, setSelectedData] = useState([] as TransactionResponse);
  const [error, setError] = useState(null as string | null);
  const [selectedStatement, setSelectedStatement] = useState('');

  const {
    data: stikeData,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['strikeData'],
    queryFn: strikeApi,
  });
  const statementOptions =
    stikeData?.statements.map((statement) => statement.fileName) ?? [];
  console.log('statement options', statementOptions);

  const { data: statementsData } = useQuery({
    queryKey: ['statementData', selectedStatement],
    queryFn: () => statementApi({ fileName: selectedStatement }),
    enabled: !!selectedStatement, // Only run the query if a statement is selected
  });

  console.log('statementsData', statementsData);
  // const { data, isLoading, error } = useQuery([''], strikeApi);

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
            ...statementOptions.map((statement) => ({
              key: statement,
              value: statement,
            })),
          ]}
          onChange={(event) => {
            const fileName = event.target.value;
            setSelectedStatement(fileName);
            // getTransactions(fileName).then((transactions) => {
            //   if (transactions.error) {
            //     setError(transactions.error);
            //   } else {
            //     setError(null);
            //     setSelectedData(transactions.data);
            //   }
            // });
          }}
        />
      </div>
      {error && <div>Error: Failed to load Transactions</div>}
      <TransactionsTable data={statementsData ?? []} />
    </div>
  );
}
