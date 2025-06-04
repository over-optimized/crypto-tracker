import { Statement, ValueLabel } from 'src/components/TransactionsTable/types';
import { camelCase } from 'src/utils/camelCase';
import { z } from 'zod';

export type StatementResponse = Statement[];

type Options = {
  fileName: string;
};
const ValueLabelSchema = z.object({
  value: z.string(),
  label: z.string(),
});
const StatementSchema = z.object({
  reference: ValueLabelSchema,
  dateAndTime: ValueLabelSchema,
  transactionType: ValueLabelSchema,
  amountUsd: ValueLabelSchema,
  feeUsd: ValueLabelSchema,
  amountBtc: ValueLabelSchema,
  feeBtc: ValueLabelSchema,
  btcPrice: ValueLabelSchema,
  costBasis: ValueLabelSchema,
  destination: ValueLabelSchema,
  description: ValueLabelSchema,
  note: ValueLabelSchema,
});
const StatementResponseSchema = z.array(StatementSchema);

const JsonMapper = {
  parse: (data: { [key: string]: ValueLabel }[]): StatementResponse => {
    const statementResponse: StatementResponse = data.map((row) => {
      return {
        reference: row.reference,
        dateAndTime: row.dateAndTime,
        transactionType: row.transactionType,
        amountUsd: row.amountUsd,
        feeUsd: row.feeUsd,
        amountBtc: row.amountBtc,
        feeBtc: row.feeBtc,
        btcPrice: row.btcPrice,
        costBasis: row.costBasis,
        destination: row.destination,
        description: row.description,
        note: row.note,
      };
    });
    StatementResponseSchema.parse(statementResponse);
    return statementResponse;
  },
};

export function statementApi({
  fileName,
}: Options): Promise<StatementResponse> {
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
        const obj = {} as Statement;
        headers.forEach((header, index) => {
          const key = camelCase(header) as keyof Statement;

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
