import { getProfile } from '@/src/app/actions/actions';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { LocaleProps } from '@/src/db/types';
import { getDictionary } from '@/src/lib/dictionary';
import { FunctionComponent, Suspense } from 'react';
import { ReviewGridSkeleton } from './ReviewGrid';

type Props = {
  id: string;
  page: number;
  type: 'brand' | 'category';
} & LocaleProps;

export const ProfileGrid: FunctionComponent<Props> = async ({ id, locale, page, type }) => {
  const { t } = await getDictionary();
  const { data } = await getProfile({
    lang: locale,
    gridType: type,
    id,
    page,
  });

  return (
    <Suspense fallback={<ReviewGridSkeleton count={9} />}>
      <PaginationContainer
        data={data}
        header={{
          dataType: type,
          variant: 'secondary',
        }}
        ctaBlock={{
          heading: t('cta_block_all_brands_categories.title'),
          desc: t('cta_block_all_brands_categories.desc'),
          button: {
            label: t('learn_more.label'),
            ariaLabel: t('learn_more.aria_label'),
            href: 'https://www.get.expeerly.com/for-brands',
          },
        }}
      />
    </Suspense>
  );
};
