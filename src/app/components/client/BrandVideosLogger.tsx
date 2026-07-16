'use client';

import React, { useEffect } from 'react';
import { Grid } from '@/src/db/types';

type Props = {
  data: Grid;
  children: React.ReactNode;
};

export function BrandVideosLogger({ data, children }: Props) {
  useEffect(() => {
    console.log('Brand data rows:', data.rows);
  }, [data]);

  return <>{children}</>;
}
