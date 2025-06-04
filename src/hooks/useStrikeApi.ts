import { useEffect, useState } from 'react';
import { strikeApi, StrikeData } from 'src/apis/strikeApi';
import { tryCatch } from 'src/utils/tryCatch';

export const useStrikeApi = () => {
  const [state, setState] = useState<{
    reports: StrikeData['reports'] | null;
    statements: StrikeData['statements'] | null;
    error: string | null;
  }>({
    reports: null,
    statements: null,
    error: null,
  });

  useEffect(() => {
    (async () => {
      const { data, error } = await tryCatch(strikeApi());
      if (error) {
        setState((prevState) => ({
          ...prevState,
          error: error.message,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          reports: data.reports,
          statements: data.statements,
          error: null,
        }));
      }
    })();
  }, []);

  return {
    reports: state.reports,
    statements: state.statements,
    error: state.error,
  };
};
