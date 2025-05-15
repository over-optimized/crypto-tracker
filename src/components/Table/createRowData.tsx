import { Transaction } from 'src/apis/transactionApi';
import { headerOrder } from './createHeaderData';
import { TransactionKey } from './types';

export function createRowData(transaction: Transaction) {
  const id = transaction.transactionId.value;
  if (!transaction) {
    return [];
  }

  return headerOrder.map((key) => {
    const value = transaction[key as TransactionKey].value;
    return (
      <td key={`${key}-${id}`}>
        {typeof value === 'object' ? JSON.stringify(value) : value}
      </td>
    );
  });
}
