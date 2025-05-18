import { useMemo } from 'react';
import { Transaction } from 'src/apis/transactionApi';
import { calculateAveragePrice } from 'src/utils/calculateAveragePrice';
import { calculateTotalBtc } from 'src/utils/calculateTotalBtc';
import { formatCurrency } from 'src/utils/formatCurrency';

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

  const averageBtcPriceFormatted = useMemo(
    () => formatCurrency(averageBtcPrice, 'USD'),
    [averageBtcPrice]
  );

  return (
    <div style={{ width: '300px' }}>
      <div>
        Total transactions:
        <span style={{ float: 'right' }}>{totalTransactions}</span>
      </div>
      <div>
        Total BTC: <span style={{ float: 'right' }}>₿ {totalBtc}</span>
      </div>
      <div>
        Average BTC price:{' '}
        <span style={{ float: 'right' }}>{averageBtcPriceFormatted}</span>
      </div>
    </div>
  );
}
