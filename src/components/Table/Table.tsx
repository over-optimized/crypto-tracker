import { useMemo } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import styles from './Table.module.css';
import { createHeaderData } from './createHeaderData';
import { createRowData } from './createRowData';

type TableProps = {
  data: TransactionResponse;
  className?: string;
};

export function Table({ data }: TableProps) {
  console.log('Table data:', data);
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
      <table className={styles.table}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
