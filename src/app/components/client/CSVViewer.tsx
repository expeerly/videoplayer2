'use client';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { CSVUploader } from './CSVUploader';
import { DataTable } from './DataTable';
import { StyledSelect } from './StyledSelect';
import { Button } from './Button';
import { useApiCall } from '@/src/hooks/useApi';

type CSVData = {
  [key: string]: string | number;
}[];

const dataRefactor = (table: string, data: CSVData) => {
  if (table === 'brand') {
    return data;
  }
};

export const CSVViewer: FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<string>('brands');
  const [csvData, setCSVData] = useState<CSVData>([]);
  const [error, setError] = useState<string | null>(null);
  const { post } = useApiCall();
  const handleDataParsed = useCallback((data: CSVData) => {
    setCSVData(data);
    setError(null);
  }, []);

  const handleError = useCallback((errorMessage: string) => {
    setError(errorMessage);
    setCSVData([]);
  }, []);

  const handleSave = useCallback(async () => {
    try {
      dataRefactor(selectedOption, csvData);

      const res = await post('http://localhost:3000/brand', {});
      console.log({ res, selectedOption });
    } catch (error) {
      console.error(error ?? 'Error saving data');
    }
  }, [selectedOption, csvData]);

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-xl h-full overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold mb-8">CSV Data Viewer</h1>

      <CSVUploader onDataParsed={handleDataParsed} onError={handleError} />

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {csvData.length > 0 && (
        <div className="mt-8 w-full flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Displaying {csvData.length} rows of data</h2>
            <div className="flex gap-5">
              <StyledSelect
                options={[
                  { value: 'brand', label: 'Brands' },
                  { value: 'category', label: 'Categories' },
                  { value: 'reviewer', label: 'Reviewers' },
                ]}
                onChange={setSelectedOption}
              />
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
          <DataTable data={csvData} />
        </div>
      )}
    </div>
  );
};
