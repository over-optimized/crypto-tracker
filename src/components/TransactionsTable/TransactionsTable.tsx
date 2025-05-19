import { useCallback, useEffect, useMemo, useState } from 'react';
import { TransactionResponse } from 'src/apis/transactionApi';
import { paginate } from 'src/utils/paginate';
import { TransactionTableControls } from '../TransactionTableControls/TransactionTableControls';
import { TransactionsSummary } from '../TransactionsSummary/TransactionsSummary';
import styles from './TransactionsTable.module.css';
import { createHeaderData } from './createHeaderData';
import { createRowData } from './createRowData';
import { Transaction } from './types';

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
    pageInfo: {
      paginatedItems: [] as Transaction[],
      currentPage: 0,
      totalPages: 0,
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
  console.log('Filtered Data:', filteredData);
  const headers = createHeaderData(data[0]);

  const rows = useMemo(
    () =>
      state.pageInfo.paginatedItems.map((rowData) => (
        <tr key={rowData.transactionId.value}>{createRowData(rowData)}</tr>
      )),
    [state.pageInfo.paginatedItems]
  );

  const changePage = useCallback(
    (direction: 'back' | 'next') => {
      const pageNumber =
        state.pageInfo.currentPage + (direction === 'back' ? -1 : 1);

      const pageInfo = paginate(filteredData, pageNumber, 10);
      console.log('Page Info:', pageInfo);
      setState((prevState) => ({
        ...prevState,
        pageInfo: {
          ...pageInfo,
        },
      }));
    },
    [filteredData, state]
  );

  useEffect(() => {
    const pageInfo = paginate(filteredData, 1, 10);
    setState((prevState) => ({
      ...prevState,
      pageInfo: {
        ...pageInfo,
      },
    }));
  }, [filteredData]);

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
      <div className={`${styles.pagination} mt-2 mb-2`}>
        <div>
          <button onClick={() => changePage('back')}>&lt; Back</button>
        </div>
        <div className="ml-2 mr-2">
          Page {state.pageInfo.currentPage} of {state.pageInfo.totalPages}
        </div>
        <div>
          <button onClick={() => changePage('next')}>&gt; Next</button>
        </div>
      </div>
    </div>
  );
}
