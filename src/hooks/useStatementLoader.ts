import { useQueries } from '@tanstack/react-query';
import { statementApi } from 'src/apis/statementApi';

export function useStatementLoader() {
  const fileNames = [
    '2025-May-account-statement.csv',
    '2025-April-account-statement.csv',
    '2025-March-account-statement.csv',
    '2025-February-account-statement.csv',
    '2025-January-account-statement.csv',
  ];

  const queries = fileNames.map((fileName) => ({
    queryKey: ['statement', fileName],
    queryFn: () => statementApi({ fileName }),
  }));

  const statements = useQueries({
    queries,
  });

  return statements.map((statement, idx) => ({
    data: statement.data,
    isLoading: statement.isLoading,
    isError: statement.isError,
    error: statement.error,
    fileName: fileNames[idx],
  }));
}
