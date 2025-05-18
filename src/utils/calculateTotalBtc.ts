import { Transaction } from 'src/apis/transactionApi';

export function calculateTotalBtc(
  transactions: Transaction[],
  currency = 'BTC'
) {
  return transactions.reduce((acc, row) => {
    const amount = parseFloat(row.amount.value || '0');
    if (isNaN(amount) || row.currency.value !== currency) {
      return acc; // Skip invalid values
    }
    return acc + amount;
  }, 0);
}
