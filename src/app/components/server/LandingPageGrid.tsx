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

  return (
    <Suspense fallback={<ReviewGridSkeleton />}>
      <PaginationContainer
        header={{
          dataType: type === 'creator' ? 'reviewer' : type,
        }}
        data={gridVideos}
        ctaBlock={ctaBlock}
      />
    </Suspense>
  );
};
