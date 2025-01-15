import { FunctionComponent } from 'react';
import { CSVData } from '../../context/types';

interface DataTableProps {
  data: CSVData;
  headers: string[];
}

export const DataTable: FunctionComponent<DataTableProps> = ({ data, headers: headersProp }) => {
  if (!data.length) return null;

  const headers = headersProp || Object.keys(data[0]);

  return (
    <div className="mt-8 overflow-auto w-full h-[450px] border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {headers.map(header => (
              <th
                key={header}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-w-96"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {headers.map(header => (
                <td
                  key={`${rowIndex}-${header}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                >
                  <div
                    className="min-w-52 max-w-96 w-max truncate overflow-hidden text-nowrap"
                    title={String(row[header])}
                  >
                    {row[header]}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
