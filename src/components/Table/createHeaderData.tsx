import { Transaction } from 'src/apis/transactionApi';

export function createHeaderData(transaction: Transaction) {
  if (!transaction) {
    return [];
  }
  return [
    <th key="amount">{transaction.amount.label}</th>,
    <th key="feeAmount">{transaction.feeAmount.label}</th>,
    <th key="transactionType">{transaction.transactionType.label}</th>,
    <th key="exchangeRate">{transaction.exchangeRate.label}</th>,
    <th key="transactionId">{transaction.transactionId.label}</th>,
    <th key="time">{transaction.time.label}</th>,
  ];
}
