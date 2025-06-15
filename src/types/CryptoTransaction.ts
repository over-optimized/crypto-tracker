/* Example of a CryptoTransaction object
{
  "reference": "8457f6db-fa05-474f-9738-771c2a0a2b4c",
  "date": "2025-05-01T14:36:06Z",
  "type": "purchase",
  "currency": "BTC",
  "amount": 0.00051796,
  "amountUsd": -50.00,
  "fee": 0,
  "feeUsd": 0,
  "priceUsd": 96532.55,
  "costBasisUsd": 50.00,
  "destination": null,
  "description": null,
  "note": null
}
*/

export type CryptoTransactionType =
  | 'purchase'
  | 'sale'
  | 'transfer'
  | 'withdrawal'
  | 'deposit';
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
