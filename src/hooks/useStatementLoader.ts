import { useQueries } from '@tanstack/react-query';
import { statementApi } from 'src/apis/statementApi';

export function useStatementLoader() {
  const queries = [
    '2025-May-account-statement.csv',
    '2025-April-account-statement.csv',
    '2025-March-account-statement.csv',
    '2025-February-account-statement.csv',
    '2025-January-account-statement.csv',
  ].map((fileName) => ({
    queryKey: ['statement', fileName],
    queryFn: () => statementApi({ fileName }),
  }));
  const statements = useQueries({
    queries,
  });
  // console.log('Statements:', statements);
  return statements.map((statement) => ({
    data: statement.data,
    isLoading: statement.isLoading,
    isError: statement.isError,
    error: statement.error,
  }));
}
