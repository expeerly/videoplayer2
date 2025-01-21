import { getProfile } from '@/src/app/actions/actions';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { LocaleProps } from '@/src/db/types';
import { getDictionary } from '@/src/lib/dictionary';
import { FunctionComponent, Suspense } from 'react';

type Props = {
  id: string;
  page: number;
} & LocaleProps;

export const CategoryVideos: FunctionComponent<Props> = async ({ id, locale, page }) => {
  const { t } = await getDictionary();
  const { data: categoryVideos } = await getProfile(locale, 'category', id, page);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaginationContainer
        data={categoryVideos}
        header={{
          dataType: 'brand',
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
