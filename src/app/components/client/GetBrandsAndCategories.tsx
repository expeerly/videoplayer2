'use client';
import React, { FunctionComponent, PropsWithChildren, useCallback, useEffect } from 'react';
import { useApiCall } from '@/src/hooks/useApi';
import { BrandWithData, CategoryWithData } from '@/src/db/types';

import { useSharedDispatch } from '../../context/reducer';

export const GetBrandsAndCategories: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const dispatch = useSharedDispatch();
  const { get } = useApiCall();
  const getCategories = useCallback(async () => {
    try {
      const response = await get<CategoryWithData[]>('/category');
      if (response?.success) {
        dispatch({ type: 'CATEGORIES', payload: response.data });
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }, [dispatch, get]);

  const getBrands = useCallback(async () => {
    try {
      const response = await get<BrandWithData[]>('/brand');
      if (response?.success) {
        dispatch({ type: 'BRANDS', payload: response.data });
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  }, [dispatch, get]);

  useEffect(() => {
    getCategories();
    getBrands();
  }, [getCategories, getBrands]);
  return <>{children}</>;
};
