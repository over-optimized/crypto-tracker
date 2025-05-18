import { useMemo, useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import { TransactionTableControls } from '../TransactionTableControls/TransactionTableControls';
import { TransactionsSummary } from '../TransactionsSummary/TransactionsSummary';
import styles from './TransactionsTable.module.css';
import { createHeaderData } from './createHeaderData';
import { createRowData } from './createRowData';

type TransactionsTableProps = {
  data: TransactionResponse;
  className?: string;
};

export function TransactionsTable({ data }: TransactionsTableProps) {
  const [state, setState] = useState({
    controls: {
      currency: '',
      transactionType: '',
      status: '',
    },
  });
  const filteredData = useMemo(
    () =>
      data
        .filter((row) => row.transactionId && row.transactionId.value !== '') // Filter out invalid transactions
        .filter((row) =>
          state.controls.transactionType
            ? row.transactionType.value === state.controls.transactionType
            : true
        )
        .filter((row) =>
          state.controls.status
            ? row.status.value === state.controls.status
            : true
        )
        .filter((row) =>
          state.controls.currency
            ? row.currency.value === state.controls.currency
            : true
        ),
    [data, state.controls]
  );
  console.log('Filtered Data:', filteredData);
  const headers = createHeaderData(data[0]);
  const rows = useMemo(
    () =>
      filteredData.map((rowData) => (
        <tr key={rowData.transactionId.value}>{createRowData(rowData)}</tr>
      )),
    [filteredData]
  );

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <TransactionsSummary transactions={data} />
      <TransactionTableControls
        className={styles.tableControls}
        state={{ ...state.controls }}
        onChange={({ name, value }) => {
          // Don't mutate state directly, let setState handle it
          setState((state) => ({
            ...state,
            controls: { ...state.controls, [name]: value },
          }));
        }}
      />
      <table className={styles.table}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
