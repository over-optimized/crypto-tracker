// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { transactionApi, TransactionResponse } from 'src/apis/transactionApi';
import { TransactionTable } from 'src/components/TransactionTable/TransactionTable';
import { tryCatch } from 'src/utils/tryCatch';

export function App() {
  const [state, setState] = useState({
    transactions: [] as TransactionResponse,
  });
  useEffect(() => {
    (async () => {
      const { error, data } = await tryCatch(
        transactionApi({
          fileName: 'BTC-account-statement_2025-04-01_2025-05-01.csv',
        })
      );

      if (error) {
        console.error('Error fetching transactions:', error);
        return;
      }

      if (data) {
        console.log('Fetched transactions:', data);
        setState((prevState) => ({
          ...prevState,
          transactions: data,
        }));
      }
    })();
  }, []);

  console.log('State:', state);

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
