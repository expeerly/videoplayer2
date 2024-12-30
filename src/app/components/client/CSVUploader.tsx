'use client';
import React, { FunctionComponent, useCallback, useRef } from 'react';
import Papa from 'papaparse';

type CSVData = {
  [key: string]: string | number;
}[];

interface CSVUploaderProps {
  onDataParsed: (data: CSVData) => void;
  onError: (error: string) => void;
}

export const CSVUploader: FunctionComponent<CSVUploaderProps> = ({ onDataParsed, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      if (!file) return;

      if (file.type !== 'text/csv') {
        onError('Please upload a valid CSV file');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        return;
      }

      Papa.parse(file, {
        complete: results => {
          if (results.errors.length) {
            onError('Error parsing CSV file');
            return;
          }

          const headers = results.data[0] as string[];
          const rows = results.data.slice(1) as string[][];

          const parsedData = rows.map(row =>
            headers.reduce(
              (acc, header, index) => ({
                ...acc,
                [header]: isNaN(Number(row[index])) ? row[index] : Number(row[index]),
              }),
              {}
            )
          );

          onDataParsed(parsedData);
        },
        header: false,
        skipEmptyLines: true,
      });
    },
    [onDataParsed, onError]
  );

  return (
    <div className="flex flex-col items-center space-y-4">
      <label
        htmlFor="csv-upload"
        className="inline-flex items-center px-4 py-2 bg-pink-500 hover:bg-pink-600 active:bg-pink-700
          text-white font-medium rounded-lg cursor-pointer transition-colors"
      >
        Choose CSV File
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
  );
};
