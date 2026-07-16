'use client';

import React, { useEffect } from 'react';
import { GridVideo } from '@/src/db/types';

type Props = {
  videos: GridVideo[];
  children: React.ReactNode;
};

export function ReviewVideosLogger({ videos, children }: Props) {
  useEffect(() => {
    console.log('ReviewGrid videos:', videos);
  }, [videos]);

  return <>{children}</>;
}
