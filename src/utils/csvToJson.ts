import { camelCase } from './camelCase';

export const csvToJson = (csv: string): Record<string, any>[] => {
  const rows = csv
    .replace(/\r/g, '')
    .split('\n')
    .filter((row) => row.trim() !== ''); // Filter out empty rows

  const headers = rows[0].split(',');
  return rows.slice(1).map((row) => {
    const obj: Record<string, any> = {};
    const values = row.split(',');

    headers.forEach((header, index) => {
      // Convert header to camelCase
      const key = camelCase(header);
      // Remove special characters and convert to camelCase
      obj[key] = values[index] ? values[index].trim() : null;
    });

    return obj;
  });
};
