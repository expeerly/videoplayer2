'use client';

import { NextPage } from 'next';
import { useState } from 'react';

const CachePage: NextPage = () => {
  const [isClearing, setIsClearing] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message?: string;
    error?: string;
    details?: string;
    totalCleared?: number;
    cleared?: string[];
  } | null>(null);

  const handleClearCache = async () => {
    setIsClearing(true);
    setResult(null);

    try {
      const response = await fetch('/api/clear-cache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      setResult(data);

      if (data.success) {
        // Wait a moment to show the success message, then reload
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      setResult({
        success: false,
        error: 'Failed to clear cache',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="flex flex-col justify-center py-8 gap-10 max-w-4xl mx-auto px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Cache Management</h1>
        <p className="text-gray-600 mb-8">
          Clear all cached data to ensure fresh content delivery across the application.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <button
            onClick={handleClearCache}
            disabled={isClearing}
            className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${
              isClearing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
            }`}
          >
            {isClearing ? 'Clearing Cache...' : 'Clear All Cache'}
          </button>

          {result && (
            <div
              className={`mt-6 p-4 rounded-lg ${
                result.success
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}
            >
              <div className={`text-sm ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                <p className="font-medium">
                  {result.success ? '✅ Cache cleared successfully!' : '❌ Failed to clear cache'}
                </p>
                {result.message && <p className="mt-1">{result.message}</p>}
                {result.error && <p className="mt-1">Error: {result.error}</p>}
                {result.details && <p className="mt-1">Details: {result.details}</p>}
                {result.success && result.totalCleared && (
                  <p className="mt-1">Total items cleared: {result.totalCleared}</p>
                )}
                {result.success && (
                  <p className="mt-2 text-green-600 font-medium">
                    Page will reload in 2 seconds...
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Clearing cache will revalidate all pages and API routes. This may temporarily affect
                performance as the cache rebuilds. Use this feature when you need to ensure fresh
                content delivery.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CachePage;
