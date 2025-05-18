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
  const [state] = useState({
    controls: {
      currency: '',
      transactionType: '',
      status: '',
    },
  });
  // console.log('Table data:', data);
  const headers = createHeaderData(data[0]);
  const rows = useMemo(
    () =>
      data.map((rowData) => (
        <tr key={rowData.transactionId.value}>{createRowData(rowData)}</tr>
      )),
    [data]
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
          state.controls[name] = value;
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
