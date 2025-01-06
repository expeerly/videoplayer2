'use client';
import React, { FunctionComponent, useCallback, useMemo, useState, useEffect } from 'react';
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
  const [tableCounts, setTableCounts] = useState<{ [key: string]: number }>({});
  const { post, get } = useApiCall();

  useEffect(() => {
    const fetchTableCounts = async () => {
      try {
        const response = await get(`${process.env.NEXT_ENDPOINT_URL}/counts`);
        if (response?.success && response.data && typeof response.data === 'object') {
          // Ensure the data matches our expected type
          const counts: { [key: string]: number } = {};
          Object.entries(response.data).forEach(([key, value]) => {
            if (typeof value === 'number') {
              counts[key] = value;
            }
          });
          setTableCounts(counts);
        }
      } catch (error) {
        console.error('Error fetching table counts:', error);
      }
    };

    fetchTableCounts();
  }, [get]);

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
      [CSVDataOptions.creator]: API_ROUTES.CREATORS,
      [CSVDataOptions.product]: API_ROUTES.PRODUCTS,
      [CSVDataOptions.video]: API_ROUTES.VIDEOS,
      [CSVDataOptions.rating]: API_ROUTES.RATINGS,
    };

    try {
      const transformedData = transformDataToJSON(parsedCSVData, selectedOption);
      await post(`${process.env.NEXT_ENDPOINT_URL}${routesMap[selectedOption]}`, {
        data: transformedData,
      });
    } catch (error) {
      console.error(error ?? 'Error saving data');
    }
  }, [selectedOption, parsedCSVData, post]);

  console.log({ parsedCSVData });

  const tableCountsArray = useMemo(
    () => Object.entries(tableCounts).map(([name, count]) => ({ name, count })),
    [tableCounts]
  );

  return (
    <div className="mx-auto px-4 py-8 max-w-screen-xl h-full overflow-hidden flex flex-col">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">CSV Data Viewer</h1>

        <div className="my-auto">
          <CSVUploader
            setParsedData={setCSVData}
            csvHeadersData={csvHeadersData}
            setCSVHeadersData={setCSVHeadersData}
          />
        </div>

        <div className=" bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Table Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Count
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableCountsArray.map(({ name, count }) => (
                <tr key={name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

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
