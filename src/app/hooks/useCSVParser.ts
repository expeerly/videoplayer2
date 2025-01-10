'use client';

import { useState, useCallback } from 'react';
import Papa from 'papaparse';
import { CSVData } from '../context/types';

interface UseCSVParserReturn {
  parseCSVFile: (file: File) => Promise<CSVData>;
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

const findIdsRowIndex = (rows: string[][]): number => {
  return rows
    .slice(0, 3)
    .findIndex(row => row.every(value => !isNaN(Number(value)) || value.trim() === ''));
};

const parseCSVInfo = (rows: string[][]): CSVParseResult => {
  const idsRowIndex = findIdsRowIndex(rows);
  return {
    ids: idsRowIndex !== -1 ? rows[idsRowIndex] : [],
    headers: rows[idsRowIndex + 1],
    data: rows.slice(idsRowIndex + 2),
  };
};

const parseRegularFile = (csvInfo: CSVParseResult): CSVData => {
  const { ids, headers, data } = csvInfo;
  return data.map(row => {
    const res = headers.reduce((acc, header, index) => {
      if (!header) return acc;
      const key = ids[index] || headers[index];
      return {
        ...acc,
        [key]: parseValue(row[index]),
      };
    }, {});
    return res;
  });
};

export const useCSVParser = (): UseCSVParserReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseCSVFile = useCallback(async (file: File): Promise<CSVData> => {
    setIsLoading(true);
    setError(null);

    try {
      validateFile(file);

      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          complete: results => {
            if (results.errors.length > 0) {
              reject(new Error('Error parsing CSV file'));
              return;
            }

            const rows = results.data as string[][];
            const parsedData = parseRegularFile(parseCSVInfo(rows));
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
  }, []);

  return {
    parseCSVFile,
    isLoading,
    error,
  };
};
