type ValueLabel = {
  value: string;
  label: string;
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
