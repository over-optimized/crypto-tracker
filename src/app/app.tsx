import { Link, Route, Routes } from 'react-router-dom';
import DynamicTable from 'src/components/DynamicTable/DynamicTable';
import { TransactionPage } from 'src/components/TransactionPage/TransactionPage';
import { Statement } from 'src/components/TransactionsTable/types';
import { useStatementLoader } from 'src/hooks/useStatementLoader';
import './app.css';
import styles from './app.module.css';

function tabulateData(statements: Statement[]): Array<{
  label: string;
  value: string;
}> {
  const tableData = statements.flatMap((statement) => {
    // const data = [
    //   { label: 'Name', values: ['John Doe', 'Jane Smith'] },
    //   { label: 'Age', values: ['30', '25'] },
    //   { label: 'Occupation', values: ['Software Engineer', 'Designer'] },
    // ];
    return Object.keys(statement).map((key) => {
      return {
        label: statement[key as keyof Statement].label,
        value: statement[key as keyof Statement].value,
      };
    });
  });
  console.log('[tabulateData] tableData:', tableData);
  return tableData;
}
export function App() {
  const statements = useStatementLoader();
  console.log('[App] Statements:', statements);
  // const tableData = statements.map((statement) => ({
  //   label: statement.fileName,
  //   value: JSON.stringify(statement.data),
  // }));
  return (
    <div className={styles.container}>
      <div className="mb-4">
        <h1>Crypto Tracker</h1>
        <span className="mr-4">
          <Link to="/" className="light-link">
            Home
          </Link>
        </span>
        <span className="mr-4">
          <Link to="/transactions" className="light-link">
            Transactions
          </Link>
        </span>
      </div>

      {statements.map((statement) => (
        <div key={statement.fileName} className="mb-4">
          <h2>{statement.fileName}</h2>
          <p>Date: {statement.date.toLocaleDateString()}</p>
          <p>Loading: {statement.isLoading ? 'Yes' : 'No'}</p>
          <p>Error: {statement.isError ? 'Yes' : 'No'}</p>
          {statement.isError && <p>Error: {statement.error?.message}</p>}
          {/* <p>Data: {JSON.stringify(statement.data)}</p> */}
          <DynamicTable data={tabulateData(statement.data ?? [])} />
        </div>
      ))}

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Link to="/transactions">Transactions</Link>
            </div>
          }
        />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </div>
  );
}

export default App;
