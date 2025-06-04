export type ValueLabel = {
  value: string;
  label: string;
};

export type Statement = {
  reference: ValueLabel;
  dateAndTime: ValueLabel;
  transactionType: ValueLabel;
  amountUsd: ValueLabel;
  feeUsd: ValueLabel;
  amountBtc: ValueLabel;
  feeBtc: ValueLabel;
  btcPrice: ValueLabel;
  costBasis: ValueLabel;
  destination: ValueLabel;
  description: ValueLabel;
  note: ValueLabel;
};

export type Transaction = {
  transactionId: ValueLabel;
  time: ValueLabel;
  status: ValueLabel;
  transactionType: ValueLabel;
  amount: ValueLabel;
  currency: ValueLabel;
  feeAmount: ValueLabel;
  feeCurrency: ValueLabel;
  description: ValueLabel;
  exchangeRate: ValueLabel;
};

export type TransactionKey = keyof Transaction;
