type Report = {
  id: string;
  title: string;
  fileName: string;
  format: 'csv' | 'json';
  from: string;
  to: string;
};
type Statement = {
  id: string;
  title: string;
  fileName: string;
  format: 'csv' | 'json';
  date: string;
};
export type StrikeData = {
  reports: Report[];
  statements: Statement[];
};

export function strikeApi() {
  return fetch('/assets/json/strike/strike.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      return response.json();
    })
    .then((data) => {
      // Assuming data is already in the correct format
      return data as StrikeData;
    });
}
