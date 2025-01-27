'use client';
import React, { FunctionComponent, useMemo } from 'react';

type Props = {
  data: { [key: string]: number };
};

export const CountsTable: FunctionComponent<Props> = ({ data }) => {
  const tableCountsArray = useMemo(
    () => (data ? Object.entries(data).map(([name, count]) => ({ name, count })) : []),
    [data]
  );

  return (
    <div className=" bg-white shadow-md rounded-lg overflow-hidden w-96">
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
  );
};
