import { useState } from 'react';
import { StrikeStatementSchema } from 'src/schemas/StrikeStatementSchema';
import { csvToJson } from 'src/utils/csvToJson';
import { cryptoTransactionFromStrikeStatement } from 'src/utils/mapper';

export function StatementUploader() {
  const [file, setFile] = useState<File | null>(null);
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    if (selectedFile) {
      // Validate file type and name format
      if (
        selectedFile.type === 'text/csv' &&
        /^20\d{2}-\d{2}-account-statement\.csv$/.test(selectedFile.name)
      ) {
        setFile(selectedFile);
        // Here you would typically handle the file upload
        console.log('File selected:', selectedFile.name);
      } else {
        console.error(
          'Invalid file type or name format. Please upload a valid CSV file.'
        );
        alert(
          'Invalid file type or name format. Please upload a valid CSV file named in the format YYYY-MM-account-statement.csv.'
        );
        setFile(null);
      }
    } else {
      console.error('No file selected.');
      alert('No file selected. Please choose a file to upload.');
      setFile(null);
    }
  };
  const onUploadClick = () => {
    if (file) {
      try {
        // Handle the file upload logic here
        console.log('Uploading file:', file.name);
        file.text().then((text) => {
          const json = csvToJson(text);
          // filter by transaction type for Purchase transactions
          const filteredJson = json.filter(
            (item) => item.transactionType === 'Purchase'
          );
          // verify the JSON structure with Zod
          const strikeStatement = StrikeStatementSchema(filteredJson);
          console.log('Verified Strike Statement:', strikeStatement);
          // convert to CryptoTransaction
          const transactions = strikeStatement.map(
            cryptoTransactionFromStrikeStatement
          );
          console.log('Converted Transactions:', transactions);
        });
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    } else {
      console.error('No file selected for upload.');
      alert('Please select a file to upload.');
    }
  };
  return (
    <div className="statement-uploader">
      <h2>Upload Your Crypto Statements</h2>
      <p>
        Upload your crypto statements in CSV format. Supported exchanges include
        Strike. Ensure your files are named in the format{' '}
        <code>YYYY-MM-account-statement.csv</code> for accurate processing.
      </p>
      <p>
        <strong>Note:</strong> This feature is currently in development. Please
        check back later for updates.
      </p>
      <div>
        <input
          type="file"
          name="statement-input"
          id="statement-input"
          onChange={onFileChange}
        />
      </div>
      <div>
        <button type="button" onClick={onUploadClick}>
          Upload
        </button>
      </div>
    </div>
  );
}
