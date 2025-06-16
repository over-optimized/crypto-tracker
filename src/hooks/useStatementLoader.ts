import { useQueries } from '@tanstack/react-query';
import { statementApi } from 'src/apis/statementApi';

function mapStatements(statements: any[], fileNames: string[]) {
  return statements
    .map((statement, idx) => {
      const fileName = fileNames[idx];
      const [year, month] = fileName
        .split('-account-statement.csv')[0]
        .split('-');
      return {
        data: statement.data,
        isLoading: statement.isLoading,
        isError: statement.isError,
        error: statement.error,
        fileName: fileNames[idx],
        date: new Date(`${year}-${month}-01`), // Assuming the first day of the month
      };
    })
    .filter((statement) => statement.data !== undefined);
}

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

  return {
    statements: mapStatements(statements, fileNames),
    strikeStatements: mapStatements(statements, fileNames),
  };
}
