type DynamicTableProps = {
  data: Array<{
    [key: string]: {
      label: string;
      value: string;
    };
  }>;
};
const DynamicTable = ({ data }: DynamicTableProps) => {
  console.log('[DynamicTable] data:', data);

  // convert data to a table with each item representing a row
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }
  // Extract table headers from the first item in the data array
  const labels = Object.keys(data[0]).map((key) => data[0][key].label);
  console.log('[DynamicTable] labels:', labels);
  // Convert the values for each item in the data array to represent rows
  const values = data.map((item) => {
    return Object.keys(item).map((key) => item[key]);
  });
  console.log('[DynamicTable] values:', values);

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
        {values.map((value, index) => (
          <tr>
            {value.map((val, idx) => (
              <td key={idx}>{val.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
