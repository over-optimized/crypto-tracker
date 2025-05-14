import { Transaction } from 'src/apis/transactionApi';

export function createRowData(transaction: Transaction) {
  const id = transaction.transactionId.value;
  return [
    <td key={`amount-${id}`}>{transaction.amount.value}</td>,
    <td key={`feeAmount-${id}`}>{transaction.feeAmount.value}</td>,
    <td key={`transactionType-${transaction.transactionId}`}>
      {transaction.transactionType.value}
    </td>,
    <td key={`exchangeRate-${transaction.transactionId}`}>
      {transaction.exchangeRate.value}
    </td>,
    <td key={`transactionId-${transaction.transactionId}`}>
      {transaction.transactionId.value}
    </td>,
    <td key={`time-${transaction.transactionId}`}>{transaction.time.value}</td>,
  ];
}
