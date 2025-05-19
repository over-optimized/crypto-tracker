import { useState } from 'react';
import { transactionApi, TransactionResponse } from 'src/apis/transactionApi';
import { tryCatch } from 'src/utils/tryCatch';

export function useTransactionApi() {
  const [state, setState] = useState<{
    transactions: { [key: string]: TransactionResponse };
    error: string | null;
  }>({
    transactions: {},
    error: null,
  });

  const fetchTransaction = async (
    fileName: string
  ): Promise<{ data: TransactionResponse; error: string | null }> => {
    const { data, error } = await tryCatch(transactionApi({ fileName }));
    if (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
      }));
      return { data: [], error: error.message };
    } else {
      setState((prevState) => ({
        ...prevState,
        transactions: {
          ...prevState.transactions,
          [fileName]: data,
        },
      }));
      return { data, error: null };
    }
  };

  const getTransactions = async (
    fileName: string
  ): Promise<{ data: TransactionResponse; error: string | null }> => {
    if (state.transactions[fileName]) {
      return Promise.resolve({
        data: state.transactions[fileName],
        error: null,
      });
    } else {
      return fetchTransaction(fileName);
    }
  };

  return { response: state, getTransactions };
}
