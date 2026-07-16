import { getProfile } from '@/src/app/actions/actions';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { BrandVideosLogger } from '@/src/app/components/client/BrandVideosLogger';
import { LocaleProps } from '@/src/db/types';
import { FunctionComponent, Suspense } from 'react';
import { ReviewGridSkeleton } from './ReviewGrid';
import { CTABlockProps } from './CTABlock';

type Props = {
  id: string;
  page: number;
  type: 'brand' | 'category';
  ctaBlock: CTABlockProps;
  header?: {
    type?: 'brand' | 'brand-feed' | 'category' | 'product-feed' | 'reviewer';
    variant?: 'primary' | 'secondary';
  };
} & LocaleProps;

export const ProfileGrid: FunctionComponent<Props> = async ({
  id,
  locale,
  page,
  type,
  ctaBlock,
  header,
}) => {
  const { data } = await getProfile({
    lang: locale,
    gridType: type,
    id,
    page,
  });

  return (
    <Suspense fallback={<ReviewGridSkeleton count={9} />}>
      <BrandVideosLogger data={data}>
        <PaginationContainer
          data={data}
          header={{
            dataType: header?.type,
            variant: header?.variant,
          }}
          ctaBlock={ctaBlock}
        />
      </BrandVideosLogger>
    </Suspense>
  );
};
