import React, { FunctionComponent, Suspense } from 'react';
import { PaginationContainer } from './PaginationContainer';
import { AllBrandssData, AllCategoriesData, Languages } from '@/src/db/types';
import { getGridVideos } from '../../actions/actions';
import { getQueryIds } from '../../utils/queryHelpers';
import { CTABlockProps } from './CTABlock';
import { ReviewGridSkeleton } from './ReviewGrid';

type Props = {
  locale: Languages;
  type: 'brand' | 'category' | 'creator';
  page: number;
  categoryQuery: string | string[];
  brandQuery: string | string[];
  allCategories: AllCategoriesData[];
  allBrands: AllBrandssData;
  ctaBlock: CTABlockProps;
  headerVariant?: 'primary' | 'secondary';
};

export const LandingPageGrid: FunctionComponent<Props> = async ({
  locale,
  type,
  page,
  categoryQuery,
  brandQuery,
  allCategories,
  allBrands,
  ctaBlock,
  headerVariant,
}) => {
  const { data: gridVideos } = await getGridVideos({
    lang: locale,
    gridType: type,
    page,
    limit: 4,
    videoCount: 9,
    random: false,
    filter: getQueryIds(categoryQuery, brandQuery, allCategories, allBrands),
  });

  const validRows = gridVideos?.rows?.filter(row => row.videos && row.videos.length > 0) ?? [];
  const filteredGridVideos = {
    ...gridVideos,
    rows: validRows,
  };

  if (validRows.length === 0) {
    return null;
  }

  return (
    <Suspense fallback={<ReviewGridSkeleton />}>
      <PaginationContainer
        header={{
          dataType: type === 'creator' ? 'reviewer' : type,
          variant: headerVariant,
        }}
        data={filteredGridVideos}
        ctaBlock={ctaBlock}
      />
    </Suspense>
  );
};
