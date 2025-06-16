export type CryptoTransactionType = 'Purchase' | 'Deposit';
export type CryptoTransaction = {
  reference: string; // Unique identifier for the transaction
  date: string; // ISO 8601 date string
  type: CryptoTransactionType; // Type of transaction
  currency: string; // Currency code, e.g., 'BTC'
  amount: number; // Amount of cryptocurrency involved in the transaction
  amountUsd: number; // Amount in USD, can be negative for purchases
  fee: number; // Transaction fee in cryptocurrency
  feeUsd: number; // Transaction fee in USD
  priceUsd: number; // Price of the cryptocurrency in USD at the time of the transaction
  costBasisUsd: number; // Cost basis in USD, used for tax calculations
  destination: string | null; // Destination address or account, null if not applicable
  description: string | null; // Description of the transaction, null if not provided
  note: string | null; // Additional notes, null if not provided
  source?: string; // Optional source of the transaction, e.g., 'Strike', 'Coinbase', etc.
};
