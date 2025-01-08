'use client';
import React, { FunctionComponent, useCallback, useRef, useState } from 'react';
import { useCSVParser } from '../../hooks/useCSVParser';
import { CSVData } from '../../context/types';
import { useApiCall } from '@/src/hooks/useApi';

interface CSVUploaderProps {
  setParsedData: (data: CSVData) => void;
  csvHeadersData: CSVData;
  setCSVHeadersData: (data: CSVData) => void;
  setLoading: (value: boolean) => void;
}

export const CSVUploader: FunctionComponent<CSVUploaderProps> = ({
  setParsedData,
  csvHeadersData,
  setCSVHeadersData,
  setLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const headerFileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const { post } = useApiCall();
  const { parseCSVFile, isLoading, error: parseError } = useCSVParser();

  const uploadHeader = useCallback(
    async (data: CSVData) => {
      if (data.length > 0) {
        const res = await post('/headings', {
          data: {
            data,
          },
        });
        console.log({ res });
      }
    },
    [post]
  );

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>, isHeaderFile: boolean = false) => {
      setLoading(true);
      const file = event.target.files?.[0];

      if (!file) return;

      if (file.type !== 'text/csv') {
        setError('Please upload a valid CSV file');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      const parsedData = await parseCSVFile(file);
      if (isHeaderFile) {
        if (!parsedData[0]?.ID || !parsedData[0]?.Header) {
          setError('Header File Must have ID and Header Columns');
          return;
        }
        await uploadHeader(parsedData);
        setLoading(false);
        setError(undefined);
        setCSVHeadersData(parsedData);
        return;
      }

      if (!csvHeadersData || csvHeadersData.length === 0) {
        setError('Please upload a valid CSV file');
        setLoading(false);

        return;
      }

      setLoading(false);
      setError(undefined);
      setParsedData(parsedData);
    },
    [setLoading, parseCSVFile, csvHeadersData, setParsedData, setCSVHeadersData]
  );

  return (
    <div className=" text-center">
      <div className="flex justify-evenly items-center gap-10">
        {!!csvHeadersData?.length ? (
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">Headers File Uploaded!</span>
            <span className="text-sm cursor-pointer" onClick={() => setCSVHeadersData([])}>
              x
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <label
              htmlFor="csv-upload"
              className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 active:bg-pink-700
          text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Choose CSV Header File
              <input
                ref={headerFileInputRef}
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={e => handleFileChange(e, true)}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500">Only CSV files are accepted</p>
          </div>
        )}
        {
          <div className="flex flex-col items-center">
            <label
              htmlFor="csv-upload"
              className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 active:bg-pink-700
          text-white font-medium rounded-lg cursor-pointer transition-colors"
            >
              Choose CSV Data File
              <input
                ref={fileInputRef}
                id="csv-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-sm text-gray-500">Only CSV files are accepted</p>
          </div>
        }
      </div>
      {(error || parseError) && <p className="text-red-500 mt-4">Error: {error}</p>}
      {isLoading && <p className="text-gray-500 mt-4">Uploading...</p>}
    </div>
  );
};
