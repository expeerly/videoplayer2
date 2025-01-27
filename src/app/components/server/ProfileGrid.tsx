import { getProfile } from '@/src/app/actions/actions';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
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
    type?: 'brand' | 'category' | 'reviewer';
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

  console.log({ data });

  return (
    <Suspense fallback={<ReviewGridSkeleton count={9} />}>
      <PaginationContainer
        data={data}
        header={{
          dataType: header?.type,
          variant: header?.variant,
        }}
        ctaBlock={ctaBlock}
      />
    </Suspense>
  );
};
