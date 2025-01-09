'use client';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
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
import { Spinner } from './Spinner';
import { handleError, uploadData } from '@/src/utils';

type HeadingsResponse = {
  success: boolean;
  data: {
    data: CSVData;
  };
  error?: {
    message?: string;
  };
};

export const CSVViewer: FunctionComponent = () => {
  const [selectedOption, setSelectedOption] = useState<CSVDataOptions>(CSVDataOptions.brand);
  const [csvData, setCSVData] = useState<CSVData>([]);
  const [csvHeadersData, setCSVHeadersData] = useState<CSVData>([]);
  const { post, get } = useApiCall();

  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  useEffect(() => {
    const fetchHeadings = async () => {
      try {
        setLoading(true);
        const response = (await get(API_ROUTES.HEADINGS)) as HeadingsResponse;
        if (response?.success && response?.data.data) {
          setCSVHeadersData(response.data?.data);
        } else {
          if (response.error?.message) {
            setMessage({ type: 'error', message: response?.error?.message });
          }
        }
      } catch (error) {
        const apiError = error as { error: { message: string } };
        if (apiError?.error?.message) {
          setMessage({ type: 'error', message: apiError?.error?.message });
        }
      }
      setLoading(false);
    };
    fetchHeadings();
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
    setMessage(null);
    setLoading(true);
    const routesMap = {
      [CSVDataOptions.brand]: API_ROUTES.BRANDS,
      [CSVDataOptions.category]: API_ROUTES.CATEGORIES,
      [CSVDataOptions.creator]: API_ROUTES.CREATORS,
      [CSVDataOptions.product]: API_ROUTES.PRODUCTS,
      [CSVDataOptions.video]: API_ROUTES.VIDEOS,
      [CSVDataOptions.rating]: API_ROUTES.RATINGS,
      [CSVDataOptions.landingPage]: API_ROUTES.LANDING_PAGE,
    };

    try {
      const transformedData = transformDataToJSON(parsedCSVData, selectedOption);
      if (transformedData.length === 0) {
        setMessage({ type: 'error', message: 'File is Empty or invalid selected option' });
        setLoading(false);
        return;
      }
      const { successCount, failedCount } = await uploadData(transformedData, data =>
        post(`${process.env.NEXT_ENDPOINT_URL}${routesMap[selectedOption]}`, {
          data,
        }).then(response => {
          if (!response) throw new Error('No response received');
          return { success: response.success };
        })
      );

      if (failedCount === 0) {
        setMessage({
          type: 'success',
          message: `All ${successCount} records saved successfully`,
        });
        setCSVData([]);
      } else {
        setMessage({
          type: 'error',
          message: `Completed with errors: ${successCount} saved, ${failedCount} failed`,
        });
      }
    } catch (error) {
      handleError(error, message => setMessage({ type: 'error', message }));
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
          setMessage={setMessage}
        />

        {!loading && message && (
          <div
            className={`flex-1 h-full flex items-center justify-center mt-10 ${message.type === 'error' ? 'text-red-500' : 'text-green-500'}`}
          >
            <p className="text-2xl">{message.message}</p>
          </div>
        )}
      </div>

      {loading && (
        <div className="flex-1 h-full flex items-center justify-center fixed top-0 left-0 w-full bg-black/25 z-30">
          <p className="text-2xl">
            <Spinner />
          </p>
        </div>
      )}

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
                  { value: CSVDataOptions.landingPage, label: 'Landing Page' },
                ]}
                onChange={value => setSelectedOption(value as CSVDataOptions)}
                value={selectedOption}
              />
              <Button onClick={handleSave}>{loading ? 'Saving...' : 'Save'}</Button>
            </div>
          </div>
          <DataTable data={parsedCSVData} />
        </div>
      )}
    </div>
  );
};
