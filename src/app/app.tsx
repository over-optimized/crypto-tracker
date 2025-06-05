import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Routes } from 'react-router-dom';
import { TransactionPage } from 'src/components/TransactionPage/TransactionPage';
import './app.css';
import styles from './app.module.css';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
