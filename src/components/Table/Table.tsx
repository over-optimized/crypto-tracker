import { Transaction, TransactionResponse } from 'src/apis/transactionApi';

type TableProps = {
  data: TransactionResponse;
  className?: string;
};

type TransactionKey = keyof Transaction;

export function Table({ data }: TableProps) {
  console.log('Table data:', data);

  const headers = Object.keys(data[0] || {}).map((key) => {
    const transaction = data[0];
    const label = transaction[key as TransactionKey].label;
    return <th key={key}>{label}</th>;
  });

  const row = (rowData: Transaction) =>
    Object.keys(rowData || {}).map((key) => {
      const typedKey = key as TransactionKey;
      return <td key={typedKey}>{rowData[typedKey]?.value}</td>;
    });

  const rows = data.map((rowData, index) => (
    <tr key={`row${index}`}>{row(rowData)}</tr>
  ));
  return (
    <div>
      <table>
        <thead>
          <tr>{headers}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
