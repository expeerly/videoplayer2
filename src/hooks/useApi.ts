import { useState, useCallback } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

// Base response type
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// Request payload types
type RequestParams = Record<string, string | number | boolean>;
type RequestPayload = Record<string, unknown>;

// API call result type
type ApiCallResult<T> = {
  loading: boolean;
  error: string | null;
  get: (url: string, params?: RequestParams) => Promise<ApiResponse<T> | null>;
  post: (url: string, payload: RequestPayload) => Promise<ApiResponse<T> | null>;
  put: (url: string, payload: RequestPayload) => Promise<ApiResponse<T> | null>;
  del: (url: string, params?: RequestParams) => Promise<ApiResponse<T> | null>;
};

export const useApiCall = <T>(): ApiCallResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(
    async (
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      payload?: RequestParams | RequestPayload
    ): Promise<ApiResponse<T> | null> => {
      setLoading(true);
      setError(null);

      try {
        let response: AxiosResponse<ApiResponse<T>>;
        const apiURL = url.startsWith('http') ? url : `${process.env.NEXT_ENDPOINT_URL}${url}`;
        switch (method) {
          case 'post':
            response = await axios.post<ApiResponse<T>>(apiURL, payload);
            break;
          case 'put':
            response = await axios.put<ApiResponse<T>>(apiURL, payload);
            break;
          case 'delete':
            response = await axios.delete<ApiResponse<T>>(apiURL, { data: payload });
            break;
          default:
            response = await axios.get<ApiResponse<T>>(apiURL, { params: payload });
        }

        return response.data;
      } catch (err) {
        const axiosError = err as AxiosError;
        setError(axiosError.message);
        return null;
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

  return { loading, error, get, post, put, del };
};
