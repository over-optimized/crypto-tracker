type DynamicTableProps = {
  data: Array<{
    label: string;
    value: string;
  }>;
};
const DynamicTable = ({ data }: DynamicTableProps) => {
  // Extract labels for the table headers
  const labels = data.map((item) => item.label);
  // Extract values for the table rows
  const values = data.map((item) => item.value);

  return (
    <table>
      <thead>
        <tr>
          {labels.map((label, index) => (
            <th key={index}>{label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {values.map((value, index) => (
            <td key={index}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default DynamicTable;
