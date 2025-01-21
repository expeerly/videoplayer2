import { FunctionComponent } from 'react';
import { ReviewGrid } from './ReviewGrid';
import { Grid } from '@/src/db/types';

type Props = {
  getGridVideos: () => Promise<{
    data: Grid;
    error?: string;
  }>;
};

export const ReviewGridSection: FunctionComponent<Props> = async ({ getGridVideos }) => {
  const { data: brandVideos } = await getGridVideos();
  return (
    <ReviewGrid
      header={{
        dataType: 'brand',
      }}
      data={brandVideos?.rows?.[0]}
    />
  );
};
