import { useMemo, useState } from 'react';
import { calculateAveragePrice } from 'src/utils/calculateAveragePrice';
import { calculateDateRange } from 'src/utils/calculateDateRange';
import { calculateTotalBtc } from 'src/utils/calculateTotalBtc';
import { formatCurrency } from 'src/utils/formatCurrency';
import { Transaction } from '../TransactionsTable/types';
import styles from './TransactionsSummary.module.css';

type TransactionsSummaryProps = {
  transactions: Transaction[];
};
export function TransactionsSummary({
  transactions,
}: TransactionsSummaryProps) {
  const totalTransactions = useMemo(
    () => transactions.length,
    [transactions.length]
  );

  const dateRange = useMemo(
    () => calculateDateRange(transactions),
    [transactions]
  );

  const totalBtc = useMemo(
    () => calculateTotalBtc(transactions),
    [transactions]
  );

  const averageBtcPrice = useMemo(() => {
    const btcTransactions = transactions.filter(
      (row) =>
        row.currency.value === 'BTC' && row.transactionType.value === 'Exchange'
    );
    return calculateAveragePrice(btcTransactions);
  }, [transactions]);

  const totalBtcSent = useMemo(
    () =>
      transactions.reduce((acc, row) => {
        const amount = parseFloat(row.amount.value || '0');
        const isSent =
          row.transactionType.value === 'On-Chain' &&
          row.currency.value === 'BTC';
        return isNaN(amount) || !isSent ? acc : acc + amount;
      }, 0),
    [transactions]
  );

  const averageBtcPriceFormatted = useMemo(
    () => formatCurrency(averageBtcPrice, 'USD'),
    [averageBtcPrice]
  );

  const [showBtc, setShowBtc] = useState(false);

  return (
    <div>
      <table className={styles.summaryTable} aria-label="Transaction summary">
        <tbody>
          <tr>
            <th>Total transactions</th>
            <td>{totalTransactions}</td>
          </tr>
          <tr>
            <th>Date range</th>
            <td>{dateRange}</td>
          </tr>
        </tbody>
      </table>

      <button
        onClick={() => setShowBtc(!showBtc)}
        aria-expanded={showBtc}
        aria-controls="btc-summary-table"
      >
        BTC Summary {showBtc ? '-' : '+'}
      </button>
      <table
        id="btc-summary-table"
        aria-label="Bitcoin transaction summary"
        className={`${styles.summaryTable} ${
          showBtc ? styles.visible : styles.invisible
        }`}
      >
        <tbody>
          <tr>
            <th>Average BTC price</th>
            <td>{averageBtcPriceFormatted}</td>
          </tr>
          <tr>
            <th>Total BTC</th>
            <td>₿{totalBtc.toFixed(8)}</td>
          </tr>
          <tr>
            <th>Total BTC Sent</th>
            <td>₿{totalBtcSent.toFixed(8)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
