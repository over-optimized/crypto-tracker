import { Link, Route, Routes } from 'react-router-dom';
import { StatementUploader } from 'src/components/StatementUploader/StatementUploader';
import { TransactionPage } from 'src/components/TransactionPage/TransactionPage';
import { useStatementLoader } from 'src/hooks/useStatementLoader';
import './app.css';
import styles from './app.module.css';

export function App() {
  const statementLoader = useStatementLoader();
  console.log('[App] statementLoader:', statementLoader);
  // const tableData = statements.map((statement) => ({
  //   label: statement.fileName,
  //   value: JSON.stringify(statement.data),
  // }));
  const { strikeStatements } = statementLoader;
  console.log('[App] strikeStatements:', strikeStatements);

  const transactions = strikeStatements.map((statement) => {
    return statement.data;
  });

  console.log('[App] transactions:', transactions);
  // Flatten the transactions array
  const flattenedTransactions = transactions.flat();
  console.log('[App] flattenedTransactions:', flattenedTransactions);

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
        <span className="mr-4">
          <Link to="/statement-uploader" className="light-link">
            Statement Uploader
          </Link>
        </span>
      </div>

      {/* {statementLoader.statements.map((statement) => (
        <div key={statement.fileName} className="mb-4">
          <h2>{statement.fileName}</h2>
          <p>Date: {statement.date.toLocaleDateString()}</p>
          <p>Loading: {statement.isLoading ? 'Yes' : 'No'}</p>
          <p>Error: {statement.isError ? 'Yes' : 'No'}</p>
          {statement.isError && <p>Error: {statement.error?.message}</p>}
          {/* <p>Data: {JSON.stringify(statement.data)}</p> }
          <DynamicTable data={statement.data ?? []} />
        </div>
      ))} */}

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
        <Route path="/statement-uploader" element={<StatementUploader />} />
      </Routes>
    </div>
  );
}

export default App;
