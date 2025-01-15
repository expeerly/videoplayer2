'use client';

import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { CSVData } from '../context/types';

interface UseCSVParserReturn {
  parseCSVFile: (
    file: File,
    isHeaderFile: boolean
  ) => Promise<{ headers: string[]; data: CSVData }>;
  isLoading: boolean;
  error: string | null;
}

interface CSVParseResult {
  ids: string[];
  headers: string[];
  data: string[][];
}

const validateFile = (file: File): void => {
  if (!file) {
    throw new Error('File is required');
  }
  if (file.type !== 'text/csv') {
    throw new Error('Please upload a valid CSV file');
  }
};

const parseValue = (value: string): string | number => {
  if (value === '') return value;
  return isNaN(Number(value)) ? value : Number(value);
};

const parseCSVInfo = (rows: string[][], isHeaderFile: boolean): CSVParseResult => {
  if (isHeaderFile) {
    return {
      headers: rows[0],
      ids: rows[0],
      data: rows.slice(1),
    };
  }
  return {
    headers: rows[0],
    ids: rows[1],
    data: rows.slice(2),
  };
};

const parseRegularFile = (csvInfo: CSVParseResult): { headers: string[]; data: CSVData } => {
  const { ids, headers, data } = csvInfo;
  const result = data
    .map(row => {
      const trimmedRow = row.join('').trim();
      if (trimmedRow === '') return null;
      const res = ids.reduce((acc, header, index) => {
        if (!header) return acc;
        const key = ids[index] || headers[index];
        return {
          ...acc,
          [key]: parseValue(row[index]),
        };
      }, {});
      return res;
    })
    .filter(Boolean) as CSVData;

  return {
    headers: ids,
    data: result,
  };
};

export const useCSVParser = (): UseCSVParserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSVFile = useCallback(
    async (file: File, isHeaderFile: boolean): Promise<{ headers: string[]; data: CSVData }> => {
      setIsLoading(true);
      setError(null);

      try {
        validateFile(file);

        return new Promise((resolve, reject) => {
          Papa.parse(file, {
            skipEmptyLines: true,
            complete: results => {
              if (results.errors.length > 0) {
                reject(new Error('Error parsing CSV file'));
                return;
              }

              const rows = results.data as string[][];
              const parsedData = parseRegularFile(parseCSVInfo(rows, isHeaderFile));
              resolve(parsedData);
            },
            error: (error: unknown) => {
              reject(error);
            },
          });
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to parse CSV file';
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    parseCSVFile,
    isLoading,
    error,
  };
};
