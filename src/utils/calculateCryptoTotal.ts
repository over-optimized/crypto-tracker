import { Transaction } from 'src/components/TransactionsTable/types';

export function calculateCryptoTotal(
  transactions: Transaction[],
  currency: string
): number {
  return transactions
    .filter((transaction) => transaction.currency.value === currency)
    .reduce((acc, transaction) => {
      const amount = parseFloat(transaction.amount.value);
      const rate = parseFloat(transaction.exchangeRate.value);
      const fee = parseFloat(transaction.feeAmount.value);
      const total = amount * rate - fee;
      return acc + total;
    }, 0);
}
