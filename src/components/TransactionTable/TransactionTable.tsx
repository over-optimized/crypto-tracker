import { useTransactionApi } from 'src/hooks/useTransactionApi';
import { Table } from '../Table/Table';
import styles from './TransactionTable.module.css';

export function TransactionTable() {
  const { state } = useTransactionApi();
  return (
    <div>
      <Table className={styles.table} data={state.transactions} />
    </div>
  );
}
