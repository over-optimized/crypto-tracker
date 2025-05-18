import { useMemo, useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import { TransactionTableControls } from '../TransactionTableControls/TransactionTableControls';
import styles from './Table.module.css';
import { createHeaderData } from './createHeaderData';
import { createRowData } from './createRowData';

type TableProps = {
  data: TransactionResponse;
  className?: string;
};

export function Table({ data }: TableProps) {
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
      <p># Transactions: {data.length}</p>
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
