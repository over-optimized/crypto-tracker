import { Transaction } from 'src/components/TransactionsTable/types';
import { camelCase } from 'src/utils/camelCase';

export type TransactionResponse = Transaction[];

type Options = {
  fileName: string;
};

export function transactionApi({
  fileName,
}: Options): Promise<TransactionResponse> {
  const url = `/assets/json/strike/${fileName}`;
  return fetch(url, {
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
      return jsonData;
    })
    .catch((error) => {
      console.error('Error fetching or parsing data:', error);
      throw error; // Rethrow the error to handle it in the calling code
    });
}
