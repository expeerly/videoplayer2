import { FunctionComponent } from 'react';
import { ReviewGrid } from './ReviewGrid';
import { Grid } from '@/src/db/types';

type Props = {
  getGridVideos: () => Promise<{
    data: Grid;
    error?: string;
  }>;
  dataType?: 'brand' | 'brand-feed' | 'category' | 'product-feed' | 'reviewer';
};

export const ReviewGridSection: FunctionComponent<Props> = async ({
  getGridVideos,
  dataType = 'brand',
}) => {
  const { data: gridData } = await getGridVideos();

  // Check if data exists and has rows with videos
  if (!gridData || !gridData.rows || gridData.rows.length === 0) {
    return null;
  }

  // Filter out rows that don't have videos
  const validRows = gridData.rows.filter(row => row.videos && row.videos.length > 0);

  if (validRows.length === 0) {
    return null;
  }

  return (
    <ReviewGrid
      header={{
        dataType,
      }}
      data={validRows[0]}
    />
  );
};
