// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { Link, Route, Routes } from 'react-router-dom';
import { TransactionTable } from 'src/components/TransactionTable/TransactionTable';
import { useTransactionApi } from 'src/hooks/useTransactionApi';

export function App() {
  const { state } = useTransactionApi();

  return (
    <div>
      <h1>Crypto Tracker</h1>
      <br />
      <hr />
      <br />
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              This is the generated root route.{' '}
              <Link to="/transactions">Transactions</Link>
            </div>
          }
        />
        <Route path="/transactions" element={<TransactionTable />} />
      </Routes>
    </div>
  );
}

export default App;
