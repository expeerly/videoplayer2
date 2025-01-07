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
import { LeftChevronIcon } from '@/src/assets/icons';
import { LogoutButton } from './LogoutButton';

export const CSVViewer: FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<CSVDataOptions>(CSVDataOptions.brand);
  const [csvData, setCSVData] = useState<CSVData>([]);
  const [csvHeadersData, setCSVHeadersData] = useState<CSVData>([]);
  const { post } = useApiCall();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

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
    setMessage(null);
    setLoading(true);
    const routesMap = {
      [CSVDataOptions.brand]: API_ROUTES.BRANDS,
      [CSVDataOptions.category]: API_ROUTES.CATEGORIES,
      [CSVDataOptions.creator]: API_ROUTES.CREATORS,
      [CSVDataOptions.product]: API_ROUTES.PRODUCTS,
      [CSVDataOptions.video]: API_ROUTES.VIDEOS,
      [CSVDataOptions.rating]: API_ROUTES.RATINGS,
    };

    try {
      const transformedData = transformDataToJSON(parsedCSVData, selectedOption);
      const res = await post(`${process.env.NEXT_ENDPOINT_URL}${routesMap[selectedOption]}`, {
        data: transformedData,
      });

      if (res?.success) {
        // Reload the counts after successful save
        setMessage({ type: 'success', message: 'Data saved successfully' });
        setCSVData([]);
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', message: 'Error saving data' });
    } finally {
      setLoading(false);
    }
  }, [selectedOption, parsedCSVData, post]);

  return (
    <div className="mx-auto px-4 py-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <Button className="w-max" href={'/admin'}>
          <LeftChevronIcon className="[&>path]:stroke-white" /> Back
        </Button>

        <h1 className="text-3xl font-bold">CSV Data Viewer</h1>
        <LogoutButton />
      </div>

      <div className="my-auto">
        <CSVUploader
          setParsedData={setCSVData}
          csvHeadersData={csvHeadersData}
          setCSVHeadersData={setCSVHeadersData}
          setLoading={setLoading}
        />

        {!loading && message && (
          <div
            className={`flex-1 h-full flex items-center justify-center ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
          >
            <p className="text-2xl">{message.message}</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex-1 h-full flex items-center justify-center">
          <p className="text-2xl">Loading...</p>
        </div>
      )}

      {!loading && parsedCSVData.length > 0 && (
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
                  { value: CSVDataOptions.rating, label: 'Ratings' },
                ]}
                onChange={value => setSelectedOption(value as CSVDataOptions)}
                value={selectedOption}
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
