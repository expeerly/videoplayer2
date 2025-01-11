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
  get: <R = T>(url: string, params?: RequestParams) => Promise<ApiResponse<R> | null>;
  post: <R = T>(url: string, payload: RequestPayload) => Promise<ApiResponse<R> | null>;
  put: <R = T>(url: string, payload: RequestPayload) => Promise<ApiResponse<R> | null>;
  del: <R = T>(url: string, params?: RequestParams) => Promise<ApiResponse<R> | null>;
};

export const useApiCall = <T>(): ApiCallResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequest = useCallback(
    async <R>(
      method: 'get' | 'post' | 'put' | 'delete',
      url: string,
      payload?: RequestParams | RequestPayload
    ): Promise<ApiResponse<R> | null> => {
      setLoading(true);
      setError(null);

      try {
        let response: AxiosResponse<ApiResponse<R>>;
        const apiURL = url.startsWith('http') ? url : `${process.env.NEXT_ENDPOINT_URL}${url}`;
        switch (method) {
          case 'post':
            response = await axios.post<ApiResponse<R>>(apiURL, payload);
            break;
          case 'put':
            response = await axios.put<ApiResponse<R>>(apiURL, payload);
            break;
          case 'delete':
            response = await axios.delete<ApiResponse<R>>(apiURL, { data: payload });
            break;
          default:
            response = await axios.get<ApiResponse<R>>(apiURL, { params: payload });
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
    <R = T>(url: string, params?: RequestParams) => handleRequest<R>('get', url, params),
    [handleRequest]
  );

  const post = useCallback(
    <R = T>(url: string, payload: RequestPayload) => handleRequest<R>('post', url, payload),
    [handleRequest]
  );

  const put = useCallback(
    <R = T>(url: string, payload: RequestPayload) => handleRequest<R>('put', url, payload),
    [handleRequest]
  );

  const del = useCallback(
    <R = T>(url: string, params?: RequestParams) => handleRequest<R>('delete', url, params),
    [handleRequest]
  );

  return { loading, error, get, post, put, del };
};
