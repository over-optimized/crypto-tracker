import { useEffect, useState } from 'react';
import { transactionApi, TransactionResponse } from 'src/apis/transactionApi';
import { tryCatch } from 'src/utils/tryCatch';

export function useTransactionApi() {
  const [state, setState] = useState<{
    transactions: TransactionResponse;
    error: string | null;
  }>({
    transactions: [],
    error: null,
  });

  useEffect(() => {
    (async (fileName: string) => {
      try {
        const { data, error } = await tryCatch(transactionApi({ fileName }));
        if (error) {
          throw error;
        }
        setState((prevState) => ({
          ...prevState,
          transactions: data,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: error as string,
        }));
      }
    })('BTC-account-statement_2025-04-01_2025-05-01.csv');
  }, []);

  return { response: state };
}
