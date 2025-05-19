import {
  Transaction,
  ValueLabel,
} from 'src/components/TransactionsTable/types';
import { camelCase } from 'src/utils/camelCase';

export type TransactionResponse = Transaction[];

type Options = {
  fileName: string;
};

const JsonMapper = {
  parse: (data: { [key: string]: ValueLabel }[]): TransactionResponse => {
    const transactionResponse: TransactionResponse = data.map((row) => {
      return {
        transactionId: row.transactionId,
        time: row.time || row.createdTime,
        status: row.status,
        transactionType: row.transactionType || {
          label: 'Transaction Type',
          value: 'Exchange',
        }, // may not be present in all files
        amount: row.amount || row.amountBought,
        currency: row.currency || row.currencyBought,
        feeAmount: row.feeAmount || { label: 'Fee Amount', value: '0' },
        feeCurrency: row.feeCurrency || { label: 'Fee Currency', value: 'N/A' },
        description: row.description || { label: 'Description', value: '' },
        exchangeRate: row.exchangeRate,
      };
    });

    return transactionResponse;
  },
};

export function transactionApi({
  fileName,
}: Options): Promise<TransactionResponse> {
  return fetch(`/assets/json/strike/${fileName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/csv',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
      // Parse the CSV data, convert it to JSON, and return it
      const rows = data
        .replace(/\r/g, '')
        .split('\n')
        .map((row) => row.split(','));
      const headers = rows[0];
      const jsonData = rows.slice(1).map((row) => {
        const obj = {} as Transaction;
        headers.forEach((header, index) => {
          const key = camelCase(header) as keyof Transaction;

          obj[key] = {
            value: row[index],
            label: header,
          };
        });
        return obj;
      });
      console.log('jsonData', jsonData);
      const formattedData = JsonMapper.parse(jsonData);
      console.log('formattedData', formattedData);
      return formattedData;
    })
    .catch((error) => {
      console.error('Error fetching or parsing data:', error);
      throw error; // Rethrow the error to handle it in the calling code
    });
}
