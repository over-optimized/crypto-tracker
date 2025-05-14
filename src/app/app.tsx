import { Link, Route, Routes } from 'react-router-dom';
import { TransactionTable } from 'src/components/TransactionTable/TransactionTable';
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
      {/* <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/transactions">Transactions</Link>
          </li>
        </ul>
      </div> */}
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
