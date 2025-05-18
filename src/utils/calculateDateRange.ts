import { Transaction } from 'src/components/TransactionsTable/types';

export function calculateDateRange(
  transactions: Transaction[],
  locale?: string | string[]
) {
  if (transactions.length === 0) return '';
  const validDates = transactions
    .map((row) => new Date(row.time?.value || ''))
    .filter((date) => !isNaN(date.getTime()));

  if (validDates.length === 0) return '';

  const dateFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  const startDate = new Date(
    Math.min(...validDates.map((date) => date.getTime()))
  ).toLocaleDateString(locale, dateFormatOptions);
  const endDate = new Date(
    Math.max(...validDates.map((date) => date.getTime()))
  ).toLocaleDateString(locale, dateFormatOptions);
  return `${startDate} - ${endDate}`;
}
