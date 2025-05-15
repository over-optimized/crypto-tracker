import { useMemo, useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
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
      <div className={styles.tableControls}>
        <div className="ml-4">
          <label>
            <span>Currency </span>
            <select
              name="currency-dropdown"
              id="currency-dropdown"
              value={state.controls.currency}
            >
              <option value=""></option>
              <option value="btc">BTC</option>
            </select>
          </label>
        </div>
        <div className="ml-4">
          <label>
            <span>Transaction type </span>
            <select
              name="transaction-type-dropdown"
              id="transaction-type-dropdown"
              value={state.controls.transactionType}
            >
              <option value=""></option>
              <option value="exchange">Exchange</option>
              <option value="on-chain">On-Chain</option>
            </select>
          </label>
        </div>
        <div className="ml-4">
          <label>
            <span>Status </span>
            <select
              name="transaction-status-dropdown"
              id="transaction-status-dropdown"
              value={state.controls.status}
            >
              <option value=""></option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
