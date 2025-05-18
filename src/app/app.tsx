import { Link, Route, Routes } from 'react-router-dom';
import { TransactionPage } from 'src/components/TransactionPage/TransactionPage';
import './app.css';

export function App() {
  return (
    <div>
      <div className="mb-4">
        <h1>Crypto Tracker</h1>
        <span className="mr-4">
          <Link to="/">Home</Link>
        </span>
        <span className="mr-4">
          <Link to="/transactions">Transactions</Link>
        </span>
      </div>
      <br />
      <hr />
      <br />

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
