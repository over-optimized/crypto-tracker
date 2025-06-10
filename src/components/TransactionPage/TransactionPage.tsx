import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { JsonMapper, statementApi } from 'src/apis/statementApi';
import { strikeApi } from 'src/apis/strikeApi';
import { Dropdown } from '../Dropdown/Dropdown';
import { TransactionsTable } from '../TransactionsTable/TransactionsTable';

export function TransactionPage() {
  const [selectedStatement, setSelectedStatement] = useState('');

  const {
    data: stikeData,
    isLoading,
    error,
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

  const statements = JsonMapper.parse(statementsData ?? []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
      <TransactionsTable data={statements} />
    </div>
  );
}
