import { Transaction } from 'src/apis/transactionApi';

export function calculateAveragePrice(transactions: Transaction[]) {
  const totalPrice = transactions.reduce((acc, row) => {
    const price = parseFloat(row.exchangeRate.value || '0');
    const amount = parseFloat(row.amount.value || '0');
    if (isNaN(price) || isNaN(amount)) {
      return acc; // Skip invalid values
    }
    return acc + price * amount;
  }, 0);
  const totalAmount = transactions.reduce((acc, row) => {
    const amount = parseFloat(row.amount.value || '0');
    return isNaN(amount) ? acc : acc + amount;
  }, 0);
  const total = totalAmount > 0 ? totalPrice / totalAmount : 0;
  // limit to 2 decimal places
  return parseFloat(total.toFixed(2));
}
