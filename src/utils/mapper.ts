import {
  CryptoTransaction,
  CryptoTransactionType,
} from 'src/types/CryptoTransaction';
import { StrikeStatement } from 'src/types/StrikeStatement';

const allowedTransactionTypes: CryptoTransactionType[] = [
  'purchase',
  'sale',
  'transfer',
  'withdrawal',
  'deposit',
];

function isCryptoTransactionType(type: string): type is CryptoTransactionType {
  return allowedTransactionTypes.includes(type as CryptoTransactionType);
}

function cryptoTransactionFromStrikeStatement(
  statement: StrikeStatement
): CryptoTransaction {
  if (!isCryptoTransactionType(statement.transactionType)) {
    throw new Error(`Invalid transaction type: ${statement.transactionType}`);
  }
  return {
    reference: statement.reference,
    date: new Date(statement.dateAndTime).toISOString(),
    type: statement.transactionType as CryptoTransactionType,
    amountUsd: parseFloat(statement.amountUsd),
    feeUsd: parseFloat(statement.feeUsd || '0'),
    currency: 'BTC',
    amount: parseFloat(statement.amountBtc),
    fee: parseFloat(statement.feeBtc || '0'),
    priceUsd: parseFloat(statement.btcPrice),
    costBasisUsd: parseFloat(statement.costBasis),
    destination: statement.destination || '',
    description: statement.description || '',
    note: statement.note || '',
    source: 'Strike', // Assuming the source is always 'Strike' for these transactions
  };
}

export { cryptoTransactionFromStrikeStatement };
