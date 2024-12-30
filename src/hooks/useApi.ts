import { useState, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

// Base response type
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Request payload types
type RequestParams = Record<string, string | number | boolean>;
type RequestPayload = Record<string, unknown>;

// API call result type
interface ApiCallResult<T> {
  data: ApiResponse<T> | null;
  loading: boolean;
  error: string | null;
  get: (url: string, params?: RequestParams) => Promise<void>;
  post: (url: string, payload: RequestPayload) => Promise<void>;
  put: (url: string, payload: RequestPayload) => Promise<void>;
  del: (url: string, params?: RequestParams) => Promise<void>;
}

export const useApiCall = <T>(): ApiCallResult<T> => {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      payload?: RequestParams | RequestPayload
    ) => {
      setLoading(true);
      setError(null);

      try {
        let response: AxiosResponse<ApiResponse<T>>;

        switch (method) {
          case 'post':
            response = await axios.post<ApiResponse<T>>(url, payload);
            break;
          case 'put':
            response = await axios.put<ApiResponse<T>>(url, payload);
            break;
          case 'delete':
            response = await axios.delete<ApiResponse<T>>(url, { data: payload });
            break;
          default:
            response = await axios.get<ApiResponse<T>>(url, { params: payload });
        }

        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    (url: string, params?: RequestParams) => handleRequest('get', url, params),
    [handleRequest]
  );

  const post = useCallback(
    (url: string, payload: RequestPayload) => handleRequest('post', url, payload),
    [handleRequest]
  );

  const put = useCallback(
    (url: string, payload: RequestPayload) => handleRequest('put', url, payload),
    [handleRequest]
  );

  const del = useCallback(
    (url: string, params?: RequestParams) => handleRequest('delete', url, params),
    [handleRequest]
  );

  return { data, loading, error, get, post, put, del };
};
