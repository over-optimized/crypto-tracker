import { formatCurrency } from 'src/utils/formatCurrency';
import { headerOrder } from './createHeaderData';
import { Transaction, TransactionKey } from './types';

export function createRowData(transaction: Transaction) {
  const id = transaction.transactionId.value;
  if (!transaction) {
    return [];
  }

  return headerOrder.map((key) => {
    const value = transaction[key as TransactionKey].value;
    let formattedValue = value;
    if (key === 'exchangeRate') {
      formattedValue =
        value === '' ? 'N/A' : formatCurrency(parseFloat(value), 'USD');
    } else if (key === 'amount') {
      formattedValue = parseFloat(value).toFixed(8);
    }

    return (
      <td key={`${key}-${id}`}>
        {typeof value === 'object' ? JSON.stringify(value) : formattedValue}
      </td>
    );
  });
}
