'use client';
import React, { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { CSVUploader } from './CSVUploader';
import { DataTable } from './DataTable';
import { StyledSelect } from './StyledSelect';
import { Button } from './Button';
import { useApiCall } from '@/src/hooks/useApi';
import { CSVDataOptions, transformDataToJSON } from '../../api/utils/csvDataTransformToJSON';
import { CSVData } from '../../context/types';
import { API_ROUTES } from '../../constants/routes';

export const CSVViewer: FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<CSVDataOptions>(CSVDataOptions.brand);
  const [csvData, setCSVData] = useState<CSVData>([]);
  const [csvHeadersData, setCSVHeadersData] = useState<CSVData>([]);
  const { post } = useApiCall();

  const parsedCSVData = useMemo(() => {
    return csvData.map(row => {
      const parsedRow: { [key: string]: string | number } = {};
      Object.keys(row).forEach(key => {
        const header = csvHeadersData.find(h => Number(h.ID) === Number(key));
        if (header) {
          parsedRow[header.Header] = row[key];
        }
      });
      return {
        ...parsedRow,
      };
    });
  }, [csvData, csvHeadersData]);

  const handleSave = useCallback(async () => {
    const routesMap = {
      [CSVDataOptions.brand]: API_ROUTES.BRANDS,
      [CSVDataOptions.category]: API_ROUTES.CATEGORIES,
      [CSVDataOptions.creator]: API_ROUTES.REVIEWERS,
      [CSVDataOptions.product]: API_ROUTES.PRODUCTS,
      [CSVDataOptions.video]: API_ROUTES.VIDEOS,
    };

    try {
      const transformedData = transformDataToJSON(parsedCSVData, selectedOption);
      const res = await post(routesMap[selectedOption], { data: transformedData });
      console.log({ res, selectedOption });
    } catch (error) {
      console.error(error ?? 'Error saving data');
    }
  }, [selectedOption, parsedCSVData, post]);

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-xl h-full overflow-hidden flex flex-col">
      <h1 className="text-3xl font-bold mb-8">CSV Data Viewer</h1>

      <CSVUploader
        setParsedData={setCSVData}
        csvHeadersData={csvHeadersData}
        setCSVHeadersData={setCSVHeadersData}
      />

      {parsedCSVData.length > 0 && (
        <div className="mt-8 w-full flex-1 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold mb-4">Displaying {csvData.length} rows of data</h2>
            <div className="flex gap-5">
              <StyledSelect
                options={[
                  { value: CSVDataOptions.brand, label: 'Brands' },
                  { value: CSVDataOptions.category, label: 'Categories' },
                  { value: CSVDataOptions.creator, label: 'Creators' },
                  { value: CSVDataOptions.product, label: 'Products' },
                  { value: CSVDataOptions.video, label: 'Videos' },
                ]}
                onChange={value => setSelectedOption(value as CSVDataOptions)}
              />
              <Button onClick={handleSave}>Save</Button>
            </div>
          </div>
          <DataTable data={parsedCSVData} />
        </div>
      )}
    </div>
  );
};
