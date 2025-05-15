import { Transaction } from 'src/apis/transactionApi';
import { TransactionKey } from './types';

export const headerOrder = [
  'currency',
  'amount',
  'exchangeRate',
  'feeAmount',
  'transactionType',
  'transactionId',
  'time',
  'status',
];

export function createHeaderData(transaction: Transaction) {
  if (!transaction) {
    return [];
  }
  return headerOrder.map((key) => (
    <th key={key}>{transaction[key as TransactionKey].label}</th>
  ));
}
