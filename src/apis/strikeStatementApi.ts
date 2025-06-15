// import { CryptoTransaction } from 'src/types/CryptoTransaction';
import { StrikeStatement } from 'src/types/StrikeStatement';
import { camelCase } from 'src/utils/camelCase';

type Options = {
  fileName: string;
};

export function strikeStatementApi({
  fileName,
}: Options): Promise<StrikeStatement[]> {
  return fetch(`/assets/csv/strike/${fileName}`, {
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
        .filter((row) => row.trim() !== '') // Filter out empty rows
        .map((row) => row.split(','));
      const headers = rows[0];
      const jsonData = rows.slice(1).map((row) => {
        const obj = {} as StrikeStatement;
        headers.forEach((header, index) => {
          const key = camelCase(header) as keyof StrikeStatement;

          obj[key] = row[index];
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
